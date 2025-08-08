
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useEmblaCarousel from "embla-carousel-react";

const partners = ["Acme", "NovaLabs", "Cloudly", "PaySync", "DocuPro", "MailJet"];

export default function Partners() {
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); };
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });
  return (
    <MarketingPageLayout title="Partners" description="Our partners and collaborators." canonical="/partners">
      <section>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 pb-2">
            {partners.map((p) => (
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
