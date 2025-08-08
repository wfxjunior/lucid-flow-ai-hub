
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Cloud, Database, Mail, MessageSquare, CreditCard, Github, Chrome } from "lucide-react";

const integrations = [
  { icon: MessageSquare, name: "Slack", desc: "Get instant notifications and slash commands." },
  { icon: CreditCard, name: "Stripe", desc: "Payments, subscriptions and webhooks." },
  { icon: Mail, name: "Gmail", desc: "Send and sync emails with your mailbox." },
  { icon: Cloud, name: "Google Drive", desc: "Store files and automate sharing." },
  { icon: Database, name: "PostgreSQL", desc: "Stream data to your warehouse." },
  { icon: Github, name: "GitHub", desc: "Sync issues and releases with projects." },
  { icon: MessageSquare, name: "WhatsApp", desc: "Message customers from the platform." },
  { icon: Chrome, name: "Zapier", desc: "Connect 5000+ apps with no code." },
];

export default function Integrations() {
  return (
    <MarketingPageLayout title="Integrations" description="See all integrations available." canonical="/integrations">
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {integrations.map((it, i) => (
            <Card key={i} className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <article>
                <div className="flex items-center gap-3">
                  <it.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{it.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{it.desc}</p>
              </article>
            </Card>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
}
