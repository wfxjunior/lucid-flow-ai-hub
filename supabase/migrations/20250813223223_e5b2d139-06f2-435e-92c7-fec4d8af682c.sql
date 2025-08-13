-- Final check and update for any remaining functions missing search_path
-- Update the match_kb_chunks function that uses extensions.vector
CREATE OR REPLACE FUNCTION public.match_kb_chunks(query_embedding extensions.vector, match_count integer, lang text)
RETURNS TABLE(chunk_id uuid, content text, url text, title text, language text, similarity double precision)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'extensions'
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

-- Update log_security_event function
CREATE OR REPLACE FUNCTION public.log_security_event(p_table_name text, p_operation text, p_record_id text DEFAULT NULL::text, p_old_data jsonb DEFAULT NULL::jsonb, p_new_data jsonb DEFAULT NULL::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    table_name,
    operation,
    record_id,
    old_data,
    new_data
  ) VALUES (
    auth.uid(),
    p_table_name,
    p_operation,
    p_record_id,
    p_old_data,
    p_new_data
  );
END;
$function$;

-- Update log_template_access function
CREATE OR REPLACE FUNCTION public.log_template_access(template_id_param uuid, access_type_param text, ip_address_param inet DEFAULT NULL::inet, user_agent_param text DEFAULT NULL::text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.template_access_log (
    template_id,
    user_id,
    access_type,
    ip_address,
    user_agent
  ) VALUES (
    template_id_param,
    auth.uid(),
    access_type_param,
    ip_address_param,
    user_agent_param
  );
END;
$function$;

-- Update check_rate_limit function
CREATE OR REPLACE FUNCTION public.check_rate_limit(client_ip inet, action text, max_requests integer DEFAULT 10, window_minutes integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Clean up old rate limit entries
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - (window_minutes || ' minutes')::INTERVAL;
  
  -- Get current count for this IP and action
  SELECT count, rate_limits.window_start INTO current_count, window_start
  FROM public.rate_limits 
  WHERE ip_address = client_ip AND action_type = action 
  AND rate_limits.window_start > now() - (window_minutes || ' minutes')::INTERVAL;
  
  IF current_count IS NULL THEN
    -- First request in this window
    INSERT INTO public.rate_limits (ip_address, action_type, count)
    VALUES (client_ip, action, 1);
    RETURN TRUE;
  ELSIF current_count < max_requests THEN
    -- Increment counter
    UPDATE public.rate_limits 
    SET count = count + 1 
    WHERE ip_address = client_ip AND action_type = action 
    AND rate_limits.window_start = window_start;
    RETURN TRUE;
  ELSE
    -- Rate limit exceeded
    RETURN FALSE;
  END IF;
END;
$function$;