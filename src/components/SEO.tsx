import React, { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  type?: string;
  siteName?: string;
};

export function SEO({
  title,
  description,
  canonicalPath,
  ogImage = "/og/landing-og.jpg",
  type = "website",
  siteName = "FeatherBiz",
}: SEOProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const url = origin + canonicalPath;

    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setMetaProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Basic
    setMeta("description", description);

    // Canonical
    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", url);

    // Open Graph
    setMetaProp("og:title", title);
    setMetaProp("og:description", description);
    setMetaProp("og:type", type);
    setMetaProp("og:url", url);
    setMetaProp("og:site_name", siteName);
    setMetaProp("og:image", ogImage);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Structured Data: Organization
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: origin,
      logo: origin + "/favicon.ico",
    };

    let ld = document.getElementById("ld-org");
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "ld-org";
      ld.setAttribute("type", "application/ld+json");
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonLd);
  }, [title, description, canonicalPath, ogImage, type, siteName]);

  return null;
}

export default SEO;
