
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
];

function InfiniteRow({ items, duration = 50, reverse = false }: { items: Logo[]; duration?: number; reverse?: boolean }) {
  const sequence = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex items-center gap-12 md:gap-16 lg:gap-20 will-change-transform"
        animate={{
          x: reverse ? ["0%", "-33.333%"] : ["-33.333%", "0%"]
        }}
        transition={{ 
          duration, 
          ease: "linear", 
          repeat: Infinity 
        }}
        style={{ width: "300%" }}
      >
        {sequence.map((logo, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 flex items-center justify-center group"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className={[
                "h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain",
                "filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0",
                "transition-all duration-500 ease-out",
                "group-hover:scale-110",
                "bg-white rounded-xl p-4 shadow-sm hover:shadow-md",
                "border border-border/20 hover:border-border/40",
                logo.className ?? "",
              ].join(" ")}
              style={{ 
                imageRendering: "crisp-edges",
                maxWidth: "240px",
                minHeight: "64px"
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LogoMarquee({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Trusted by leading companies"
      className={["w-full py-20 md:py-28 bg-gradient-to-b from-background via-muted/10 to-background", className].join(" ")}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-base md:text-lg font-semibold text-muted-foreground uppercase tracking-[0.25em] mb-4">
            Trusted by modern teams
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto"></div>
        </div>

        <div className="space-y-12 md:space-y-16">
          <InfiniteRow items={LOGOS} duration={65} />
          <InfiniteRow items={LOGOS} duration={60} reverse={true} />
        </div>
      </div>

      <style>{`
        @media (hover: hover) {
          .group:hover img { 
            filter: grayscale(0%) !important; 
            opacity: 1 !important; 
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .w-full > div { 
            animation: none !important; 
            transform: none !important; 
          }
        }
      `}</style>
    </section>
  );
}
