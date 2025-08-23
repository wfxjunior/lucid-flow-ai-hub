
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
    <g transform="translate(50, 30)">
      {/* Main feather shape - elegant and elongated */}
      <path
        d="M50 20 C70 15, 85 25, 90 45 C92 65, 88 85, 82 105 C78 125, 70 140, 60 150 C50 160, 35 165, 25 160 C20 158, 18 155, 16 150 L20 145 L10 140 L15 135 L5 130 L10 125 L0 120 L5 115 L50 20 Z"
        fill="currentColor"
        strokeWidth="0"
      />
      
      {/* Central spine/rachis - the main shaft of the feather */}
      <path
        d="M50 20 L30 150"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      
      {/* Left barbs - simplified */}
      <path
        d="M16 150 L35 140 M10 140 L40 125 M5 130 L45 110 M0 120 L48 95 M5 115 L50 80 M8 110 L52 65 M12 105 L54 50 M16 100 L50 20"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      
      {/* Right barbs - simplified */}
      <path
        d="M60 150 L45 140 M65 140 L50 125 M70 130 L55 110 M75 120 L58 95 M72 115 L56 80 M68 110 L54 65 M64 105 L52 50 M60 100 L50 20"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
    </g>
  </svg>
)
