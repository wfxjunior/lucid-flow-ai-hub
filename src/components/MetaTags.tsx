import { useEffect } from 'react'

interface MetaTagsProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export function MetaTags({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  keywords = [],
  author = 'FeatherBiz',
  publishedTime,
  modifiedTime
}: MetaTagsProps) {
  const fullTitle = title.includes('FeatherBiz') ? title : `${title} | FeatherBiz`
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '')
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let tag = document.querySelector(selector) as HTMLMetaElement
      
      if (!tag) {
        tag = document.createElement('meta')
        if (property) {
          tag.setAttribute('property', name)
        } else {
          tag.setAttribute('name', name)
        }
        document.head.appendChild(tag)
      }
      
      tag.setAttribute('content', content)
    }
    
    // Update canonical link
    const updateCanonicalLink = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      
      link.setAttribute('href', href)
    }
    
    // Basic Meta Tags
    updateMetaTag('description', description)
    updateMetaTag('author', author)
    
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '))
    }
    
    // Canonical URL
    if (currentUrl) {
      updateCanonicalLink(currentUrl)
    }
    
    // Open Graph Tags
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:url', currentUrl, true)
    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:site_name', 'FeatherBiz', true)
    
    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', ogImage)
    
    // Article specific tags
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true)
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true)
    }
    
    // Security headers via meta tags
    updateMetaTag('referrer', 'strict-origin-when-cross-origin')
    
  }, [fullTitle, description, currentUrl, ogImage, keywords, author, publishedTime, modifiedTime])
  
  return null // This component doesn't render anything
}