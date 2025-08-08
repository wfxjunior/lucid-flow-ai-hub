
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, CalendarDays } from "lucide-react";

export default function Community() {
  return (
    <MarketingPageLayout title="Community" description="Join our user community." canonical="/community">
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-5">
          <div className="flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary"/><h3 className="font-semibold">Forum</h3></div>
          <p className="text-sm text-muted-foreground mt-2">Ask questions and share tips.</p>
          <Button asChild className="mt-4"><a href="#">Go to forum</a></Button>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2"><Users className="h-5 w-5 text-primary"/><h3 className="font-semibold">Discord</h3></div>
          <p className="text-sm text-muted-foreground mt-2">Chat with the team and other users.</p>
          <Button asChild className="mt-4"><a href="#">Join Discord</a></Button>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary"/><h3 className="font-semibold">Events</h3></div>
          <p className="text-sm text-muted-foreground mt-2">Webinars, office hours, and meetups.</p>
          <Button asChild className="mt-4"><a href="#">See events</a></Button>
        </Card>
      </section>
    </MarketingPageLayout>
  );
}
