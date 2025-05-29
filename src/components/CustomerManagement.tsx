
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Star,
  Eye
} from "lucide-react"

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const customerGrowthData = [
    { month: 'Jan', newCustomers: 12, totalCustomers: 85 },
    { month: 'Feb', newCustomers: 8, totalCustomers: 93 },
    { month: 'Mar', newCustomers: 15, totalCustomers: 108 },
    { month: 'Apr', newCustomers: 10, totalCustomers: 118 },
    { month: 'May', newCustomers: 18, totalCustomers: 136 },
    { month: 'Jun', newCustomers: 14, totalCustomers: 150 },
  ]

  const customerSegmentData = [
    { segment: 'Enterprise', count: 25, value: 45, color: '#3b82f6' },
    { segment: 'Small Business', count: 85, value: 35, color: '#10b981' },
    { segment: 'Individual', count: 40, value: 20, color: '#f59e0b' },
  ]

  const customerValueData = [
    { range: '$0-1K', customers: 45 },
    { range: '$1K-5K', customers: 65 },
    { range: '$5K-10K', customers: 25 },
    { range: '$10K+', customers: 15 },
  ]

  const customerEngagementData = [
    { month: 'Jan', emailOpens: 78, responses: 45, meetings: 12 },
    { month: 'Feb', emailOpens: 82, responses: 48, meetings: 15 },
    { month: 'Mar', emailOpens: 85, responses: 52, meetings: 18 },
    { month: 'Apr', emailOpens: 88, responses: 55, meetings: 20 },
    { month: 'May', emailOpens: 91, responses: 58, meetings: 22 },
    { month: 'Jun', emailOpens: 94, responses: 61, meetings: 25 },
  ]

  const customers = [
    {
      id: 1,
      name: "John Smith",
      company: "Smith Construction",
      email: "john@smithconstruction.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      totalValue: "$15,250",
      lastContact: "2 days ago",
      status: "active",
      projects: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Johnson Consulting",
      email: "sarah@johnsonconsulting.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      totalValue: "$8,900",
      lastContact: "1 week ago",
      status: "prospect",
      projects: 2
    },
    {
      id: 3,
      name: "Mike Davis",
      company: "Davis Tech Solutions",
      email: "mike@davistech.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      totalValue: "$22,100",
      lastContact: "3 days ago",
      status: "active",
      projects: 8
    }
  ]

  const chartConfig = {
    newCustomers: { label: "New Customers", color: "hsl(var(--primary))" },
    totalCustomers: { label: "Total Customers", color: "hsl(142.1 76.2% 36.3%)" },
    emailOpens: { label: "Email Opens", color: "hsl(var(--primary))" },
    responses: { label: "Responses", color: "hsl(142.1 76.2% 36.3%)" },
    meetings: { label: "Meetings", color: "hsl(var(--destructive))" },
  }

  return (
    <div className="space-y-6">
      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +14 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$485K</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +6 new projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Management Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Database
          </CardTitle>
          <CardDescription>
            Manage your customer relationships with AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New and total customer acquisition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <AreaChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="totalCustomers" stroke="var(--color-totalCustomers)" fill="var(--color-totalCustomers)" fillOpacity={0.3} />
                <Bar dataKey="newCustomers" fill="var(--color-newCustomers)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Customer distribution by business size</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={customerSegmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ segment, value }) => `${segment}: ${value}%`}
                >
                  {customerSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Engagement Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Engagement Trends</CardTitle>
          <CardDescription>Track customer interaction and response patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={customerEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="emailOpens" stroke="var(--color-emailOpens)" strokeWidth={2} />
              <Line type="monotone" dataKey="responses" stroke="var(--color-responses)" strokeWidth={2} />
              <Line type="monotone" dataKey="meetings" stroke="var(--color-meetings)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>View and manage your customer database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{customer.name}</h4>
                    <p className="text-sm text-muted-foreground">{customer.company}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {customer.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{customer.totalValue}</p>
                  <p className="text-sm text-muted-foreground">{customer.projects} projects</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    customer.status === 'active' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
