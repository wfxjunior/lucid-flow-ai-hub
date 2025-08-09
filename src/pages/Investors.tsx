 
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { BarChart3, TrendingUp, Users, Target, Rocket, Shield, FileText, Download, Quote, PieChart as PieChartIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const fundsData = [
  { name: "Product", value: 40 },
  { name: "Marketing", value: 25 },
  { name: "Hiring", value: 20 },
  { name: "Infrastructure", value: 15 },
];

const fundsColors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted-foreground))",
];

export default function Investors() {
  const { toast } = useToast();
  console.log('[Investors] page render');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    try {
      const res = await fetch("https://tvdromfazjzargvesruq.functions.supabase.co/send-investor-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "investor", data: payload }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Request received", description: "We'll email you the investor kit shortly." });
      e.currentTarget.reset();
    } catch (err: any) {
      toast({ title: "Could not send", description: err.message || "Please try again later.", variant: "destructive" as any });
    }
  };
  return (
    <MarketingPageLayout
      title="Invest in the Future of Business Tech"
      description="FeatherBiz empowers modern SMBs with an AI‑native operating system. Learn why we're poised for outsized growth."
      canonical="/investors"
    >
      {/* Hero */}
      <section>
        <Card className="p-6 md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Invest in the Future of Business Tech</h2>
            <p className="text-muted-foreground mt-3">
              FeatherBiz is building the AI‑native platform powering documents, payments, and analytics for tech‑savvy SMBs. A vast, growing market with accelerating adoption.
            </p>
            <div className="mt-5">
              <Button asChild size="lg">
                <a href="#investor-form" className="story-link">Request the Investor Kit</a>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Market Opportunity */}
      <section className="mt-8">
        <div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /><h3 className="font-semibold">Market Opportunity</h3></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          <Card className="p-5 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-3"><TrendingUp className="h-5 w-5 text-primary" /><p className="font-medium">$18B+ TAM</p></div>
            <p className="text-sm text-muted-foreground mt-1">Expanding market across SaaS tools for SMB operations.</p>
          </Card>
          <Card className="p-5 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-3"><Users className="h-5 w-5 text-primary" /><p className="font-medium">+32% YoY adoption</p></div>
            <p className="text-sm text-muted-foreground mt-1">Rapid shift to AI‑assisted workflows in SMBs.</p>
          </Card>
          <Card className="p-5 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-3"><Target className="h-5 w-5 text-primary" /><p className="font-medium">High‑intent segments</p></div>
            <p className="text-sm text-muted-foreground mt-1">Consultancies, product studios, and agencies moving fast.</p>
          </Card>
        </div>
      </section>

      {/* Business Highlights */}
      <section className="mt-8">
        <div className="flex items-center gap-2"><Rocket className="h-5 w-5 text-primary" /><h3 className="font-semibold">Business Highlights</h3></div>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <Card className="p-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">ARR</p>
                <p className="text-foreground font-semibold">$1.2M</p>
              </div>
              <div>
                <p className="text-muted-foreground">User growth</p>
                <p className="text-foreground font-semibold">+14% MoM</p>
              </div>
              <div>
                <p className="text-muted-foreground">Net retention</p>
                <p className="text-foreground font-semibold">118%</p>
              </div>
              <div>
                <p className="text-muted-foreground">LTV:CAC</p>
                <p className="text-foreground font-semibold">4.3x</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div>
              <p className="font-medium">Milestones</p>
              <ol className="mt-3 space-y-3 text-sm border-l border-border/50 pl-4">
                <li>
                  <p className="text-foreground"><span className="font-mono">2023 Q2</span> — Public beta launch</p>
                </li>
                <li>
                  <p className="text-foreground"><span className="font-mono">2024 Q1</span> — Payments + analytics shipped</p>
                </li>
                <li>
                  <p className="text-foreground"><span className="font-mono">2024 Q4</span> — 1k+ paying workspaces</p>
                </li>
              </ol>
            </div>
          </Card>
        </div>
      </section>

      {/* Use of Funds & Strategy */}
      <section className="mt-8">
        <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><h3 className="font-semibold">Use of Funds & Strategy</h3></div>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-2"><PieChartIcon className="h-5 w-5 text-primary" /><p className="font-medium">Allocation</p></div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fundsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {fundsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={fundsColors[index % fundsColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-5">
            <p className="font-medium">18–24 month plan</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              <li>Deepen AI features across documents, payments, and insights.</li>
              <li>Scale self‑serve growth with content and PLG funnels.</li>
              <li>Selective enterprise motion via integrations and audits.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Investor Deck & Reports */}
      <section className="mt-8">
        <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /><h3 className="font-semibold">Investor Deck & Reports</h3></div>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <Card className="p-5">
            <p className="font-medium">Downloads</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button asChild variant="secondary"><a href="/investor-kit.pdf" download><Download className="h-4 w-4 mr-2" />Deck (PDF)</a></Button>
              <Button asChild variant="outline"><a href="/investor-onepager.pdf" download><Download className="h-4 w-4 mr-2" />One‑pager</a></Button>
            </div>
          </Card>
          <Card className="p-5">
            <p className="font-medium">Reports</p>
            <Accordion type="single" collapsible className="mt-2">
              <AccordionItem value="r1">
                <AccordionTrigger>Annual 2024 Report</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Highlights: strong retention, expansion revenue, new verticals.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="r2">
                <AccordionTrigger>Q2 2025 Update</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Momentum across product velocity and top‑of‑funnel growth.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

      {/* Investor Questionnaire / Form */}
      <section id="investor-form" className="mt-8">
        <div className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /><h3 className="font-semibold">Investor Questionnaire</h3></div>
        <Card className="p-5 mt-3">
          <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Full Name" required aria-label="Full Name" />
            <Input placeholder="Email" type="email" required aria-label="Email" />
            <div>
              <label className="text-sm font-medium">Investment Type</label>
              <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" aria-label="Investment Type" required>
                <option value="">Select…</option>
                <option>Angel</option>
                <option>VC</option>
                <option>Corporate</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Investment Range</label>
              <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" aria-label="Investment Range" required>
                <option value="">Select…</option>
                <option>$10k–100k</option>
                <option>$100k–500k</option>
                <option>$500k+</option>
              </select>
            </div>
            <Input placeholder="Industry Focus" aria-label="Industry Focus" />
            <Input placeholder="Region" aria-label="Region" />
            <Input placeholder="Company / Fund (optional)" aria-label="Company or Fund" />
            <div className="md:col-span-2">
              <Textarea placeholder="Experience or portfolio" rows={4} aria-label="Experience or Portfolio" />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input id="consent" type="checkbox" className="h-4 w-4" required />
              <label htmlFor="consent" className="text-sm text-muted-foreground">I consent to receive investor updates and documents.</label>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">Get Investor Kit</Button>
            </div>
          </form>
        </Card>
      </section>

      {/* Testimonials / Backer Quotes */}
      <section className="mt-8">
        <div className="flex items-center gap-2"><Quote className="h-5 w-5 text-primary" /><h3 className="font-semibold">What backers say</h3></div>
        <div className="grid md:grid-cols-3 gap-6 mt-3">
          {[
            { quote: "FeatherBiz has nailed the product‑led motion for SMBs.", name: "A. Kumar", role: "Angel investor" },
            { quote: "Clear ROI and retention — the fundamentals are strong.", name: "L. Santos", role: "Seed fund partner" },
            { quote: "A sharp team with relentless execution.", name: "M. Chen", role: "Operator‑angel" },
          ].map((q) => (
            <Card key={q.name} className="p-5 hover:shadow-lg transition-all">
              <p className="text-sm text-foreground">“{q.quote}”</p>
              <p className="text-xs text-muted-foreground mt-2">{q.name} • {q.role}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer referral handled by global footer */}
    </MarketingPageLayout>
  );
}
