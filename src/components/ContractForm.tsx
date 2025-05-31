
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, FileText, Upload, Save, Wand2 } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"

interface ContractFormProps {
  contract?: any
  onClose: () => void
}

export function ContractForm({ contract, onClose }: ContractFormProps) {
  const { createContract, updateContract } = useBusinessData()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    contract_type: "custom",
    status: "draft",
    tags: [] as string[],
    is_template: false
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    if (contract) {
      setFormData({
        title: contract.title || "",
        content: contract.content || "",
        contract_type: contract.contract_type || "custom",
        status: contract.status || "draft",
        tags: contract.tags || [],
        is_template: contract.is_template || false
      })
    }
  }, [contract])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      if (contract?.id) {
        await updateContract(contract.id, formData)
        toast.success("Contract updated successfully!")
      } else {
        await createContract(formData)
        toast.success("Contract created successfully!")
      }
      onClose()
    } catch (error) {
      console.error("Error saving contract:", error)
      toast.error("Failed to save contract")
    }
  }

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please describe what kind of contract you need")
      return
    }

    setIsGenerating(true)
    try {
      // This would call an AI service to generate contract content
      // For now, we'll use a more sophisticated placeholder
      const contractTemplates: Record<string, string> = {
        service: `# SERVICE AGREEMENT

**Effective Date:** [DATE]
**Between:** [COMPANY_NAME] ("Service Provider") and [CLIENT_NAME] ("Client")

## 1. SCOPE OF SERVICES
The Service Provider agrees to provide the following services:
${aiPrompt}

## 2. PAYMENT TERMS
- Total Contract Value: $[AMOUNT]
- Payment Schedule: [PAYMENT_SCHEDULE]
- Late Payment Fee: [LATE_FEE]%

## 3. TIMELINE
- Project Start Date: [START_DATE]
- Expected Completion: [END_DATE]
- Milestones: [MILESTONES]

## 4. RESPONSIBILITIES
**Service Provider:**
- Deliver services as specified
- Maintain professional standards
- Provide regular updates

**Client:**
- Provide necessary information and resources
- Make payments on time
- Review and approve deliverables promptly

## 5. INTELLECTUAL PROPERTY
All work product created under this agreement shall be owned by [OWNER].

## 6. CONFIDENTIALITY
Both parties agree to maintain confidentiality of sensitive information.

## 7. TERMINATION
Either party may terminate this agreement with [NOTICE_PERIOD] days written notice.

## 8. GOVERNING LAW
This agreement shall be governed by the laws of [JURISDICTION].

**Signatures:**
Service Provider: _________________________ Date: _________
Client: _________________________ Date: _________`,

        nda: `# NON-DISCLOSURE AGREEMENT (NDA)

**Effective Date:** [DATE]
**Between:** [DISCLOSING_PARTY] and [RECEIVING_PARTY]

## PURPOSE
The purpose of this agreement is to protect confidential information related to:
${aiPrompt}

## 1. DEFINITION OF CONFIDENTIAL INFORMATION
Confidential Information includes all non-public, proprietary information including but not limited to:
- Business plans and strategies
- Financial information
- Customer lists and data
- Technical specifications
- Trade secrets

## 2. OBLIGATIONS
The Receiving Party agrees to:
- Keep all Confidential Information strictly confidential
- Not disclose to any third parties
- Use information solely for the stated purpose
- Return or destroy information upon request

## 3. EXCEPTIONS
This agreement does not apply to information that:
- Is publicly available
- Was known prior to disclosure
- Is independently developed
- Is required to be disclosed by law

## 4. TERM
This agreement shall remain in effect for [DURATION] years from the effective date.

## 5. REMEDIES
Breach of this agreement may result in irreparable harm, and the Disclosing Party shall be entitled to seek injunctive relief.

**Signatures:**
Disclosing Party: _________________________ Date: _________
Receiving Party: _________________________ Date: _________`,

        employment: `# EMPLOYMENT AGREEMENT

**Effective Date:** [DATE]
**Employee:** [EMPLOYEE_NAME]
**Employer:** [COMPANY_NAME]

## 1. POSITION AND DUTIES
Position: ${aiPrompt}
- Job responsibilities: [RESPONSIBILITIES]
- Reporting to: [SUPERVISOR]
- Work location: [LOCATION]

## 2. COMPENSATION
- Base Salary: $[AMOUNT] per [PERIOD]
- Benefits: [BENEFITS]
- Bonus: [BONUS_STRUCTURE]

## 3. WORK SCHEDULE
- Standard hours: [HOURS] per week
- Schedule: [SCHEDULE]
- Overtime: [OVERTIME_POLICY]

## 4. BENEFITS
- Health insurance
- Vacation days: [VACATION_DAYS]
- Sick leave: [SICK_DAYS]
- Other benefits: [OTHER_BENEFITS]

## 5. CONFIDENTIALITY
Employee agrees to maintain confidentiality of company information.

## 6. TERMINATION
- At-will employment
- Notice period: [NOTICE_PERIOD]
- Severance: [SEVERANCE_TERMS]

## 7. NON-COMPETE
Employee agrees not to compete with company for [DURATION] after termination within [GEOGRAPHIC_AREA].

**Signatures:**
Employee: _________________________ Date: _________
Employer: _________________________ Date: _________`
      }

      const selectedTemplate = contractTemplates[formData.contract_type] || contractTemplates.service
      
      setFormData(prev => ({ 
        ...prev, 
        content: selectedTemplate,
        title: formData.title || `${formData.contract_type.charAt(0).toUpperCase() + formData.contract_type.slice(1)} Agreement`
      }))
      
      toast.success("Contract generated successfully! Please review and customize as needed.")
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate contract")
    } finally {
      setIsGenerating(false)
      setAiPrompt("")
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

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput.trim()] 
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* AI Generation Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
            <Sparkles className="h-5 w-5" />
            AI Contract Generator
          </CardTitle>
          <CardDescription className="text-purple-600">
            Describe your contract needs and let AI generate a professional template
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 'Website development contract for e-commerce site' or 'Freelance graphic design agreement'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleGenerateWithAI}
              disabled={isGenerating || !aiPrompt.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Contract Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Service Agreement, NDA, Employment Contract"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contract_type">Contract Type</Label>
          <Select 
            value={formData.contract_type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, contract_type: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="service">Service Agreement</SelectItem>
              <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
              <SelectItem value="employment">Employment Contract</SelectItem>
              <SelectItem value="consulting">Consulting Agreement</SelectItem>
              <SelectItem value="vendor">Vendor Agreement</SelectItem>
              <SelectItem value="licensing">Licensing Agreement</SelectItem>
              <SelectItem value="custom">Custom Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="is_template">Template Options</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_template"
              checked={formData.is_template}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_template: checked as boolean }))}
            />
            <Label htmlFor="is_template" className="text-sm">
              Save as template for future use
            </Label>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Add a tag (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button type="button" onClick={addTag} variant="outline" size="sm">
            Add
          </Button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                {tag} ×
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Contract Content *</Label>
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
        
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Enter contract content, upload a file, or generate with AI..."
          className="min-h-[400px] font-mono text-sm"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {contract ? "Update Contract" : "Create Contract"}
        </Button>
      </div>
    </form>
  )
}
