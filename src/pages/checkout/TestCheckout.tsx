
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCheckout } from "@/hooks/useCheckout"
import { supabase } from "@/integrations/supabase/client"

export default function TestCheckout() {
  const { loading, redirectToCheckout } = useCheckout()
  const [diagnostics, setDiagnostics] = useState<any>(null)

  const handleTestCheckout = async (plan: 'monthly' | 'yearly') => {
    await redirectToCheckout({ 
      plan,
      email: 'test@example.com' 
    })
  }

  const loadDiagnostics = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('checkout-diagnostics')
      if (error) throw error
      setDiagnostics(data)
    } catch (err) {
      console.error('Failed to load diagnostics:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Checkout Testing Page
          </h1>
          <p className="text-gray-600">
            Test the checkout flow in TEST mode. Use card number 4242 4242 4242 4242.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Monthly Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">$26</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
                <Button 
                  onClick={() => handleTestCheckout('monthly')}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Loading...' : 'Test Monthly Checkout'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Yearly Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">$252</div>
                  <div className="text-sm text-gray-600">per year</div>
                  <Badge className="bg-green-100 text-green-800">Save 19%</Badge>
                </div>
                <Button 
                  onClick={() => handleTestCheckout('yearly')}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Loading...' : 'Test Yearly Checkout'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Diagnostics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={loadDiagnostics} variant="outline">
                Load Diagnostics
              </Button>
              
              {diagnostics && (
                <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
                  {JSON.stringify(diagnostics, null, 2)}
                </pre>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
