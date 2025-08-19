
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
        className="flex items-center gap-16 md:gap-24 will-change-transform"
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
                "h-12 md:h-16 lg:h-20 w-auto object-contain",
                "filter grayscale opacity-50 hover:opacity-90 hover:grayscale-0",
                "transition-all duration-500 ease-out",
                "group-hover:scale-105",
                "bg-white rounded-lg p-3 shadow-sm",
                logo.className ?? "",
              ].join(" ")}
              style={{ 
                imageRendering: "crisp-edges",
                maxWidth: "200px",
                minHeight: "48px"
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
      className={["w-full py-16 md:py-24 bg-gradient-to-b from-background to-muted/20", className].join(" ")}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-[0.2em] mb-3">
            Trusted by modern teams
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto"></div>
        </div>

        <div className="space-y-8 md:space-y-12">
          <InfiniteRow items={LOGOS} duration={60} />
          <InfiniteRow items={LOGOS} duration={55} reverse={true} />
        </div>
        
        {/* Removed the gradient overlays for fade effect */}
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
