import React, { useEffect, useMemo, useState } from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Zap, Shield, Users, TrendingUp, Lock, Rocket, BarChart3, Clock, CheckCircle } from "lucide-react";
import { IntelligentNetworkGraph } from "@/components/landing/IntelligentNetworkGraph";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

      toast.success(data.message || "You're on the list. A confirmation was sent to your email.");
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

  return (
    <MarketingPageLayout
      title="FeatherBiz Scale"
      description="Join the FeatherBiz Scale waitlist: exclusive benefits, priority support, and advanced features."
      canonical="/scale"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero + Countdown */}
      <section className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-background to-muted/30 p-6 sm:p-10">
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
      </section>

      {/* Why Scale */}
      <section className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Built for growing businesses that demand more
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            FeatherBiz Scale is designed for companies ready to move beyond basic tools. 
            Get enterprise-grade features with the simplicity you love.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: TrendingUp,
              title: "Advanced Analytics",
              desc: "Deep insights into your business performance with custom dashboards, predictive analytics, and automated reporting that scales with your data.",
              highlight: "10x more detailed insights"
            },
            {
              icon: Users,
              title: "Team Collaboration",
              desc: "Advanced team management with role-based permissions, collaborative workspaces, and real-time sync across all your business processes.",
              highlight: "Unlimited team members"
            },
            {
              icon: Rocket,
              title: "Automation Engine",
              desc: "Powerful workflow automation that connects all your tools. Build complex business logic without code using our visual automation builder.",
              highlight: "Save 15+ hours per week"
            },
            {
              icon: Lock,
              title: "Enterprise Security",
              desc: "SOC 2 Type II compliance, advanced encryption, audit logs, and enterprise-grade security features to protect your growing business.",
              highlight: "Bank-level security"
            },
            {
              icon: BarChart3,
              title: "Custom Integrations",
              desc: "Connect with 500+ apps and services. Build custom integrations using our API or let our team create bespoke solutions for your workflow.",
              highlight: "Unlimited integrations"
            },
            {
              icon: Clock,
              title: "24/7 Priority Support",
              desc: "Dedicated customer success manager, priority email and chat support, and guaranteed response times to keep your business running.",
              highlight: "< 2 hour response time"
            }
          ].map((feature) => (
            <article key={feature.title} className="relative rounded-xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{feature.desc}</p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {feature.highlight}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Scale vs Standard: Built for different needs
          </h2>
          <p className="text-muted-foreground">
            See how FeatherBiz Scale compares to our standard plan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border/40 bg-card p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">FeatherBiz Standard</h3>
              <p className="text-sm text-muted-foreground mt-1">Perfect for small teams</p>
            </div>
            <ul className="space-y-3">
              {[
                "Up to 5 team members",
                "Basic analytics & reporting",
                "Standard integrations",
                "Email support",
                "Core automation features",
                "Standard security"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-primary/30 bg-gradient-to-b from-primary/5 to-primary/10 p-6 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                Recommended
              </span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">FeatherBiz Scale</h3>
              <p className="text-sm text-muted-foreground mt-1">Built for growing businesses</p>
            </div>
            <ul className="space-y-3">
              {[
                "Unlimited team members",
                "Advanced analytics & AI insights",
                "Custom integrations + API access",
                "24/7 priority support + dedicated CSM",
                "Advanced automation engine",
                "Enterprise-grade security + compliance"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Trusted by fast-growing companies
          </h2>
          <p className="text-muted-foreground">
            Join hundreds of businesses already scaling with FeatherBiz
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "FeatherBiz Scale transformed how we manage our operations. The automation features alone save us 20+ hours per week.",
              author: "Sarah Chen",
              title: "Operations Director",
              company: "TechFlow Solutions"
            },
            {
              quote: "The advanced analytics give us insights we never had before. We've increased efficiency by 40% since switching to Scale.",
              author: "Marcus Rodriguez",
              title: "Founder & CEO",
              company: "GrowthLabs"
            },
            {
              quote: "Finally, a business platform that grows with us. The priority support team feels like an extension of our own team.",
              author: "Emily Watson",
              title: "Head of Operations",
              company: "Innovate Co"
            }
          ].map((testimonial, index) => (
            <div key={index} className="rounded-lg border border-border/40 bg-card p-6">
              <p className="text-sm text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                <p className="text-xs text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Impact Chart */}
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            See the Impact: Before vs After FeatherBiz Scale
          </h2>
          <p className="text-muted-foreground">
            Real results from companies using FeatherBiz Scale
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-gradient-to-br from-card to-muted/30 p-4 md:p-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Chart Visualization */}
            <div className="relative order-2 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                {[
                  { 
                    metric: "Time Saved Weekly", 
                    before: 20, 
                    after: 85, 
                    unit: "hours",
                    color: "bg-primary",
                    beforeLabel: "Manual work",
                    afterLabel: "With automation"
                  },
                  { 
                    metric: "Team Productivity", 
                    before: 35, 
                    after: 78, 
                    unit: "%",
                    color: "bg-blue-500",
                    beforeLabel: "Standard tools",
                    afterLabel: "Scale features"
                  },
                  { 
                    metric: "Customer Response Time", 
                    before: 80, 
                    after: 25, 
                    unit: "min",
                    color: "bg-green-500",
                    beforeLabel: "Before Scale",
                    afterLabel: "Priority support"
                  },
                  { 
                    metric: "Revenue Growth", 
                    before: 15, 
                    after: 65, 
                    unit: "%",
                    color: "bg-purple-500",
                    beforeLabel: "Last year",
                    afterLabel: "With Scale"
                  }
                ].map((item, index) => (
                  <div key={item.metric} className={`animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                      <span className="text-sm font-medium text-foreground">{item.metric}</span>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>{item.beforeLabel}</span>
                        <span>{item.afterLabel}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* Before */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Before</span>
                          <span className="text-sm font-medium text-foreground">{item.before}{item.unit}</span>
                        </div>
                        <div className="h-5 md:h-6 bg-muted rounded-md overflow-hidden">
                          <div 
                            className={`h-full bg-muted-foreground/40 transition-all duration-1000 ease-out`}
                            style={{ 
                              width: `${item.metric === "Customer Response Time" ? (100 - item.before) + "%" : item.before + "%"}`,
                              animationDelay: `${index * 0.3}s`
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* After */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">After</span>
                          <span className="text-sm font-medium text-foreground">{item.after}{item.unit}</span>
                        </div>
                        <div className="h-5 md:h-6 bg-muted rounded-md overflow-hidden">
                          <div 
                            className={`h-full ${item.color} transition-all duration-1000 ease-out animate-scale-in`}
                            style={{ 
                              width: `${item.metric === "Customer Response Time" ? (100 - item.after) + "%" : item.after + "%"}`,
                              animationDelay: `${index * 0.3 + 0.5}s`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Improvement indicator */}
                    <div className="flex justify-end mt-1">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                        {item.metric === "Customer Response Time" 
                          ? `${Math.round(((item.before - item.after) / item.before) * 100)}% faster`
                          : `+${item.after - item.before}${item.unit} improvement`
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Join 500+ companies already seeing results
                </h3>
                <p className="text-muted-foreground mb-6">
                  Don't let manual processes hold your business back. FeatherBiz Scale delivers measurable improvements from day one.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                {[
                  {
                    icon: Clock,
                    title: "Save 15+ hours weekly",
                    desc: "Automated workflows handle repetitive tasks"
                  },
                  {
                    icon: TrendingUp,
                    title: "Boost team productivity by 40%",
                    desc: "Advanced collaboration tools and insights"
                  },
                  {
                    icon: Zap,
                    title: "Respond 3x faster",
                    desc: "Priority support and streamlined processes"
                  },
                  {
                    icon: BarChart3,
                    title: "Accelerate revenue growth",
                    desc: "Data-driven decisions with real-time analytics"
                  }
                ].map((benefit, index) => (
                  <div 
                    key={benefit.title} 
                    className={`flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1 + 1}s` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => {
                    const el = document.querySelector('form');
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  size="lg"
                  className="w-full group font-medium"
                >
                  Get Early Access Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Network Visualization */}
      <section className="mt-12">
        <IntelligentNetworkGraph />
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="flex flex-col items-center gap-4 text-center rounded-lg border border-border/40 p-8 bg-gradient-to-b from-background to-muted/20">
          <h2 className="text-xl font-semibold text-foreground">Secure your spot in FeatherBiz Scale</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Limited early access slots. Join now to get priority when we open the first accounts.
          </p>
          <Button onClick={() => {
            const el = document.querySelector('form');
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }} size="lg" className="group font-medium">
            Join the waitlist
          </Button>
        </div>
      </section>
    </MarketingPageLayout>
  );
}
