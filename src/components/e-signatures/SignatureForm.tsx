
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SignatureFormProps {
  onSubmit: (formData: { signerEmail: string; signerName: string }) => void
  onCancel: () => void
  isLoading: boolean
}

export function SignatureForm({ onSubmit, onCancel, isLoading }: SignatureFormProps) {
  const [formData, setFormData] = useState({
    signerEmail: '',
    signerName: ''
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signerEmail">Signer Email *</Label>
        <Input
          id="signerEmail"
          type="email"
          value={formData.signerEmail}
          onChange={(e) => setFormData(prev => ({ ...prev, signerEmail: e.target.value }))}
          placeholder="client@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signerName">Signer Name (Optional)</Label>
        <Input
          id="signerName"
          value={formData.signerName}
          onChange={(e) => setFormData(prev => ({ ...prev, signerName: e.target.value }))}
          placeholder="John Doe"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !formData.signerEmail}
          className="w-full sm:w-auto"
        >
          {isLoading ? "Sending..." : "Send for Signature"}
        </Button>
      </div>
    </div>
  )
}
