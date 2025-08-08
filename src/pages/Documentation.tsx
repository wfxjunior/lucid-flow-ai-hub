
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";

export default function Documentation() {
  return (
    <MarketingPageLayout title="Documentation" description="Read our platform documentation." canonical="/documentation">
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="lg:sticky lg:top-24 self-start bg-muted/30 rounded-md p-4">
          <nav className="text-sm space-y-2">
            <a href="#getting-started" className="block hover:text-foreground text-muted-foreground">Getting started</a>
            <a href="#auth" className="block hover:text-foreground text-muted-foreground">Authentication</a>
            <a href="#webhooks" className="block hover:text-foreground text-muted-foreground">Webhooks</a>
          </nav>
        </aside>
        <main className="prose max-w-none">
          <section id="getting-started" className="scroll-mt-24">
            <h3 className="text-xl font-semibold">Getting started</h3>
            <p className="text-muted-foreground">Install the SDK and make your first request.</p>
            <pre className="bg-muted p-4 rounded-md mt-3 overflow-auto text-sm"><code>{`npm install @featherbiz/sdk`}</code></pre>
          </section>
          <section id="auth" className="mt-8 scroll-mt-24">
            <h3 className="text-xl font-semibold">Authentication</h3>
            <p className="text-muted-foreground">Use an API key with the Bearer scheme.</p>
            <pre className="bg-muted p-4 rounded-md mt-3 overflow-auto text-sm"><code>{`import { Client } from '@featherbiz/sdk'
const fb = new Client({ apiKey: process.env.FB_API_KEY })`}</code></pre>
          </section>
          <section id="webhooks" className="mt-8 scroll-mt-24">
            <h3 className="text-xl font-semibold">Webhooks</h3>
            <p className="text-muted-foreground">Receive events like invoice.paid at your endpoint.</p>
            <pre className="bg-muted p-4 rounded-md mt-3 overflow-auto text-sm"><code>{`POST /webhooks/featherbiz
Signature: t=...,v1=...`}</code></pre>
          </section>
        </main>
      </div>
    </MarketingPageLayout>
  );
}
