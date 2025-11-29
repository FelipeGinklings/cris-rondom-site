import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DayEntry {
  id: string;
  user_id: string;
  date: string;
  name: string;
  phone: string;
  notas: string;
  service: string;
  created_at: string;
  updated_at: string;
  // Consultation fields
  client_id?: string | null;
  client_name?: string;
  procedure?: string;
  consultation_type?: string;
  address?: string;
  start_time?: string | null;
  end_time?: string | null;
}
