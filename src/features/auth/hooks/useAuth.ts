'use client';

import { useState } from 'react';
import { useAuthContext } from '../components/AuthProvider';

export function useAuth() {
  const { user, session, loading: contextLoading, signOut, checkSession } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cadastro de usuário
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao cadastrar usuário.');
      
      await checkSession();
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
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao realizar login.');

      await checkSession();
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao realizar login.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Recuperação de senha - Simulado localmente
  const resetPassword = async (email: string, redirectTo: string) => {
    setLoading(true);
    setError(null);
    try {
      void email;
      void redirectTo;
      // Simula o sucesso imediato localmente
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao enviar email de recuperação.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar senha no banco de dados local
  const updatePassword = async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar a senha.');
      
      await checkSession();
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
