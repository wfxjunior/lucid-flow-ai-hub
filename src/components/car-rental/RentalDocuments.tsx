
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Upload } from "lucide-react"

export function RentalDocuments() {
  const documents = [
    {
      id: 1,
      name: "Rental Agreement - BMW X5",
      type: "agreement",
      date: "2024-06-10",
      status: "signed"
    },
    {
      id: 2,
      name: "Insurance Document - Tesla Model 3",
      type: "insurance",
      date: "2024-06-08",
      status: "pending"
    },
    {
      id: 3,
      name: "Inspection Report - Audi A4",
      type: "inspection",
      date: "2024-06-05",
      status: "completed"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Rental Documents</h3>
          <p className="text-sm text-muted-foreground">
            Manage contracts, agreements, and rental documentation
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <CardTitle className="text-sm">{doc.name}</CardTitle>
              </div>
              <CardDescription className="text-xs">
                {doc.type} • {doc.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doc.status === 'signed' ? 'bg-green-100 text-green-700' :
                  doc.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {doc.status}
                </span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
