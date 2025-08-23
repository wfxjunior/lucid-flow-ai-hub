import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  FileText,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  User
} from "lucide-react"

const metrics = [
  {
    title: "Monthly Revenue",
    value: "$47,250",
    subtitle: "+12.5% from last month",
    icon: DollarSign
  },
  {
    title: "Outstanding Payments",
    value: "$3,420",
    subtitle: "-8.2% from last month",
    icon: CreditCard
  },
  {
    title: "Net Operating Income",
    value: "$38,900",
    subtitle: "+15.3% from last month",
    icon: TrendingUp
  },
  {
    title: "Tax Documents Ready",
    value: "1099/K-1",
    subtitle: "Ready for download",
    icon: FileText
  }
]

const transactions = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Rent Payment",
    date: "Jan 15",
    amount: 1850,
    status: "completed",
    isIncome: true
  },
  {
    id: 2,
    name: "Mike Chen",
    type: "Rent Payment",
    date: "Jan 14",
    amount: 2100,
    status: "completed",
    isIncome: true
  },
  {
    id: 3,
    name: "Property Maintenance Co",
    type: "Maintenance",
    date: "Jan 12",
    amount: 450,
    status: "paid",
    isIncome: false
  },
  {
    id: 4,
    name: "Electric Company",
    type: "Utilities",
    date: "Jan 10",
    amount: 125,
    status: "paid",
    isIncome: false
  }
]

interface FinancePageProps {
  onNavigate: (view: string) => void
}

export function FinancePage({ onNavigate }: FinancePageProps) {
  const handleRecordPayment = () => {
    console.log("Record payment clicked")
  }

  return (
    <CleanPageLayout
      title="Finance Center"
      subtitle="Comprehensive financial management and reporting"
      actionLabel="Record Payment"
      onActionClick={handleRecordPayment}
      metrics={metrics}
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <Button 
          variant="outline" 
          className="flex flex-col items-center gap-2 p-4 md:p-6 h-auto rounded-2xl text-xs md:text-sm"
        >
          <DollarSign className="h-5 md:h-6 w-5 md:w-6" />
          <span>Payments</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center gap-2 p-4 md:p-6 h-auto rounded-2xl text-xs md:text-sm"
        >
          <CreditCard className="h-5 md:h-6 w-5 md:w-6" />
          <span>Payouts</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center gap-2 p-4 md:p-6 h-auto rounded-2xl text-xs md:text-sm"
        >
          <TrendingUp className="h-5 md:h-6 w-5 md:w-6" />
          <span>Reports</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center gap-2 p-4 md:p-6 h-auto rounded-2xl text-xs md:text-sm"
        >
          <FileText className="h-5 md:h-6 w-5 md:w-6" />
          <span>Tax Documents</span>
        </Button>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Recent Transactions
          </h2>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="bg-card border border-border rounded-2xl">
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      transaction.isIncome ? 'bg-success/10' : 'bg-muted'
                    }`}>
                      {transaction.isIncome ? (
                        <ArrowDownRight className="h-4 md:h-5 w-4 md:w-5 text-success" />
                      ) : (
                        <ArrowUpRight className="h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="font-medium text-foreground text-sm md:text-base truncate">
                        {transaction.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                        <span>{transaction.type}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                    <div className={`text-base md:text-lg font-semibold ${
                      transaction.isIncome ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </div>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'success' : 'default'}
                      className="text-xs"
                    >
                      {transaction.status === 'completed' ? 'Completed' : 'Paid'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CleanPageLayout>
  )
}