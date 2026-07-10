"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { passwordSchema, type PasswordFormData } from "@/features/auth/schemas";
import { Alert, AuthLayout, Button, Input } from "@/core/components";
import { supabase } from "@/core/lib/supabase/client";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const { updatePassword, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [exchangeError, setExchangeError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) });

  useEffect(() => {
    // Tratamento para links de redefinição com parâmetros PKCE ou erros
    const search = window.location.search;
    const hash = window.location.hash;
    const params = new URLSearchParams(search || hash.replace("#", "?"));
    const code = params.get("code");
    const errorParam = params.get("error_description") || params.get("error");
    
    if (errorParam) {
      setExchangeError("O link de redefinição é inválido ou expirou. Por favor, solicite um novo.");
      return;
    }

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error("Erro ao validar código PKCE:", error);
          setExchangeError("O link de redefinição é inválido ou expirou. Por favor, solicite um novo.");
        }
        // Remove os parâmetros da URL
        window.history.replaceState({}, document.title, window.location.pathname);
      });
    }
  }, []);

  const onSubmit = async (data: PasswordFormData) => {
    setFormError(null);
    setExchangeError(null);
    try {
      await updatePassword(data.password);
      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("Auth session missing")) {
        setFormError("Sessão inválida. Por favor, solicite um novo link de redefinição de senha.");
      } else {
        setFormError(msg || "Não foi possível atualizar a senha.");
      }
    }
  };

  return (
    <AuthLayout
      title="Crie uma nova senha"
      description="Escolha uma senha segura para voltar ao painel."
      icon={<KeyRound className="h-5 w-5" />}
      footer={<Link className="block text-center text-sm font-semibold text-slate-700 hover:text-slate-950" href="/login">Voltar para o login</Link>}
    >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nova senha"
            type="password"
            autoComplete="new-password"
            registration={register("password")}
            error={errors.password?.message}
          />

          {exchangeError && <Alert tone="error">{exchangeError}</Alert>}
          {formError && <Alert tone="error">{formError}</Alert>}

          <Button
            type="submit"
            loading={loading}
            icon={<KeyRound className="h-4 w-4" />}
            className="w-full"
            disabled={!!exchangeError}
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </form>

    </AuthLayout>
  );
}
