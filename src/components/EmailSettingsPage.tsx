
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Settings, History, TestTube, Save, Trash2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { useAuthState } from '@/hooks/useAuthState'

interface EmailSettings {
  id?: string
  provider: string
  from_email: string
  from_name: string
  api_key: string
  is_active: boolean
}

interface EmailLog {
  id: string
  recipient_email: string
  recipient_name?: string
  subject: string
  email_type: string
  sent_at: string
  status: string
  error_message?: string
}

export function EmailSettingsPage() {
  const { user } = useAuthState()
  const [settings, setSettings] = useState<EmailSettings>({
    provider: 'resend',
    from_email: '',
    from_name: '',
    api_key: '',
    is_active: true
  })
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([])
  const [loading, setLoading] = useState(false)
  const [testLoading, setTestLoading] = useState(false)
  const [testEmail, setTestEmail] = useState('')

  useEffect(() => {
    if (user) {
      loadEmailSettings()
      loadEmailLogs()
    }
  }, [user])

  const loadEmailSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_email_settings')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setSettings(data)
      }
    } catch (error: any) {
      console.error('Error loading email settings:', error)
      toast.error('Erro ao carregar configurações de email')
    }
  }

  const loadEmailLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('user_email_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('sent_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setEmailLogs(data || [])
    } catch (error: any) {
      console.error('Error loading email logs:', error)
    }
  }

  const handleSave = async () => {
    if (!user) return

    setLoading(true)
    try {
      // First, deactivate any existing settings
      if (settings.id) {
        await supabase
          .from('user_email_settings')
          .update({ is_active: false })
          .eq('user_id', user.id)
      }

      // Insert new settings
      const { error } = await supabase
        .from('user_email_settings')
        .insert({
          user_id: user.id,
          provider: settings.provider,
          from_email: settings.from_email,
          from_name: settings.from_name,
          api_key: settings.api_key,
          is_active: true
        })

      if (error) throw error

      toast.success('Configurações de email salvas com sucesso!')
      loadEmailSettings()
    } catch (error: any) {
      console.error('Error saving email settings:', error)
      toast.error('Erro ao salvar configurações de email')
    } finally {
      setLoading(false)
    }
  }

  const handleTestEmail = async () => {
    if (!testEmail || !settings.from_email) {
      toast.error('Por favor, configure o email e digite um email para teste')
      return
    }

    setTestLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('send-user-email', {
        body: {
          to: testEmail,
          subject: 'Email de Teste - FeatherBiz',
          content: `
            <h2>Email de Teste</h2>
            <p>Este é um email de teste enviado através das suas configurações personalizadas.</p>
            <p><strong>Remetente:</strong> ${settings.from_name} (${settings.from_email})</p>
            <p><strong>Provedor:</strong> ${settings.provider}</p>
            <p>Se você recebeu este email, suas configurações estão funcionando corretamente!</p>
          `,
          emailType: 'test'
        }
      })

      if (error) throw error

      toast.success('Email de teste enviado com sucesso!')
      setTestEmail('')
      loadEmailLogs()
    } catch (error: any) {
      console.error('Error sending test email:', error)
      toast.error('Erro ao enviar email de teste: ' + error.message)
    } finally {
      setTestLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!settings.id) return

    if (!confirm('Tem certeza que deseja deletar suas configurações de email?')) return

    try {
      const { error } = await supabase
        .from('user_email_settings')
        .delete()
        .eq('id', settings.id)

      if (error) throw error

      setSettings({
        provider: 'resend',
        from_email: '',
        from_name: '',
        api_key: '',
        is_active: true
      })

      toast.success('Configurações deletadas com sucesso!')
    } catch (error: any) {
      console.error('Error deleting email settings:', error)
      toast.error('Erro ao deletar configurações')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações de Email</h1>
          <p className="text-muted-foreground">
            Configure suas credenciais de email para enviar mensagens aos seus clientes
          </p>
        </div>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Teste
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configurações do Provedor de Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Configure suas credenciais de email para enviar mensagens personalizadas aos seus clientes.
                  Recomendamos usar Resend para facilidade de uso.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="provider">Provedor de Email</Label>
                  <Select value={settings.provider} onValueChange={(value) => setSettings({ ...settings, provider: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resend">Resend</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="from_name">Nome do Remetente</Label>
                  <Input
                    id="from_name"
                    value={settings.from_name}
                    onChange={(e) => setSettings({ ...settings, from_name: e.target.value })}
                    placeholder="Seu Nome ou Empresa"
                  />
                </div>

                <div>
                  <Label htmlFor="from_email">Email do Remetente</Label>
                  <Input
                    id="from_email"
                    type="email"
                    value={settings.from_email}
                    onChange={(e) => setSettings({ ...settings, from_email: e.target.value })}
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="api_key">API Key do Provedor</Label>
                  <Input
                    id="api_key"
                    type="password"
                    value={settings.api_key}
                    onChange={(e) => setSettings({ ...settings, api_key: e.target.value })}
                    placeholder="Sua chave de API"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={settings.is_active}
                  onCheckedChange={(checked) => setSettings({ ...settings, is_active: checked })}
                />
                <Label htmlFor="is_active">Configuração ativa</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} disabled={loading} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
                {settings.id && (
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testar Configurações de Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Envie um email de teste para verificar se suas configurações estão funcionando corretamente.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="test_email">Email para Teste</Label>
                <Input
                  id="test_email"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="email@teste.com"
                />
              </div>

              <Button 
                onClick={handleTestEmail} 
                disabled={testLoading || !settings.from_email}
                className="w-full"
              >
                <TestTube className="mr-2 h-4 w-4" />
                {testLoading ? 'Enviando...' : 'Enviar Email de Teste'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Emails Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              {emailLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum email foi enviado ainda
                </div>
              ) : (
                <div className="space-y-4">
                  {emailLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{log.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            Para: {log.recipient_name ? `${log.recipient_name} (${log.recipient_email})` : log.recipient_email}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs ${
                            log.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {log.status === 'sent' ? 'Enviado' : 'Erro'}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(log.sent_at).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      {log.error_message && (
                        <Alert className="mt-2">
                          <AlertDescription className="text-sm">
                            {log.error_message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
