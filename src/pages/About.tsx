
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import t1 from "@/assets/entrepreneurs/entrepreneur-04.jpg";
import t2 from "@/assets/entrepreneurs/entrepreneur-05.jpg";
import t3 from "@/assets/entrepreneurs/entrepreneur-06.jpg";
import t4 from "@/assets/entrepreneurs/entrepreneur-07.jpg";
import t5 from "@/assets/entrepreneurs/entrepreneur-08.jpg";
import t6 from "@/assets/entrepreneurs/entrepreneur-09.jpg";

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
        <h3 className="font-semibold">Company history</h3>
        <ul className="mt-3 text-sm text-muted-foreground space-y-2">
          <li><span className="text-foreground font-medium">2022</span> — FeatherBiz founded, first prototype launched.</li>
          <li><span className="text-foreground font-medium">2023</span> — Public beta, payments and documents released.</li>
          <li><span className="text-foreground font-medium">2024</span> — SOC 2 journey started, analytics module shipped.</li>
        </ul>
      </section>
      <section className="mt-8">
        <h3 className="font-semibold">Leadership</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          <Card className="p-4 flex items-center gap-4"><img src={t1} alt="Wilson Junior - Founder and CEO" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Wilson Junior</p><p className="text-sm text-muted-foreground">Founder & CEO</p></div></Card>
          <Card className="p-4 flex items-center gap-4"><img src={t2} alt="Laura Monteiro - CTO" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Laura Monteiro</p><p className="text-sm text-muted-foreground">CTO</p></div></Card>
          <Card className="p-4 flex items-center gap-4"><img src={t3} alt="Rebekah Muller - Head of Marketing" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Rebekah Muller</p><p className="text-sm text-muted-foreground">Head of Marketing</p></div></Card>
          <Card className="p-4 flex items-center gap-4"><img src={t4} alt="Ethan Clarke - CFO" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Ethan Clarke</p><p className="text-sm text-muted-foreground">CFO</p></div></Card>
          <Card className="p-4 flex items-center gap-4"><img src={t5} alt="Sofia Andersson - CPO" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Sofia Andersson</p><p className="text-sm text-muted-foreground">CPO</p></div></Card>
          <Card className="p-4 flex items-center gap-4"><img src={t6} alt="Marco Rossi - COO" className="w-16 h-16 rounded-full object-cover" /><div><p className="font-medium">Marco Rossi</p><p className="text-sm text-muted-foreground">COO</p></div></Card>
        </div>
      </section>
    </MarketingPageLayout>
  );
}
