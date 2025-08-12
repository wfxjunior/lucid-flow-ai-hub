import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

interface CrawlRequest {
  full?: boolean;
  sources?: string[]; // optional overrides
}

const BASE = 'https://featherbiz.io';
const ALLOW = [
  '/', '/landing', '/pricing', '/privacy', '/terms', '/status'
];
const PREFIXES = ['/features/', '/integrations/', '/help/', '/docs/', '/blog/'];
const EXCLUDE_PATTERNS = [/\/(signin|login|account|admin)\b/i, /\?utm_/i, /noindex/i];

function shouldInclude(url: string) {
  try {
    const u = new URL(url, BASE);
    if (u.host !== new URL(BASE).host) return false;
    const path = u.pathname;
    if (EXCLUDE_PATTERNS.some(r => r.test(url))) return false;
    if (ALLOW.includes(path)) return true;
    return PREFIXES.some(p => path.startsWith(p));
  } catch { return false; }
}

function stripBoilerplate(html: string) {
  // remove scripts/styles/nav/footer
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<!--.*?-->/g, '')
}

function htmlToText(html: string) {
  const cleaned = stripBoilerplate(html)
    .replace(/<[^>]+>/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
  return cleaned;
}

function extractTitle(html: string) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : '';
}

function extractHeadings(html: string) {
  const headings: Array<{ tag: string; text: string }> = [];
  const rx = /<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(html))) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) headings.push({ tag: m[1].toLowerCase(), text });
  }
  return headings;
}

function chunk(text: string, size = 800, overlap = 120) {
  const parts: string[] = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + size, text.length);
    parts.push(text.slice(i, end));
    if (end === text.length) break;
    i = end - overlap;
    if (i < 0) i = 0;
  }
  return parts.map(p => p.trim()).filter(Boolean);
}

async function embed(input: string): Promise<number[]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'text-embedding-3-small', input })
  });
  if (!res.ok) throw new Error(`Embeddings failed ${res.status}`);
  const data = await res.json();
  return data.data[0].embedding as number[];
}

async function discoverUrls(): Promise<string[]> {
  try {
    const sm = await fetch(`${BASE}/sitemap.xml`);
    if (sm.ok) {
      const xml = await sm.text();
      const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
      return urls.filter(shouldInclude);
    }
  } catch (_) {}
  // fallback
  const seeds = [BASE, ...ALLOW.map(p => BASE + p)];
  return seeds;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (!OPENAI_API_KEY) return new Response(JSON.stringify({ error: 'OPENAI_API_KEY missing' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});

  try {
    const body: CrawlRequest = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const urls = body.sources && body.sources.length ? body.sources : await discoverUrls();

    const results: any[] = [];
    for (const url of urls) {
      try {
        if (!shouldInclude(url)) continue;
        const res = await fetch(url);
        if (!res.ok) continue;
        const html = await res.text();
        const title = extractTitle(html);
        const headings = extractHeadings(html);
        const text = htmlToText(html);
        if (!text || text.length < 200) continue;

        // Detect crude language by meta or path
        const lang = /lang="(zh|de|fr|es|pt)"/i.test(html)
          ? RegExp.$1.toLowerCase()
          : (url.includes('/pt') ? 'pt' : url.includes('/es') ? 'es' : url.includes('/fr') ? 'fr' : url.includes('/de') ? 'de' : url.includes('/zh') ? 'zh' : 'en');

        // Upsert page
        const { data: pageData, error: pageErr } = await supabase
          .from('featherbot_kb_pages')
          .upsert({ url, title, headings_outline: headings, last_modified: new Date().toISOString(), language: lang }, { onConflict: 'url' })
          .select('id').single();
        if (pageErr || !pageData) throw pageErr || new Error('Page upsert failed');

        // Recreate chunks
        await supabase.from('featherbot_kb_chunks').delete().eq('page_id', pageData.id);
        const parts = chunk(text);
        const inserts = [] as any[];
        for (let i = 0; i < parts.length; i++) {
          const content = parts[i];
          const embedding = await embed(content);
          inserts.push({ page_id: pageData.id, chunk_index: i, content, language: lang, embedding });
        }
        if (inserts.length) {
          const { error: insErr } = await supabase.from('featherbot_kb_chunks').insert(inserts);
          if (insErr) throw insErr;
        }
        results.push({ url, chunks: inserts.length, lang });
      } catch (err) {
        console.error('Index error', url, err);
      }
    }

    return new Response(JSON.stringify({ success: true, indexed: results.length, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    console.error('Indexer error', e);
    return new Response(JSON.stringify({ error: e.message || 'Indexer failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  }
});