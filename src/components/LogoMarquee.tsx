
import * as React from "react";

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

export default function LogoMarquee({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Trusted by leading companies"
      className={["w-full py-16 bg-white", className].join(" ")}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#111827' }}>
            Trusted by Modern Teams
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-center justify-items-center">
          {LOGOS.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center group cursor-pointer p-4"
              aria-label={logo.alt}
              role="img"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-all duration-200 ease-out filter grayscale hover:grayscale-0 group-hover:scale-105"
                style={{ 
                  imageRendering: "crisp-edges",
                  maxWidth: "140px",
                  minWidth: "100px",
                  filter: "grayscale(100%) brightness(0) saturate(100%) invert(25%) sepia(8%) saturate(665%) hue-rotate(184deg) brightness(94%) contrast(87%)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "none";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%) brightness(0) saturate(100%) invert(25%) sepia(8%) saturate(665%) hue-rotate(184deg) brightness(94%) contrast(87%)";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (hover: hover) {
          .group:hover img { 
            filter: none !important;
            transform: scale(1.05);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .group img { 
            transition: none !important; 
            transform: none !important; 
          }
        }
      `}</style>
    </section>
  );
}
