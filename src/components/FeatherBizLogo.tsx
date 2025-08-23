
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
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g transform="translate(40, 20)">
      {/* Main feather shape */}
      <path
        d="M60 20 C90 15, 110 25, 115 50 C118 70, 110 90, 100 110 C95 120, 85 130, 75 140 C65 150, 50 155, 40 150 C35 148, 32 145, 30 140 L35 135 L25 130 L30 125 L20 120 L25 115 L15 110 L20 105 L10 100 L15 95 L8 90 L12 85 L5 80 L10 75 L60 20 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
      
      {/* Feather vanes/barbs - left side */}
      <path
        d="M30 140 L45 130 M25 130 L50 115 M20 120 L55 100 M15 110 L60 85 M10 100 L65 70 M8 90 L70 55 M5 80 L75 40 M10 75 L60 20"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.8"
      />
      
      {/* Feather vanes/barbs - right side */}
      <path
        d="M75 140 L60 130 M80 130 L65 115 M85 120 L70 100 M90 110 L75 85 M95 100 L80 70 M100 90 L85 55 M105 80 L90 40 M100 75 L60 20"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.8"
      />
      
      {/* Central rachis/spine */}
      <path
        d="M60 20 L45 140"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Feather tip detail */}
      <circle
        cx="60"
        cy="20"
        r="2"
        fill="currentColor"
      />
    </g>
  </svg>
)
