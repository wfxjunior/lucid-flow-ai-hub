
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
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g transform="translate(50, 40)">
      {/* Main feather shape - clean and professional */}
      <path
        d="M45 25 C60 18, 80 22, 90 35 C95 50, 98 70, 95 90 C92 110, 85 130, 75 145 C65 160, 50 170, 35 175 C25 178, 18 175, 15 170 C12 165, 12 160, 15 155 L25 150 L15 145 L20 140 L10 135 L15 130 L5 125 L10 120 L15 115 L20 110 L25 105 L30 100 L35 95 L40 90 L42 85 L44 80 L45 75 L46 70 L47 65 L48 60 L49 55 L50 50 L51 45 L52 40 L53 35 L52 30 L50 25 L45 25 Z"
        fill="currentColor"
        strokeWidth="0"
      />
      
      {/* Central spine - more defined */}
      <path
        d="M45 25 L35 175"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.15"
      />
      
      {/* Left barbs - refined and cleaner */}
      <path
        d="M15 170 L38 160 M15 155 L40 145 M20 140 L42 130 M10 135 L44 120 M15 130 L46 110 M5 125 L48 100 M10 120 L49 90 M15 115 L50 80 M20 110 L51 70 M25 105 L52 60 M30 100 L53 50 M35 95 L52 40 M40 90 L50 30 M45 85 L45 25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      
      {/* Right barbs - refined and cleaner */}
      <path
        d="M55 170 L42 160 M60 155 L44 145 M65 140 L46 130 M70 135 L48 120 M75 130 L50 110 M80 125 L52 100 M85 120 L54 90 M90 115 L56 80 M95 110 L58 70 M90 105 L60 60 M85 100 L62 50 M80 95 L60 40 M75 90 L55 30 M70 85 L50 25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      
      {/* Highlight detail for premium look */}
      <path
        d="M48 30 C52 28, 55 30, 58 35 C60 40, 62 45, 60 50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </g>
  </svg>
)
