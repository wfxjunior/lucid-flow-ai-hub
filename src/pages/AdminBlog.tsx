
import React from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { MarketingPageLayout } from '@/components/landing/MarketingPageLayout'
import { BlogAdmin } from '@/components/BlogAdmin'

export default function AdminBlog() {
  return (
    <AdminGuard>
      <MarketingPageLayout title="Administração do Blog" description="Crie, edite e publique posts no blog." canonical="/admin/blog">
        <BlogAdmin />
      </MarketingPageLayout>
    </AdminGuard>
  )
}
