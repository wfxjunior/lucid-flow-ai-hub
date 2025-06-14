
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface QuickActionCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  onClick: (actionId: string) => void
}

export function QuickActionCard({ id, title, icon: Icon, color, onClick }: QuickActionCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg border-0 backdrop-blur-sm"
      style={{ backgroundColor: '#9CA3AF' }}
      onClick={() => onClick(id)}
    >
      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32 relative">
        {/* Icon container with custom color */}
        <div className="p-3 rounded-xl transition-all duration-200 group-hover:scale-110 group-hover:shadow-md mb-3" style={{ backgroundColor: '#9CA3AF' }}>
          <Icon className="h-6 w-6" style={{ color: '#0055CC' }} />
        </div>
        
        {/* Title with better typography */}
        <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
          {title}
        </h3>
        
        {/* Subtle hover indicator */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-colors duration-200" />
      </CardContent>
    </Card>
  )
}
