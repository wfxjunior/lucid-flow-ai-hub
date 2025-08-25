
import { useAuthState } from './useAuthState'
import { useSubscription } from './useSubscription'
import { useUserRole } from './useUserRole'

export function useFeatureAccess() {
  const { user } = useAuthState()
  const { isSubscribed, planId } = useSubscription()
  const { role } = useUserRole()

  // Check if user has premium access through database roles (Security Fix #2)
  const isPremiumUnlimited = role === 'admin' || role === 'premium_access'
  
  // Verify if has premium access (subscription or premium role)
  const hasPremiumAccess = isPremiumUnlimited || isSubscribed

  return {
    // Access to features específicas
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
      // Users with premium role have access to everything
      if (isPremiumUnlimited) return true
      
      // Subscribers have access to premium features
      if (isSubscribed) return true
      
      // Basic features always available
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
