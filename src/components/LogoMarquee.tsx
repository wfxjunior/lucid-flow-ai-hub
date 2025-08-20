
import * as React from "react";

// SVG Components for each logo in monochrome style
const NeatLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <text x="10" y="35" fontSize="28" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif">
      neat.
    </text>
  </svg>
);

const MorningstarLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <text x="10" y="20" fontSize="12" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
      MORNINGSTAR
    </text>
    <circle cx="90" cy="15" r="8" fill="currentColor" opacity="0.7" />
  </svg>
);

const SanctuaryLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <circle cx="20" cy="25" r="12" fill="currentColor" />
    <text x="40" y="18" fontSize="10" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
      SANCTUARY
    </text>
    <text x="40" y="32" fontSize="8" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif">
      WEALTH
    </text>
  </svg>
);

const PershingLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <text x="10" y="20" fontSize="12" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
      PERSHING
    </text>
    <path d="M110 15 L125 15 L125 25 L110 25 Z" fill="currentColor" />
    <text x="10" y="35" fontSize="8" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif">
      / BNY MELLON
    </text>
  </svg>
);

const AdvicePayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <path d="M10 15 L25 15 L20 25 L15 25 Z" fill="currentColor" />
    <text x="30" y="28" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
      AdvicePay
    </text>
  </svg>
);

const PrivateAdvisorLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <rect x="10" y="15" width="8" height="8" fill="currentColor" />
    <rect x="20" y="15" width="8" height="15" fill="currentColor" />
    <text x="35" y="20" fontSize="9" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
      Private
    </text>
    <text x="35" y="32" fontSize="9" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
      Advisor Group
    </text>
  </svg>
);

const OrionLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <path d="M10 25 L15 15 L20 25 L25 15 L30 25 L25 35 L20 25 L15 35 Z" fill="currentColor" />
    <text x="40" y="30" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
      ORION
    </text>
  </svg>
);

const EnvestnetLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <path d="M10 15 L25 15 L25 20 L10 20 Z" fill="currentColor" />
    <path d="M10 22 L20 22 L20 27 L10 27 Z" fill="currentColor" />
    <path d="M10 29 L30 29 L30 34 L10 34 Z" fill="currentColor" />
    <text x="40" y="30" fontSize="12" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
      ENVESTNET
    </text>
  </svg>
);

const DynastyLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <circle cx="15" cy="20" r="8" fill="currentColor" />
    <circle cx="25" cy="20" r="6" fill="currentColor" opacity="0.7" />
    <text x="40" y="18" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
      dynasty
    </text>
    <text x="40" y="32" fontSize="7" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      FINANCIAL PARTNERS
    </text>
  </svg>
);

const CarsonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 50" className={className} fill="currentColor">
    <path d="M10 15 L20 25 L15 35 L10 25 Z" fill="currentColor" />
    <path d="M15 15 L25 25 L20 35 L15 25 Z" fill="currentColor" opacity="0.7" />
    <text x="35" y="30" fontSize="14" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2px">
      CARSON
    </text>
  </svg>
);

const logos = [
  { name: "Neat", Component: NeatLogo },
  { name: "Morningstar", Component: MorningstarLogo },
  { name: "Sanctuary Wealth", Component: SanctuaryLogo },
  { name: "Pershing X / BNY Mellon", Component: PershingLogo },
  { name: "AdvicePay", Component: AdvicePayLogo },
  { name: "Private Advisor Group", Component: PrivateAdvisorLogo },
  { name: "Orion", Component: OrionLogo },
  { name: "Envestnet", Component: EnvestnetLogo },
  { name: "Dynasty Financial Partners", Component: DynastyLogo },
  { name: "Carson", Component: CarsonLogo },
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
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center group cursor-pointer p-4 h-12"
              aria-label={logo.name}
              role="img"
            >
              <logo.Component
                className="h-full w-auto object-contain transition-all duration-300 ease-out text-gray-400 hover:text-gray-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (hover: hover) {
          .group:hover svg { 
            color: #374151 !important;
            transform: scale(1.05);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .group svg { 
            transition: none !important; 
            transform: none !important; 
          }
        }
      `}</style>
    </section>
  );
}
