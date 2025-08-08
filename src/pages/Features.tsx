
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Rocket, FileText, CreditCard, Shield, BarChart3, Users } from "lucide-react";

const features = [
  { icon: Rocket, title: "Quick Setup", desc: "Onboard your business in minutes with guided steps.", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  { icon: FileText, title: "Smart Documents", desc: "Create quotes, invoices, and contracts with AI.", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  { icon: CreditCard, title: "Payments", desc: "Send links and get paid fast with automatic receipts.", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  { icon: Shield, title: "Security", desc: "Enterprise-grade encryption and backups by default.", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  { icon: BarChart3, title: "Analytics", desc: "Understand revenue, pipeline and performance in real time.", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  { icon: Users, title: "Collaboration", desc: "Invite your team and control access per role.", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
];

export default function Features() {
  return (
    <MarketingPageLayout
      title="Features"
      description="Explore our platform's core features."
      canonical="/features"
    >
      <section className="mt-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card
              key={i}
              className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-border/50"
              
            >
              <article>
                <div className="flex items-center gap-3">
                  <f.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
                <div className="mt-4 rounded-lg overflow-hidden bg-muted">
                  <video
                    className="w-full aspect-video object-cover"
                    src={f.video}
                    muted
                    loop
                    playsInline
                    controls
                  />
                </div>
              </article>
            </Card>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
}
