
-- Update match_kb_chunks function to include proper search path security
CREATE OR REPLACE FUNCTION public.match_kb_chunks(query_embedding extensions.vector, match_count integer, lang text)
 RETURNS TABLE(chunk_id uuid, content text, url text, title text, language text, similarity double precision)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  RETURN QUERY
  SELECT c.id AS chunk_id,
         c.content,
         p.url,
         p.title,
         c.language,
         1 - (c.embedding <=> query_embedding) AS similarity
  FROM public.featherbot_kb_chunks c
  JOIN public.featherbot_kb_pages p ON p.id = c.page_id
  WHERE (lang IS NULL OR c.language = lang)
  ORDER BY c.embedding <-> query_embedding
  LIMIT COALESCE(match_count, 6);
END; 
$function$;

-- Update track_referral_signup function to include proper search path security
CREATE OR REPLACE FUNCTION public.track_referral_signup(referral_code_param text, new_user_email text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  referrer_user_id UUID;
  existing_referral UUID;
BEGIN
  -- Find the referrer by referral code
  SELECT user_id INTO referrer_user_id 
  FROM public.user_referral_stats 
  WHERE referral_code = referral_code_param;
  
  IF referrer_user_id IS NULL THEN
    RETURN FALSE; -- Invalid referral code
  END IF;
  
  -- Check if this email was already referred by this user
  SELECT id INTO existing_referral
  FROM public.referrals
  WHERE referrer_id = referrer_user_id AND referred_email = new_user_email;
  
  IF existing_referral IS NOT NULL THEN
    -- Update existing referral to signed up
    UPDATE public.referrals
    SET 
      status = 'active',
      signed_up_at = now(),
      referred_user_id = auth.uid(),
      updated_at = now()
    WHERE id = existing_referral;
  ELSE
    -- Create new referral record
    INSERT INTO public.referrals (
      referrer_id,
      referred_email,
      referred_user_id,
      referral_code,
      status,
      signed_up_at
    ) VALUES (
      referrer_user_id,
      new_user_email,
      auth.uid(),
      referral_code_param,
      'active',
      now()
    );
  END IF;
  
  -- Log security event for enhanced monitoring
  PERFORM log_security_event('referrals', 'REFERRAL_SIGNUP_TRACKED', referrer_user_id::text,
    NULL, jsonb_build_object('referred_email', new_user_email, 'referral_code', referral_code_param));
  
  RETURN TRUE;
END;
$function$;

-- Update upsert_blog_post function to include proper search path security
CREATE OR REPLACE FUNCTION public.upsert_blog_post(p_title text, p_slug text, p_excerpt text, p_content text, p_tags text[], p_likes integer, p_names text[], p_read integer)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.blog_posts (title, slug, excerpt, content, tags, status, published_at, likes_count, read_time_minutes)
  VALUES (p_title, p_slug, p_excerpt, p_content, p_tags, 'published', now() - (floor(random()*30)) * interval '1 day', p_likes, p_read)
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    tags = EXCLUDED.tags,
    status = 'published',
    published_at = COALESCE(public.blog_posts.published_at, EXCLUDED.published_at),
    likes_count = EXCLUDED.likes_count,
    read_time_minutes = EXCLUDED.read_time_minutes,
    updated_at = now();
    
  -- Log security event for blog content operations with enhanced monitoring
  PERFORM log_security_event('blog_posts', 'BLOG_POST_UPSERTED', p_slug,
    NULL, jsonb_build_object('title', p_title, 'operation', 'upsert', 'security_hardened', true));
END;
$function$;
