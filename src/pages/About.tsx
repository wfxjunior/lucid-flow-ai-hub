
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
export default function About() {
  return (
    <MarketingPageLayout title="About" description="Learn more about FeatherBiz." canonical="/about">
      <p className="text-muted-foreground">Learn more about FeatherBiz.</p>
    </MarketingPageLayout>
  );
}
