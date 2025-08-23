
import { Card, CardContent } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"

interface QuickActionCardProps {
  id: string
  title: string
  description: string
  icon: keyof typeof import('lucide-react')
  color: string
  onClick: (actionId: string) => void
}

export function QuickActionCard({ id, title, icon, color, onClick }: QuickActionCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg border border-[#E9EEF5] bg-white hover:bg-gray-50/50"
      onClick={() => onClick(id)}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-32 relative">
        {/* Icon container with clean design */}
        <div className="mb-4">
          <AppIcon name={icon} size="lg" tone="primary" withContainer />
        </div>
        
        {/* Title with clean typography */}
        <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">
          {title}
        </h3>
      </CardContent>
    </Card>
  )
}
