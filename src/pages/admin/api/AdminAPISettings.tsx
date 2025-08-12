import React, { useEffect, useMemo, useState } from 'react'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { buildOpenApiSkeleton, defaultApiSettings, ApiSettings } from '@/admin/api/openapi-skeleton'

const STORAGE_KEY = 'admin_api_settings'

export default function AdminAPISettings() {
  const [settings, setSettings] = useState<ApiSettings>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultApiSettings, ...JSON.parse(raw) } : defaultApiSettings
  })
  const [publicEnabled, setPublicEnabled] = useState<boolean>(() => {
    return localStorage.getItem('developers_public_enabled') === 'true'
  })

  useEffect(() => { document.title = 'Admin API Settings | FeatherBiz' }, [])

  const spec = useMemo(() => buildOpenApiSkeleton(settings), [settings])

  const persist = (s: Partial<ApiSettings>) => {
    const next = { ...settings, ...s }
    setSettings(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const togglePublic = (on: boolean) => {
    setPublicEnabled(on)
    localStorage.setItem('developers_public_enabled', on ? 'true' : 'false')
    console.log('event: admin_toggle_api_public_changed', { enabled: on })
  }

  return (
    <AdminGuard>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">API Controls (Admin)</h1>
          <p className="text-muted-foreground mt-2">Safe planning controls. No backend endpoints are enabled.</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Visibility</h2>
          <div className="flex items-center gap-3">
            <input id="public" type="checkbox" checked={publicEnabled} onChange={(e) => togglePublic(e.target.checked)} />
            <label htmlFor="public">Expose API Docs publicly (OFF by default)</label>
          </div>
          <p className="text-sm text-muted-foreground">If enabled, we can add a /developers public page later. Currently disabled.</p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">OpenAPI Skeleton (admin-only)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-sm">Contact email</label>
              <input className="w-full border rounded p-2" value={settings.contact_email_for_api} onChange={(e)=>persist({ contact_email_for_api: e.target.value })} />

              <label className="block text-sm">Auth model</label>
              <select className="w-full border rounded p-2" value={settings.api_auth_model} onChange={(e)=>persist({ api_auth_model: e.target.value as any })}>
                <option value="apiKey">API Key</option>
                <option value="oauth2">OAuth2</option>
                <option value="both">Both</option>
              </select>

              <label className="block text-sm">Versioning</label>
              <select className="w-full border rounded p-2" value={settings.versioning} onChange={(e)=>persist({ versioning: e.target.value as any })}>
                <option value="url">URL (/v1)</option>
                <option value="header">Header</option>
              </select>

              <label className="block text-sm">Rate limit (req/min)</label>
              <input className="w-full border rounded p-2" type="number" value={settings.rate_limit} onChange={(e)=>persist({ rate_limit: Number(e.target.value||60) })} />

              <label className="block text-sm">Webhook signing</label>
              <select className="w-full border rounded p-2" value={settings.webhook_signing} onChange={(e)=>persist({ webhook_signing: e.target.value as any })}>
                <option value="hmac-sha256">HMAC-SHA256 (planned)</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <pre className="text-xs p-3 border rounded overflow-auto" style={{ maxHeight: 400 }}>{JSON.stringify(spec, null, 2)}</pre>
              <div className="mt-2 flex gap-2">
                <a href="/admin/api/openapi.json" className="text-blue-600 underline">Open JSON (/admin/api/openapi.json)</a>
                <a href="/admin/api/preview" className="text-blue-600 underline">Preview</a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-2">
          <h2 className="text-xl font-semibold">Questions for Owner</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Which template types should be first-class? (Document, Message, Data, Automation/AI)</li>
            <li>Which entities need APIs first? (Estimates, Assignments, Voices, AI/Calc, Customers)</li>
            <li>Preferred auth model to start? (API Key vs OAuth2)</li>
            <li>Publish public landing for developers now (Coming Soon) or keep internal-only?</li>
          </ul>
        </section>
      </main>
    </AdminGuard>
  )
}
