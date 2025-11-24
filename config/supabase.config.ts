import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// For local development, use your Supabase project credentials
// Get these from: https://app.supabase.com/project/_/settings/api

export const SUPABASE_CONFIG = {
  // Replace with your Supabase project URL
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://jznsoularrfbcndftbqu.supabase.co',

  // Replace with your Supabase anon/public key
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bnNvdWxhcnJmYmNuZGZ0YnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTc2OTIsImV4cCI6MjA3OTU3MzY5Mn0.5PEMCZ9weFALOUbv20v87qXmrXpcve8KKd81J7jpDUI',
};

// Create Supabase client
export const supabase = createClient(
  SUPABASE_CONFIG.SUPABASE_URL,
  SUPABASE_CONFIG.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Helper function to check connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('programs').select('count');
    if (error) throw error;
    console.log('✅ Supabase connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};
