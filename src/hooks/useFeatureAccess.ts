
import { useAuthState } from './useAuthState'
import { useSubscription } from './useSubscription'

// Email com acesso premium ilimitado
const PREMIUM_UNLIMITED_USERS = ['juniorxavierusa@gmail.com'];

export function useFeatureAccess() {
  const { user } = useAuthState()
  const { isSubscribed, planId } = useSubscription()

  // Verificar se é usuário premium ilimitado
  const isPremiumUnlimited = user?.email && PREMIUM_UNLIMITED_USERS.includes(user.email)
  
  // Verificar se tem acesso premium (assinatura ou usuário ilimitado)
  const hasPremiumAccess = isPremiumUnlimited || isSubscribed

  return {
    // Acesso a features específicas
    hasUnlimitedInvoices: isPremiumUnlimited || isSubscribed,
    hasUnlimitedEstimates: isPremiumUnlimited || isSubscribed,
    hasUnlimitedContracts: isPremiumUnlimited || isSubscribed,
    hasAdvancedFeatures: isPremiumUnlimited || isSubscribed,
    hasAIAssistant: isPremiumUnlimited || isSubscribed,
    hasPrioritySupport: isPremiumUnlimited || isSubscribed,
    hasAllIntegrations: isPremiumUnlimited || isSubscribed,
    
    // Status geral
    hasPremiumAccess,
    isPremiumUnlimited,
    isSubscribed,
    planId,
    
    // Verificações específicas
    canCreateUnlimited: (resourceType: string) => {
      return isPremiumUnlimited || isSubscribed
    },
    
    canAccessFeature: (featureName: string) => {
      // Usuários premium ilimitados têm acesso a tudo
      if (isPremiumUnlimited) return true
      
      // Assinantes têm acesso a features premium
      if (isSubscribed) return true
      
      // Features básicas sempre disponíveis
      const basicFeatures = [
        'basic-invoices',
        'basic-estimates', 
        'basic-clients',
        'basic-appointments'
      ]
      
      return basicFeatures.includes(featureName)
    }
  }
}
