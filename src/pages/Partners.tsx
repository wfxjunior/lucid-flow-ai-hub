
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { Handshake, Megaphone, Puzzle, Trophy, Quote, Users, Globe, Building2, Rocket } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export default function Partners() {
  const { toast } = useToast();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    try {
      const res = await fetch("https://tvdromfazjzargvesruq.functions.supabase.co/send-investor-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "partner", data: payload }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Application sent", description: "We will reach out via email shortly." });
      e.currentTarget.reset();
    } catch (err: any) {
      toast({ title: "Could not send", description: err.message || "Please try again later.", variant: "destructive" as any });
    }
  };

  const logos = ["Acme","NovaLabs","Cloudly","PaySync","DocuPro","MailJet","DataForge","SyncBase"];

  return (
    <MarketingPageLayout title="Partners" description="Programs and opportunities to partner with FeatherBiz." canonical="/partners">
      {/* Hero */}
      <section>
        <Card className="p-6 md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Grow with FeatherBiz</h2>
            <p className="text-muted-foreground mt-3">Become an official partner and co‑build the AI‑native future for SMBs: integrations, solution delivery, and co‑marketing.</p>
            <div className="mt-5">
              <Button asChild size="lg"><a href="#partner-form" className="story-link">Become a partner</a></Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Benefits */}
      <section className="mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-5 hover:shadow-lg transition-all"><div className="flex items-center gap-3"><Handshake className="h-5 w-5 text-primary"/><p className="font-medium">Revenue share</p></div><p className="text-sm text-muted-foreground mt-2">Earn recurring revenue with shared success.</p></Card>
          <Card className="p-5 hover:shadow-lg transition-all"><div className="flex items-center gap-3"><Megaphone className="h-5 w-5 text-primary"/><p className="font-medium">Co‑marketing</p></div><p className="text-sm text-muted-foreground mt-2">Launch webinars, case studies, and events together.</p></Card>
          <Card className="p-5 hover:shadow-lg transition-all"><div className="flex items-center gap-3"><Puzzle className="h-5 w-5 text-primary"/><p className="font-medium">Deep integrations</p></div><p className="text-sm text-muted-foreground mt-2">Build and showcase high‑quality product integrations.</p></Card>
        </div>
      </section>

      {/* Logos carousel */}
      <section className="mt-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {logos.map((p) => (
              <div key={p} className="flex-[0_0_70%] sm:flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_18%]">
                <Card className="p-4 text-center hover:shadow-lg transition-all hover-scale">
                  <img src="/placeholder.svg" alt={`${p} logo`} className="mx-auto h-10 w-auto object-contain" loading="lazy" />
                  <div className="text-sm font-semibold mt-2">{p}</div>
                  <p className="text-xs text-muted-foreground">Official partner</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program details */}
      <section className="mt-8 grid lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <p className="font-medium">Program tracks</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm">
            <div className="border border-border/50 rounded-md p-4"><div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary"/><span className="font-semibold text-foreground">Solution partners</span></div><p className="text-muted-foreground mt-1">Agencies and consultancies implementing FeatherBiz.</p></div>
            <div className="border border-border/50 rounded-md p-4"><div className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary"/><span className="font-semibold text-foreground">Technology partners</span></div><p className="text-muted-foreground mt-1">SaaS platforms integrating with our APIs.</p></div>
            <div className="border border-border/50 rounded-md p-4"><div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary"/><span className="font-semibold text-foreground">Resellers</span></div><p className="text-muted-foreground mt-1">Regional resellers with local expertise.</p></div>
            <div className="border border-border/50 rounded-md p-4"><div className="flex items-center gap-2"><Rocket className="h-4 w-4 text-primary"/><span className="font-semibold text-foreground">Startups</span></div><p className="text-muted-foreground mt-1">Early‑stage tools building on our ecosystem.</p></div>
          </div>
        </Card>
        <Card className="p-5">
          <p className="font-medium">Perks</p>
          <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5 space-y-2">
            <li>Sandbox and demo environments</li>
            <li>Joint roadmapping and early access</li>
            <li>Co‑selling opportunities</li>
          </ul>
        </Card>
      </section>

      {/* Testimonials */}
      <section className="mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[{q:"A seamless integration and a responsive team.",n:"K. Nunes",r:"CTO, NovaLabs"},{q:"The partner program drives real pipeline.",n:"P. Duarte",r:"Founder, Cloudly"},{q:"Marketing support was top‑notch.",n:"R. Gomez",r:"CEO, PaySync"}].map((t)=>(
            <Card key={t.n} className="p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2"><Quote className="h-4 w-4 text-primary"/><p className="font-medium">Partner quote</p></div>
              <p className="text-sm text-foreground mt-2">“{t.q}”</p>
              <p className="text-xs text-muted-foreground mt-2">{t.n} • {t.r}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ + Form */}
      <section id="partner-form" className="mt-8 grid lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <p className="font-medium">Become a partner</p>
          <form onSubmit={onSubmit} className="mt-3 grid md:grid-cols-2 gap-3">
            <Input name="company" placeholder="Company name" required />
            <Input name="email" type="email" placeholder="Work email" required />
            <Input name="website" type="url" placeholder="Website" />
            <Input name="region" placeholder="Region" />
            <Input name="focus" placeholder="Industry focus" />
            <div className="md:col-span-2">
              <Textarea name="notes" placeholder="Tell us about your solution and audience" rows={4} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground"><input required type="checkbox" className="mr-2"/>I agree to be contacted about partnership opportunities.</label>
            </div>
            <div className="md:col-span-2"><Button type="submit" className="w-full">Send application</Button></div>
          </form>
        </Card>
        <Card className="p-5">
          <p className="font-medium">FAQs</p>
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="p1"><AccordionTrigger>Is there a fee to join?</AccordionTrigger><AccordionContent>No. Revenue share applies when deals close.</AccordionContent></AccordionItem>
            <AccordionItem value="p2"><AccordionTrigger>How long does approval take?</AccordionTrigger><AccordionContent>Typically 1–2 weeks after review.</AccordionContent></AccordionItem>
          </Accordion>
        </Card>
      </section>
    </MarketingPageLayout>
  );
}
