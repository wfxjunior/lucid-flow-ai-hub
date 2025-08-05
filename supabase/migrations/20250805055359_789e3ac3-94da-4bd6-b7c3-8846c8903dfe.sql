-- Create referrals table to track referral programs
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  reward_amount DECIMAL(10,2) DEFAULT 30.00,
  reward_paid BOOLEAN DEFAULT FALSE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  signed_up_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(referrer_id, referred_email)
);

-- Create user_referral_stats table to track aggregated stats
CREATE TABLE public.user_referral_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  referral_code TEXT NOT NULL UNIQUE,
  total_referrals INTEGER DEFAULT 0,
  successful_signups INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  pending_rewards DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on referrals table
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Enable RLS on user_referral_stats table
ALTER TABLE public.user_referral_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals table
CREATE POLICY "Users can view their own referrals as referrer" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() = referrer_id);

CREATE POLICY "Users can insert their own referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Users can update their own referrals" 
ON public.referrals 
FOR UPDATE 
USING (auth.uid() = referrer_id);

-- Create policies for user_referral_stats table
CREATE POLICY "Users can view their own referral stats" 
ON public.user_referral_stats 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own referral stats" 
ON public.user_referral_stats 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own referral stats" 
ON public.user_referral_stats 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Function to generate referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code(user_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Function to initialize user referral stats
CREATE OR REPLACE FUNCTION public.initialize_user_referral_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create trigger to initialize referral stats when user signs up
DROP TRIGGER IF EXISTS initialize_referral_stats_trigger ON auth.users;
CREATE TRIGGER initialize_referral_stats_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_referral_stats();

-- Function to update referral stats
CREATE OR REPLACE FUNCTION public.update_referral_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create trigger to update stats when referrals change
DROP TRIGGER IF EXISTS update_referral_stats_trigger ON public.referrals;
CREATE TRIGGER update_referral_stats_trigger
  AFTER INSERT OR UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_stats();

-- Create function to track referral signup
CREATE OR REPLACE FUNCTION public.track_referral_signup(referral_code_param TEXT, new_user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
  
  RETURN TRUE;
END;
$$;