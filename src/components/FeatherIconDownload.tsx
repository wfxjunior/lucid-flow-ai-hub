
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export const FeatherIconDownload = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const downloadFeatherIcon = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log("Canvas not found")
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.log("Canvas context not found")
      return
    }

    console.log("Starting to draw feather icon...")

    // Set canvas size
    canvas.width = 512
    canvas.height = 512

    // Clear canvas with white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw feather icon with very visible styling
    ctx.strokeStyle = '#1e40af' // Dark blue color
    ctx.lineWidth = 16 // Even thicker lines
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    const centerX = 256
    const centerY = 256

    // Main feather shaft (thick vertical line)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 220)
    ctx.lineTo(centerX, centerY + 220)
    ctx.stroke()

    // Draw feather barbs (left and right sides) - more pronounced
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

    // Feather tip (more visible)
    ctx.lineWidth = 14
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 220)
    ctx.quadraticCurveTo(centerX - 30, centerY - 185, centerX - 50, centerY - 140)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 220)
    ctx.quadraticCurveTo(centerX + 30, centerY - 185, centerX + 50, centerY - 140)
    ctx.stroke()

    // Add texture for detail
    ctx.lineWidth = 6
    ctx.strokeStyle = '#3730a3' // Slightly different blue for contrast
    
    for (let i = 0; i < 8; i++) {
      const y = centerY + 120 - (i * 30)
      const length = 90 - (i * 8)
      
      // Left texture lines
      ctx.beginPath()
      ctx.moveTo(centerX - 8, y)
      ctx.lineTo(centerX - length/2, y + 8)
      ctx.stroke()
      
      // Right texture lines
      ctx.beginPath()
      ctx.moveTo(centerX + 8, y)
      ctx.lineTo(centerX + length/2, y + 8)
      ctx.stroke()
    }

    console.log("Feather icon drawn successfully")

    // Create download link
    try {
      const dataURL = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'feather-icon.png'
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("Download triggered successfully")
    } catch (error) {
      console.error("Error creating download:", error)
    }
  }

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={downloadFeatherIcon}
        className="h-8 w-8 p-0 hover:bg-primary/10 border border-gray-300"
        title="Download feather icon as PNG"
      >
        <Download className="h-4 w-4" />
      </Button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
