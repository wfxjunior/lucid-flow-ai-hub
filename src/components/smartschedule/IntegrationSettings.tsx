
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Settings, Save, RefreshCw, Link, Heart, Users, Car } from 'lucide-react'

interface IntegrationSetting {
  sync_next_projects: boolean
  sync_car_rental: boolean
  send_aftercare_completion: boolean
  autofill_client_manager: boolean
}

export const IntegrationSettings = () => {
  const [settings, setSettings] = useState<IntegrationSetting>({
    sync_next_projects: true,
    sync_car_rental: true,
    send_aftercare_completion: true,
    autofill_client_manager: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('smart_schedule_settings')
        .select('*')
        .eq('user_id', user.user.id)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error
      }

      if (data) {
        setSettings({
          sync_next_projects: data.sync_next_projects,
          sync_car_rental: data.sync_car_rental,
          send_aftercare_completion: data.send_aftercare_completion,
          autofill_client_manager: data.autofill_client_manager
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast({
        title: "Error",
        description: "Failed to fetch integration settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('smart_schedule_settings')
        .upsert({
          user_id: user.user.id,
          ...settings,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Success",
        description: "Integration settings saved successfully!"
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error",
        description: "Failed to save integration settings",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof IntegrationSetting, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Settings className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading integration settings...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Settings className="h-5 w-5" />
            Integration Settings
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure how SmartSchedule integrates with other business tools
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Next Projects Integration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  <Label htmlFor="sync_next_projects" className="text-base font-medium">
                    Sync with Next Projects
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically create SmartSchedule entries when Next Projects are confirmed
                </p>
              </div>
              <Switch
                id="sync_next_projects"
                checked={settings.sync_next_projects}
                onCheckedChange={(checked) => updateSetting('sync_next_projects', checked)}
              />
            </div>
            {settings.sync_next_projects && (
              <div className="bg-blue-50 p-3 rounded-lg text-sm">
                <p className="font-medium text-blue-900">Active Integration</p>
                <p className="text-blue-700">
                  When a Next Project is marked as "Confirmed", a corresponding schedule entry 
                  will be automatically created with client details, service type, and assigned workers.
                </p>
              </div>
            )}
          </div>

          {/* Car Rental Integration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-green-500" />
                  <Label htmlFor="sync_car_rental" className="text-base font-medium">
                    Sync with Car Rental
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Auto-create pickup and return schedule entries for car rentals
                </p>
              </div>
              <Switch
                id="sync_car_rental"
                checked={settings.sync_car_rental}
                onCheckedChange={(checked) => updateSetting('sync_car_rental', checked)}
              />
            </div>
            {settings.sync_car_rental && (
              <div className="bg-green-50 p-3 rounded-lg text-sm">
                <p className="font-medium text-green-900">Active Integration</p>
                <p className="text-green-700">
                  Car rental bookings will generate two schedule entries: vehicle pickup and return, 
                  including vehicle ID, customer details, and location information.
                </p>
              </div>
            )}
          </div>

          {/* AfterCare Integration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <Label htmlFor="send_aftercare_completion" className="text-base font-medium">
                    Send AfterCare on Completion
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically send feedback forms to clients when jobs are completed
                </p>
              </div>
              <Switch
                id="send_aftercare_completion"
                checked={settings.send_aftercare_completion}
                onCheckedChange={(checked) => updateSetting('send_aftercare_completion', checked)}
              />
            </div>
            {settings.send_aftercare_completion && (
              <div className="bg-pink-50 p-3 rounded-lg text-sm">
                <p className="font-medium text-pink-900">Active Integration</p>
                <p className="text-pink-700">
                  When a schedule is marked as "Completed", an AfterCare feedback form 
                  will be automatically sent to the client for service evaluation.
                </p>
              </div>
            )}
          </div>

          {/* Client Manager Integration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <Label htmlFor="autofill_client_manager" className="text-base font-medium">
                    Auto-fill from Client Manager
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically populate client address and service history
                </p>
              </div>
              <Switch
                id="autofill_client_manager"
                checked={settings.autofill_client_manager}
                onCheckedChange={(checked) => updateSetting('autofill_client_manager', checked)}
              />
            </div>
            {settings.autofill_client_manager && (
              <div className="bg-purple-50 p-3 rounded-lg text-sm">
                <p className="font-medium text-purple-900">Active Integration</p>
                <p className="text-purple-700">
                  When selecting a client, their address and historical service data 
                  will be automatically populated from the Client Management system.
                </p>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t">
            <Button onClick={saveSettings} disabled={saving} className="w-full">
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving Settings...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Integration Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Link className="h-4 w-4" />
            Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Next Projects</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${settings.sync_next_projects ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Car Rental</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${settings.sync_car_rental ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" />
                <span className="text-sm font-medium">AfterCare</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${settings.send_aftercare_completion ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Client Manager</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${settings.autofill_client_manager ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
