
import { Feather, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export const FeatherIconDownload = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const downloadFeatherIcon = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 200
    canvas.height = 200

    // Clear canvas with white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Create the feather icon as SVG path
    const svgPath = "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5"
    
    // Draw feather icon manually
    ctx.strokeStyle = '#3B82F6' // Primary blue color
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // Scale and center the icon
    const scale = 6
    const offsetX = 50
    const offsetY = 50
    
    ctx.beginPath()
    // Top diamond (feather tip)
    ctx.moveTo(100, 30)
    ctx.lineTo(170, 65)
    ctx.lineTo(100, 100)
    ctx.lineTo(30, 65)
    ctx.closePath()
    ctx.stroke()
    
    // Middle line
    ctx.beginPath()
    ctx.moveTo(30, 120)
    ctx.lineTo(170, 120)
    ctx.stroke()
    
    // Bottom line
    ctx.beginPath()
    ctx.moveTo(30, 170)
    ctx.lineTo(170, 170)
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
