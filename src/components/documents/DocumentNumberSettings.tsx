
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
        .maybeSingle()

      if (data) {
        const prefixKey = `${documentType}_number_prefix`
        const startKey = `${documentType}_number_start`
        const autoGenerateKey = `${documentType}_auto_generate`
        
        // Get current highest number for this document type
        const { data: highestDoc } = await getHighestDocumentNumber(documentType, user.id)
        const currentMax = highestDoc || 0
        const nextNumber = Math.max(currentMax + 1, data[startKey] || 1)
        
        setSettings({
          autoGenerate: data[autoGenerateKey] !== false,
          prefix: data[prefixKey] || getDefaultPrefix(documentType),
          startNumber: data[startKey] || 1,
          currentNumber: nextNumber
        })
      } else {
        // Create initial settings for new user
        await supabase
          .from('user_settings')
          .insert({ user_id: user.id })
          .select()
          .single()

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

  const getHighestDocumentNumber = async (docType: string, userId: string) => {
    const tableMap: Record<string, string> = {
      invoice: 'invoices',
      estimate: 'estimates',
      quote: 'quotes',
      contract: 'contracts',
      workorder: 'work_orders',
      salesorder: 'sales_orders',
      proposal: 'business_proposals',
      bid: 'bids'
    }

    const tableName = tableMap[docType]
    if (!tableName) return { data: 0 }

    try {
      const numberColumn = `${docType}_number`
      const { data } = await supabase
        .from(tableName)
        .select(numberColumn)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (data && data[numberColumn]) {
        const numberMatch = data[numberColumn].match(/\d+/)
        return { data: numberMatch ? parseInt(numberMatch[0]) : 0 }
      }
      return { data: 0 }
    } catch (error) {
      console.error(`Error getting highest ${docType} number:`, error)
      return { data: 0 }
    }
  }

  const saveSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error("User not authenticated")
        return
      }

      console.log('Saving settings for user:', user.id, 'document type:', documentType)
      console.log('Settings to save:', settings)

      // Check if settings already exist
      const { data: existingSettings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      const updateData = {
        [`${documentType}_auto_generate`]: settings.autoGenerate,
        [`${documentType}_number_prefix`]: settings.prefix,
        [`${documentType}_number_start`]: settings.startNumber,
        updated_at: new Date().toISOString()
      }

      console.log('Update data:', updateData)

      let result
      if (existingSettings) {
        // Update existing record
        result = await supabase
          .from('user_settings')
          .update(updateData)
          .eq('user_id', user.id)
      } else {
        // Insert new record
        result = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            ...updateData
          })
      }

      console.log('Save result:', result)

      if (result.error) {
        console.error('Supabase error:', result.error)
        throw result.error
      }
      
      // Recalculate current number after saving
      await loadSettings()
      
      toast.success("Settings saved successfully!")
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error("Failed to save settings. Please try again.")
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
                onChange={(e) => {
                  const newStartNumber = parseInt(e.target.value) || 1
                  setSettings(prev => ({ 
                    ...prev, 
                    startNumber: newStartNumber,
                    currentNumber: Math.max(newStartNumber, prev.currentNumber)
                  }))
                }}
              />
              <p className="text-xs text-muted-foreground mt-1">
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
