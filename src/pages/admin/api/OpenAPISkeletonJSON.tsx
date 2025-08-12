import React, { useEffect, useMemo } from 'react'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { buildOpenApiSkeleton, defaultApiSettings } from '@/admin/api/openapi-skeleton'

export default function OpenAPISkeletonJSON() {
  useEffect(() => { console.log('event: api_spec_skeleton_created') }, [])
  const spec = useMemo(() => buildOpenApiSkeleton(defaultApiSettings), [])

  // Render as JSON text; in SPA we can't set content-type to application/json, but this is admin-only.
  return (
    <AdminGuard>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">openapi.json (admin-only)</h1>
        <pre className="text-xs p-3 border rounded overflow-auto" style={{ maxHeight: 600 }}>{JSON.stringify(spec, null, 2)}</pre>
      </main>
    </AdminGuard>
  )
}
