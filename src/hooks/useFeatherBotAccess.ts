import { useAuthState } from "@/hooks/useAuthState"
import { useSubscription } from "@/hooks/useSubscription"

export function useFeatherBotAccess() {
  const { user } = useAuthState()
  const { subscription } = useSubscription()

  // Check if user has access to FeatherBot
  // Temporarily allowing Free plan users to test FeatherBot
  const hasAccess = user && (
    subscription?.plan_name === "Pro" ||
    subscription?.plan_name === "Free" || // Temporary access for testing
    (user as any)?.user_metadata?.featherGoldAccess === true
  )

  return {
    hasAccess: !!hasAccess,
    isAuthenticated: !!user,
    userPlan: subscription?.plan_name || "Free"
  }
}