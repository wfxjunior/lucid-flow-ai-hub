import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Upload, FileText, Sparkles, Tag, X } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface ContractFormProps {
  onClose: () => void
  contract?: any
}

export function ContractForm({ onClose, contract }: ContractFormProps) {
  const { createContract, updateContract } = useBusinessData()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    contract_type: "custom",
    status: "draft" as const,
    tags: [] as string[],
    is_template: false
  })
  const [newTag, setNewTag] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

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
      if (contract) {
        await updateContract({ id: contract.id, ...formData })
        toast.success("Contract updated successfully!")
      } else {
        if (formData.is_template) {
          await createContract({ ...formData, status: "active" as const })
        } else {
          await createContract(formData)
        }
        toast.success("Contract created successfully!")
      }
      onClose()
    } catch (error) {
      console.error("Error saving contract:", error)
      toast.error("Failed to save contract")
    }
  }

  const handleGenerateWithAI = async () => {
    if (!formData.title) {
      toast.error("Please enter a contract title first")
      return
    }

    setIsGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-contract-ai', {
        body: {
          prompt: `Create a ${formData.contract_type} contract titled "${formData.title}"`,
          contractType: formData.contract_type,
          businessType: 'General business'
        }
      })

      if (error) throw error
      
      setFormData(prev => ({ ...prev, content: data.contract }))
      toast.success("Contract generated successfully!")
    } catch (error) {
      console.error("Error generating contract:", error)
      toast.error("Failed to generate contract. Using template instead.")
      
      // Fallback template
      const template = `# ${formData.title}

This ${formData.contract_type} contract outlines the terms and conditions between the parties involved.

## 1. Parties
- **Company**: [COMPANY_NAME]
- **Client**: [CLIENT_NAME]

## 2. Scope of Work
[DESCRIBE_THE_SCOPE_OF_WORK]

## 3. Terms and Conditions
[SPECIFY_TERMS_AND_CONDITIONS]

## 4. Payment Terms
[PAYMENT_TERMS]

## 5. Duration
This contract is effective from [START_DATE] to [END_DATE].

## 6. Termination
Either party may terminate this contract with [NOTICE_PERIOD] written notice.

## 7. Signatures
By signing below, both parties agree to the terms outlined in this contract.

**Company Representative**: _________________________ Date: _________

**Client Representative**: _________________________ Date: _________`

      setFormData(prev => ({ ...prev, content: template }))
    } finally {
      setIsGenerating(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
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
          <Label htmlFor="title">Contract Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Service Agreement, Freelance Contract"
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
              <SelectItem value="employment">Employment Contract</SelectItem>
              <SelectItem value="freelance">Freelance Contract</SelectItem>
              <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
              <SelectItem value="partnership">Partnership Agreement</SelectItem>
              <SelectItem value="custom">Custom Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <Label htmlFor="content">Contract Content *</Label>
          <div className="flex gap-2 flex-wrap">
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
          placeholder="Enter contract content or generate with AI..."
          className="min-h-[300px] font-mono text-sm"
          required
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <Button type="button" onClick={addTag} size="sm">
              <Tag className="h-4 w-4" />
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_template"
            checked={formData.is_template}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_template: checked }))}
          />
          <Label htmlFor="is_template">Save as template</Label>
        </div>
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-purple-700">
            <Sparkles className="h-4 w-4" />
            AI Contract Generation - Premium Feature
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-purple-600">
            Generate professional contracts using AI. This premium feature creates customized 
            contracts based on your requirements and industry best practices.
          </CardDescription>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          <FileText className="h-4 w-4 mr-2" />
          {contract ? "Update Contract" : "Create Contract"}
        </Button>
      </div>
    </form>
  )
}
