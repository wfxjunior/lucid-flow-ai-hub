
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const planId = searchParams.get("plan")

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate("/")
    }, 10000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl text-green-600 dark:text-green-400">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Your payment has been processed successfully.
            {planId && ` Welcome to the ${planId} plan!`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You will receive a confirmation email shortly.
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Return to Dashboard
          </Button>
          <p className="text-xs text-muted-foreground">
            Redirecting automatically in 10 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
