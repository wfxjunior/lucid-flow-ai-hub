
import { ReactNode } from "react"

interface StripeTab {
  id: string
  label: string
  content?: ReactNode
  count?: number
}

interface StripeTabsProps {
  tabs: StripeTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function StripeTabs({ tabs, activeTab, onTabChange }: StripeTabsProps) {
  return (
    <div className="stripe-tabs">
      <div className="stripe-tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="stripe-tab-trigger"
            data-state={activeTab === tab.id ? "active" : "inactive"}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 px-2 py-1 text-xs bg-muted rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
