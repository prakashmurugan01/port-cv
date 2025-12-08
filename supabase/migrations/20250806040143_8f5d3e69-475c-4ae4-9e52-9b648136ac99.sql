-- Fix security linter issues

-- 1. Enable RLS on portfolio table (missing from previous migration)
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- 2. Add missing RLS policies for portfolio table
CREATE POLICY "Anyone can view portfolio"
ON public.portfolio
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage portfolio"
ON public.portfolio
FOR ALL
USING (public.is_admin());

-- 3. Add missing RLS policies for certifications table
CREATE POLICY "Anyone can view certifications"
ON public.certifications
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage certifications"
ON public.certifications
FOR ALL
USING (public.is_admin());

-- 4. Add missing RLS policies for contact_messages table
CREATE POLICY "Users can create contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages"
ON public.contact_messages
FOR SELECT
USING (public.is_admin());

CREATE POLICY "Admins can manage contact messages"
ON public.contact_messages
FOR ALL
USING (public.is_admin());

-- 5. Fix function search path issues by setting search_path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;