
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eraser, Download, RotateCcw } from "lucide-react"

interface SignatureCanvasProps {
  onSignature: (signatureData: string) => void
  width?: number
  height?: number
}

export function SignatureCanvas({ onSignature, width = 400, height = 200 }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set up canvas
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Fill with white background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
  }, [width, height])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    setIsEmpty(false)

    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    
    // Send signature data to parent
    const canvas = canvasRef.current
    if (canvas && !isEmpty) {
      const signatureData = canvas.toDataURL('image/png')
      onSignature(signatureData)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    setIsEmpty(true)
    onSignature('')
  }

  const downloadSignature = () => {
    const canvas = canvasRef.current
    if (!canvas || isEmpty) return

    const link = document.createElement('a')
    link.download = 'signature.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Digital Signature</CardTitle>
        <CardDescription>
          Sign your name in the box below using your mouse or touch device
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border border-gray-300 rounded cursor-crosshair bg-white"
            style={{ touchAction: 'none' }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadSignature}
              disabled={isEmpty}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isEmpty ? "Canvas is empty" : "Signature captured"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
