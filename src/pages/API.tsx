
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Code, KeyRound, Link as LinkIcon, Server } from "lucide-react";

export default function API() {
  return (
    <MarketingPageLayout title="API" description="API documentation and integration details." canonical="/api">
      <section className="grid lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <article>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Quickstart</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Authenticate and call your first endpoint.</p>
            <ol className="list-decimal pl-6 mt-4 space-y-2 text-sm text-foreground">
              <li>Create an API key in Settings → Developers.</li>
              <li>Send it as Authorization: Bearer YOUR_KEY.</li>
              <li>Use the base URL: https://api.featherbiz.io/v1</li>
            </ol>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <pre className="bg-muted p-4 rounded-md text-sm overflow-auto"><code>{`curl -H "Authorization: Bearer $FB_API_KEY" \
  https://api.featherbiz.io/v1/ping`}</code></pre>
              <pre className="bg-muted p-4 rounded-md text-sm overflow-auto"><code>{`fetch('https://api.featherbiz.io/v1/ping', {
  headers: { Authorization: 'Bearer ' + FB_API_KEY }
}).then(r => r.json())`}</code></pre>
            </div>
          </article>
        </Card>
        <Card className="p-5">
          <article>
            <div className="flex items-center gap-2"><KeyRound className="h-5 w-5 text-primary" /><h3 className="font-semibold">Auth</h3></div>
            <p className="text-sm text-muted-foreground mt-2">Use Bearer tokens over HTTPS only.</p>
            <ul className="text-sm mt-3 list-disc pl-6 space-y-2">
              <li>Keys are scoped per workspace.</li>
              <li>Rotate keys regularly.</li>
              <li>Use least-privilege service roles.</li>
            </ul>
          </article>
        </Card>
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Main endpoints</h3>
        </div>
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { path: "/invoices", desc: "Create and list invoices" },
            { path: "/contracts", desc: "Manage contracts & signatures" },
            { path: "/payments", desc: "Capture payments" },
            { path: "/clients", desc: "Manage contacts" },
            { path: "/webhooks", desc: "Receive events" },
          ].map((e) => (
            <Card key={e.path} className="p-4"><article><p className="font-mono text-sm">GET {e.path}</p><p className="text-xs text-muted-foreground">{e.desc}</p></article></Card>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
}
