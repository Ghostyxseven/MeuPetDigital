import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Avisos de Configuração do Supabase: URL ou Anon Key ausente no arquivo .env.local.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
