
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

  const changeColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"

  return (
    <Card className="dashboard-card stats-card p-6 transition-all duration-200 hover-clean">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent rounded-lg">
            <Icon className="h-5 w-5 dashboard-icon" />
          </div>
        </div>
        <div className="text-right">
          <div className="dashboard-number kpi-number mb-1">
            {displayValue}
          </div>
          <p className="kpi-label mb-1">
            {title}
          </p>
          <p className={`text-xs font-medium ${changeColor}`}>
            {change === "--" ? `+12%` : change}
          </p>
        </div>
      </div>
    </Card>
  )
}
