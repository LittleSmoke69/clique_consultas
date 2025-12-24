import { supabase } from '@/lib/supabase';

export type AppRole = 'admin' | 'paciente' | 'parceiro';

export type SignUpPayload = {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  role: AppRole;
};

export async function signInWithPassword(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithRole(payload: SignUpPayload) {
  const { email, password, fullName, phone, role } = payload;
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        full_name: fullName ?? null,
        phone: phone ?? null,
      },
    },
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function getMyProfile() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) return { profile: null, error: sessionError };
  if (!session?.user) return { profile: null, error: null };

  const { data, error } = await supabase
    .from('clique_profiles')
    .select('id, role, full_name, avatar_url, phone, created_at, updated_at')
    .eq('id', session.user.id)
    .single();

  return { profile: data ?? null, error };
}


