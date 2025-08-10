import React, { useEffect } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

interface MarketingPageLayoutProps {
  title: string;
  description?: string;
  canonical?: string;
  children: React.ReactNode;
}

export const MarketingPageLayout: React.FC<MarketingPageLayoutProps> = ({
  title,
  description,
  canonical,
  children,
}) => {
  useEffect(() => {
    // Basic SEO tags
    document.title = `${title} | FeatherBiz`;

    const metaDesc = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (metaDesc && description) {
      metaDesc.content = description;
    }

    let link = document.querySelector('link[rel="canonical"]') as
      | HTMLLinkElement
      | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    const preferredOrigin = 'https://featherbiz.io'
    link.href = canonical
      ? `${preferredOrigin}${canonical}`
      : preferredOrigin + (canonical || '/')
  }, [title, description, canonical]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
            {description ? (
              <p className="text-muted-foreground mt-4">{description}</p>
            ) : null}
            <div className="mt-8">{children}</div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
};
