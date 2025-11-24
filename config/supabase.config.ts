import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// For local development, use your Supabase project credentials
// Get these from: https://app.supabase.com/project/_/settings/api

export const SUPABASE_CONFIG = {
  // Replace with your Supabase project URL
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL',

  // Replace with your Supabase anon/public key
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY',
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
