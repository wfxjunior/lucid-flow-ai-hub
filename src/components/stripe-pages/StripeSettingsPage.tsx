
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { Settings, User, Bell, Shield, CreditCard, Building, Palette } from "lucide-react"

export function StripeSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    { id: "general", label: "General" },
    { id: "account", label: "Account" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
    { id: "integrations", label: "Integrations" }
  ]

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader searchPlaceholder="Search settings..." />
        
        <StripePageLayout
          title="Settings"
          description="Manage your FeatherBiz account and preferences"
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="stripe-card">
                <div className="stripe-card-header">
                  <h3 className="stripe-card-title flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Business Information
                  </h3>
                  <p className="stripe-card-description">Update your business details and contact information</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-border rounded-lg"
                      defaultValue="FeatherBiz"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-border rounded-lg"
                      defaultValue="contact@featherbiz.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Phone</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 border border-border rounded-lg"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <button className="stripe-button-primary">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="stripe-card">
                <div className="stripe-card-header">
                  <h3 className="stripe-card-title flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance
                  </h3>
                  <p className="stripe-card-description">Customize your dashboard theme and layout</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <select className="w-full p-3 border border-border rounded-lg">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>Auto</option>
                    </select>
                  </div>
                  
                  <button className="stripe-button-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Settings
                </h3>
                <p className="stripe-card-description">Manage your personal account information</p>
              </div>
              <p className="text-muted-foreground">Account settings content coming soon...</p>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing & Subscription
                </h3>
                <p className="stripe-card-description">Manage your subscription and payment methods</p>
              </div>
              <p className="text-muted-foreground">Billing settings content coming soon...</p>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </h3>
                <p className="stripe-card-description">Control how and when you receive notifications</p>
              </div>
              <p className="text-muted-foreground">Notification settings content coming soon...</p>
            </div>
          )}

          {activeTab === "security" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </h3>
                <p className="stripe-card-description">Manage your account security and authentication</p>
              </div>
              <p className="text-muted-foreground">Security settings content coming soon...</p>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Integrations</h3>
                <p className="stripe-card-description">Connect FeatherBiz with your favorite tools</p>
              </div>
              <p className="text-muted-foreground">Integrations content coming soon...</p>
            </div>
          )}
        </StripePageLayout>
      </div>
    </div>
  )
}
