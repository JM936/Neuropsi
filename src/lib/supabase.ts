import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são obrigatórias para inicializar o cliente do Supabase.');
}

// Inicializa o cliente do Supabase com as credenciais públicas seguras por RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
