
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Database, Bug } from "lucide-react";

export default function Security() {
  return (
    <MarketingPageLayout title="Security" description="Security features and best practices." canonical="/security">
      <section className="grid md:grid-cols-2 gap-6">
        <Card className="p-5"><article><div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary"/><h3 className="font-semibold">Defense in depth</h3></div><p className="text-sm text-muted-foreground mt-2">Network segmentation, WAF, and continuous monitoring.</p></article></Card>
        <Card className="p-5"><article><div className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary"/><h3 className="font-semibold">Encryption</h3></div><p className="text-sm text-muted-foreground mt-2">AES‑256 at rest, TLS 1.3 in transit, secrets rotated.</p></article></Card>
        <Card className="p-5"><article><div className="flex items-center gap-2"><Database className="h-5 w-5 text-primary"/><h3 className="font-semibold">Backups</h3></div><p className="text-sm text-muted-foreground mt-2">Point‑in‑time recovery and daily encrypted snapshots.</p></article></Card>
        <Card className="p-5"><article><div className="flex items-center gap-2"><Bug className="h-5 w-5 text-primary"/><h3 className="font-semibold">Compliance</h3></div><p className="text-sm text-muted-foreground mt-2">SOC 2 Type II in progress. GDPR-ready data handling.</p></article></Card>
      </section>
    </MarketingPageLayout>
  );
}
