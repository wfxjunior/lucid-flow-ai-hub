
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
  <img 
    src="/lovable-uploads/4dcd8d1d-64ea-4f64-ba18-43f649e98a62.png" 
    alt="FeatherBiz" 
    className={className}
    width={width}
    height={height}
    style={{ 
      width: `${width}px`, 
      height: `${height}px`, 
      objectFit: 'contain' 
    }}
  />
)
