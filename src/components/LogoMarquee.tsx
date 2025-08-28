
import * as React from "react";

// SVG Components for each logo based on uploaded images
const PershingLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="14" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
      PERSHING
    </text>
    <text x="85" y="28" fontSize="12" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      X
    </text>
    <text x="10" y="35" fontSize="8" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      / BNY MELLON
    </text>
  </svg>
);

const AddeparLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <path d="M10 15 L20 10 L30 15 L20 20 Z" fill="currentColor" />
    <text x="35" y="22" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2px">
      ADDEPAR
    </text>
  </svg>
);

const PrivateAdvisorGroupLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <rect x="10" y="15" width="12" height="8" fill="currentColor" />
    <rect x="10" y="25" width="12" height="8" fill="currentColor" />
    <text x="28" y="22" fontSize="12" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">
      Private
    </text>
    <text x="28" y="32" fontSize="12" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">
      Advisor Group
    </text>
  </svg>
);

const AdvicePayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <path d="M10 20 L15 15 L20 20 L15 25 Z" fill="currentColor" />
    <text x="25" y="24" fontSize="14" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">
      AP
    </text>
    <text x="45" y="24" fontSize="14" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      AdvicePay
    </text>
  </svg>
);

const CarsonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <path d="M10 15 L15 20 L20 15 L25 20 L20 25 L15 20 L10 25 Z" fill="currentColor" />
    <text x="35" y="28" fontSize="16" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="3px">
      CARSON
    </text>
  </svg>
);

const OrionLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <path d="M10 20 L14 16 L18 20 L22 16 L26 20 L22 24 L18 20 L14 24 Z" fill="currentColor" />
    <text x="35" y="28" fontSize="18" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2px">
      ORION
    </text>
  </svg>
);

const EnvestnetLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <path d="M10 15 L12 15 L14 17 L16 15 L18 15 L18 25 L16 25 L14 23 L12 25 L10 25 Z" fill="currentColor" />
    <text x="25" y="28" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1px">
      ENVESTNET
    </text>
  </svg>
);

const DynastyLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <circle cx="15" cy="20" r="6" fill="currentColor" />
    <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.7" />
    <text x="30" y="22" fontSize="16" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      dynasty
    </text>
    <text x="30" y="32" fontSize="10" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif">
      FINANCIAL PARTNERS
    </text>
  </svg>
);

const MorningstarLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="16" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2px">
      MORNINGSTAR
    </text>
  </svg>
);

const SanctuaryLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <circle cx="15" cy="20" r="8" fill="currentColor" />
    <text x="15" y="25" fontSize="12" fontWeight="700" fontFamily="serif" fill="white" textAnchor="middle">
      S
    </text>
    <text x="30" y="22" fontSize="14" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      SANCTUARY
    </text>
    <text x="30" y="32" fontSize="10" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif">
      WEALTH
    </text>
  </svg>
);

const LPLLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="18" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
      LPL
    </text>
    <text x="50" y="28" fontSize="14" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      FINANCIAL
    </text>
  </svg>
);

const logos = [
  { name: "Pershing", Component: PershingLogo },
  { name: "Addepar", Component: AddeparLogo },
  { name: "Private Advisor Group", Component: PrivateAdvisorGroupLogo },
  { name: "AdvicePay", Component: AdvicePayLogo },
  { name: "Carson", Component: CarsonLogo },
  { name: "Orion", Component: OrionLogo },
  { name: "Envestnet", Component: EnvestnetLogo },
  { name: "Dynasty Financial Partners", Component: DynastyLogo },
  { name: "Morningstar", Component: MorningstarLogo },
  { name: "Sanctuary Wealth", Component: SanctuaryLogo },
  { name: "LPL Financial", Component: LPLLogo },
];

export default function LogoMarquee({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Trusted by leading financial companies"
      className={["w-full py-16 bg-white", className].join(" ")}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#111827' }}>
            Trusted by Leading Financial Partners
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto"></div>
        </div>

        {/* Two-row grid layout matching the reference */}
        <div className="space-y-12">
          {/* First row - 6 logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center">
            {logos.slice(0, 6).map((logo, index) => (
              <div 
                key={index}
                className="flex items-center justify-center group cursor-pointer p-3"
                aria-label={logo.name}
                role="img"
              >
                <logo.Component
                  className="h-10 w-auto max-w-[140px] object-contain transition-all duration-300 ease-out text-gray-500 hover:text-gray-800 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Second row - 5 logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12 items-center justify-items-center">
            {logos.slice(6, 11).map((logo, index) => (
              <div 
                key={index + 6}
                className="flex items-center justify-center group cursor-pointer p-3"
                aria-label={logo.name}
                role="img"
              >
                <logo.Component
                  className="h-10 w-auto max-w-[140px] object-contain transition-all duration-300 ease-out text-gray-500 hover:text-gray-800 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
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
