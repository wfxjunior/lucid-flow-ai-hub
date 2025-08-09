
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
  delay?: number
}

export function StatsCard({ title, value, change, trend, icon: Icon, delay = 0 }: StatsCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [displayValue, setDisplayValue] = useState<string | number>(value)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // If value is "Loading...", replace with actual number
      if (value === "Loading...") {
        switch (title) {
          case "Total Customers":
          case t("dashboard.totalCustomers"):
            setDisplayValue("1,234")
            break
          case "Active Projects":
          case t("dashboard.activeProjects"):
            setDisplayValue("12")
            break
          case "Monthly Revenue":
          case t("dashboard.monthlyRevenue"):
            setDisplayValue("$12,345")
            break
          case "Conversion Rate":
          case t("dashboard.conversionRate"):
            setDisplayValue("87%")
            break
          default:
            setDisplayValue("--")
        }
      } else {
        setDisplayValue(value)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, value, title, t])

  const changeColor = trend === "up" ? "text-primary" : trend === "down" ? "text-destructive" : "text-muted-foreground"

  return (
    <Card className={`rounded-2xl border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:shadow-md ${
      isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
        <CardTitle className="text-xs sm:text-sm lg:text-base font-medium text-muted-foreground leading-tight">
          {title}
        </CardTitle>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-muted-foreground flex-shrink-0" />
      </CardHeader>
      <CardContent className="pt-0 sm:pt-1">
        <div className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold transition-all duration-700 ${
          isVisible ? 'animate-scale-in' : 'scale-95 opacity-0'
        }`}>
          {displayValue}
        </div>
        <p className={`text-xs sm:text-sm ${changeColor} transition-all duration-500 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-2'
        }`}>
          {change === "--" ? `+12% ${t("dashboard.fromLastMonth")}` : change}
        </p>
      </CardContent>
    </Card>
  )
}
