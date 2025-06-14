
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface DocumentNumberSettingsProps {
  documentType: string
}

const getDefaultPrefix = (type: string) => {
  const prefixes: Record<string, string> = {
    invoice: 'INV-',
    estimate: 'EST-',
    quote: 'QUO-',
    contract: 'CON-',
    workorder: 'WO-',
    salesorder: 'SO-',
    proposal: 'PRO-',
    bid: 'BID-'
  }
  return prefixes[type] || 'DOC-'
}

export function DocumentNumberSettings({ documentType }: DocumentNumberSettingsProps) {
  const [settings, setSettings] = useState({
    autoGenerate: true,
    prefix: '',
    startNumber: 1,
    currentNumber: 1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [documentType])

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        const prefixKey = `${documentType}_number_prefix`
        const startKey = `${documentType}_number_start`
        
        setSettings({
          autoGenerate: data[`${documentType}_auto_generate`] !== false,
          prefix: data[prefixKey] || getDefaultPrefix(documentType),
          startNumber: data[startKey] || 1,
          currentNumber: data[startKey] || 1
        })
      } else {
        setSettings({
          autoGenerate: true,
          prefix: getDefaultPrefix(documentType),
          startNumber: 1,
          currentNumber: 1
        })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const updateData = {
        [`${documentType}_auto_generate`]: settings.autoGenerate,
        [`${documentType}_number_prefix`]: settings.prefix,
        [`${documentType}_number_start`]: settings.startNumber,
      }

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          ...updateData
        })

      if (error) throw error
      
      toast.success("Settings saved successfully!")
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error("Failed to save settings")
    }
  }

  if (loading) {
    return <div>Loading settings...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {documentType.charAt(0).toUpperCase() + documentType.slice(1)} Number Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Auto-generate numbers</Label>
            <p className="text-xs text-gray-500">
              Automatically generate document numbers when creating new documents
            </p>
          </div>
          <Switch
            checked={settings.autoGenerate}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, autoGenerate: checked }))
            }
          />
        </div>

        {settings.autoGenerate && (
          <>
            <div>
              <Label htmlFor="prefix">Number Prefix</Label>
              <Input
                id="prefix"
                value={settings.prefix}
                onChange={(e) => 
                  setSettings(prev => ({ ...prev, prefix: e.target.value }))
                }
                placeholder="e.g., INV-, EST-"
              />
            </div>

            <div>
              <Label htmlFor="startNumber">Starting Number</Label>
              <Input
                id="startNumber"
                type="number"
                min="1"
                value={settings.startNumber}
                onChange={(e) => 
                  setSettings(prev => ({ ...prev, startNumber: parseInt(e.target.value) || 1 }))
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Next {documentType} will be: {settings.prefix}{String(settings.currentNumber).padStart(4, '0')}
              </p>
            </div>
          </>
        )}

        <Button onClick={saveSettings} className="w-full">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  )
}
