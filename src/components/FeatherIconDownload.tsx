
import { Feather } from "lucide-react"
import { useEffect, useState } from "react"

export const FeatherIconDownload = () => {
  const [featherImageUrl, setFeatherImageUrl] = useState<string>("")

  useEffect(() => {
    const generateFeatherImage = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size
      canvas.width = 512
      canvas.height = 512

      // Clear canvas with white background
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw feather icon
      ctx.strokeStyle = '#1e40af'
      ctx.lineWidth = 16
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      const centerX = 256
      const centerY = 256

      // Main feather shaft
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - 220)
      ctx.lineTo(centerX, centerY + 220)
      ctx.stroke()

      // Draw feather barbs
      const barbLengths = [180, 160, 140, 120, 100, 80, 60, 40, 25, 15]
      
      for (let i = 0; i < barbLengths.length; i++) {
        const y = centerY + 160 - (i * 35)
        const length = barbLengths[i]
        
        // Left side barb
        ctx.beginPath()
        ctx.moveTo(centerX, y)
        ctx.quadraticCurveTo(centerX - length/2, y - 25, centerX - length, y - 15)
        ctx.stroke()
        
        // Right side barb
        ctx.beginPath()
        ctx.moveTo(centerX, y)
        ctx.quadraticCurveTo(centerX + length/2, y - 25, centerX + length, y - 15)
        ctx.stroke()
      }

      // Feather tip
      ctx.lineWidth = 14
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - 220)
      ctx.quadraticCurveTo(centerX - 30, centerY - 185, centerX - 50, centerY - 140)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - 220)
      ctx.quadraticCurveTo(centerX + 30, centerY - 185, centerX + 50, centerY - 140)
      ctx.stroke()

      // Generate data URL
      const dataURL = canvas.toDataURL('image/png')
      setFeatherImageUrl(dataURL)
    }

    generateFeatherImage()
  }, [])

  if (featherImageUrl) {
    return (
      <img 
        src={featherImageUrl}
        alt="Feather Icon - Right click to save as PNG"
        className="h-8 w-8 cursor-pointer"
        title="Right click to save as PNG"
      />
    )
  }

  // Fallback to regular Feather icon while generating
  return <Feather className="h-8 w-8 text-primary" />
}
