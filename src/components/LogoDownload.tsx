
import React from 'react'
import { Download, Feather } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const LogoDownload = () => {
  const downloadLogo = () => {
    // Create an SVG element with the Feather icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', '200')
    svg.setAttribute('height', '200')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'hsl(221, 83%, 53%)')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')

    // Add the Feather icon path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z')
    svg.appendChild(path)

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path2.setAttribute('d', 'M2 9a2 2 0 0 1 2-2h5.5a2 2 0 0 1 1.6.8l1.8 2.4')
    svg.appendChild(path2)

    // Convert SVG to PNG
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')

    if (ctx) {
      // Set white background
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 200, 200)

      const img = new Image()
      const svgBlob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)

      img.onload = () => {
        ctx.drawImage(img, 0, 0, 200, 200)
        
        // Download the image
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a')
            link.download = 'featherbiz-logo.png'
            link.href = URL.createObjectURL(blob)
            link.click()
            URL.revokeObjectURL(link.href)
          }
        }, 'image/png')
        
        URL.revokeObjectURL(url)
      }

      img.src = url
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={downloadLogo}
      className="text-gray-600 hover:text-primary"
    >
      <Download className="h-4 w-4" />
    </Button>
  )
}
