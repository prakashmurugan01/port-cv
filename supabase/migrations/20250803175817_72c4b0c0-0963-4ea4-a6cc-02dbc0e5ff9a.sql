-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_content table for dynamic content
CREATE TABLE public.portfolio_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  metadata JSONB,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT[],
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for public content (viewable by everyone)
CREATE POLICY "Portfolio content is viewable by everyone" 
ON public.portfolio_content FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can modify portfolio content" 
ON public.portfolio_content FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Projects are viewable by everyone" 
ON public.projects FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can modify projects" 
ON public.projects FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Skills are viewable by everyone" 
ON public.skills FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can modify skills" 
ON public.skills FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Certifications are viewable by everyone" 
ON public.certifications FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can modify certifications" 
ON public.certifications FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Contact messages can be inserted by anyone" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_content_updated_at
  BEFORE UPDATE ON public.portfolio_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for Prakash M
INSERT INTO public.projects (title, description, technologies, github_url, demo_url, order_index, is_featured) VALUES
('Plant Disease Detection using AI', 'AI-powered web application that detects plant diseases from uploaded images using machine learning algorithms.', ARRAY['Python', 'TensorFlow', 'Flask', 'OpenCV', 'HTML', 'CSS', 'JavaScript'], 'https://github.com/prakashm612/plant-disease-detection', 'https://plant-disease-ai.herokuapp.com', 1, true),
('Hotel Booking System', 'Full-stack hotel booking platform with user authentication, room management, and booking functionality.', ARRAY['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'], 'https://github.com/prakashm612/hotel-booking', 'https://hotelbooking-demo.netlify.app', 2, true);

INSERT INTO public.skills (name, category, proficiency, order_index) VALUES
('HTML5', 'Frontend', 95, 1),
('CSS3', 'Frontend', 90, 2),
('JavaScript', 'Frontend', 85, 3),
('Python', 'Backend', 88, 4),
('MySQL', 'Database', 82, 5),
('Cloud Computing', 'DevOps', 75, 6),
('React', 'Frontend', 80, 7),
('Flask', 'Backend', 85, 8),
('Git', 'Tools', 88, 9);

INSERT INTO public.certifications (title, issuer, issue_date, order_index) VALUES
('Prompt Engineering for AI', 'DeepLearning.AI', '2024-01-15', 1),
('JavaScript Fundamentals', 'freeCodeCamp', '2023-11-20', 2),
('C++ Programming', 'Coursera', '2023-09-10', 3),
('Cloud Computing Essentials', 'AWS', '2023-07-25', 4),
('Web Development Bootcamp', 'Udemy', '2023-05-30', 5);

INSERT INTO public.portfolio_content (section, title, content, order_index) VALUES
('hero', 'name', 'Prakash M', 1),
('hero', 'title', 'Web Developer & AI Enthusiast', 2),
('hero', 'description', 'Passionate full-stack developer with expertise in modern web technologies and artificial intelligence. Currently pursuing innovative projects that bridge the gap between traditional web development and cutting-edge AI solutions.', 3),
('about', 'summary', 'Experienced web developer with a strong foundation in both frontend and backend technologies. Specialized in creating responsive, user-friendly applications with a focus on clean code and optimal performance. Always eager to learn new technologies and implement best practices in software development.', 1),
('experience', 'internship', 'Web Development Intern at Optimus Pvt Ltd - Gained hands-on experience in full-stack web development, worked on client projects using modern frameworks, and collaborated with senior developers on enterprise-level applications.', 1);