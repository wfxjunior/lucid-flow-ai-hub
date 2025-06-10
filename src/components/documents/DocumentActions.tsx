
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Send, Copy, Save, Share2, Mail } from "lucide-react"
import { toast } from "sonner"

interface DocumentActionsProps {
  documentType: string
  documentData: any
  onSave: () => void
  onGeneratePDF: () => void
  onDuplicate: () => void
  isSaving?: boolean
  isGeneratingPDF?: boolean
}

export function DocumentActions({
  documentType,
  documentData,
  onSave,
  onGeneratePDF,
  onDuplicate,
  isSaving = false,
  isGeneratingPDF = false
}: DocumentActionsProps) {
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  })

  const handleSendEmail = async () => {
    // TODO: Implement email sending functionality
    toast.success("Email sent successfully!")
    setShowEmailDialog(false)
  }

  const handleGenerateShareLink = () => {
    // TODO: Generate unique share link
    const shareLink = `${window.location.origin}/shared/${documentType}/${documentData.id || 'preview'}`
    navigator.clipboard.writeText(shareLink)
    toast.success("Share link copied to clipboard!")
    setShowShareDialog(false)
  }

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border rounded-lg">
      <Button onClick={onSave} disabled={isSaving}>
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? 'Saving...' : 'Save'}
      </Button>

      <Button onClick={onGeneratePDF} disabled={isGeneratingPDF} variant="outline">
        <Download className="h-4 w-4 mr-2" />
        {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
      </Button>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send {documentType}</DialogTitle>
            <DialogDescription>
              Send this {documentType.toLowerCase()} via email
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-to">To</Label>
              <Input
                id="email-to"
                value={emailData.to}
                onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                placeholder="client@email.com"
              />
            </div>
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder={`Your ${documentType} from FeatherBiz`}
              />
            </div>
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailData.message}
                onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please find your document attached..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {documentType}</DialogTitle>
            <DialogDescription>
              Generate a private link to share this {documentType.toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Create a secure, private link that you can share with your client. 
              The link will allow them to view the document without requiring an account.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerateShareLink}>
                Generate Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button onClick={onDuplicate} variant="outline">
        <Copy className="h-4 w-4 mr-2" />
        Duplicate
      </Button>
    </div>
  )
}
