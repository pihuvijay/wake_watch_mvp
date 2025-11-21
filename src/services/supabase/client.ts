/**
 * Supabase Client Configuration
 * 
 * Initializes and configures the Supabase client for the application.
 * Handles authentication, database operations, and real-time subscriptions.
 * 
 * Features:
 * - Supabase client initialization
 * - Environment variable configuration
 * - Auth configuration
 * - Database connection
 * - Real-time capabilities
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

/**
 * Supabase client instance
 * 
 * This client is configured for:
 * - Authentication (email/password, OAuth)
 * - Database operations (CRUD)
 * - Real-time subscriptions
 * - Storage operations
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configure auth settings
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Storage adapter for React Native
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  // Global configuration
  global: {
    headers: {
      'X-Client-Info': 'wakewatch-expo',
    },
  },
});

/**
 * Database types (to be generated from Supabase)
 * Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
 */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Add more tables as needed
    };
    Views: {
      // Add views as needed
    };
    Functions: {
      // Add functions as needed
    };
    Enums: {
      // Add enums as needed
    };
  };
};

export default supabase;
