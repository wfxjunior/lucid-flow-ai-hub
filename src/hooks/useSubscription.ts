
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SubscriptionData {
  subscribed: boolean;
  plan_id: string;
  plan_name: string;
  current_period_end: string | null;
}

// Email com acesso premium ilimitado
const PREMIUM_USERS = ['juniorxavierusa@gmail.com'];

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    console.log('useSubscription: Checking subscription status');
    try {
      setLoading(true);
      
      // Verificar se o usuário está logado
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && PREMIUM_USERS.includes(user.email || '')) {
        console.log('useSubscription: Premium user detected:', user.email);
        // Usuário premium com acesso ilimitado
        setSubscription({
          subscribed: true,
          plan_id: 'professional-unlimited',
          plan_name: 'Professional Unlimited',
          current_period_end: null // Acesso ilimitado sem expiração
        });
        console.log('useSubscription: Premium unlimited access granted');
        return;
      }
      
      // Para outros usuários, definir como free plan
      console.log('useSubscription: Setting default free plan');
      setSubscription({
        subscribed: false,
        plan_id: 'free',
        plan_name: 'Free',
        current_period_end: null
      });
      
      console.log('useSubscription: Free plan set successfully');
    } catch (error) {
      console.error('useSubscription: Error checking subscription:', error);
      setSubscription({
        subscribed: false,
        plan_id: 'free',
        plan_name: 'Free',
        current_period_end: null
      });
    } finally {
      setLoading(false);
      console.log('useSubscription: Subscription check completed');
    }
  };

  const openCustomerPortal = async () => {
    console.log('useSubscription: Customer portal not available (edge function disabled)');
    toast.error('Portal de assinatura não disponível no momento.');
  };

  useEffect(() => {
    console.log('useSubscription: Hook initialized, starting initial check');
    let isInitialized = false;
    
    const initializeSubscription = () => {
      if (!isInitialized) {
        isInitialized = true;
        checkSubscription();
      }
    };

    // Initial check with delay to avoid race conditions
    setTimeout(initializeSubscription, 500);

    // Listen for auth changes with debouncing
    let timeoutId: NodeJS.Timeout;
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('useSubscription: Auth state changed:', event);
      
      // Clear existing timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        // Debounce the subscription check to prevent multiple calls
        timeoutId = setTimeout(() => {
          checkSubscription();
        }, 1000);
      }
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      authSubscription.unsubscribe();
    };
  }, []);

  return {
    subscription,
    loading,
    checkSubscription,
    openCustomerPortal,
    isSubscribed: subscription?.subscribed || false,
    planId: subscription?.plan_id || 'free',
    planName: subscription?.plan_name || 'Free',
  };
};
