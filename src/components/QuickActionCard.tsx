
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
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl border border-border/50 hover:border-primary/30 backdrop-blur-sm bg-card/80 hover:bg-card"
      onClick={() => onClick(id)}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-36 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon container with modern design */}
        <div className="relative p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg mb-4 bg-primary/10 group-hover:bg-primary/20">
          <Icon className="h-6 w-6 text-primary group-hover:text-primary transition-colors duration-300" />
        </div>
        
        {/* Title with improved typography */}
        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300 leading-tight line-clamp-2">
          {title}
        </h3>
        
        {/* Modern hover indicator */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all duration-300" />
        
        {/* Subtle shine effect on hover */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
      </CardContent>
    </Card>
  )
}
