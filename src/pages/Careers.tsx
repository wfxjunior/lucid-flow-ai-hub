
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { CareersPage } from "@/components/CareersPage";

export default function Careers() {
  return (
    <MarketingPageLayout title="Careers" description="Join our team and build the future." canonical="/careers">
      <CareersPage />
    </MarketingPageLayout>
  );
}
