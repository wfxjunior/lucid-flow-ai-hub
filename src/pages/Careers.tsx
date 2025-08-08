
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Careers() {
  const onApply = (e: React.FormEvent) => { e.preventDefault(); };
  return (
    <MarketingPageLayout title="Careers" description="Join our team and build the future." canonical="/careers">
      <section className="grid lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <h3 className="font-semibold">Culture & Benefits</h3>
          <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-2">
            <li>Remote‑first, async‑friendly</li>
            <li>Premium health coverage</li>
            <li>Learning budget & hardware stipend</li>
          </ul>
          <div className="mt-6">
            <h4 className="font-medium">Open positions</h4>
            <ul className="text-sm mt-2 space-y-2">
              <li>Senior Frontend Engineer</li>
              <li>Product Designer</li>
              <li>Developer Advocate</li>
            </ul>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold">Apply now</h3>
          <form onSubmit={onApply} className="mt-3 space-y-3">
            <Input placeholder="Full name" required />
            <Input type="email" placeholder="Email" required />
            <Input type="url" placeholder="LinkedIn or website" />
            <Textarea placeholder="Tell us why you're a great fit" rows={4} />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Card>
      </section>
    </MarketingPageLayout>
  );
}
