-- Fix search_path security issues for all functions
ALTER FUNCTION public.generate_referral_code(text) SET search_path = public;
ALTER FUNCTION public.initialize_user_referral_stats() SET search_path = public;
ALTER FUNCTION public.update_referral_stats() SET search_path = public;
ALTER FUNCTION public.track_referral_signup(text, text) SET search_path = public;