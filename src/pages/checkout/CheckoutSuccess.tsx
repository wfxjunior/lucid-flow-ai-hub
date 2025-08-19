
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface SessionData {
  id: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  metadata?: {
    plan?: string;
  };
}

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided")
      setLoading(false)
      return
    }

    // Retrieve session data (you'll need to create this endpoint)
    const fetchSessionData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-checkout-session', {
          body: { session_id: sessionId }
        })

        if (error) throw error

        setSessionData(data)
      } catch (err) {
        console.error('Error fetching session:', err)
        setError('Failed to load payment information')
      } finally {
        setLoading(false)
      }
    }

    fetchSessionData()
  }, [sessionId])

  const handleGoToDashboard = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-600 mb-4" />
            <p>Loading payment details...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={handleGoToDashboard}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <CardTitle className="text-2xl text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Thank you for your purchase. Your subscription is now active.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {sessionData && (
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Plan:</span>
                <span>{sessionData.metadata?.plan || 'Professional'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount:</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: sessionData.currency?.toUpperCase() || 'USD',
                  }).format((sessionData.amount_total || 0) / 100)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span className="text-sm">{sessionData.customer_email}</span>
              </div>
            </div>
          )}
          
          <Button onClick={handleGoToDashboard} className="w-full">
            Go to Dashboard
          </Button>
          
          <p className="text-xs text-muted-foreground">
            You will receive a confirmation email shortly.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
