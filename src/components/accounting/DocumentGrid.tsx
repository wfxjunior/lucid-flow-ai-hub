
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AccountingDocument } from "@/types/business"
import { 
  Receipt, 
  FileText, 
  Image, 
  DollarSign,
  Building,
  Tag,
  Calendar,
  Eye,
  Download,
  Trash2,
  Upload
} from "lucide-react"
import { format } from "date-fns"

const documentTypes = [
  { value: 'receipt', label: 'Receipt', icon: Receipt },
  { value: 'invoice', label: 'Invoice', icon: FileText },
  { value: 'expense', label: 'Expense Report', icon: DollarSign },
  { value: 'contract', label: 'Contract', icon: Building },
  { value: 'tax_document', label: 'Tax Document', icon: FileText },
  { value: 'bank_statement', label: 'Bank Statement', icon: FileText },
  { value: 'other', label: 'Other', icon: FileText }
]

interface DocumentGridProps {
  documents: AccountingDocument[]
  onDelete: (id: string, fileName: string) => void
  onUploadClick: () => void
}

export function DocumentGrid({ documents, onDelete, onUploadClick }: DocumentGridProps) {
  const getFileIcon = (fileName: string, documentType: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (ext && ['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return Image
    if (ext === 'pdf') return FileText
    const typeConfig = documentTypes.find(t => t.value === documentType)
    return typeConfig?.icon || FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Receipt className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
          <p className="text-muted-foreground text-center mb-4">
            Start by uploading your first accounting document.
          </p>
          <Button onClick={onUploadClick}>
            <Upload className="h-4 w-4 mr-2" />
            Upload First Document
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => {
        const FileIcon = getFileIcon(doc.file_name, doc.document_type)
        const typeConfig = documentTypes.find(t => t.value === doc.document_type)
        
        return (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FileIcon className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium truncate">{doc.title}</h4>
                    <p className="text-xs text-muted-foreground">{formatFileSize(doc.file_size)}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.open(doc.file_url, '_blank')}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(doc.file_url, '_blank')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(doc.id, doc.file_name)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {typeConfig?.label || doc.document_type}
                  </Badge>
                  {doc.amount && (
                    <span className="text-lg font-bold text-green-600">
                      ${doc.amount.toFixed(2)}
                    </span>
                  )}
                </div>

                {doc.vendor && (
                  <div className="flex items-center gap-1 text-sm">
                    <Building className="h-3 w-3" />
                    <span className="truncate">{doc.vendor}</span>
                  </div>
                )}

                {doc.category && (
                  <div className="flex items-center gap-1 text-sm">
                    <Tag className="h-3 w-3" />
                    <span className="truncate">{doc.category}</span>
                  </div>
                )}

                {doc.date_of_transaction && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(doc.date_of_transaction), 'MMM dd, yyyy')}
                  </div>
                )}

                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {doc.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{doc.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Uploaded {format(new Date(doc.created_at), 'MMM dd, yyyy')}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
