
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CompanySettings } from "./CompanySettings"
import { DocumentNumberSettings } from "./documents/DocumentNumberSettings"
import { SubscriptionStatus } from "./pricing/SubscriptionStatus"
import { useState, useEffect } from "react"
import { useAuthState } from "@/hooks/useAuthState"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Shield, Key, Bell, CreditCard, FileText, Building, Settings as SettingsIcon, User, Lock, Mail, Smartphone } from "lucide-react"

interface UserProfile {
  id: string
  first_name?: string
  last_name?: string
  phone?: string
  timezone?: string
  language?: string
}

interface NotificationSettings {
  email_notifications: boolean
  push_notifications: boolean
  marketing_emails: boolean
  security_alerts: boolean
  invoice_reminders: boolean
  payment_confirmations: boolean
}

export function SettingsPage() {
  const { user } = useAuthState()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_notifications: true,
    push_notifications: false,
    marketing_emails: false,
    security_alerts: true,
    invoice_reminders: true,
    payment_confirmations: true
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const documentTypes = [
    'invoice', 'estimate', 'quote', 'contract', 
    'workorder', 'salesorder', 'proposal', 'bid'
  ]

  useEffect(() => {
    if (user) {
      loadUserProfile()
      loadNotificationSettings()
    }
  }, [user])

  const loadUserProfile = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const loadNotificationSettings = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('user_notification_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading notification settings:', error)
        return
      }
      
      if (data) {
        setNotifications({
          email_notifications: data.email_notifications ?? true,
          push_notifications: data.push_notifications ?? false,
          marketing_emails: data.marketing_emails ?? false,
          security_alerts: data.security_alerts ?? true,
          invoice_reminders: data.invoice_reminders ?? true,
          payment_confirmations: data.payment_confirmations ?? true
        })
      }
    } catch (error) {
      console.error('Error loading notification settings:', error)
    }
  }

  const updateProfile = async () => {
    if (!user || !profile) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const updateNotificationSettings = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('user_notification_settings')
        .upsert({
          user_id: user.id,
          ...notifications,
          updated_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      toast.success('Configurações de notificação atualizadas!')
    } catch (error) {
      console.error('Error updating notifications:', error)
      toast.error('Erro ao atualizar notificações')
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async () => {
    if (!user?.email) return
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth?action=reset-password`
      })
      
      if (error) throw error
      
      toast.success('Email de redefinição de senha enviado!')
    } catch (error) {
      console.error('Error sending password reset:', error)
      toast.error('Erro ao enviar email de redefinição')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-xl text-gray-600">
          Manage your account and application preferences
        </p>
      </div>

      {/* Main Settings Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile?.first_name || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, first_name: e.target.value } : null)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile?.last_name || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, last_name: e.target.value } : null)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-gray-500">
                  Email cannot be changed. Contact support if you need to update it.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile?.phone || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={profile?.timezone || ''} onValueChange={(value) => setProfile(prev => prev ? { ...prev, timezone: value } : null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="America/Sao_Paulo">Brasília Time (BRT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={profile?.language || 'en'} onValueChange={(value) => setProfile(prev => prev ? { ...prev, language: value } : null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={updateProfile} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>

        {/* Documents Settings */}
        <TabsContent value="documents">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Number Settings
                </CardTitle>
                <CardDescription>
                  Configure automatic number generation for all document types
                </CardDescription>
              </CardHeader>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {documentTypes.map((docType) => (
                <DocumentNumberSettings key={docType} documentType={docType} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription>
                  Manage your subscription and payment methods
                </CardDescription>
              </CardHeader>
            </Card>
            
            <SubscriptionStatus />
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-medium">Email Notifications</span>
                    </div>
                    <p className="text-sm text-gray-500">Receive important updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email_notifications}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email_notifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span className="font-medium">Push Notifications</span>
                    </div>
                    <p className="text-sm text-gray-500">Get instant notifications on your device</p>
                  </div>
                  <Switch
                    checked={notifications.push_notifications}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push_notifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-medium">Marketing Emails</span>
                    <p className="text-sm text-gray-500">Receive product updates and tips</p>
                  </div>
                  <Switch
                    checked={notifications.marketing_emails}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing_emails: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Security Alerts</span>
                      <Badge variant="secondary" className="text-xs">Recommended</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Important security and login notifications</p>
                  </div>
                  <Switch
                    checked={notifications.security_alerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, security_alerts: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-medium">Invoice Reminders</span>
                    <p className="text-sm text-gray-500">Reminders for overdue invoices</p>
                  </div>
                  <Switch
                    checked={notifications.invoice_reminders}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, invoice_reminders: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-medium">Payment Confirmations</span>
                    <p className="text-sm text-gray-500">Confirmations when payments are received</p>
                  </div>
                  <Switch
                    checked={notifications.payment_confirmations}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, payment_confirmations: checked }))}
                  />
                </div>
              </div>

              <Button onClick={updateNotificationSettings} disabled={loading}>
                {loading ? 'Saving...' : 'Save Notification Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Password</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Update your password to keep your account secure
                    </p>
                    <Button onClick={changePassword} variant="outline" className="w-full">
                      Change Password
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold">Two-Factor Authentication</h3>
                      <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline" className="w-full" disabled>
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Account Information</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Account Email</Label>
                    <div className="flex items-center gap-2">
                      <Input value={user?.email || ''} disabled className="bg-gray-50" />
                      <Badge variant={user?.email_confirmed_at ? "default" : "secondary"}>
                        {user?.email_confirmed_at ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Account Created</Label>
                    <Input 
                      value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''} 
                      disabled 
                      className="bg-gray-50" 
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-red-600">Danger Zone</h4>
                <Card className="border-red-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h5 className="font-medium text-red-800">Delete Account</h5>
                      <p className="text-sm text-red-600">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm" disabled>
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
