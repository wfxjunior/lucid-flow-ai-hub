import { useNavigateWrapper } from '@/hooks/useNavigateWrapper'

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const navigate = useNavigateWrapper()

  const handleRefresh = () => {
    // Clear all auth state
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch (e) {
      console.warn('Failed to clear storage:', e)
    }
    
    if (resetError) {
      resetError()
    } else {
      window.location.reload()
    }
  }

  const handleGoHome = () => {
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch (e) {
      console.warn('Failed to clear storage:', e)
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Oops! Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered a technical error. We'll fix this quickly.
          </p>
        </div>
        
        {error && (
          <details className="text-left bg-muted p-4 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium">Technical Details</summary>
            <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRefresh}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
          <button
            onClick={handleGoHome}
            className="w-full bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  )
}