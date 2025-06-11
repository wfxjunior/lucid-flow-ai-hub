
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Globe, Mail, Calculator } from 'lucide-react'

interface TaxSettingsProps {
  country: string
  onCountryChange: (country: string) => void
}

export function TaxSettings({ country, onCountryChange }: TaxSettingsProps) {
  const [settings, setSettings] = useState({
    businessName: "FeatherBiz LLC",
    taxId: "12-3456789",
    fiscalYearEnd: "December",
    emailReminders: true,
    autoClassification: true,
    reminderDays: "7",
    defaultTaxRate: "25",
    emailAddress: "user@featherbiz.com"
  })

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" }
  ]

  const fiscalYearOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription>
            Configure your business details for tax purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) => setSettings({...settings, businessName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="taxId">Tax ID / EIN</Label>
              <Input
                id="taxId"
                value={settings.taxId}
                onChange={(e) => setSettings({...settings, taxId: e.target.value})}
              />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={country} onValueChange={onCountryChange}>
                <SelectTrigger>
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fiscalYear">Fiscal Year End</Label>
              <Select value={settings.fiscalYearEnd} onValueChange={(value) => setSettings({...settings, fiscalYearEnd: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fiscalYearOptions.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Preferences
          </CardTitle>
          <CardDescription>
            Configure automatic tax calculations and classifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoClassification">Automatic Transaction Classification</Label>
              <p className="text-sm text-gray-600">
                Automatically classify transactions based on description and amount
              </p>
            </div>
            <Switch
              id="autoClassification"
              checked={settings.autoClassification}
              onCheckedChange={(checked) => setSettings({...settings, autoClassification: checked})}
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
            <Input
              id="defaultTaxRate"
              type="number"
              value={settings.defaultTaxRate}
              onChange={(e) => setSettings({...settings, defaultTaxRate: e.target.value})}
              className="mt-1"
            />
            <p className="text-sm text-gray-600 mt-1">
              Used for estimated tax calculations (varies by {country} tax brackets)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure email alerts and reminders for tax deadlines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailReminders">Email Reminders</Label>
              <p className="text-sm text-gray-600">
                Receive email notifications for upcoming tax deadlines
              </p>
            </div>
            <Switch
              id="emailReminders"
              checked={settings.emailReminders}
              onCheckedChange={(checked) => setSettings({...settings, emailReminders: checked})}
            />
          </div>

          {settings.emailReminders && (
            <>
              <Separator />
              
              <div>
                <Label htmlFor="emailAddress">Email Address</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={settings.emailAddress}
                  onChange={(e) => setSettings({...settings, emailAddress: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="reminderDays">Reminder Days Before Deadline</Label>
                <Select value={settings.reminderDays} onValueChange={(value) => setSettings({...settings, reminderDays: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button>
          Save Settings
        </Button>
      </div>
    </div>
  )
}
