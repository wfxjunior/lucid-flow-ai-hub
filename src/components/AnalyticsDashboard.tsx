
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, FileText, Calendar, Heart } from "lucide-react"

export function AnalyticsDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,250",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Active Customers",
      value: "142",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Invoices Sent",
      value: "89",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: FileText
    },
    {
      title: "Pending Payments",
      value: "$12,480",
      change: "-5.2%",
      changeType: "negative" as const,
      icon: Calendar
    },
    {
      title: "Family Savings",
      value: "$2,850",
      change: "+22.1%",
      changeType: "positive" as const,
      icon: Heart
    }
  ]

  const recentInvoices = [
    { id: 'INV-001', client: 'John Smith', amount: 2500, status: 'paid', date: '2024-01-20' },
    { id: 'INV-002', client: 'Sarah Johnson', amount: 3200, status: 'pending', date: '2024-01-18' },
    { id: 'INV-003', client: 'Mike Davis', amount: 1800, status: 'overdue', date: '2024-01-15' },
  ]

  const familySavingsBreakdown = [
    { month: 'January', amount: 580, percentage: 5 },
    { month: 'December', amount: 520, percentage: 5 },
    { month: 'November', amount: 475, percentage: 5 },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                )}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Revenue Analytics
          </CardTitle>
          <CardDescription>Monthly revenue breakdown and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4 p-4 bg-muted/20 rounded-lg">
            {[4200, 3800, 4500, 3200, 4800, 5200, 4250].map((value, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="bg-primary rounded-t-sm w-8 transition-all duration-500"
                  style={{ height: `${(value / 5200) * 200}px` }}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Track your latest invoice statuses and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.client}</p>
                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Family Savings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Family Savings Program
            </CardTitle>
            <CardDescription>Automatic savings from each completed job</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">$2,850</div>
                <p className="text-sm text-muted-foreground">Total Family Savings</p>
              </div>
              
              {familySavingsBreakdown.map((saving) => (
                <div key={saving.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{saving.month}</p>
                    <p className="text-sm text-muted-foreground">{saving.percentage}% of revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">${saving.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Document Engagement Tracking</CardTitle>
          <CardDescription>Track when customers open and view your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <p className="text-sm text-muted-foreground">Documents Opened</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">67%</div>
                <p className="text-sm text-muted-foreground">Fully Read</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">45%</div>
                <p className="text-sm text-muted-foreground">Signed/Responded</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
