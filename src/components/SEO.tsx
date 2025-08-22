
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath, type = 'website' }) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | FeatherBiz`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = `https://featherbiz.io${canonicalPath}`;

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;

    let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;

    let ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.content = type;
  }, [title, description, canonicalPath, type]);

  return null;
};
