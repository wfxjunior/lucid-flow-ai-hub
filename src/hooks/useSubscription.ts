
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
        // User not authenticated, set to free plan
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

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('useSubscription: Function response received');
      console.log('Data:', data);
      console.log('Error:', error);

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

      console.log('useSubscription: Setting subscription data:', data);
      setSubscription(data);
    } catch (error) {
      console.error('useSubscription: Unexpected error:', error);
      // Set default free plan on error
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
        toast.error('You need to be logged in to access the subscription portal.');
        return;
      }

      console.log('useSubscription: Calling customer-portal function...');

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('useSubscription: Portal response:', { data, error });

      if (error) {
        console.error('useSubscription: Portal error:', error);
        toast.error('Could not open subscription management portal. Please try again.');
        return;
      }

      if (data?.url) {
        console.log('useSubscription: Opening portal URL:', data.url);
        window.open(data.url, '_blank');
        toast.success('Opening subscription management portal...');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('useSubscription: Portal error:', error);
      toast.error('An error occurred while opening the subscription portal.');
    }
  };

  useEffect(() => {
    console.log('useSubscription: Hook initialized, starting initial check');
    checkSubscription();

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('useSubscription: Auth state changed:', event);
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
