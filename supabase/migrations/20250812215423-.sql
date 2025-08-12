-- Create blog schema: posts and likes, with RLS and seed data

-- 1) Table: blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  cover_image_url text,
  tags text[] DEFAULT '{}'::text[],
  author text NOT NULL DEFAULT 'FeatherBiz Editorial',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  read_time_minutes integer DEFAULT 5,
  likes_count integer NOT NULL DEFAULT 0,
  liked_by_names text[] DEFAULT '{}'::text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

DROP TRIGGER IF EXISTS trg_update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trg_update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public can view published blog posts" ON public.blog_posts;
CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));

DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts"
  ON public.blog_posts
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN (tags);

-- 2) Table: blog_likes
CREATE TABLE IF NOT EXISTS public.blog_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id uuid NULL,
  client_id text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_like UNIQUE (post_id, user_id),
  CONSTRAINT unique_client_like UNIQUE (post_id, client_id)
);

-- Enable RLS for blog_likes (service role bypasses RLS for edge function)
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own likes" ON public.blog_likes;
CREATE POLICY "Users can manage their own likes"
  ON public.blog_likes
  FOR ALL
  USING ((user_id IS NOT NULL AND user_id = auth.uid()))
  WITH CHECK ((user_id IS NOT NULL AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Allow read likes for published posts" ON public.blog_likes;
CREATE POLICY "Allow read likes for published posts"
  ON public.blog_likes
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.blog_posts p WHERE p.id = post_id AND p.status = 'published' AND (p.published_at IS NULL OR p.published_at <= now())));

-- 3) Seed posts (idempotent upserts by slug)
-- Helper function to upsert a blog post by slug
CREATE OR REPLACE FUNCTION public.upsert_blog_post(
  p_title text,
  p_slug text,
  p_excerpt text,
  p_content text,
  p_tags text[],
  p_likes integer,
  p_names text[],
  p_read int
) RETURNS void AS $$
BEGIN
  INSERT INTO public.blog_posts (title, slug, excerpt, content, tags, status, published_at, likes_count, liked_by_names, read_time_minutes)
  VALUES (p_title, p_slug, p_excerpt, p_content, p_tags, 'published', now() - (floor(random()*30)) * interval '1 day', p_likes, p_names, p_read)
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    tags = EXCLUDED.tags,
    status = 'published',
    published_at = COALESCE(public.blog_posts.published_at, EXCLUDED.published_at),
    likes_count = EXCLUDED.likes_count,
    liked_by_names = EXCLUDED.liked_by_names,
    read_time_minutes = EXCLUDED.read_time_minutes,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

-- Seed content placeholders (short business-oriented paragraphs)
DO $$
DECLARE
  lorem text := 'Small businesses win with systems, not spreadsheets. This article outlines practical steps to build reliable processes, align teams, and use data to make decisions. Learn how to prioritize, automate, and measure outcomes so work moves forward consistently. By adopting a lightweight operating cadence and the right tools, you can grow faster with less chaos. This guide shares repeatable patterns leaders use to scale without burning out.';
BEGIN
  PERFORM public.upsert_blog_post('5 Pricing Mistakes SMBs Make (and How to Fix Them)', '5-pricing-mistakes-smbs', 'The most common pricing pitfalls and practical fixes for small teams.', lorem, ARRAY['Pricing','SMB','Finance'], 18, ARRAY['Alex R.','Priya S.','Daniel M.'], 6);
  PERFORM public.upsert_blog_post('From Spreadsheets to Systems: When to Adopt a CRM', 'from-spreadsheets-to-systems-crm', 'How to know it''s time to move beyond spreadsheets and into a CRM.', lorem, ARRAY['CRM','Operations','Productivity'], 24, ARRAY['Marina L.','Chris T.'], 6);
  PERFORM public.upsert_blog_post('Automations That Save You 10 Hours/Week', 'automations-save-10-hours', 'Simple automations that reclaim time without breaking workflows.', lorem, ARRAY['Automation','Productivity'], 31, ARRAY['Diego P.','Hannah K.','Li Wei'], 5);
  PERFORM public.upsert_blog_post('AI for Estimates: Faster Quotes Without the Guesswork', 'ai-for-estimates-faster-quotes', 'Speed up estimating with AI while keeping accuracy high.', lorem, ARRAY['AI','Estimates'], 27, ARRAY['Ibrahim Z.','Sofia N.'], 6);
  PERFORM public.upsert_blog_post('Building a Reliable Sales Pipeline in 30 Days', 'reliable-sales-pipeline-30-days', 'A focused plan to create momentum and predictability in your pipeline.', lorem, ARRAY['Pipeline','Sales','Operations'], 22, ARRAY['Ben A.','Karina M.'], 7);
  PERFORM public.upsert_blog_post('Cash Flow Basics for Small Teams', 'cash-flow-basics-small-teams', 'Understand cash flow with simple models and better decisions.', lorem, ARRAY['Finance','SMB'], 16, ARRAY['Tom W.','Jade R.'], 5);
  PERFORM public.upsert_blog_post('Playbooks for Assignments & Accountability', 'playbooks-assignments-accountability', 'Keep work moving with clear owners, expectations, and cadence.', lorem, ARRAY['Operations','Productivity','Assignments'], 19, ARRAY['Lucas P.','Nina V.'], 6);
  PERFORM public.upsert_blog_post('AI & Calc: Quick Wins for Service Businesses', 'ai-and-calc-quick-wins', 'Use AI and calculators to speed up everyday service workflows.', lorem, ARRAY['AI','Operations','Productivity'], 21, ARRAY['Elena D.','Omar K.'], 6);
  PERFORM public.upsert_blog_post('Voices: Turning Calls into Actionable Tasks', 'voices-turning-calls-into-tasks', 'Convert voice conversations into structured tasks your team can track.', lorem, ARRAY['Voices','Productivity'], 25, ARRAY['Rafael G.','Emily S.'], 5);
  PERFORM public.upsert_blog_post('Onboarding New Clients Without the Chaos', 'onboarding-new-clients-without-chaos', 'A simple onboarding checklist your team can actually follow.', lorem, ARRAY['Operations','Productivity'], 14, ARRAY['Kenji M.'], 5);
  PERFORM public.upsert_blog_post('When to Hire vs Automate', 'when-to-hire-vs-automate', 'Decide with data: people, process, or automation — and when.', lorem, ARRAY['Automation','HR','Productivity'], 12, ARRAY['Pam C.'], 6);
  PERFORM public.upsert_blog_post('Smart Reporting for Non-Analysts', 'smart-reporting-non-analysts', 'Turn raw data into insight with practical, no-jargon steps.', lorem, ARRAY['Reporting','Productivity'], 20, ARRAY['Ivy L.','Marc D.'], 6);
  PERFORM public.upsert_blog_post('Estimating Jobs: The Playbook', 'estimating-jobs-playbook', 'A step-by-step estimating playbook your clients will love.', lorem, ARRAY['Estimates','Operations'], 17, ARRAY['Andre P.'], 6);
  PERFORM public.upsert_blog_post('Assignments That Actually Get Done', 'assignments-that-get-done', 'Make assignments stick with clear expectations and follow-through.', lorem, ARRAY['Assignments','Productivity'], 13, ARRAY['Gina F.'], 5);
  PERFORM public.upsert_blog_post('Voices + SmartSchedule: Close the Loop', 'voices-smart-schedule-close-loop', 'Tie calls to schedules so nothing falls through the cracks.', lorem, ARRAY['Voices','Scheduling','Operations'], 11, ARRAY['Noah H.'], 5);
  PERFORM public.upsert_blog_post('Reducing Tool Sprawl in 2025', 'reducing-tool-sprawl-2025', 'Simplify your stack and cut costs without losing capability.', lorem, ARRAY['Productivity','Operations'], 9, ARRAY['Sergio M.'], 5);
  PERFORM public.upsert_blog_post('Security Basics for SMB SaaS', 'security-basics-smb-saas', 'Practical security steps that fit small business realities.', lorem, ARRAY['Security','SMB'], 8, ARRAY['Marta C.'], 6);
  PERFORM public.upsert_blog_post('How to Forecast Workloads', 'how-to-forecast-workloads', 'Balance workloads and avoid bottlenecks with simple models.', lorem, ARRAY['Operations','Productivity'], 10, ARRAY['Ilya V.'], 6);
  PERFORM public.upsert_blog_post('From Quote to Invoice: A Smooth Path', 'from-quote-to-invoice-smooth-path', 'Connect quotes, orders, and invoices without manual rework.', lorem, ARRAY['Finance','Operations'], 15, ARRAY['Jenny K.'], 5);
  PERFORM public.upsert_blog_post('The Small Business AI Starter Pack', 'small-business-ai-starter-pack', 'A practical set of AI tools to start small and grow fast.', lorem, ARRAY['AI','SMB','Productivity'], 28, ARRAY['Victor R.','Ana P.'], 7);
END $$;
