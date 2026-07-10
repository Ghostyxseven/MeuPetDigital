"use client";

import { useState } from "react";
import { useAuthContext } from "../components/AuthProvider";
import { supabase } from "@/core/lib/supabase/client";

export function useAuth() {
  const { user, session, loading: contextLoading, signOut } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cadastro de usuário
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (supaError) throw supaError;
      return data;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao cadastrar usuário.";
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
      const { data, error: supaError } = await supabase.auth.signInWithPassword(
        { email, password },
      );
      if (supaError) throw supaError;
      return data;
    } catch (err) {
      const originalMessage = err instanceof Error ? err.message : "";
      const errorMsg =
        originalMessage === "Invalid login credentials"
          ? "E-mail ou senha inválidos."
          : originalMessage || "Não foi possível realizar o login.";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Recuperação de senha
  const resetPassword = async (email: string, redirectTo: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } =
        await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (supaError) throw supaError;
      return data;
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Erro ao enviar email de recuperação.";
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
      const { data, error: supaError } = await supabase.auth.updateUser({
        password,
      });
      if (supaError) throw supaError;
      return data;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao atualizar a senha.";
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
