
import React from "react"

interface FeatherBizLogoProps {
  className?: string
  width?: number
  height?: number
}

export const FeatherBizLogo: React.FC<FeatherBizLogoProps> = ({ 
  className = "w-8 h-8", 
  width = 32, 
  height = 32 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    
    <g transform="translate(60, 50)">
      {/* Main feather silhouette - high quality shape */}
      <path
        d="M100 40 C120 35, 140 40, 150 55 C155 70, 158 90, 155 115 C152 140, 145 165, 135 185 C125 205, 110 220, 95 230 C80 240, 65 245, 50 240 C40 237, 35 232, 32 225 L40 220 L30 215 L35 210 L25 205 L30 200 L20 195 L25 190 L30 185 L35 180 L40 175 L45 170 L50 165 L55 160 L60 155 L65 150 L70 145 L75 140 L80 135 L85 130 L88 125 L91 120 L94 115 L96 110 L98 105 L99 100 L100 95 L101 90 L102 85 L103 80 L104 75 L105 70 L106 65 L107 60 L108 55 L107 50 L105 45 L100 40 Z"
        fill="url(#featherGradient)"
        strokeWidth="0"
      />
      
      {/* Central rachis (spine) - more prominent */}
      <path
        d="M100 40 L50 240"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.2"
        strokeLinecap="round"
      />
      
      {/* Left barbs - detailed and refined */}
      <g stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.35" strokeLinecap="round">
        <path d="M32 225 L48 218" />
        <path d="M30 215 L52 205" />
        <path d="M35 210 L56 195" />
        <path d="M25 205 L60 185" />
        <path d="M30 200 L64 175" />
        <path d="M20 195 L68 165" />
        <path d="M25 190 L72 155" />
        <path d="M30 185 L76 145" />
        <path d="M35 180 L80 135" />
        <path d="M40 175 L84 125" />
        <path d="M45 170 L88 115" />
        <path d="M50 165 L92 105" />
        <path d="M55 160 L96 95" />
        <path d="M60 155 L99 85" />
        <path d="M65 150 L102 75" />
        <path d="M70 145 L105 65" />
        <path d="M75 140 L107 55" />
        <path d="M80 135 L105 45" />
        <path d="M85 130 L100 40" />
      </g>
      
      {/* Right barbs - detailed and refined */}
      <g stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.35" strokeLinecap="round">
        <path d="M68 225 L52 218" />
        <path d="M75 215 L56 205" />
        <path d="M80 210 L60 195" />
        <path d="M85 205 L64 185" />
        <path d="M90 200 L68 175" />
        <path d="M95 195 L72 165" />
        <path d="M100 190 L76 155" />
        <path d="M105 185 L80 145" />
        <path d="M110 180 L84 135" />
        <path d="M115 175 L88 125" />
        <path d="M120 170 L92 115" />
        <path d="M125 165 L96 105" />
        <path d="M130 160 L99 95" />
        <path d="M135 155 L102 85" />
        <path d="M140 150 L105 75" />
        <path d="M145 145 L107 65" />
        <path d="M150 140 L108 55" />
        <path d="M145 135 L105 45" />
        <path d="M140 130 L100 40" />
      </g>
      
      {/* Highlight details for premium quality */}
      <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M102 45 C106 43, 110 45, 113 50 C115 55, 117 60, 115 65" />
        <path d="M98 55 C102 53, 106 55, 109 60" />
        <path d="M95 65 C99 63, 103 65, 106 70" />
      </g>
      
      {/* Fine texture lines for quality */}
      <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.15" strokeLinecap="round">
        <path d="M50 240 L52 235 L54 230 L56 225 L58 220" />
        <path d="M55 235 L57 230 L59 225 L61 220 L63 215" />
        <path d="M60 230 L62 225 L64 220 L66 215 L68 210" />
      </g>
    </g>
  </svg>
)
