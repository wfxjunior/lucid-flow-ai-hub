
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

  const changeColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"
  const iconBgColor = trend === "up" ? "bg-green-50" : trend === "down" ? "bg-red-50" : "bg-gray-50"
  const iconColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"

  return (
    <Card className="stripe-metric-card stripe-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">
            {title}
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            {displayValue}
          </p>
          <p className={`text-sm font-medium ${changeColor}`}>
            {change === "--" ? `+12%` : change}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </Card>
  )
}
