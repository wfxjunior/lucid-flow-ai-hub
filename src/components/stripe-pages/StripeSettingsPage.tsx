
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { Settings, User, Bell, Shield, CreditCard, Mail } from "lucide-react"

export function StripeSettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  const tabs = [
    { id: "account", label: "Account" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
    { id: "security", label: "Security" },
    { id: "integrations", label: "Integrations" }
  ]

  const settingsGroups = [
    {
      title: "Profile Information",
      icon: User,
      settings: [
        { name: "Business Name", value: "FeatherBiz LLC", type: "text" },
        { name: "Email Address", value: "contact@featherbiz.com", type: "email" },
        { name: "Phone Number", value: "+1 (555) 123-4567", type: "phone" }
      ]
    },
    {
      title: "Notification Preferences", 
      icon: Bell,
      settings: [
        { name: "Email Notifications", value: true, type: "toggle" },
        { name: "SMS Alerts", value: false, type: "toggle" },
        { name: "Weekly Reports", value: true, type: "toggle" }
      ]
    },
    {
      title: "Security Settings",
      icon: Shield, 
      settings: [
        { name: "Two-Factor Authentication", value: "Enabled", type: "status" },
        { name: "Password", value: "••••••••", type: "password" },
        { name: "API Keys", value: "Manage", type: "link" }
      ]
    }
  ]

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader searchPlaceholder="Search settings..." />
        
        <StripePageLayout
          title="Settings"
          description="Manage your account settings and preferences"
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="space-y-8">
            {settingsGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="stripe-card">
                <div className="stripe-card-header">
                  <div className="flex items-center gap-3">
                    <group.icon className="w-5 h-5 text-muted-foreground" />
                    <h3 className="stripe-card-title">{group.title}</h3>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {group.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <h4 className="font-medium">{setting.name}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        {setting.type === "toggle" ? (
                          <div className={`w-10 h-6 rounded-full ${setting.value ? 'bg-primary' : 'bg-muted'} relative transition-colors`}>
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${setting.value ? 'translate-x-5' : 'translate-x-1'}`} />
                          </div>
                        ) : setting.type === "link" ? (
                          <button className="text-primary hover:underline">{setting.value}</button>
                        ) : setting.type === "status" ? (
                          <span className="stripe-badge success">{setting.value}</span>
                        ) : (
                          <span className="text-muted-foreground">{setting.value}</span>
                        )}
                        <button className="stripe-button-secondary text-sm">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
