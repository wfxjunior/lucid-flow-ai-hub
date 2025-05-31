
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

    // Draw feather icon based on Lucide's feather SVG path
    ctx.strokeStyle = '#3B82F6' // Primary blue color
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.fillStyle = 'none'
    
    // Scale and center the feather
    const centerX = 256
    const centerY = 256
    const scale = 12

    // Main feather shaft (vertical line)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 180)
    ctx.lineTo(centerX, centerY + 180)
    ctx.stroke()

    // Left side feathers (getting smaller as they go up)
    const featherSizes = [140, 120, 100, 80, 60, 40, 20]
    for (let i = 0; i < featherSizes.length; i++) {
      const y = centerY + 120 - (i * 25)
      const size = featherSizes[i]
      
      ctx.beginPath()
      ctx.moveTo(centerX, y)
      ctx.quadraticCurveTo(centerX - size/2, y - 15, centerX - size, y)
      ctx.stroke()
    }

    // Right side feathers (mirror of left side)
    for (let i = 0; i < featherSizes.length; i++) {
      const y = centerY + 120 - (i * 25)
      const size = featherSizes[i]
      
      ctx.beginPath()
      ctx.moveTo(centerX, y)
      ctx.quadraticCurveTo(centerX + size/2, y - 15, centerX + size, y)
      ctx.stroke()
    }

    // Feather tip
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 180)
    ctx.quadraticCurveTo(centerX - 20, centerY - 160, centerX - 30, centerY - 120)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 180)
    ctx.quadraticCurveTo(centerX + 20, centerY - 160, centerX + 30, centerY - 120)
    ctx.stroke()

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
