
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Press() {
  return (
    <MarketingPageLayout title="Press" description="Press information and resources." canonical="/press">
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[1,2,3].map((i) => (
            <Card key={i} className="p-5">
              <article>
                <h3 className="font-semibold">Press release {i}</h3>
                <p className="text-sm text-muted-foreground mt-2">Short summary of the announcement with links and quotes.</p>
              </article>
            </Card>
          ))}
        </div>
        <aside className="space-y-4">
          <Card className="p-5"><h4 className="font-semibold">Media kit</h4><p className="text-sm text-muted-foreground mt-2">Logos, screenshots and brand guidelines.</p><Button asChild className="mt-3"><a href="#" download>Download</a></Button></Card>
          <Card className="p-5"><h4 className="font-semibold">Media mentions</h4><ul className="mt-2 text-sm list-disc pl-5 text-muted-foreground space-y-1"><li>TechDaily</li><li>Startup Weekly</li><li>Fintech Journal</li></ul></Card>
        </aside>
      </section>
    </MarketingPageLayout>
  );
}
