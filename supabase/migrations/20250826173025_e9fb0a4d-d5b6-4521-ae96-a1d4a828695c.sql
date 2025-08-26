
-- Fix database function search paths for security
-- Update functions that lack explicit search_path settings

CREATE OR REPLACE FUNCTION public.generate_referral_code(user_email text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  clean_email TEXT;
  hash_part TEXT;
  result_code TEXT;
BEGIN
  -- Extract username part before @
  clean_email := split_part(user_email, '@', 1);
  
  -- Create a hash from the email
  hash_part := upper(substring(encode(digest(user_email, 'sha256'), 'hex'), 1, 6));
  
  -- Combine username and hash
  result_code := clean_email || '-' || hash_part;
  
  RETURN result_code;
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_tracking_token()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;
