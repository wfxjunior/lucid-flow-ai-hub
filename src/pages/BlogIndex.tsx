
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Calendar, Clock, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  tags: string[] | null;
  likes_count: number;
  liked_by_names: string[] | null;
  published_at: string | null;
  read_time_minutes: number | null;
}

const TAGS = [
  "Business","SMB","Productivity","Automation","AI","Finance","CRM","Operations","Reporting","Assignments","Estimates","Voices","Pipeline","Sales","HR","Scheduling","Security"
];

export default function BlogIndex() {
  const navigate = useNavigate();
  const { isAdmin } = useUserRole();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<'new'|'liked'>('new');
  const [visible, setVisible] = useState(9);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id,title,slug,excerpt,tags,likes_count,liked_by_names,published_at,read_time_minutes')
        .eq('status','published')
        .order('published_at', { ascending: false });
      if (!mounted) return;
      if (error) {
        console.error('Load blog posts failed', error);
      } else {
        setAllPosts(data || []);
      }
      setLoading(false);
    })();
    return () => { mounted = false };
  }, []);

  useEffect(() => {
    // analytics
    try { window.dispatchEvent(new CustomEvent('blog_view')); } catch {}
  }, []);

  const filtered = useMemo(() => {
    let list = [...allPosts];
    if (tagFilter) list = list.filter(p => (p.tags||[]).includes(tagFilter));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => (p.title+" "+(p.excerpt||"")).toLowerCase().includes(q));
    }
    if (sort === 'liked') list.sort((a,b)=> (b.likes_count||0)-(a.likes_count||0));
    return list;
  }, [allPosts, tagFilter, query, sort]);

  const visiblePosts = filtered.slice(0, visible);

  return (
    <>
      <SEO
        title="FeatherBiz Blog"
        description="Business strategies & tips for small businesses."
        canonicalPath="/blog"
      />
      <MarketingPageLayout
        title="FeatherBiz Blog"
        description="Business strategies & tips for small businesses."
        canonical="/blog"
      >
        {/* Header with Admin Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Blog FeatherBiz</h1>
            <p className="text-muted-foreground">Estratégias e dicas de negócios para pequenas empresas</p>
          </div>
          {isAdmin && (
            <Button onClick={() => navigate('/admin/blog')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Gerenciar Blog
            </Button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex-1">
            <Input
              value={query}
              onChange={(e)=>{ setQuery(e.target.value); try { window.dispatchEvent(new CustomEvent('blog_search', { detail: { q: e.target.value }})); } catch {} }}
              placeholder="Buscar artigos"
              aria-label="Search blog"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="Sort posts"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={sort}
              onChange={(e)=> setSort(e.target.value as any)}
            >
              <option value="new">Mais recentes</option>
              <option value="liked">Mais curtidos</option>
            </select>
          </div>
        </div>

        {/* Tag filters */}
        <div className="mt-4 flex flex-wrap gap-2" data-analytics-id="blog_filters">
          <Badge variant={tagFilter===null? 'default':'secondary'} className="cursor-pointer" onClick={()=> setTagFilter(null)} aria-label="Filter: All">Todos</Badge>
          {TAGS.map(t => (
            <Badge key={t} variant={tagFilter===t? 'default':'outline'} className="cursor-pointer" onClick={()=> { setTagFilter(t); try { window.dispatchEvent(new CustomEvent('blog_filter_used',{ detail: { tag: t }})); } catch {} }} aria-label={`Filter: ${t}`}>{t}</Badge>
          ))}
        </div>

        {/* Posts or Empty State */}
        {loading && (
          <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length:6}).map((_,i)=> (
              <Card key={i} className="p-5 h-48 animate-pulse" />
            ))}
          </section>
        )}

        {!loading && visiblePosts.length === 0 && (
          <div className="mt-12 text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {allPosts.length === 0 ? 'Nenhum post encontrado' : 'Nenhum post corresponde aos filtros'}
            </h3>
            <p className="text-muted-foreground">
              {allPosts.length === 0 ? 'Ainda não há posts publicados no blog.' : 'Tente ajustar os filtros de busca.'}
            </p>
            {isAdmin && allPosts.length === 0 && (
              <Button onClick={() => navigate('/admin/blog')} className="mt-4">
                Criar primeiro post
              </Button>
            )}
          </div>
        )}

        {!loading && visiblePosts.length > 0 && (
          <>
            {/* Grid */}
            <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map(post => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <Link to={`/blog/${post.slug}`} className="block p-5 focus:outline-none focus:ring-2 focus:ring-primary rounded">
                    {/* Cover placeholder */}
                    <div className="h-36 w-full rounded-md bg-muted mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(post.tags||[]).slice(0,3).map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR') : ''}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.read_time_minutes || 5} min</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-primary"><Heart className="h-3.5 w-3.5" /> {post.likes_count || 0}</span>
                    </div>
                  </Link>
                </Card>
              ))}
            </section>

            {filtered.length > visible && (
              <div className="mt-8 flex justify-center">
                <Button onClick={()=> setVisible(v=> v+9)} variant="secondary">Carregar mais</Button>
              </div>
            )}
          </>
        )}
      </MarketingPageLayout>
    </>
  );
}
