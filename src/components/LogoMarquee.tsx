import * as React from "react";
import { motion } from "framer-motion";

type Logo = { src: string; alt: string; width?: number; height?: number; className?: string };

const LOGOS: Logo[] = [
  { src: "/assets/logos/orion.png", alt: "Orion" },
  { src: "/assets/logos/dynasty.png", alt: "Dynasty Financial Partners" },
  { src: "/assets/logos/morningstar.png", alt: "Morningstar" },
  { src: "/assets/logos/sanctuary.png", alt: "Sanctuary Wealth" },
  { src: "/assets/logos/advicepay.png", alt: "AdvicePay" },
  { src: "/assets/logos/private-advisor-group.png", alt: "Private Advisor Group" },
  { src: "/assets/logos/pershingx.png", alt: "Pershing X / BNY Mellon" },
  // adicione/repita conforme necessário
];

function Row({ items, duration = 26 }: { items: Logo[]; duration?: number }) {
  // Duplicamos a sequência para looping perfeito
  const sequence = [...items, ...items];

  return (
    <div className="relative isolate w-full overflow-hidden py-4">
      {/* fades nas bordas (suave) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />

      <motion.div
        className="flex min-w-max items-center gap-10 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {sequence.map((logo, i) => (
          <div key={i} className="shrink-0">
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              height={logo.height ?? 40}
              className={[
                "h-8 md:h-9 w-auto object-contain",
                // sem fundo branco: remove borda/sombra + integra com o fundo
                "mix-blend-multiply dark:mix-blend-normal",
                // aparência neutra: escala de cinza leve e opacidade que "acende" no hover
                "grayscale contrast-100 opacity-80 hover:opacity-100 hover:grayscale-0 transition",
                logo.className ?? "",
              ].join(" ")}
              style={{ imageRendering: "auto" }}
            />
          </div>
        ))}
      </motion.div>

      <style>{`
        @media (hover:hover) {
          /* pausa a animação quando o usuário passa o mouse */
          .relative:is(:hover) > div > div { animation-play-state: paused !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .relative > div { transform: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function LogoMarquee({ className = "" }: { className?: string }) {
  // Quebra a lista em duas fileiras para mais volume e alterna sentido
  const mid = Math.ceil(LOGOS.length / 2);
  const rowA = LOGOS.slice(0, mid);
  const rowB = LOGOS.slice(mid);

  return (
    <section
      aria-label="Trusted by"
      className={["w-full bg-transparent", className].join(" ")}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <h3 className="mb-2 text-center text-sm font-medium uppercase tracking-wide text-slate-500">
          Trusted by modern teams
        </h3>

        {/* linha 1 */}
        <Row items={rowA} duration={28} />
        {/* linha 2 (inverte direção) */}
        <div className="mt-1">
          <motion.div
            className="relative isolate w-full overflow-hidden py-4"
            dir="rtl"
          >
            <Row items={rowB} duration={30} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}