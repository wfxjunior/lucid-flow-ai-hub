import React from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { MarketingPageLayout } from '@/components/landing/MarketingPageLayout'

export default function AdminBlog() {
  return (
    <AdminGuard>
      <MarketingPageLayout title="Blog Admin" description="Create, edit, and publish blog posts." canonical="/admin/blog">
        {/* Minimal stub – full CMS can be extended here */}
        <p className="text-muted-foreground">Admin tools coming online. Seed posts are live; publishing UI will be expanded next.</p>
      </MarketingPageLayout>
    </AdminGuard>
  )
}
