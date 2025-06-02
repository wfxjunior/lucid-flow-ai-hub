
import { Card, CardContent } from "@/components/ui/card"
import { FileText, DollarSign, TrendingUp } from "lucide-react"
import { AccountingDocument } from "@/types/business"

interface DocumentStatsProps {
  documents: AccountingDocument[]
}

export function DocumentStats({ documents }: DocumentStatsProps) {
  const totalAmount = documents.reduce((sum, doc) => sum + (doc.amount || 0), 0)
  
  const thisMonthDocuments = documents.filter(d => {
    const docDate = new Date(d.created_at)
    const now = new Date()
    return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
            <p className="text-2xl font-bold">{documents.length}</p>
          </div>
          <FileText className="h-8 w-8 text-blue-600" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <DollarSign className="h-8 w-8 text-green-600" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">{thisMonthDocuments}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-600" />
        </CardContent>
      </Card>
    </div>
  )
}
