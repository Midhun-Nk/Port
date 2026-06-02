-- Run this in your Supabase SQL editor to create the contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert submissions
CREATE POLICY "Allow public insert" 
  ON contact_submissions FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users to view submissions
CREATE POLICY "Allow authenticated read" 
  ON contact_submissions FOR SELECT 
  TO authenticated 
  USING (true);
