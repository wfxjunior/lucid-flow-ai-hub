
import { StripeHeader } from "./stripe-layout/StripeHeader"
import { StripePageLayout } from "./stripe-layout/StripePageLayout"
import { Bot, Calculator, FileText, Users, Calendar, BarChart3, MessageSquare, Zap } from "lucide-react"

export function FeatherBizAI() {
  const aiTools = [
    {
      title: "Smart Scheduling",
      description: "AI-powered project timeline optimization and resource allocation",
      icon: Calendar,
      category: "Scheduling"
    },
    {
      title: "Financial Forecasting",
      description: "Predictive analytics for cash flow and budget planning",
      icon: BarChart3,
      category: "Finance"
    },
    {
      title: "Customer Insights", 
      description: "AI analysis of customer behavior and project patterns",
      icon: Users,
      category: "Analytics"
    },
    {
      title: "Document Generation",
      description: "Automated contract and proposal creation from templates",
      icon: FileText,
      category: "Documents"
    },
    {
      title: "Cost Estimation",
      description: "Machine learning-based project cost predictions",
      icon: Calculator,
      category: "Estimation"
    },
    {
      title: "Smart Communications",
      description: "AI-assisted client communication and follow-up suggestions",
      icon: MessageSquare,
      category: "Communication"
    }
  ]

  const recentInsights = [
    {
      title: "Project Timeline Optimization",
      insight: "3 projects can be completed 15% faster with resource reallocation",
      impact: "Save 2.5 weeks"
    },
    {
      title: "Cash Flow Prediction", 
      insight: "Expected positive cash flow increase of $12,400 next month",
      impact: "Plan ahead"
    },
    {
      title: "Customer Retention",
      insight: "Anderson Family shows high likelihood for repeat business",
      impact: "Follow up recommended"
    }
  ]

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader searchPlaceholder="Search AI tools..." />
        
        <StripePageLayout
          title="FeatherBiz AI"
          description="Artificial intelligence tools to optimize your business operations"
        >
          {/* AI Tools Grid */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">AI-Powered Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiTools.map((tool, index) => (
                <div key={index} className="stripe-card hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <tool.icon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">{tool.title}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent AI Insights */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Recent AI Insights</h2>
            <div className="space-y-4">
              {recentInsights.map((item, index) => (
                <div key={index} className="stripe-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Bot className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.insight}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary">{item.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <button className="stripe-button-primary">
                <Zap className="w-4 h-4" />
                Run Analysis
              </button>
              <button className="stripe-button-secondary">
                <BarChart3 className="w-4 h-4" />
                View Reports
              </button>
              <button className="stripe-button-secondary">
                <FileText className="w-4 h-4" />
                Generate Insights
              </button>
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
