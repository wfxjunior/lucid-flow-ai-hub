
import { useSubscription } from '@/hooks/useSubscription'
import { useAuthState } from '@/hooks/useAuthState'
import { Crown, Star, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function PremiumStatus() {
  const { user } = useAuthState()
  const { isSubscribed, planName, loading } = useSubscription()

  if (loading) {
    return (
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">Verificando status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isPremiumUser = user?.email === 'juniorxavierusa@gmail.com'

  if (isPremiumUser) {
    return (
      <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <Crown className="h-5 w-5 text-yellow-600" />
            Status Premium
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              UNLIMITED
            </Badge>
          </CardTitle>
          <CardDescription className="text-yellow-600">
            Acesso ilimitado a todas as funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <Zap className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-xs text-yellow-700 font-medium">Recursos Ilimitados</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-xs text-yellow-700 font-medium">Todas as Features</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <Crown className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-xs text-yellow-700 font-medium">Acesso Vitalício</p>
            </div>
          </div>
          <div className="text-center pt-2">
            <p className="text-sm font-semibold text-yellow-800">
              {planName} - Sem Limitações
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-muted">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Plano {planName}</p>
            <p className="text-sm text-muted-foreground">
              {isSubscribed ? 'Ativo' : 'Gratuito'}
            </p>
          </div>
          {isSubscribed && (
            <Badge variant="default">Premium</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
