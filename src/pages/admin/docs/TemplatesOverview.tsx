import React, { useEffect, useMemo } from 'react'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { signatureTemplates } from '@/components/e-signatures/templates/signatureTemplates'

// Extract variables like {clientName} from template content
function extractVariables(text: string): string[] {
  const vars = new Set<string>()
  const re = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) vars.add(m[1])
  return Array.from(vars)
}

export default function TemplatesOverview() {
  useEffect(() => {
    document.title = 'Templates Overview — Admin | FeatherBiz'
    console.log('event: templates_inventory_built')
  }, [])

  const docTemplates = signatureTemplates.map(t => ({
    id: t.id, name: t.name, category: t.category, location: 'src/components/e-signatures/templates/signatureTemplates.ts',
    editableViaUI: false,
    variables: extractVariables(t.content),
    output: 'HTML → PDF/e-sign',
    versioning: 'no',
  }))

  // Email templates are fetched from edge function list-templates (DB-backed)
  const messageTemplates = [
    {
      module: 'EmailCenterPage',
      location: 'src/components/EmailCenterPage.tsx + supabase/functions/list-templates',
      editableViaUI: 'via DB (not in this UI)',
      variables: ['subject', 'body_html|body_text', 'language', 'context'],
      output: 'HTML/Plain',
      versioning: 'depends on DB',
    },
  ]

  const dataTemplates = [
    {
      module: 'documentConfig',
      location: 'src/components/documents/documentConfig.ts',
      editableViaUI: false,
      variables: ['document types mapping', 'terms strings'],
      output: 'Config',
      versioning: 'no',
    },
  ]

  const automationTemplates = [
    {
      module: 'generate-contract-ai (edge)',
      location: 'src/components/ContractForm.tsx → supabase/functions/generate-contract-ai',
      editableViaUI: 'prompt composed in UI, not stored',
      variables: ['contractType', 'title', 'businessType'],
      output: 'AI-generated text',
      versioning: 'no',
    },
  ]

  // Build Variables Catalog grouped by entity
  const variableCatalog = useMemo(() => {
    const set = new Set<string>()
    signatureTemplates.forEach(t => extractVariables(t.content).forEach(v => set.add(v)))
    const list = Array.from(set)
    const groups: Record<string, string[]> = {
      Customer: list.filter(v => v.toLowerCase().includes('client')),
      Company: [],
      Estimate: ['amount', 'startDate', 'duration', 'terms'].filter(v => set.has(v)),
      Assignment: [],
      'AI/Calc': ['amount'].filter(v => set.has(v)),
      Misc: list.filter(v => !['clientname','clientemail','amount','startdate','duration','terms'].includes(v.toLowerCase())),
    }
    return groups
  }, [])

  return (
    <AdminGuard>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Templates Overview / Visão geral de Modelos</h1>
          <p className="text-muted-foreground mt-2">Admin-only guide to document, message, data, and automation templates.</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What are Templates? / O que são Modelos?</h2>
          <p>
            EN: Templates are reusable blueprints for docs, messages, data structures, or automations that pull live fields
            (customer, job, estimate, totals, dates, etc.).
          </p>
          <p>
            PT: Modelos são padrões reutilizáveis para documentos, mensagens, dados ou automações que usam campos dinâmicos
            (cliente, trabalho, orçamento, totais, datas, etc.).
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Types supported / Tipos suportados</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Document Templates: {docTemplates.length} static templates in code</li>
            <li>Message Templates (Email): fetched from database via edge function</li>
            <li>Data Templates (Defaults): document type labels, number generators</li>
            <li>Automation/AI Templates: prompts composed in UI for contract generation</li>
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">Inventory / Inventário</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="p-4 border rounded-md">
              <h4 className="font-medium">Documents</h4>
              <ul className="mt-2 text-sm list-disc ml-5">
                {docTemplates.map(t => (
                  <li key={t.id}>{t.name} ({t.category}) – {t.location}</li>
                ))}
              </ul>
            </article>
            <article className="p-4 border rounded-md">
              <h4 className="font-medium">Messages</h4>
              <ul className="mt-2 text-sm list-disc ml-5">
                {messageTemplates.map((t, i) => (
                  <li key={i}>{t.module} – {t.location}</li>
                ))}
              </ul>
            </article>
            <article className="p-4 border rounded-md">
              <h4 className="font-medium">Data</h4>
              <ul className="mt-2 text-sm list-disc ml-5">
                {dataTemplates.map((t, i) => (
                  <li key={i}>{t.module} – {t.location}</li>
                ))}
              </ul>
            </article>
            <article className="p-4 border rounded-md">
              <h4 className="font-medium">Automation / AI</h4>
              <ul className="mt-2 text-sm list-disc ml-5">
                {automationTemplates.map((t, i) => (
                  <li key={i}>{t.module} – {t.location}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Where they live / Onde ficam</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Code: signature templates in src/components/e-signatures/templates/signatureTemplates.ts</li>
            <li>DB: email templates via edge function list-templates (Supabase table)</li>
            <li>Config: document terminology in src/components/documents/documentConfig.ts</li>
          </ul>
        </section>

        <section className="mt-8 space-y-2">
          <h2 className="text-xl font-semibold">Variables Catalog / Catálogo de Variáveis</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {Object.entries(variableCatalog).map(([group, items]) => (
              <div key={group} className="p-4 border rounded-md">
                <h4 className="font-medium">{group}</h4>
                <p className="mt-1 text-muted-foreground">{items.length ? items.join(', ') : '—'}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-2">
          <h2 className="text-xl font-semibold">Best Practices / Boas práticas</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Naming: clear, version with date or semver when updating.</li>
            <li>Preview before publish; test variables resolve correctly.</li>
            <li>Keep templates minimal; push complex logic to code.</li>
          </ul>
        </section>
      </main>
    </AdminGuard>
  )
}
