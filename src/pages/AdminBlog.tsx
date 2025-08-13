import React from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { MarketingPageLayout } from '@/components/landing/MarketingPageLayout'
import { BlogAdmin } from '@/components/BlogAdmin'

export default function AdminBlog() {
  return (
    <AdminGuard>
      <MarketingPageLayout title="Blog Admin" description="Create, edit, and publish blog posts." canonical="/admin/blog">
        <BlogAdmin />
      </MarketingPageLayout>
    </AdminGuard>
  )
}
