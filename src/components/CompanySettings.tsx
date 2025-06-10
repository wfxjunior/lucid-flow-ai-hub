
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useCompanyData } from "@/hooks/useCompanyData"
import { Building, Mail, Phone, Globe, MapPin } from "lucide-react"

export function CompanySettings() {
  const { companyProfile, loading, createOrUpdateCompanyProfile } = useCompanyData()
  
  const [formData, setFormData] = useState({
    company_name: companyProfile?.company_name || '',
    address: companyProfile?.address || '',
    phone: companyProfile?.phone || '',
    email: companyProfile?.email || '',
    website: companyProfile?.website || ''
  })

  const [saving, setSaving] = useState(false)

  // Update form when companyProfile loads
  useState(() => {
    if (companyProfile) {
      setFormData({
        company_name: companyProfile.company_name || '',
        address: companyProfile.address || '',
        phone: companyProfile.phone || '',
        email: companyProfile.email || '',
        website: companyProfile.website || ''
      })
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await createOrUpdateCompanyProfile(formData)
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading company information...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Company Information
        </CardTitle>
        <CardDescription>
          This information will appear on your invoices and documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="company_name">Company Name *</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              placeholder="Your Company Name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="company@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourcompany.com"
            />
          </div>
          
          <div>
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Business St, Suite 100&#10;Business City, BC 12345"
              rows={3}
            />
          </div>
          
          <Button type="submit" disabled={saving || !formData.company_name}>
            {saving ? 'Saving...' : 'Save Company Information'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
