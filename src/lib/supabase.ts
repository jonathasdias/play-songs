import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPA_URL!;
const supabaseAnonKey = import.meta.env.VITE_ANON_PUBLIC_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);