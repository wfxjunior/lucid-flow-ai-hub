
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
  const [showCelebration, setShowCelebration] = useState(false)
  
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
        
        // Reduced wait time from 2 seconds to 500ms for faster processing
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Check subscription status
        await checkSubscription()
        console.log('PaymentSuccess: Subscription check completed')
        
        setVerificationComplete(true)
        
        // Show celebration for free trial starts
        if (planId === 'professional' || planId === 'professional-annual') {
          setShowCelebration(true)
        }
      } catch (error) {
        console.error('PaymentSuccess: Error verifying payment:', error)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()

    // Reduced auto redirect time from 15 to 10 seconds
    const timer = setTimeout(() => {
      console.log('PaymentSuccess: Auto-redirecting to dashboard')
      navigate("/")
    }, 10000)

    return () => clearTimeout(timer)
  }, [navigate, planId, sessionId, checkSubscription])

  const handleReturnToDashboard = () => {
    console.log('PaymentSuccess: Manual redirect to dashboard')
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      {/* Party Balloons Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🎈</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
          <div className="absolute top-32 left-1/4 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🎊</div>
          <div className="absolute top-16 right-1/3 text-5xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎈</div>
          <div className="absolute top-40 right-10 text-4xl animate-bounce" style={{ animationDelay: '2s' }}>🎉</div>
          <div className="absolute top-24 left-1/2 text-6xl animate-bounce" style={{ animationDelay: '0.8s' }}>🎊</div>
        </div>
      )}

      <Card className="w-full max-w-md text-center shadow-lg relative z-20">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            {isVerifying ? (
              <Loader2 className="h-8 w-8 text-green-600 dark:text-green-400 animate-spin" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            )}
          </div>
          
          {/* Special congratulations message for free trial */}
          {showCelebration && !isVerifying && (
            <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg">
              <div className="text-2xl font-bold text-purple-800 mb-2">
                🎉 Parabéns! 🎉
              </div>
              <div className="text-lg text-purple-700 font-semibold">
                Algo grande está começando agora!
              </div>
              <div className="text-sm text-purple-600 mt-2">
                Seu teste gratuito de 7 dias começou!
              </div>
            </div>
          )}
          
          <CardTitle className="text-2xl text-green-600 dark:text-green-400">
            {isVerifying ? "Processando Pagamento..." : "Pagamento Realizado com Sucesso!"}
          </CardTitle>
          <CardDescription>
            {isVerifying ? (
              "Aguarde enquanto verificamos seu pagamento..."
            ) : verificationComplete && isSubscribed ? (
              <>Seu pagamento foi processado com sucesso. Bem-vindo ao plano {planName}!</>
            ) : verificationComplete ? (
              "Seu pagamento foi processado. A verificação da assinatura está em andamento."
            ) : (
              `Seu pagamento foi processado com sucesso.${planId ? ` Bem-vindo ao plano ${planId}!` : ''}`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isVerifying && verificationComplete && (
            <div className="flex justify-center">
              <Badge variant={isSubscribed ? "default" : "secondary"} className="px-3 py-1">
                {isSubscribed ? `Plano ${planName} Ativo` : "Processando..."}
              </Badge>
            </div>
          )}

          {sessionId && (
            <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
              ID da Sessão: {sessionId.substring(0, 20)}...
            </div>
          )}

          {!isVerifying && (
            <>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {isSubscribed ? (
                    showCelebration ? (
                      "Seu teste gratuito de 7 dias está ativo! Explore todos os recursos premium e veja o que o FeatherBiz pode fazer pelo seu negócio."
                    ) : (
                      "Agora você tem acesso a todos os recursos premium!"
                    )
                  ) : (
                    "Sua assinatura será ativada em breve. Você receberá um email de confirmação."
                  )}
                </p>
                {!isSubscribed && (
                  <div className="flex items-center justify-center gap-2 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">Se sua assinatura não ativar em alguns minutos, entre em contato com o suporte.</span>
                  </div>
                )}
              </div>
              
              <Button onClick={handleReturnToDashboard} className="w-full">
                {showCelebration ? "Começar a Explorar Recursos Premium!" : "Voltar ao Dashboard"}
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Redirecionando automaticamente em 10 segundos...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
