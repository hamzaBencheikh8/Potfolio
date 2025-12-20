-- Migration: Add enhanced fields to certifications table
-- Run date: 2025-12-20

ALTER TABLE certifications 
  ADD COLUMN IF NOT EXISTS grade VARCHAR(20),
  ADD COLUMN IF NOT EXISTS category VARCHAR(100),
  ADD COLUMN IF NOT EXISTS expiry_date DATE,
  ADD COLUMN IF NOT EXISTS skills TEXT[],
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS certificate_image VARCHAR(500);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_certifications_category ON certifications(category);
CREATE INDEX IF NOT EXISTS idx_certifications_expiry ON certifications(expiry_date);

-- Insert existing hardcoded certifications
INSERT INTO certifications (title, issuer, date, credential_url, badge, grade, category, skills) VALUES
('Connect and Protect: Networks and Network Security', 'Google', '2024', '#', '🛡️', '97.62%', 'Cybersecurity', ARRAY['Network Security', 'Risk Management', 'Security Protocols']),
('Encryption and Cryptography Essentials', 'IBM', '2024', '#', '🔐', '90%', 'Cybersecurity', ARRAY['Encryption', 'Cryptography', 'Security']),
('Play It Safe: Manage Security Risks', 'Google', '2024', '#', '🔒', '91.39%', 'Cybersecurity', ARRAY['Risk Management', 'Security Assessment', 'Threat Analysis']),
('Foundations of Cybersecurity', 'Google', '2024', '#', '🛡️', '93.06%', 'Cybersecurity', ARRAY['Cybersecurity Basics', 'Security Principles', 'Threat Detection'])
ON CONFLICT (id) DO NOTHING;
