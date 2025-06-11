
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
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // User not authenticated, set to free plan
        setSubscription({
          subscribed: false,
          plan_id: 'free',
          plan_name: 'Free',
          current_period_end: null
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        // Set default free plan on error
        setSubscription({
          subscribed: false,
          plan_id: 'free',
          plan_name: 'Free',
          current_period_end: null
        });
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      // Set default free plan on error
      setSubscription({
        subscribed: false,
        plan_id: 'free',
        plan_name: 'Free',
        current_period_end: null
      });
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You need to be logged in to access the portal.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating portal session:', error);
        toast.error('Could not open subscription management portal.');
        return;
      }

      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('An error occurred while opening the portal.');
    }
  };

  useEffect(() => {
    checkSubscription();

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        checkSubscription();
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
