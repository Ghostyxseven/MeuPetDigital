"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { authSchema, type AuthFormData } from "@/features/auth/schemas";
import { Alert, AuthLayout, Button, Input } from "@/core/components";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: AuthFormData) => {
    setFormError(null);
    try {
      await signIn(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Não foi possível entrar.",
      );
    }
  };

  return (
    <AuthLayout
      title="Boas-vindas de volta"
      description="Entre para acompanhar a saúde e as próximas vacinas dos seus pets."
      icon={<LogIn className="h-5 w-5" />}
      footer={
        <div className="flex items-center justify-between gap-4 text-sm">
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/recuperar-senha">
            Esqueci a senha
          </Link>
          <Link className="font-semibold text-slate-700 hover:text-slate-950" href="/cadastro">
            Criar conta
          </Link>
        </div>
      }
    >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            registration={register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Senha"
            type="password"
            autoComplete="current-password"
            registration={register("password")}
            error={errors.password?.message}
          />

          {formError && <Alert tone="error">{formError}</Alert>}

          <Button
            type="submit"
            loading={loading}
            icon={<LogIn className="h-4 w-4" />}
            className="w-full"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

    </AuthLayout>
  );
}
