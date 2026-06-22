import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface UserProfile {
  id: string;
  email?: string;
  nome?: string;
  created_at?: string;
}
