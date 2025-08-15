
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export default function Index() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">FeatherBiz</h1>
          <p className="text-muted-foreground">
            AI-powered business management platform
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/test-pdf')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            size="lg"
          >
            <FileText className="w-5 h-5" />
            Generate Test PDF
          </Button>
          
          <Button
            onClick={() => navigate('/landing')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            View Landing Page
          </Button>
        </div>
      </div>
    </div>
  )
}
