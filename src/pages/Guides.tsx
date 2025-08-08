
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import g1 from "@/assets/entrepreneurs/entrepreneur-01.jpg";
import g2 from "@/assets/entrepreneurs/entrepreneur-02.jpg";
import g3 from "@/assets/entrepreneurs/entrepreneur-03.jpg";

const guides = [
  { img: g1, title: "Create your first invoice", time: "5 min" },
  { img: g2, title: "Send a contract for e‑signature", time: "7 min" },
  { img: g3, title: "Track payments and send receipts", time: "6 min" },
];

export default function Guides() {
  return (
    <MarketingPageLayout title="Guides" description="Tutorials and user guides." canonical="/guides">
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((g) => (
            <Card key={g.title} className="overflow-hidden hover:shadow-lg transition-all">
              <article>
                <img src={g.img} alt={`${g.title} tutorial`} className="w-full h-40 object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-semibold">{g.title}</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step with screenshots. {g.time} read.</p>
                </div>
              </article>
            </Card>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
}
