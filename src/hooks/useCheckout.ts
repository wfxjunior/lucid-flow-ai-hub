
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { APP } from '@/config/app';

export type CheckoutPlan = 'free' | 'monthly' | 'yearly' | 'onetime';

interface CheckoutOptions {
  plan: CheckoutPlan;
  quantity?: number;
  coupon?: string;
  email?: string;
}

interface CheckoutResponse {
  url: string;
  session_id: string;
}

interface CheckoutError {
  error: {
    code: string;
    message: string;
  };
}

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (options: CheckoutOptions): Promise<string | null> => {
    if (options.plan === 'free') {
      toast.error('Free plan does not require checkout. Please use signup flow.');
      return null;
    }

    setLoading(true);
    
    try {
      console.log('Creating checkout session:', options);
      
      const { data, error } = await supabase.functions.invoke('checkout-create', {
        body: options
      });

      if (error) {
        throw error;
      }

      const response = data as CheckoutResponse | CheckoutError;
      
      if ('error' in response) {
        throw new Error(response.error.message);
      }

      console.log('Checkout session created:', response.session_id);
      return response.url;

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to create checkout session');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const redirectToCheckout = async (options: CheckoutOptions) => {
    const url = await createCheckoutSession(options);
    if (url) {
      // Use window.location.assign for reliable redirect
      window.location.assign(url);
    }
  };

  return {
    loading,
    createCheckoutSession,
    redirectToCheckout
  };
};
