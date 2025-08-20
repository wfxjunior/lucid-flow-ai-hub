
import * as React from "react";

// SVG Components for each logo in monochrome style - matching reference size and quality
const GranolaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="18" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      granola
    </text>
    <rect x="95" y="20" width="2" height="16" fill="currentColor" />
  </svg>
);

const CocaColaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="16" fontWeight="400" fontFamily="Georgia, serif" fontStyle="italic">
      Coca-Cola
    </text>
  </svg>
);

const FlatfileLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <rect x="10" y="15" width="8" height="8" fill="currentColor" />
    <rect x="10" y="25" width="8" height="8" fill="currentColor" />
    <text x="25" y="28" fontSize="16" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">
      Flatfile
    </text>
  </svg>
);

const ModalLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <path d="M10 15 L18 15 L22 25 L18 35 L10 35 Z" fill="currentColor" />
    <path d="M14 15 L22 15 L26 25 L22 35 L14 35 Z" fill="currentColor" opacity="0.7" />
    <text x="35" y="28" fontSize="16" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">
      Modal
    </text>
  </svg>
);

const UnionSquareLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <rect x="10" y="15" width="25" height="18" fill="currentColor" />
    <text x="40" y="22" fontSize="10" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" fill="white">
      USV
    </text>
    <text x="40" y="32" fontSize="8" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      Union Square Ventures
    </text>
  </svg>
);

const ReplicateLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="16" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1px">
      Replicate
    </text>
  </svg>
);

const BravadoLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <path d="M10 20 L15 15 L20 20 L15 25 Z" fill="currentColor" />
    <text x="30" y="28" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2px">
      BRAVADO
    </text>
  </svg>
);

const LegoraLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="16" fontWeight="400" fontFamily="serif" letterSpacing="3px">
      LEGORA
    </text>
  </svg>
);

const RailwayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <circle cx="15" cy="20" r="8" fill="currentColor" />
    <circle cx="15" cy="20" r="4" fill="white" />
    <text x="30" y="28" fontSize="16" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">
      Railway
    </text>
  </svg>
);

const PublicLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <circle cx="15" cy="20" r="6" fill="currentColor" />
    <text x="28" y="28" fontSize="16" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      public.com
    </text>
  </svg>
);

const PlainLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="18" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      Plain.
    </text>
  </svg>
);

const PassionfrootLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="currentColor">
    <text x="10" y="28" fontSize="14" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">
      passionfroot
    </text>
  </svg>
);

const logos = [
  { name: "Granola", Component: GranolaLogo },
  { name: "Coca-Cola", Component: CocaColaLogo },
  { name: "Flatfile", Component: FlatfileLogo },
  { name: "Modal", Component: ModalLogo },
  { name: "Union Square Ventures", Component: UnionSquareLogo },
  { name: "Replicate", Component: ReplicateLogo },
  { name: "Bravado", Component: BravadoLogo },
  { name: "Legora", Component: LegoraLogo },
  { name: "Railway", Component: RailwayLogo },
  { name: "Public.com", Component: PublicLogo },
  { name: "Plain", Component: PlainLogo },
  { name: "Passionfroot", Component: PassionfrootLogo },
];

export default function LogoMarquee({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Trusted by leading companies"
      className={["w-full py-16 bg-white", className].join(" ")}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#111827' }}>
            Trusted by Modern Teams
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

          {/* Second row - 6 logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center">
            {logos.slice(6, 12).map((logo, index) => (
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
