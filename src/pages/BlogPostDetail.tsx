import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Calendar, Clock, Link as LinkIcon, Mail, Linkedin, Facebook, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  tags: string[] | null;
  likes_count: number;
  liked_by_names: string[] | null;
  published_at: string | null;
  read_time_minutes: number | null;
  author?: string | null;
}

const getClientId = () => {
  const key = 'fbz_blog_cid';
  let v = localStorage.getItem(key);
  if (!v) { v = crypto.randomUUID(); localStorage.setItem(key, v); }
  return v;
}

export default function BlogPostDetail(){
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
      if (!mounted) return;
      if (error) console.error(error);
      setPost(data);
      setCount(data?.likes_count || 0);
      try { window.dispatchEvent(new CustomEvent('blog_post_view', { detail: { slug } })); } catch {}
      // Optionally check if current user/client liked (not stored client-side for simplicity)
    })();
    return () => { mounted = false };
  }, [slug]);

  const onToggleLike = async () => {
    if (!post) return;
    try {
      const { data, error } = await supabase.functions.invoke('blog-like', {
        body: { post_id: post.id, client_id: getClientId() }
      });
      if (error) throw error;
      setLiked(data?.liked ?? !liked);
      setCount(data?.likes_count ?? count + (liked ? -1 : 1));
      try { window.dispatchEvent(new CustomEvent('blog_like_clicked', { detail: { slug: post.slug } })); } catch {}
      try { window.dispatchEvent(new CustomEvent('blog_like_count', { detail: { slug: post.slug, count: data?.likes_count } })); } catch {}
    } catch (e) {
      console.error('Like failed', e);
    }
  };

  const share = async (network?: string) => {
    if (!post) return;
    const url = `https://featherbiz.io/blog/${post.slug}`;
    const title = post.title;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        const links: Record<string,string> = {
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          copy: url,
          email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
        };
        if (network === 'copy') {
          await navigator.clipboard.writeText(url);
        } else if (network) {
          window.open(links[network], '_blank', 'noopener');
        }
      }
      try { window.dispatchEvent(new CustomEvent('blog_share_clicked', { detail: { slug: post.slug, network } })); } catch {}
    } catch (e) {
      console.error('Share failed', e);
    }
  };

  const jsonLd = useMemo(() => {
    if (!post) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || '',
      "datePublished": post.published_at || new Date().toISOString(),
      "author": { "@type": "Organization", "name": post.author || 'FeatherBiz Editorial' },
      "url": `https://featherbiz.io/blog/${post.slug}`
    };
  }, [post]);

  if (!post) return (
    <MarketingPageLayout title="Loading…" description="" canonical="/blog">
      <div />
    </MarketingPageLayout>
  );

  return (
    <>
      <SEO
        title={`${post.title} | Blog`}
        description={post.excerpt || ''}
        canonicalPath={`/blog/${post.slug}`}
        type="article"
      />
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <MarketingPageLayout
        title={post.title}
        description={post.excerpt || ''}
        canonical={`/blog/${post.slug}`}
      >
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {post.read_time_minutes || 5} min</span>
        </div>
        {/* Cover */}
        <div className="mt-5 h-56 w-full rounded-lg bg-muted" aria-hidden="true" />

        {/* Like + Share */}
        <div className="mt-5 flex items-center justify-between">
          <Button variant={liked? 'default':'outline'} size="sm" onClick={onToggleLike} className="gap-2" aria-label="Like this post">
            <Heart className="h-4 w-4 text-primary" /> <span className="text-primary">{count}</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={()=>share('twitter')} aria-label="Share on X/Twitter"><Twitter className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" onClick={()=>share('linkedin')} aria-label="Share on LinkedIn"><Linkedin className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" onClick={()=>share('facebook')} aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" onClick={()=>share('copy')} aria-label="Copy link"><LinkIcon className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" onClick={()=>share('email')} aria-label="Share by email"><Mail className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Names */}
        {post.liked_by_names && post.liked_by_names.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">Liked by {post.liked_by_names.slice(0,3).join(', ')}{post.likes_count > (post.liked_by_names?.length||0) ? ' and others' : ''}</p>
        )}

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none mt-6">
          <p className="text-foreground whitespace-pre-line">{post.content}</p>
        </article>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(post.tags||[]).map(tag => (<Badge key={tag} variant="secondary" aria-label={`Tag ${tag}`}>{tag}</Badge>))}
        </div>

        {/* Related placeholder */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Related posts</h3>
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-5" />
            <Card className="p-5" />
            <Card className="p-5" />
          </div>
        </div>
      </MarketingPageLayout>
    </>
  );
}
