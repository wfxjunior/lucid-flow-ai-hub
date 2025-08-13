import { MetaTags } from '@/components/MetaTags'

interface SEOPageWrapperProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  children: React.ReactNode
}

export function SEOPageWrapper({
  title,
  description,
  canonical,
  ogImage,
  children
}: SEOPageWrapperProps) {
  return (
    <>
      <MetaTags
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
      />
      {children}
    </>
  )
}