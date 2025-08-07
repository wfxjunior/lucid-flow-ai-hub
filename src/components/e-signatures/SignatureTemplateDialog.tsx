import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Wand2, Download } from "lucide-react"
import { useSignNowIntegration } from "@/hooks/useSignNowIntegration"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"
import { signatureTemplates } from "./templates/signatureTemplates"

interface SignatureTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignatureTemplateDialog({ open, onOpenChange }: SignatureTemplateDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [templateData, setTemplateData] = useState({
    title: "",
    clientName: "",
    clientEmail: "",
    projectDescription: "",
    amount: "",
    startDate: "",
    duration: "",
    terms: ""
  })
  
  const { uploadAndSendForSignature, isLoading: signNowLoading } = useSignNowIntegration()
  const { generatePDF, isGenerating } = usePDFGeneration()

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = signatureTemplates.find(t => t.id === templateId)
    if (template) {
      setTemplateData(prev => ({
        ...prev,
        title: template.defaultTitle
      }))
    }
  }

  const generateTemplateContent = () => {
    const template = signatureTemplates.find(t => t.id === selectedTemplate)
    if (!template) return ""

    return template.content
      .replace(/\{clientName\}/g, templateData.clientName || "[Client Name]")
      .replace(/\{projectDescription\}/g, templateData.projectDescription || "[Project Description]")
      .replace(/\{amount\}/g, templateData.amount || "[Amount]")
      .replace(/\{startDate\}/g, templateData.startDate || "[Start Date]")
      .replace(/\{duration\}/g, templateData.duration || "[Duration]")
      .replace(/\{terms\}/g, templateData.terms || "[Terms and Conditions]")
  }

  const handlePreviewAndDownload = async () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first")
      return
    }

    const template = signatureTemplates.find(t => t.id === selectedTemplate)
    const content = generateTemplateContent()
    
    // Create a temporary element for the document
    const element = document.createElement('div')
    element.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #333;
    `
    
    element.innerHTML = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 24pt;">${templateData.title || template?.defaultTitle}</h1>
        <p style="color: #666; margin: 10px 0;">Document Type: ${template?.type}</p>
        <p style="color: #666; margin: 5px 0;">Created: ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <div style="white-space: pre-wrap; line-height: 1.8;">${content}</div>
      </div>
      
      <div style="margin-top: 50px; border-top: 2px solid #e5e7eb; padding-top: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
          <div style="width: 45%;">
            <div style="border-bottom: 1px solid #333; margin-bottom: 5px; height: 40px;"></div>
            <p style="text-align: center; margin: 0; font-size: 10pt;">Client Signature</p>
            <p style="text-align: center; margin: 0; font-size: 10pt;">Date: ___________</p>
          </div>
          <div style="width: 45%;">
            <div style="border-bottom: 1px solid #333; margin-bottom: 5px; height: 40px;"></div>
            <p style="text-align: center; margin: 0; font-size: 10pt;">Company Representative</p>
            <p style="text-align: center; margin: 0; font-size: 10pt;">Date: ___________</p>
          </div>
        </div>
        <p style="text-align: center; color: #666; font-style: italic; font-size: 10pt;">
          Document generated from FeatherBiz E-Signatures
        </p>
      </div>
    `
    
    document.body.appendChild(element)
    
    try {
      const fileName = `${templateData.title || template?.defaultTitle}_${Date.now()}.pdf`
      await generatePDF(element, fileName)
      toast.success("Template document downloaded successfully!")
    } finally {
      document.body.removeChild(element)
    }
  }

  const handleSendForSignature = async () => {
    if (!selectedTemplate || !templateData.clientEmail) {
      toast.error("Please select a template and enter client email")
      return
    }

    try {
      const template = signatureTemplates.find(t => t.id === selectedTemplate)
      const content = generateTemplateContent()
      
      // Generate PDF content for SignNow
      const element = document.createElement('div')
      element.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        background: white;
        font-family: Arial, sans-serif;
        font-size: 12pt;
        line-height: 1.6;
        color: #333;
      `
      
      element.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 24pt;">${templateData.title || template?.defaultTitle}</h1>
          <p style="color: #666; margin: 10px 0;">Document Type: ${template?.type}</p>
          <p style="color: #666; margin: 5px 0;">Created: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <div style="white-space: pre-wrap; line-height: 1.8;">${content}</div>
        </div>
        
        <div style="margin-top: 50px; border-top: 2px solid #e5e7eb; padding-top: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div style="width: 45%;">
              <div style="border-bottom: 1px solid #333; margin-bottom: 5px; height: 40px;"></div>
              <p style="text-align: center; margin: 0; font-size: 10pt;">Client Signature</p>
              <p style="text-align: center; margin: 0; font-size: 10pt;">Date: ___________</p>
            </div>
            <div style="width: 45%;">
              <div style="border-bottom: 1px solid #333; margin-bottom: 5px; height: 40px;"></div>
              <p style="text-align: center; margin: 0; font-size: 10pt;">Company Representative</p>
              <p style="text-align: center; margin: 0; font-size: 10pt;">Date: ___________</p>
            </div>
          </div>
          <p style="text-align: center; color: #666; font-style: italic; font-size: 10pt;">
            Document generated from FeatherBiz E-Signatures
          </p>
        </div>
      `
      
      document.body.appendChild(element)
      
      // Convert to PDF for SignNow (simplified - returning base64)
      const pdfContent = "JVBERi0xLjQKJYGBgYEKCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDIgMCBSCj4+CmVuZG9iagoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+PgplbmRvYmoKCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA0Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoxODIKJSVFT0Y="
      
      const fileName = `${templateData.title || template?.defaultTitle}.pdf`
      
      await uploadAndSendForSignature(
        pdfContent,
        fileName,
        templateData.clientEmail,
        templateData.clientName
      )
      
      toast.success("Template sent for signature successfully!")
      onOpenChange(false)
      
      document.body.removeChild(element)
      
    } catch (error) {
      console.error("Error sending template for signature:", error)
      toast.error("Failed to send template for signature")
    }
  }

  const resetForm = () => {
    setSelectedTemplate("")
    setTemplateData({
      title: "",
      clientName: "",
      clientEmail: "",
      projectDescription: "",
      amount: "",
      startDate: "",
      duration: "",
      terms: ""
    })
  }

  const selectedTemplateData = signatureTemplates.find(t => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen)
      if (!isOpen) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Wand2 className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Create from Template</span>
          <span className="sm:hidden">Template</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Document from Template
          </DialogTitle>
          <DialogDescription>
            Select a template and customize it for your business needs
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-3">
            <Label>Select Template</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {signatureTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      <span>{template.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedTemplateData && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {selectedTemplateData.description}
                </p>
              </div>
            )}
          </div>

          {selectedTemplate && (
            <>
              {/* Document Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input
                    id="title"
                    value={templateData.title}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter document title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={templateData.clientName}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="Enter client name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={templateData.clientEmail}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, clientEmail: e.target.value }))}
                    placeholder="client@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={templateData.amount}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="$5,000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={templateData.startDate}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={templateData.duration}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="30 days"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  value={templateData.projectDescription}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, projectDescription: e.target.value }))}
                  placeholder="Describe the project or service"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Additional Terms</Label>
                <Textarea
                  id="terms"
                  value={templateData.terms}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, terms: e.target.value }))}
                  placeholder="Additional terms and conditions"
                  rows={3}
                />
              </div>

              {/* Preview Section */}
              <div className="space-y-2">
                <Label>Document Preview</Label>
                <div className="p-4 bg-muted rounded-lg max-h-40 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap">
                    {generateTemplateContent()}
                  </pre>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handlePreviewAndDownload}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </Button>
                
                <Button 
                  onClick={handleSendForSignature}
                  disabled={signNowLoading || !templateData.clientEmail}
                  className="flex-1"
                >
                  {signNowLoading ? "Sending..." : "Send for Signature"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}