-- Create scale_waitlist table for Scale early access signups
CREATE TABLE IF NOT EXISTS public.scale_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scale_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for scale_waitlist - only admin can read
CREATE POLICY "Admins can view all waitlist entries"
ON public.scale_waitlist 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Add unique constraint on email
ALTER TABLE public.scale_waitlist ADD CONSTRAINT scale_waitlist_email_unique UNIQUE (email);

-- Add trigger for updated_at
CREATE TRIGGER update_scale_waitlist_updated_at
BEFORE UPDATE ON public.scale_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();