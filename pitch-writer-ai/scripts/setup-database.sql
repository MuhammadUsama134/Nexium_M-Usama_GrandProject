-- Supabase Database Setup
-- Run this in your Supabase SQL editor

-- Enable RLS
ALTER TABLE IF EXISTS public.pitches ENABLE ROW LEVEL SECURITY;

-- Create pitches table
CREATE TABLE IF NOT EXISTS public.pitches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    audience TEXT NOT NULL,
    problem TEXT,
    solution TEXT,
    market_size TEXT,
    target_audience TEXT,
    usp TEXT,
    revenue_model TEXT,
    go_to_market TEXT,
    competition TEXT,
    team TEXT,
    ask TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
CREATE POLICY "Users can view their own pitches" ON public.pitches
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pitches" ON public.pitches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pitches" ON public.pitches
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pitches" ON public.pitches
    FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_pitches_updated_at
    BEFORE UPDATE ON public.pitches
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create templates table
CREATE TABLE IF NOT EXISTS public.pitch_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    sections JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO public.pitch_templates (name, description, category, difficulty, sections) VALUES
('Startup Pitch', 'Perfect for presenting your startup to investors and accelerators', 'Business', 'Intermediate', 
 '["Problem", "Solution", "Market Size", "Business Model", "Traction", "Team", "Funding Ask"]'),
('Product Pitch', 'Showcase your product features and benefits to potential customers', 'Product', 'Beginner',
 '["Product Overview", "Key Features", "Benefits", "Use Cases", "Pricing", "Call to Action"]'),
('Sales Pitch', 'Convert prospects into customers with a compelling sales presentation', 'Sales', 'Intermediate',
 '["Problem Identification", "Solution Presentation", "Value Proposition", "Social Proof", "Objection Handling", "Close"]'),
('Academic Pitch', 'Present your research or academic project effectively', 'Academic', 'Advanced',
 '["Research Question", "Literature Review", "Methodology", "Findings", "Implications", "Future Work"]'),
('Marketing Proposal', 'Propose marketing strategies and campaigns to stakeholders', 'Marketing', 'Intermediate',
 '["Market Analysis", "Target Audience", "Strategy Overview", "Tactics", "Budget", "Timeline", "Expected ROI"]');
