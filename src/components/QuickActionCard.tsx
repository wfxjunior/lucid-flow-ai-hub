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
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg border border-[#E9EEF5] bg-white hover:bg-gray-50/50"
      onClick={() => onClick(id)}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-32 relative">
        {/* Icon container with clean design */}
        <div className="mb-4 p-3 rounded-full bg-primary/10 transition-all duration-200 group-hover:bg-primary/15">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        
        {/* Title with clean typography */}
        <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">
          {title}
        </h3>
      </CardContent>
    </Card>
  )
}
