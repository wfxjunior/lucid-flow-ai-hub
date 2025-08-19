import React, { useEffect, useMemo, useState } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Zap, Shield, Users, TrendingUp, Lock, Rocket, BarChart3, Clock, CheckCircle } from "lucide-react";
import { IntelligentNetworkGraph } from "@/components/landing/IntelligentNetworkGraph";
import { FeatherBizShowcase } from "@/components/landing/FeatherBizShowcase";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { FeatherBot } from "@/components/FeatherBot";

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const total = Math.max(target.getTime() - now.getTime(), 0);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
}

export default function ScalePage() {
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    d.setHours(16, 0, 0, 0);
    return d;
  }, []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('waitlist-join', {
        body: {
          email,
          name: name || null,
          page_url: window.location.href
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Failed to join waitlist');

      toast.success(data.message || "Welcome to FeatherBiz Scale! You're now on our exclusive waitlist. Check your email for confirmation and be the first to know when we launch!");
      setEmail("");
      setName("");
    } catch (e: any) {
      console.error('Error joining waitlist:', e);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FeatherBiz Scale",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "USD",
      description: "FeatherBiz Scale waitlist"
    }
  };

  useEffect(() => {
    document.title = "FeatherBiz Scale | FeatherBiz";
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <SEO
        title="FeatherBiz Scale — Premium business management platform"
        description="Join the FeatherBiz Scale waitlist: exclusive benefits, priority support, and advanced features for growing businesses."
        canonicalPath="/scale"
        ogImage="/og/scale-og.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <LandingHeader />
      <main className="flex-1">
        {/* Hero + Countdown */}
        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-background to-muted/30 p-6 sm:p-10">
              {/* Subtle background glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 40% at 50% 0%, hsl(var(--primary) / 0.08), transparent 60%)",
                }}
              />

              <div className="flex flex-col items-center text-center gap-6">
                <button
                  type="button"
                  className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm border border-border hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transform-gpu transition-all duration-500 overflow-hidden"
                  aria-label="FeatherBiz Scale — Early access"
                  onClick={(e) => { e.preventDefault(); const form = document.querySelector('form'); form?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                >
                  {/* Gradient background effect contained within button - slower animation */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 opacity-60 transition-all duration-1000 ease-in-out hover:opacity-80"
                    aria-hidden="true"
                  />
                  {/* Content with proper z-index */}
                  <span className="relative z-10 font-medium text-foreground">FeatherBiz Scale — Early access</span>
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground">FeatherBiz Scale</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Premium features, superior performance, and priority support to accelerate your growth.
                </p>

                {/* Waitlist form */}
                <form onSubmit={onJoinWaitlist} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    aria-label="Your email"
                    required
                  />
                  <Button type="submit" variant="default" size="lg" disabled={loading} className="w-full sm:w-auto group font-medium">
                    {loading ? "Sending…" : "Join the waitlist"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FeatherBiz Showcase */}
        <FeatherBizShowcase />

        {/* Enhanced Network Visualization */}
        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Advanced Business Intelligence Network
              </h2>
              <p className="text-muted-foreground">
                See how FeatherBiz Scale connects all aspects of your business
              </p>
            </div>
            <IntelligentNetworkGraph />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center">
              <div className="rounded-xl border border-border/40 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Scale Your Business?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join the FeatherBiz Scale waitlist and be among the first to experience the next evolution of business management.
                </p>
                <form onSubmit={onJoinWaitlist} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    aria-label="Your email"
                    required
                  />
                  <Button type="submit" variant="default" size="lg" disabled={loading} className="w-full sm:w-auto group font-medium">
                    {loading ? "Sending…" : "Join Waitlist"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <LandingFooter />
      <CookieConsent />
      <FeatherBot isVisible={true} theme="gray" />
    </div>
  );
}