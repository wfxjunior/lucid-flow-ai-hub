
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PenTool } from "lucide-react"
import { useFeatherSignIntegration } from "@/hooks/useFeatherSignIntegration"
import { toast } from "sonner"

interface FeatherSignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeatherSignDialog({ open, onOpenChange }: FeatherSignDialogProps) {
  const { uploadAndSendForSignature, isLoading: featherSignLoading } = useFeatherSignIntegration()
  const [featherSignForm, setFeatherSignForm] = useState({
    signerEmail: '',
    signerName: '',
    fileName: ''
  })

  const handleFeatherSignUpload = async () => {
    if (!featherSignForm.signerEmail || !featherSignForm.fileName) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      // For demo purposes, we'll create a simple PDF content
      // In a real scenario, you'd get this from a document or generate it
      const pdfContent = "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iaiAKPDwKPj4KZW5kb2JqCjIgMCBvYmoKPDwKPj4KZW5kb2JqCjMgMCBvYmoKPDwKPj4KZW5kb2JqCnRyYWlsZXIKPDwKPj4Kc3RhcnR4cmVmCjEwOQolJUVPRgo="
      
      const result = await uploadAndSendForSignature(
        pdfContent,
        featherSignForm.fileName,
        featherSignForm.signerEmail,
        featherSignForm.signerName
      )
      
      console.log("FeatherSign result:", result)
      onOpenChange(false)
      setFeatherSignForm({ signerEmail: '', signerName: '', fileName: '' })
      
    } catch (error) {
      console.error("FeatherSign error:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <PenTool className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Send for Signature</span>
          <span className="sm:hidden">FeatherSign</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Document for Signature</DialogTitle>
          <DialogDescription>
            Upload a document and send it for digital signature using FeatherSign
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fileName">Document Name</Label>
            <Input
              id="fileName"
              value={featherSignForm.fileName}
              onChange={(e) => setFeatherSignForm(prev => ({ ...prev, fileName: e.target.value }))}
              placeholder="Contract Agreement.pdf"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signerEmail">Signer Email</Label>
            <Input
              id="signerEmail"
              type="email"
              value={featherSignForm.signerEmail}
              onChange={(e) => setFeatherSignForm(prev => ({ ...prev, signerEmail: e.target.value }))}
              placeholder="client@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signerName">Signer Name (Optional)</Label>
            <Input
              id="signerName"
              value={featherSignForm.signerName}
              onChange={(e) => setFeatherSignForm(prev => ({ ...prev, signerName: e.target.value }))}
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleFeatherSignUpload} disabled={featherSignLoading} className="w-full sm:w-auto">
              {featherSignLoading ? "Sending..." : "Send for Signature"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
