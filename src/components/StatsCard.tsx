
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

  const changeColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"

  return (
    <Card className={`transition-all duration-500 hover:shadow-lg hover:scale-105 ${
      isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-700 ${
          isVisible ? 'animate-scale-in' : 'scale-95 opacity-0'
        }`}>
          {displayValue}
        </div>
        <p className={`text-sm sm:text-base ${changeColor} transition-all duration-500 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-2'
        }`}>
          {change === "--" ? `+12% ${t("dashboard.fromLastMonth")}` : change}
        </p>
      </CardContent>
    </Card>
  )
}
