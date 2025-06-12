
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSubscription } from "@/hooks/useSubscription"
import { Badge } from "@/components/ui/badge"

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { checkSubscription, isSubscribed, planName } = useSubscription()
  const [isVerifying, setIsVerifying] = useState(true)
  const [verificationComplete, setVerificationComplete] = useState(false)
  
  const planId = searchParams.get("plan")
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    console.log('PaymentSuccess: Component mounted')
    console.log('Plan ID:', planId)
    console.log('Session ID:', sessionId)

    // Verify subscription status after payment
    const verifyPayment = async () => {
      console.log('PaymentSuccess: Starting payment verification...')
      try {
        setIsVerifying(true)
        
        // Wait a moment for Stripe to process
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Check subscription status
        await checkSubscription()
        console.log('PaymentSuccess: Subscription check completed')
        
        setVerificationComplete(true)
      } catch (error) {
        console.error('PaymentSuccess: Error verifying payment:', error)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()

    // Auto redirect after 15 seconds
    const timer = setTimeout(() => {
      console.log('PaymentSuccess: Auto-redirecting to dashboard')
      navigate("/")
    }, 15000)

    return () => clearTimeout(timer)
  }, [navigate, planId, sessionId, checkSubscription])

  const handleReturnToDashboard = () => {
    console.log('PaymentSuccess: Manual redirect to dashboard')
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            {isVerifying ? (
              <Loader2 className="h-8 w-8 text-green-600 dark:text-green-400 animate-spin" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            )}
          </div>
          <CardTitle className="text-2xl text-green-600 dark:text-green-400">
            {isVerifying ? "Processing Payment..." : "Payment Successful!"}
          </CardTitle>
          <CardDescription>
            {isVerifying ? (
              "Please wait while we verify your payment..."
            ) : verificationComplete && isSubscribed ? (
              <>Your payment has been processed successfully. Welcome to the {planName} plan!</>
            ) : verificationComplete ? (
              "Your payment was processed. Subscription verification is in progress."
            ) : (
              `Your payment has been processed successfully.${planId ? ` Welcome to the ${planId} plan!` : ''}`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isVerifying && verificationComplete && (
            <div className="flex justify-center">
              <Badge variant={isSubscribed ? "default" : "secondary"} className="px-3 py-1">
                {isSubscribed ? `${planName} Plan Active` : "Processing..."}
              </Badge>
            </div>
          )}

          {sessionId && (
            <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
              Session ID: {sessionId.substring(0, 20)}...
            </div>
          )}

          {!isVerifying && (
            <>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {isSubscribed ? (
                    "You now have access to all premium features!"
                  ) : (
                    "Your subscription will be activated shortly. You'll receive a confirmation email."
                  )}
                </p>
                {!isSubscribed && (
                  <div className="flex items-center justify-center gap-2 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">If your subscription doesn't activate within a few minutes, please contact support.</span>
                  </div>
                )}
              </div>
              
              <Button onClick={handleReturnToDashboard} className="w-full">
                Return to Dashboard
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Redirecting automatically in 15 seconds...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
