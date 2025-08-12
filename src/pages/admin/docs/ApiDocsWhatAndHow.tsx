import React, { useEffect } from 'react'
import { AdminGuard } from '@/components/auth/AdminGuard'

export default function ApiDocsWhatAndHow() {
  useEffect(() => {
    document.title = 'API Docs — Admin | FeatherBiz'
  }, [])

  return (
    <AdminGuard>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">What are API Docs? / O que são Documentações de API?</h1>
          <p className="text-muted-foreground mt-2">Admin-only overview. No public API is exposed yet.</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Definition / Definição</h2>
          <p>
            EN: API documentation explains endpoints, authentication, rate limits, pagination, webhooks, errors, and examples.
          </p>
          <p>
            PT: A documentação de API descreve endpoints, autenticação, limites de uso, paginação, webhooks, erros e exemplos.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Current status / Status atual</h2>
          <p>EN: FeatherBiz has no public API yet; no public API docs are exposed.</p>
          <p>PT: FeatherBiz ainda não possui API pública; não há docs públicas.</p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Feasibility without a live API / Viabilidade sem API ativa</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Schema-first (recommended): design OpenAPI 3.1, generate a mock server, then implement backend to match.</li>
            <li>Internal SDK stubs: publish typed interfaces only (no requests).</li>
            <li>Pre-docs only: internal planning page with models, use-cases, and auth plan.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Security considerations / Segurança</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Auth models: API keys vs OAuth2.</li>
            <li>Versioning: /v1 + deprecation policy.</li>
            <li>Rate limiting and idempotency for writes.</li>
            <li>Pagination style: cursor-based.</li>
            <li>Webhooks + HMAC signing; sandbox environment.</li>
          </ul>
        </section>
      </main>
    </AdminGuard>
  )
}
