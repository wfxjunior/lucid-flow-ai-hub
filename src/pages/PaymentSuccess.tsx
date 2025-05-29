
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
            Pagamento Realizado!
          </CardTitle>
          <CardDescription>
            Seu pagamento foi processado com sucesso.
            {planId && ` Bem-vindo ao plano ${planId}!`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Você receberá um email de confirmação em breve.
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Voltar ao Dashboard
          </Button>
          <p className="text-xs text-muted-foreground">
            Redirecionando automaticamente em 10 segundos...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
