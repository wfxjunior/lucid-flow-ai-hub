import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Check } from "lucide-react";

type Story = {
  id: string;
  tag: string;
  title: string;
  description: string;
};

const STORIES: Story[] = [
  {
    id: "story-automation",
    tag: "Automação",
    title: "Fluxos que trabalham por você",
    description:
      "Dispare ações com gatilhos, mova deals automaticamente e mantenha toda a equipe sincronizada.",
  },
  {
    id: "story-collab",
    tag: "Colaboração",
    title: "Planejamento em tempo real",
    description:
      "Quadros e notas compartilhadas com contexto vivo — comentários, menções e histórico completo.",
  },
  {
    id: "story-reports",
    tag: "Relatórios",
    title: "KPIs claros em um só lugar",
    description:
      "Dashboards personalizáveis com métricas que importam para cada área do negócio.",
  },
  {
    id: "story-integrations",
    tag: "Integrações",
    title: "Conectado ao seu stack",
    description:
      "Integra com as principais ferramentas do mercado em minutos e sem dor de cabeça.",
  },
];

const FeatureStories: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      const scrollLeft = el.scrollLeft;
      // Find nearest card by left position
      const positions = children.map((c) => c.offsetLeft);
      let nearest = 0;
      for (let i = 1; i < positions.length; i++) {
        if (Math.abs(positions[i] - scrollLeft) < Math.abs(positions[nearest] - scrollLeft)) {
          nearest = i;
        }
      }
      setActive(nearest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const ro = new ResizeObserver(onScroll);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="testimonials" aria-label="Histórias de recursos" className="py-16 sm:py-24 lg:py-28 bg-background">
      <div id="testimonials-section" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Sticky copy (left) */}
          <aside className="md:col-span-4 md:sticky md:top-24 self-start">
            <p className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" /> FeatherBiz em ação
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Histórias que mostram o poder da plataforma
            </h2>
            <p className="mt-4 text-muted-foreground">
              Uma galeria interativa com exemplos reais do fluxo de trabalho — deslize para explorar.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="sm">Ver demonstração</Button>
              <Button variant="secondary" size="sm">Saiba mais</Button>
            </div>
          </aside>

          {/* Horizontal snap gallery (right) */}
          <div className="md:col-span-8 relative">
            {/* edge masks */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent" />

            <div
              ref={listRef}
              className={cn(
                "flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4",
                "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              )}
              role="list"
              aria-label="Galeria de histórias"
            >
              {STORIES.map((s) => (
                <article
                  key={s.id}
                  className={cn(
                    "snap-start shrink-0 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm",
                    "min-w-[85%] sm:min-w-[520px] lg:min-w-[640px]"
                  )}
                  role="listitem"
                  aria-roledescription="slide"
                >
                  {/* Media placeholder */}
                  <div className="relative aspect-video w-full overflow-hidden border-b bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/10 via-muted to-transparent" />
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs text-foreground border">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Placeholder criativo
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {s.tag}
                    </span>
                    <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Sem setas, deslize natural</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Indicadores dinâmicos</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Layout elegante e responsivo</li>
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            {/* Indicators */}
            <div className="mt-4 flex items-center gap-2">
              {STORIES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir para item ${i + 1}`}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border transition-colors",
                    i === active ? "bg-primary border-primary" : "bg-muted border-border"
                  )}
                  onClick={() => {
                    const el = listRef.current;
                    if (!el) return;
                    const child = el.children[i] as HTMLElement | undefined;
                    if (child) {
                      el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FeatureStories };
