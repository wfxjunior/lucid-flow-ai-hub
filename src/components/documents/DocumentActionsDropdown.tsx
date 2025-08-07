import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  ChevronDown, 
  Edit, 
  Eye, 
  Copy, 
  Send, 
  FileText, 
  DollarSign, 
  Bell, 
  Download, 
  MoreHorizontal,
  Archive,
  Trash2,
  FileSignature
} from "lucide-react"
import { DocumentSignatureDialog } from "@/components/e-signatures/DocumentSignatureDialog"
import { toast } from "sonner"

export interface DocumentAction {
  edit?: () => void
  view?: () => void
  duplicate?: () => void
  send?: () => void
  convertTo?: (type: 'invoice' | 'estimate') => void
  recordPayment?: () => void
  sendReminder?: () => void
  downloadPDF?: () => void
  archive?: () => void
  delete?: () => void
  sendForSignature?: () => void
}

interface DocumentActionsDropdownProps {
  documentType: 'estimate' | 'invoice' | 'quote'
  document: any
  actions: DocumentAction
  disabled?: boolean
}

export function DocumentActionsDropdown({ 
  documentType, 
  document, 
  actions,
  disabled = false 
}: DocumentActionsDropdownProps) {
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false)

  const getConvertOption = () => {
    switch (documentType) {
      case 'estimate':
        return { label: 'Convert to Invoice', targetType: 'invoice' as const }
      case 'invoice':
        return { label: 'Convert to Estimate', targetType: 'estimate' as const }
      case 'quote':
        return { label: 'Convert to Invoice', targetType: 'invoice' as const }
      default:
        return null
    }
  }

  const convertOption = getConvertOption()

  const handleSendForSignature = () => {
    if (actions.sendForSignature) {
      actions.sendForSignature()
    } else {
      setSignatureDialogOpen(true)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            disabled={disabled}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-white shadow-lg border z-50">
          {actions.edit && (
            <DropdownMenuItem onClick={actions.edit} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          
          {actions.view && (
            <DropdownMenuItem onClick={actions.view} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View
            </DropdownMenuItem>
          )}

          <DropdownMenuItem 
            onClick={() => handleSendForSignature()} 
            className="flex items-center gap-2 text-blue-600"
          >
            <FileSignature className="h-4 w-4" />
            E-Sign
          </DropdownMenuItem>
          
          {actions.duplicate && (
            <DropdownMenuItem onClick={actions.duplicate} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
          )}
          
          {actions.send && (
            <DropdownMenuItem onClick={actions.send} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send
            </DropdownMenuItem>
          )}
          
          {convertOption && actions.convertTo && (
            <DropdownMenuItem 
              onClick={() => actions.convertTo!(convertOption.targetType)} 
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              {convertOption.label}
            </DropdownMenuItem>
          )}

          {actions.recordPayment && documentType === 'invoice' && (
            <DropdownMenuItem onClick={actions.recordPayment} className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Record Payment
            </DropdownMenuItem>
          )}
          
          {actions.sendReminder && (
            <DropdownMenuItem onClick={actions.sendReminder} className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Send Reminder
            </DropdownMenuItem>
          )}
          
          {actions.downloadPDF && (
            <DropdownMenuItem onClick={actions.downloadPDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download/Print PDF
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          {actions.archive && (
            <DropdownMenuItem onClick={actions.archive} className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              Archive
            </DropdownMenuItem>
          )}
          
          {actions.delete && (
            <DropdownMenuItem 
              onClick={actions.delete} 
              className="flex items-center gap-2 text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DocumentSignatureDialog
        open={signatureDialogOpen}
        onOpenChange={setSignatureDialogOpen}
        document={document}
        documentType={documentType}
      />
    </>
  )
}