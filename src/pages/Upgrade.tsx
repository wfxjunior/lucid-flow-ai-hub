
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown } from "lucide-react"

interface UpgradeProps {
  onNavigate?: (view: string) => void
}

export default function Upgrade({ onNavigate }: UpgradeProps) {
  const handleUpgrade = () => {
    console.log("Upgrade clicked")
    // Handle upgrade logic here
  }

  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard')
    }
  }

  const features = [
    "Unlimited invoices and estimates",
    "AI voice assistant", 
    "Advanced analytics and reporting",
    "Priority customer support",
    "Custom branding",
    "Multiple team members"
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">Upgrade to Professional</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Unlock all premium features and take your business to the next level
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary">Current</Badge>
              Free Plan
            </CardTitle>
            <CardDescription>
              Basic features for getting started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$0<span className="text-lg font-normal">/month</span></div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Up to 5 invoices per month
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Basic customer management
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Email support
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Professional Plan */}
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-blue-500">
                <Crown className="h-3 w-3 mr-1" />
                Recommended
              </Badge>
              Professional Plan
            </CardTitle>
            <CardDescription>
              Everything you need to run your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$29<span className="text-lg font-normal">/month</span></div>
            <ul className="space-y-2 text-sm mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button onClick={handleUpgrade} className="w-full" size="lg">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" onClick={handleBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
