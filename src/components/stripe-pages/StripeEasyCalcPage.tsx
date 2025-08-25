
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { Calculator, History, Percent, DollarSign } from "lucide-react"

export function StripeEasyCalcPage() {
  const [activeTab, setActiveTab] = useState("calculator")
  const [calculation, setCalculation] = useState("")
  const [result, setResult] = useState("")

  const tabs = [
    { id: "calculator", label: "Calculator" },
    { id: "margin", label: "Margin Calculator" },
    { id: "markup", label: "Markup Calculator" },
    { id: "history", label: "History", count: 12 }
  ]

  const calculations = [
    {
      expression: "25000 * 0.30",
      result: "7,500.00",
      type: "Markup",
      timestamp: "2 minutes ago"
    },
    {
      expression: "45000 - 32000",
      result: "13,000.00", 
      type: "Profit",
      timestamp: "5 minutes ago"
    },
    {
      expression: "15000 / 12",
      result: "1,250.00",
      type: "Monthly",
      timestamp: "10 minutes ago"
    }
  ]

  const metrics = [
    {
      title: "Calculations Today",
      value: "24",
      change: "+8 vs yesterday"
    },
    {
      title: "Most Used Formula",
      value: "Markup",
      change: "35% of calculations"
    },
    {
      title: "Average Result",
      value: "$8,450",
      change: "Per calculation"
    },
    {
      title: "Time Saved",
      value: "2.5 hrs",
      change: "This week"
    }
  ]

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <History className="w-4 h-4" />
        Clear History
      </button>
      <button className="stripe-button-secondary">Export Report</button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search calculations..."
        />
        
        <StripePageLayout
          title="EasyCalc"
          description="Professional calculator for construction estimates and margins"
          actions={actions}
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="stripe-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                  <Calculator className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{metric.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculator Widget */}
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Calculator</h3>
                <p className="stripe-card-description">Perform calculations for estimates and budgets</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded border text-right">
                  <div className="text-sm text-muted-foreground">{calculation || "0"}</div>
                  <div className="text-2xl font-semibold">{result || "0"}</div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+'].map((btn) => (
                    <button key={btn} className="stripe-button-secondary p-3 text-center">
                      {btn}
                    </button>
                  ))}
                  <button className="stripe-button-primary col-span-2 p-3">=</button>
                  <button className="stripe-button-secondary p-3">0</button>
                  <button className="stripe-button-secondary p-3">.</button>
                </div>
              </div>
            </div>

            {/* Recent Calculations */}
            <div className="stripe-card p-0">
              <div className="p-6 border-b">
                <h3 className="stripe-card-title">Recent Calculations</h3>
              </div>
              
              <div className="divide-y">
                {calculations.map((calc, index) => (
                  <div key={index} className="p-4 hover:bg-muted/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm">{calc.expression}</span>
                      <span className="stripe-badge neutral">{calc.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">${calc.result}</span>
                      <span className="text-xs text-muted-foreground">{calc.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
