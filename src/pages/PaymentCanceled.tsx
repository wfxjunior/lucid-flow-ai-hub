import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function PaymentCanceled() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const planId = searchParams.get("plan")

  useEffect(() => {
    console.log('PaymentCanceled: Component mounted')
    console.log('Plan ID:', planId)
  }, [planId])

  const handleReturnToPricing = () => {
    console.log('PaymentCanceled: Returning to pricing')
    navigate("/pricing")
  }

  const handleReturnToDashboard = () => {
    console.log('PaymentCanceled: Returning to dashboard')
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          
          <CardTitle className="text-2xl text-red-600 dark:text-red-400">
            Payment Canceled
          </CardTitle>
          <CardDescription>
            Your payment was canceled. No charges were made to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              You can return to the pricing page to try again, or go back to your dashboard.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleReturnToPricing} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pricing
            </Button>
            <Button onClick={handleReturnToDashboard} variant="outline" className="flex-1">
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}