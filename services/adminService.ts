import { supabase } from '../config/supabase.config';
import type { Program, Day, Lesson, LessonPage, Test, TestQuestion } from '../types/challenge';

export const adminService = {
  // ==================== PROGRAMS ====================

  /**
   * Get all programs
   */
  async getPrograms(): Promise<Program[]> {
    const { data, error } = await supabase
      .from('program_stats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get single program
   */
  async getProgram(id: string): Promise<Program> {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create program
   */
  async createProgram(program: Partial<Program>): Promise<Program> {
    const { data, error } = await supabase
      .from('programs')
      .insert([program])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update program
   */
  async updateProgram(id: string, updates: Partial<Program>): Promise<Program> {
    const { data, error } = await supabase
      .from('programs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete program
   */
  async deleteProgram(id: string): Promise<void> {
    const { error } = await supabase.from('programs').delete().eq('id', id);
    if (error) throw error;
  },

  // ==================== DAYS ====================

  /**
   * Get days for a program
   */
  async getDays(programId: string): Promise<Day[]> {
    const { data, error } = await supabase
      .from('days')
      .select(`
        *,
        lessons:lessons(count),
        tests:tests(count)
      `)
      .eq('program_id', programId)
      .order('day_number', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get single day
   */
  async getDay(id: string): Promise<Day> {
    const { data, error } = await supabase
      .from('days')
      .select(`
        *,
        lessons(*),
        tests(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create day
   */
  async createDay(day: Partial<Day>): Promise<Day> {
    const { data, error } = await supabase
      .from('days')
      .insert([day])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update day
   */
  async updateDay(id: string, updates: Partial<Day>): Promise<Day> {
    const { data, error } = await supabase
      .from('days')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete day
   */
  async deleteDay(id: string): Promise<void> {
    const { error } = await supabase.from('days').delete().eq('id', id);
    if (error) throw error;
  },

  // ==================== LESSONS ====================

  /**
   * Get lessons for a day
   */
  async getLessons(dayId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        pages:lesson_pages(*)
      `)
      .eq('day_id', dayId)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get single lesson
   */
  async getLesson(id: string): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        pages:lesson_pages(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create lesson
   */
  async createLesson(lesson: Partial<Lesson>): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .insert([lesson])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update lesson
   */
  async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete lesson
   */
  async deleteLesson(id: string): Promise<void> {
    const { error } = await supabase.from('lessons').delete().eq('id', id);
    if (error) throw error;
  },

  // ==================== LESSON PAGES ====================

  /**
   * Get pages for a lesson
   */
  async getLessonPages(lessonId: string): Promise<LessonPage[]> {
    const { data, error } = await supabase
      .from('lesson_pages')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('page_number', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Create lesson page
   */
  async createLessonPage(page: Partial<LessonPage>): Promise<LessonPage> {
    const { data, error } = await supabase
      .from('lesson_pages')
      .insert([page])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update lesson page
   */
  async updateLessonPage(id: string, updates: Partial<LessonPage>): Promise<LessonPage> {
    const { data, error } = await supabase
      .from('lesson_pages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete lesson page
   */
  async deleteLessonPage(id: string): Promise<void> {
    const { error } = await supabase.from('lesson_pages').delete().eq('id', id);
    if (error) throw error;
  },

  // ==================== TESTS ====================

  /**
   * Get tests for a day
   */
  async getTests(dayId: string): Promise<Test[]> {
    const { data, error } = await supabase
      .from('tests')
      .select(`
        *,
        questions:test_questions(count)
      `)
      .eq('day_id', dayId)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get single test with questions
   */
  async getTest(id: string): Promise<Test> {
    const { data, error } = await supabase
      .from('tests')
      .select(`
        *,
        questions:test_questions(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create test
   */
  async createTest(test: Partial<Test>): Promise<Test> {
    const { data, error } = await supabase
      .from('tests')
      .insert([test])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update test
   */
  async updateTest(id: string, updates: Partial<Test>): Promise<Test> {
    const { data, error } = await supabase
      .from('tests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete test
   */
  async deleteTest(id: string): Promise<void> {
    const { error } = await supabase.from('tests').delete().eq('id', id);
    if (error) throw error;
  },

  // ==================== TEST QUESTIONS ====================

  /**
   * Get questions for a test
   */
  async getTestQuestions(testId: string): Promise<TestQuestion[]> {
    const { data, error } = await supabase
      .from('test_questions')
      .select('*')
      .eq('test_id', testId)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Create test question
   */
  async createTestQuestion(question: Partial<TestQuestion>): Promise<TestQuestion> {
    const { data, error } = await supabase
      .from('test_questions')
      .insert([question])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update test question
   */
  async updateTestQuestion(id: string, updates: Partial<TestQuestion>): Promise<TestQuestion> {
    const { data, error } = await supabase
      .from('test_questions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete test question
   */
  async deleteTestQuestion(id: string): Promise<void> {
    const { error } = await supabase.from('test_questions').delete().eq('id', id);
    if (error) throw error;
  },

  // ==================== UTILITY ====================

  /**
   * Search programs
   */
  async searchPrograms(query: string): Promise<Program[]> {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get program with full content
   */
  async getProgramWithContent(programId: string) {
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select(`
        *,
        days(
          *,
          lessons(*),
          tests(*)
        )
      `)
      .eq('id', programId)
      .single();

    if (programError) throw programError;
    return program;
  },
};
