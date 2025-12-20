-- Migration: Add 10 enhanced fields to projects table
-- Execute this on Render PostgreSQL Web Console

ALTER TABLE projects ADD COLUMN IF NOT EXISTS completion_date DATE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Completed';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS team_size VARCHAR(50);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS duration VARCHAR(50);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client VARCHAR(255);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS results TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_video_url VARCHAR(500);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type VARCHAR(50) DEFAULT 'Personal';

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' 
ORDER BY ordinal_position;
