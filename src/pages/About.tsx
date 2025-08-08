
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import t1 from "@/assets/entrepreneurs/entrepreneur-04.jpg";
import t2 from "@/assets/entrepreneurs/entrepreneur-05.jpg";

export default function About() {
  return (
    <MarketingPageLayout title="About" description="Learn more about FeatherBiz." canonical="/about">
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-5 md:col-span-2">
          <h3 className="font-semibold">Mission & Vision</h3>
          <p className="text-sm text-muted-foreground mt-2">We empower entrepreneurs with an AI‑native platform to run their business end‑to‑end, securely and beautifully.</p>
          <p className="text-sm text-muted-foreground mt-2">Our vision is a world where small teams operate with enterprise superpowers.</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold">Values</h3>
          <ul className="text-sm text-muted-foreground mt-2 space-y-2 list-disc pl-5">
            <li>Customer obsession</li>
            <li>Security by design</li>
            <li>Simple is better</li>
          </ul>
        </Card>
      </section>
      <section className="mt-8">
        <h3 className="font-semibold">Founding team</h3>
        <div className="grid sm:grid-cols-2 gap-6 mt-3">
          <Card className="p-4 flex items-center gap-4"><img src={t1} alt="Founder 1" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Alex Rivera</p><p className="text-sm text-muted-foreground">Founder & CEO</p></div></Card>
          <Card className="p-4 flex items-center gap-4"><img src={t2} alt="Founder 2" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Jamie Chen</p><p className="text-sm text-muted-foreground">Co‑founder & CTO</p></div></Card>
        </div>
      </section>
    </MarketingPageLayout>
  );
}
