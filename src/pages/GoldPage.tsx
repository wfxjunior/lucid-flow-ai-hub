import React, { useEffect, useMemo, useState } from "react";
import { MarketingPageLayout } from "@/components/landing/MarketingPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Zap, Shield } from "lucide-react";
import { AttioFeatureGraphic } from "@/components/landing/AttioFeatureGraphic";
import { toast } from "sonner";

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

export default function GoldPage() {
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
    if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      toast.error("Insira um e-mail válido.");
      return;
    }
    setLoading(true);
    try {
      // For now, client-only. We can save to Supabase after your approval.
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Você entrou na lista de espera do FeatherBiz Gold!");
      setEmail("");
      setName("");
    } catch (e) {
      toast.error("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FeatherBiz Gold",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "USD",
      description: "Lista de espera do FeatherBiz Gold"
    }
  };

  return (
    <MarketingPageLayout
      title="FeatherBiz Gold"
      description="Entre na lista de espera do FeatherBiz Gold: benefícios exclusivos, suporte prioritário e recursos avançados."
      canonical="/gold"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero + Countdown */}
      <section className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-background to-muted/30 p-6 sm:p-10">
        {/* Subtle gold glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(60% 40% at 50% 0%, hsl(var(--gold) / 0.08), transparent 60%)",
          }}
        />

        <div className="flex flex-col items-center text-center gap-6">
          <span className="gold-chip inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            FeatherBiz Gold — Acesso antecipado
          </span>

          <p className="text-lg text-muted-foreground max-w-2xl">
            Recursos premium, performance superior e suporte prioritário para acelerar o crescimento do seu negócio.
          </p>

          {/* Countdown */}
          <div className="grid grid-flow-col gap-4 text-center auto-cols-max">
            {[{label:'dias', value: days},{label:'horas', value: hours},{label:'min', value: minutes},{label:'seg', value: seconds}].map((t) => (
              <div key={t.label} className="flex flex-col items-center rounded-md border border-border/50 bg-muted/30 px-4 py-3 min-w-[72px]">
                <span className="text-2xl font-semibold tabular-nums text-foreground">{String(t.value).padStart(2, '0')}</span>
                <span className="text-xs text-muted-foreground">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Waitlist form */}
          <form onSubmit={onJoinWaitlist} className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              type="text"
              placeholder="Seu nome (opcional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="sm:col-span-1"
              aria-label="Seu nome"
            />
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sm:col-span-1"
              aria-label="Seu e-mail"
              required
            />
            <Button type="submit" disabled={loading} className="sm:col-span-1 group font-medium">
              {loading ? "Enviando…" : "Entrar na lista de espera"}
            </Button>
          </form>
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { icon: Zap, title: "Performance e automação", desc: "Fluxos avançados, IA e automações exclusivas para economizar tempo." },
          { icon: Shield, title: "Suporte prioritário", desc: "Atendimento VIP e SLAs melhores para você não parar." },
          { icon: Sparkles, title: "Recursos premium", desc: "Dashboards avançados, integrações exclusivas e novidades primeiro." },
        ].map((b) => (
          <article key={b.title} className="rounded-lg border border-border/40 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <b.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-base font-semibold text-foreground">{b.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{b.desc}</p>
          </article>
        ))}
      </section>

      {/* Graphic (keeps Attio/our style) */}
      <section className="mt-12">
        <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
          <AttioFeatureGraphic />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="flex flex-col items-center gap-4 text-center rounded-lg border border-border/40 p-8 bg-gradient-to-b from-background to-muted/20">
          <h2 className="text-xl font-semibold text-foreground">Garanta seu lugar no FeatherBiz Gold</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Vagas limitadas de acesso antecipado. Entrando agora, você terá prioridade quando abrirmos as primeiras contas.
          </p>
          <Button onClick={() => {
            const el = document.querySelector('form');
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }} className="group font-medium">
            Entrar na lista de espera
          </Button>
        </div>
      </section>
    </MarketingPageLayout>
  );
}
