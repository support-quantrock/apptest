-- ==================== CHALLENGE MANAGEMENT SYSTEM ====================
-- Complete database schema for managing programs, days, lessons, and tests

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== PROGRAMS TABLE ====================
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('skill_assessment', 'invest_challenge', 'trading_challenge')),
  description TEXT,
  duration_days INTEGER NOT NULL DEFAULT 30,
  difficulty_level VARCHAR(50) DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  requires_subscription BOOLEAN DEFAULT false,
  entry_fee DECIMAL(10, 2) DEFAULT 0,
  prize_pool DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== DAYS TABLE ====================
CREATE TABLE IF NOT EXISTS days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_locked BOOLEAN DEFAULT false,
  unlock_criteria JSONB,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(program_id, day_number)
);

-- ==================== LESSONS TABLE ====================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  lesson_type VARCHAR(50) DEFAULT 'article' CHECK (lesson_type IN ('video', 'article', 'interactive', 'quiz')),
  duration_minutes INTEGER DEFAULT 10,
  video_url TEXT,
  thumbnail_url TEXT,
  resources JSONB,
  is_mandatory BOOLEAN DEFAULT true,
  display_order INTEGER NOT NULL,
  view_count INTEGER DEFAULT 0,
  completion_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== LESSON PAGES TABLE ====================
CREATE TABLE IF NOT EXISTS lesson_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  title VARCHAR(255),
  content TEXT NOT NULL,
  images JSONB,
  video_url TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, page_number)
);

-- ==================== TESTS TABLE ====================
CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_id UUID NOT NULL REFERENCES days(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  test_type VARCHAR(50) DEFAULT 'quiz' CHECK (test_type IN ('quiz', 'practical', 'assessment', 'final_exam')),
  duration_minutes INTEGER DEFAULT 30,
  passing_score INTEGER DEFAULT 70,
  max_attempts INTEGER DEFAULT 3,
  is_mandatory BOOLEAN DEFAULT true,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== TEST QUESTIONS TABLE ====================
CREATE TABLE IF NOT EXISTS test_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'practical')),
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 10,
  difficulty_level VARCHAR(50) DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== USER PROGRESS TABLE ====================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  current_day INTEGER DEFAULT 1,
  total_score INTEGER DEFAULT 0,
  completed_lessons INTEGER DEFAULT 0,
  completed_tests INTEGER DEFAULT 0,
  completion_percentage DECIMAL(5, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'failed')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, program_id)
);

-- ==================== LESSON PROGRESS TABLE ====================
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  progress_percentage INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ==================== TEST ATTEMPTS TABLE ====================
CREATE TABLE IF NOT EXISTS test_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL,
  score INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT false,
  answers JSONB,
  time_spent_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== INDEXES ====================
CREATE INDEX idx_programs_type ON programs(type);
CREATE INDEX idx_programs_is_active ON programs(is_active);
CREATE INDEX idx_days_program_id ON days(program_id);
CREATE INDEX idx_days_day_number ON days(day_number);
CREATE INDEX idx_lessons_day_id ON lessons(day_id);
CREATE INDEX idx_lessons_program_id ON lessons(program_id);
CREATE INDEX idx_lesson_pages_lesson_id ON lesson_pages(lesson_id);
CREATE INDEX idx_tests_day_id ON tests(day_id);
CREATE INDEX idx_tests_program_id ON tests(program_id);
CREATE INDEX idx_test_questions_test_id ON test_questions(test_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_program_id ON user_progress(program_id);
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX idx_test_attempts_user_id ON test_attempts(user_id);
CREATE INDEX idx_test_attempts_test_id ON test_attempts(test_id);

-- ==================== VIEWS ====================

-- Program statistics view
CREATE OR REPLACE VIEW program_stats AS
SELECT
  p.id,
  p.name,
  p.type,
  p.difficulty_level,
  COUNT(DISTINCT d.id) as total_days,
  COUNT(DISTINCT l.id) as total_lessons,
  COUNT(DISTINCT t.id) as total_tests,
  COUNT(DISTINCT up.user_id) as participant_count,
  COALESCE(AVG(up.completion_percentage), 0) as completion_rate,
  COUNT(DISTINCT CASE WHEN up.status = 'active' THEN up.user_id END) as active_users,
  COALESCE(AVG(CASE WHEN up.status = 'active' THEN up.completion_percentage END), 0) as avg_progress
FROM programs p
LEFT JOIN days d ON d.program_id = p.id
LEFT JOIN lessons l ON l.program_id = p.id
LEFT JOIN tests t ON t.program_id = p.id
LEFT JOIN user_progress up ON up.program_id = p.id
GROUP BY p.id, p.name, p.type, p.difficulty_level;

-- ==================== FUNCTIONS ====================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==================== TRIGGERS ====================

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_days_updated_at BEFORE UPDATE ON days
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_pages_updated_at BEFORE UPDATE ON lesson_pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON tests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================== SAMPLE DATA ====================

-- Insert sample skill assessment program
INSERT INTO programs (name, type, description, duration_days, difficulty_level, is_active)
VALUES (
  'Financial Literacy Fundamentals',
  'skill_assessment',
  'Master the basics of personal finance, budgeting, and investment principles.',
  30,
  'beginner',
  true
) ON CONFLICT DO NOTHING;

-- Insert sample days (for the first program)
DO $$
DECLARE
  program_id UUID;
BEGIN
  SELECT id INTO program_id FROM programs WHERE name = 'Financial Literacy Fundamentals' LIMIT 1;

  IF program_id IS NOT NULL THEN
    INSERT INTO days (program_id, day_number, title, description, display_order)
    VALUES
      (program_id, 1, 'Introduction to Financial Planning', 'Learn the basics of financial planning and goal setting.', 1),
      (program_id, 2, 'Understanding Income and Expenses', 'Master tracking your income and expenses effectively.', 2),
      (program_id, 3, 'Building Your First Budget', 'Create a practical budget that works for your lifestyle.', 3)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
