-- Enable RLS on all tables that don't have it
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.is_admin());

CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (public.is_admin());

-- Create RLS policies for portfolio_content table (public read, admin write)
CREATE POLICY "Anyone can view active portfolio content"
ON public.portfolio_content
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage portfolio content"
ON public.portfolio_content
FOR ALL
USING (public.is_admin());

-- Create RLS policies for skills table (public read, admin write)
CREATE POLICY "Anyone can view active skills"
ON public.skills
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage skills"
ON public.skills
FOR ALL
USING (public.is_admin());

-- Remove the problematic existing policy on projects and recreate properly
DROP POLICY IF EXISTS "Only admins can modify projects" ON public.projects;

CREATE POLICY "Anyone can view active projects"
ON public.projects
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage projects"
ON public.projects
FOR ALL
USING (public.is_admin());