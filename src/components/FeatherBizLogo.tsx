
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
    <g transform="translate(20, 40)">
      {/* Feather shape */}
      <path
        d="M20 120 C20 80, 40 40, 80 20 C100 10, 120 15, 130 25 C135 30, 135 35, 130 40 L80 90 L70 85 L60 95 L55 90 L50 100 L45 95 L40 105 L35 100 L30 110 L25 105 L20 120 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Feather details */}
      <path
        d="M80 90 L75 80 M80 90 L70 75 M80 90 L65 70 M80 90 L60 65 M80 90 L55 60 M80 90 L50 55 M80 90 L45 50 M80 90 L40 45"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Central spine */}
      <path
        d="M80 90 L110 35"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </g>
  </svg>
)
