-- Migration: Add enhanced fields to projects table
-- Run date: 2025-12-20

ALTER TABLE projects 
  ADD COLUMN IF NOT EXISTS completion_date DATE,
  ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Completed',
  ADD COLUMN IF NOT EXISTS team_size VARCHAR(50),
  ADD COLUMN IF NOT EXISTS duration VARCHAR(50),
  ADD COLUMN IF NOT EXISTS client VARCHAR(255),
  ADD COLUMN IF NOT EXISTS key_features TEXT[],
  ADD COLUMN IF NOT EXISTS challenges TEXT,
  ADD COLUMN IF NOT EXISTS results TEXT,
  ADD COLUMN IF NOT EXISTS demo_video_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS project_type VARCHAR(50) DEFAULT 'Personal';

-- Create index for status and project_type for future filtering
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);
