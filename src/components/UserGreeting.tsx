
import { useState, useEffect } from "react"
import { User } from "lucide-react"

interface UserGreetingProps {
  className?: string
}

export function UserGreeting({ className = "" }: UserGreetingProps) {
  // For now, using a mock user - this will be replaced with actual auth later
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    // Mock user data - in a real app this would come from authentication
    setUser({ name: "John Doe" })
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <User className="h-5 w-5 text-muted-foreground" />
      <span className="text-lg font-medium">
        Hello, <span className="text-primary">{user.name}</span>
      </span>
    </div>
  )
}
