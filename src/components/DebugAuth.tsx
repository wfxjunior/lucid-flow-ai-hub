// React import removed - using new JSX transform
import { Button } from "@/components/ui/button"
import { useAuthState } from "@/hooks/useAuthState"
import { useNavigate } from 'react-router-dom'

export function DebugAuth() {
  const { user, session, loading } = useAuthState()
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="font-semibold mb-2">Debug Auth Status</h3>
      <div className="text-sm space-y-1">
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>User: {user ? `${user.email} (${user.id?.slice(0, 8)}...)` : 'None'}</div>
        <div>Session: {session ? 'Active' : 'None'}</div>
      </div>
      <div className="mt-3 space-x-2">
        {!user && (
          <Button size="sm" onClick={() => navigate('/auth')}>
            Go to Login
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={() => {
          if (import.meta.env.DEV) {
            console.log({ user, session, loading })
          }
        }}>
          Log to Console
        </Button>
      </div>
    </div>
  )
}