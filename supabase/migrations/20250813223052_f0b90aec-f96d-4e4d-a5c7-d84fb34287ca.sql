-- Check and fix all remaining functions with missing search_path
-- Get current function definitions and update them

-- Update all trigger functions and remaining utility functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    now(),
    now()
  );
  
  -- Insert into user_notification_settings table
  INSERT INTO public.user_notification_settings (user_id, created_at, updated_at)
  VALUES (NEW.id, now(), now());
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.prevent_self_admin_modification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Prevent users from modifying their own admin role
  IF TG_OP = 'DELETE' AND OLD.user_id = auth.uid() AND OLD.role = 'admin' THEN
    RAISE EXCEPTION 'Cannot delete your own admin role';
  END IF;
  
  IF TG_OP = 'UPDATE' AND OLD.user_id = auth.uid() AND OLD.role = 'admin' THEN
    RAISE EXCEPTION 'Cannot modify your own admin role';
  END IF;
  
  -- Prevent creation of admin role by non-super-admins
  IF TG_OP = 'INSERT' AND NEW.role = 'admin' THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Only existing admins can create new admin roles';
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Log role changes with proper audit trail
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.role_change_audit (
      changed_by, target_user_id, old_role, new_role, action
    ) VALUES (
      auth.uid(), NEW.user_id, NULL, NEW.role::text, 'INSERT'
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.role_change_audit (
      changed_by, target_user_id, old_role, new_role, action
    ) VALUES (
      auth.uid(), NEW.user_id, OLD.role::text, NEW.role::text, 'UPDATE'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.role_change_audit (
      changed_by, target_user_id, old_role, new_role, action
    ) VALUES (
      auth.uid(), OLD.user_id, OLD.role::text, NULL, 'DELETE'
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.initialize_user_referral_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  ref_code TEXT;
BEGIN
  -- Generate referral code
  ref_code := generate_referral_code(NEW.email);
  
  -- Insert initial referral stats
  INSERT INTO public.user_referral_stats (
    user_id,
    referral_code,
    total_referrals,
    successful_signups,
    total_earnings,
    pending_rewards
  ) VALUES (
    NEW.id,
    ref_code,
    0,
    0,
    0.00,
    0.00
  ) ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_referral_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Update referrer's stats
  UPDATE public.user_referral_stats
  SET 
    total_referrals = (
      SELECT COUNT(*) 
      FROM public.referrals 
      WHERE referrer_id = NEW.referrer_id
    ),
    successful_signups = (
      SELECT COUNT(*) 
      FROM public.referrals 
      WHERE referrer_id = NEW.referrer_id AND status IN ('active', 'completed')
    ),
    total_earnings = (
      SELECT COALESCE(SUM(reward_amount), 0) 
      FROM public.referrals 
      WHERE referrer_id = NEW.referrer_id AND reward_paid = TRUE
    ),
    pending_rewards = (
      SELECT COALESCE(SUM(reward_amount), 0) 
      FROM public.referrals 
      WHERE referrer_id = NEW.referrer_id AND status = 'active' AND reward_paid = FALSE
    ),
    updated_at = now()
  WHERE user_id = NEW.referrer_id;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_featherbot_leads_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - interval '1 hour';
END;
$function$;

CREATE OR REPLACE FUNCTION public.ensure_tracking_token()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  IF NEW.tracking_token IS NULL THEN
    NEW.tracking_token := generate_tracking_token();
  END IF;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.upsert_blog_post(p_title text, p_slug text, p_excerpt text, p_content text, p_tags text[], p_likes integer, p_names text[], p_read integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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
END;
$function$;