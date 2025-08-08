
import React from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function HelpCenter() {
  const { toast } = useToast();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Ticket submitted", description: "We'll get back to you shortly." });
  };
  return (
    <MarketingPageLayout title="Help Center" description="How can we assist you?" canonical="/help-center">
      <section>
        <div className="flex gap-2">
          <Input placeholder="Search help articles..." aria-label="Search" />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Submit a Ticket</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit a support ticket</DialogTitle>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-3">
                <Input placeholder="Your email" type="email" required />
                <Input placeholder="Subject" required />
                <Textarea placeholder="Describe your issue" rows={5} required />
                <Button type="submit" className="w-full">Send</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold">Getting Started</h3>
            <Accordion type="single" collapsible className="mt-2">
              <AccordionItem value="gs-1"><AccordionTrigger>How do I create my first invoice?</AccordionTrigger><AccordionContent>Go to Documents → Invoice, fill line items and click Send.</AccordionContent></AccordionItem>
              <AccordionItem value="gs-2"><AccordionTrigger>How do I invite my team?</AccordionTrigger><AccordionContent>Open Settings → Team, add members and set roles.</AccordionContent></AccordionItem>
            </Accordion>
          </div>
          <div>
            <h3 className="font-semibold">Billing</h3>
            <Accordion type="single" collapsible className="mt-2">
              <AccordionItem value="b-1"><AccordionTrigger>Which payment methods are supported?</AccordionTrigger><AccordionContent>All major cards and local wallets via Stripe.</AccordionContent></AccordionItem>
              <AccordionItem value="b-2"><AccordionTrigger>How do I change my plan?</AccordionTrigger><AccordionContent>Go to Billing → Manage plan to upgrade or downgrade.</AccordionContent></AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
}
