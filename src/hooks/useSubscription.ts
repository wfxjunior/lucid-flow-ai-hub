
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SubscriptionData {
  subscribed: boolean;
  plan_id: string;
  plan_name: string;
  current_period_end: string | null;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    console.log('useSubscription: Starting subscription check...');
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('useSubscription: No session found, setting free plan');
        setSubscription({
          subscribed: false,
          plan_id: 'free',
          plan_name: 'Free',
          current_period_end: null
        });
        return;
      }

      console.log('useSubscription: Session found, calling check-subscription function...');
      console.log('User email:', session.user.email);

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: Subscription check took too long')), 15000);
      });

      const subscriptionPromise = supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const { data, error } = await Promise.race([subscriptionPromise, timeoutPromise]) as any;

      console.log('useSubscription: Function response received');
      console.log('Response data:', data);
      console.log('Response error:', error);

      if (error) {
        console.error('useSubscription: Error from check-subscription function:', error);
        // Set default free plan on error but don't show error to user for seamless UX
        setSubscription({
          subscribed: false,
          plan_id: 'free',
          plan_name: 'Free',
          current_period_end: null
        });
        return;
      }

      // Validate the response data
      if (data && typeof data === 'object') {
        const validatedData = {
          subscribed: Boolean(data.subscribed),
          plan_id: data.plan_id || 'free',
          plan_name: data.plan_name || 'Free',
          current_period_end: data.current_period_end || null
        };
        
        console.log('useSubscription: Setting validated subscription data:', validatedData);
        setSubscription(validatedData);
      } else {
        console.warn('useSubscription: Invalid response data, setting free plan');
        setSubscription({
          subscribed: false,
          plan_id: 'free',
          plan_name: 'Free',
          current_period_end: null
        });
      }
    } catch (error) {
      console.error('useSubscription: Unexpected error:', error);
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
    console.log('useSubscription: Opening customer portal...');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('useSubscription: No session for portal access');
        toast.error('Você precisa estar logado para acessar o portal de assinatura.');
        return;
      }

      console.log('useSubscription: Calling customer-portal function...');

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: Portal request took too long')), 10000);
      });

      const portalPromise = supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const { data, error } = await Promise.race([portalPromise, timeoutPromise]) as any;

      console.log('useSubscription: Portal response:', { data, error });

      if (error) {
        console.error('useSubscription: Portal error:', error);
        toast.error('Não foi possível abrir o portal de gerenciamento de assinatura. Tente novamente.');
        return;
      }

      if (data?.url) {
        console.log('useSubscription: Opening portal URL:', data.url);
        window.open(data.url, '_blank');
        toast.success('Abrindo portal de gerenciamento de assinatura...');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('useSubscription: Portal error:', error);
      toast.error('Ocorreu um erro ao abrir o portal de assinatura.');
    }
  };

  useEffect(() => {
    console.log('useSubscription: Hook initialized, starting initial check');
    checkSubscription();

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('useSubscription: Auth state changed:', event);
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        // Add a small delay to ensure the session is properly set
        setTimeout(() => {
          checkSubscription();
        }, 100);
      }
    });

    return () => authSubscription.unsubscribe();
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
