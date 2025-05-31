
import { Feather, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export const FeatherIconDownload = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const downloadFeatherIcon = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 512
    canvas.height = 512

    // Clear canvas with white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw feather icon - much more visible version
    ctx.strokeStyle = '#2563eb' // Strong blue color
    ctx.lineWidth = 12
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    const centerX = 256
    const centerY = 256

    // Main feather shaft (thicker vertical line)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 200)
    ctx.lineTo(centerX, centerY + 200)
    ctx.stroke()

    // Draw feather barbs (left and right sides)
    const barbLengths = [160, 140, 120, 100, 80, 60, 40, 25, 15]
    
    for (let i = 0; i < barbLengths.length; i++) {
      const y = centerY + 150 - (i * 35)
      const length = barbLengths[i]
      
      // Left side barb
      ctx.beginPath()
      ctx.moveTo(centerX, y)
      ctx.quadraticCurveTo(centerX - length/3, y - 20, centerX - length, y - 10)
      ctx.stroke()
      
      // Right side barb
      ctx.beginPath()
      ctx.moveTo(centerX, y)
      ctx.quadraticCurveTo(centerX + length/3, y - 20, centerX + length, y - 10)
      ctx.stroke()
    }

    // Feather tip (more pronounced)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 200)
    ctx.quadraticCurveTo(centerX - 25, centerY - 170, centerX - 40, centerY - 130)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 200)
    ctx.quadraticCurveTo(centerX + 25, centerY - 170, centerX + 40, centerY - 130)
    ctx.stroke()

    // Add some texture lines for more detail
    ctx.lineWidth = 4
    ctx.strokeStyle = '#3b82f6' // Slightly lighter blue for texture
    
    for (let i = 0; i < 6; i++) {
      const y = centerY + 100 - (i * 30)
      const length = 80 - (i * 10)
      
      // Left texture lines
      ctx.beginPath()
      ctx.moveTo(centerX - 5, y)
      ctx.lineTo(centerX - length/2, y + 5)
      ctx.stroke()
      
      // Right texture lines
      ctx.beginPath()
      ctx.moveTo(centerX + 5, y)
      ctx.lineTo(centerX + length/2, y + 5)
      ctx.stroke()
    }

    // Download the canvas as PNG
    const link = document.createElement('a')
    link.download = 'feather-icon.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={downloadFeatherIcon}
        className="h-8 w-8 p-0 hover:bg-primary/10"
        title="Baixar ícone da pena"
      >
        <Download className="h-4 w-4" />
      </Button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  )
}
