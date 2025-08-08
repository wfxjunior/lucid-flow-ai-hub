
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const partners = ["Acme", "NovaLabs", "Cloudly", "PaySync", "DocuPro", "MailJet"];

export default function Partners() {
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); };
  return (
    <MarketingPageLayout title="Partners" description="Our partners and collaborators." canonical="/partners">
      <section>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {partners.map((p) => (
            <Card key={p} className="min-w-[180px] p-4 snap-start text-center">
              <div className="text-lg font-semibold">{p}</div>
              <p className="text-xs text-muted-foreground">Official partner</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="mt-8 grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold">Become a partner</h3>
          <form onSubmit={onSubmit} className="mt-3 space-y-3">
            <Input placeholder="Company name" required />
            <Input type="email" placeholder="Work email" required />
            <Input type="url" placeholder="Website" />
            <div>
              <label className="text-sm font-medium">Logo</label>
              <Input type="file" accept="image/*" />
            </div>
            <Textarea placeholder="Tell us about your solution and audience" rows={4} />
            <Button type="submit" className="w-full">Send application</Button>
          </form>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold">Program benefits</h3>
          <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5 space-y-2">
            <li>Revenue share</li>
            <li>Co‑marketing and events</li>
            <li>Sandbox environment</li>
          </ul>
        </Card>
      </section>
    </MarketingPageLayout>
  );
}
