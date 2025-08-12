import React, { useEffect, useMemo } from 'react'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { buildOpenApiSkeleton, defaultApiSettings } from '@/admin/api/openapi-skeleton'

export default function OpenAPIPreview() {
  useEffect(() => {
    document.title = 'OpenAPI Preview — Admin'
    console.log('event: dev_page_view_admin', { page: 'openapi_preview' })
  }, [])
  const spec = useMemo(() => buildOpenApiSkeleton(defaultApiSettings), [])

  return (
    <AdminGuard>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">OpenAPI Preview (Mock)</h1>
          <p className="text-muted-foreground">Admin-only. All endpoints are marked x-status: "mock".</p>
        </header>
        <section className="grid md:grid-cols-2 gap-4">
          <article className="p-4 border rounded">
            <h2 className="font-semibold">Info</h2>
            <pre className="text-xs mt-2 overflow-auto">{JSON.stringify({ openapi: spec.openapi, info: spec.info, servers: spec.servers }, null, 2)}</pre>
          </article>
          <article className="p-4 border rounded">
            <h2 className="font-semibold">Paths</h2>
            <pre className="text-xs mt-2 overflow-auto" style={{ maxHeight: 420 }}>{JSON.stringify(spec.paths, null, 2)}</pre>
          </article>
        </section>
      </main>
    </AdminGuard>
  )
}
