
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Type, Mail, Phone, Calendar, CheckSquare } from "lucide-react"
import { toast } from "sonner"

interface FormField {
  id: string
  type: 'text' | 'email' | 'phone' | 'date' | 'textarea' | 'select' | 'checkbox'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

interface FormData {
  title: string
  description: string
  fields: FormField[]
}

export function FormBuilder() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    fields: []
  })

  const fieldTypes = [
    { value: 'text', label: 'Text Input', icon: Type },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
    { value: 'date', label: 'Date', icon: Calendar },
    { value: 'textarea', label: 'Long Text', icon: Type },
    { value: 'select', label: 'Dropdown', icon: CheckSquare },
    { value: 'checkbox', label: 'Checkbox', icon: CheckSquare }
  ]

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: type === 'email' ? 'Enter email address' : `Enter ${type}`,
      required: false,
      options: type === 'select' ? ['Option 1', 'Option 2'] : undefined
    }
    
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }))
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }))
  }

  const removeField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }))
  }

  const saveForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a form title')
      return
    }

    if (formData.fields.length === 0) {
      toast.error('Please add at least one field')
      return
    }

    console.log('Saving form:', formData)
    toast.success('Form created successfully!')
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      fields: []
    })
  }

  return (
    <div className="space-y-6">
      {/* Form Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Form Settings</CardTitle>
          <CardDescription>Configure your form's basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="formTitle">Form Title *</Label>
            <Input
              id="formTitle"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Contact Form"
            />
          </div>
          <div>
            <Label htmlFor="formDescription">Form Description</Label>
            <Textarea
              id="formDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of this form"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Field Types */}
      <Card>
        <CardHeader>
          <CardTitle>Add Fields</CardTitle>
          <CardDescription>Click on a field type to add it to your form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fieldTypes.map((fieldType) => (
              <Button
                key={fieldType.value}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => addField(fieldType.value as FormField['type'])}
              >
                <fieldType.icon className="h-5 w-5" />
                <span className="text-sm">{fieldType.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      {formData.fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Form Fields ({formData.fields.length})</CardTitle>
            <CardDescription>Configure your form fields</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Field {index + 1}: {field.type}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeField(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Field Label *</Label>
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      placeholder="Field label"
                    />
                  </div>
                  
                  {field.type !== 'checkbox' && (
                    <div>
                      <Label>Placeholder</Label>
                      <Input
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        placeholder="Placeholder text"
                      />
                    </div>
                  )}
                </div>

                {field.type === 'select' && (
                  <div>
                    <Label>Options (one per line)</Label>
                    <Textarea
                      value={field.options?.join('\n') || ''}
                      onChange={(e) => updateField(field.id, { 
                        options: e.target.value.split('\n').filter(opt => opt.trim()) 
                      })}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`required_${field.id}`}
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor={`required_${field.id}`}>Required field</Label>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Form Preview */}
      {formData.fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Form Preview</CardTitle>
            <CardDescription>Preview how your form will look</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <div>
                <h3 className="text-lg font-semibold">{formData.title || 'Untitled Form'}</h3>
                {formData.description && (
                  <p className="text-sm text-muted-foreground mt-1">{formData.description}</p>
                )}
              </div>
              
              {formData.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  
                  {field.type === 'textarea' ? (
                    <Textarea placeholder={field.placeholder} rows={3} disabled />
                  ) : field.type === 'select' ? (
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                    </Select>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" disabled className="rounded" />
                      <span className="text-sm">{field.label}</span>
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled
                    />
                  )}
                </div>
              ))}
              
              <Button disabled className="w-full">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Form */}
      <div className="flex justify-end">
        <Button onClick={saveForm} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>
    </div>
  )
}
