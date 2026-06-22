'use client';

import { useState } from 'react';
import { supabase } from '@/core/lib/supabase/client';
import { useAuthContext } from '../components/AuthProvider';

export function useAuth() {
  const { user, session, loading: contextLoading, signOut } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cadastro de usuário
  const signUp = async (email: string, password: string, options?: { data?: Record<string, unknown> }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options,
      });
      if (signUpError) throw signUpError;
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao cadastrar usuário.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login do usuário
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao realizar login.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Recuperação de senha - Enviar email
  const resetPassword = async (email: string, redirectTo: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (resetError) throw resetError;
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao enviar email de recuperação.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar senha (usado após clicar no link do email de recuperação)
  const updatePassword = async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao atualizar a senha.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading: contextLoading || loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  };
}
