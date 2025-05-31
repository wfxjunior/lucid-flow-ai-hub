
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Sparkles } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"

interface DocumentFormProps {
  onClose: () => void
}

export function DocumentForm({ onClose }: DocumentFormProps) {
  const { createDocument } = useBusinessData()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    document_type: "contract",
    status: "draft" as const
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      await createDocument(formData)
      toast.success("Document created successfully!")
      onClose()
    } catch (error) {
      console.error("Error creating document:", error)
      toast.error("Failed to create document")
    }
  }

  const handleGenerateWithAI = async () => {
    if (!formData.title) {
      toast.error("Please enter a document title first")
      return
    }

    setIsGenerating(true)
    try {
      // This would call an AI service to generate document content
      // For now, we'll use a placeholder
      const generatedContent = `# ${formData.title}

This is an AI-generated ${formData.document_type} document.

## Terms and Conditions

1. **Parties Involved**: This agreement is between [COMPANY_NAME] and [CLIENT_NAME].

2. **Scope of Work**: [DESCRIBE_SCOPE_OF_WORK]

3. **Payment Terms**: [PAYMENT_TERMS]

4. **Duration**: This agreement is effective from [START_DATE] to [END_DATE].

5. **Responsibilities**: 
   - Company responsibilities: [COMPANY_RESPONSIBILITIES]
   - Client responsibilities: [CLIENT_RESPONSIBILITIES]

6. **Termination**: Either party may terminate this agreement with [NOTICE_PERIOD] written notice.

7. **Governing Law**: This agreement shall be governed by the laws of [JURISDICTION].

## Signature

By signing below, both parties agree to the terms and conditions outlined in this document.

**Company Representative**: _________________________ Date: _________

**Client Representative**: _________________________ Date: _________

---

*This document was generated using AI and should be reviewed by legal counsel before use.*`

      setFormData(prev => ({ ...prev, content: generatedContent }))
      toast.success("Document content generated successfully!")
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setFormData(prev => ({ ...prev, content }))
        toast.success("File uploaded successfully!")
      }
      reader.readAsText(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Document Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Service Agreement, NDA, Contract"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="document_type">Document Type</Label>
          <Select 
            value={formData.document_type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, document_type: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="agreement">Agreement</SelectItem>
              <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Document Content *</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGenerateWithAI}
              disabled={isGenerating}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Upload File
              </Button>
            </div>
          </div>
        </div>
        
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Enter document content or generate with AI..."
          className="min-h-[300px] font-mono text-sm"
          required
        />
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-purple-700">
            <Sparkles className="h-4 w-4" />
            AI Document Generation - Premium Feature
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-purple-600">
            Generate professional contracts and agreements using AI. This premium feature creates 
            customized documents based on your requirements and industry best practices.
          </CardDescription>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          <FileText className="h-4 w-4 mr-2" />
          Create Document
        </Button>
      </div>
    </form>
  )
}
