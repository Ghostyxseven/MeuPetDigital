"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { authSchema, type AuthFormData } from "@/features/auth/schemas";
import { Alert, AuthLayout, Button, Input } from "@/core/components";

export default function CadastroPage() {
  const router = useRouter();
  const { signUp, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: AuthFormData) => {
    setFormError(null);
    try {
      await signUp(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Não foi possível criar a conta.",
      );
    }
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      description="Comece a organizar os cuidados dos seus pets em poucos passos."
      icon={<UserPlus className="h-5 w-5" />}
      footer={
        <p className="text-center text-sm text-slate-500">
          Já tem conta?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/login">
            Entrar
          </Link>
        </p>
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
            autoComplete="new-password"
            registration={register("password")}
            error={errors.password?.message}
          />

          {formError && <Alert tone="error">{formError}</Alert>}

          <Button
            type="submit"
            loading={loading}
            icon={<UserPlus className="h-4 w-4" />}
            className="w-full"
          >
            {loading ? "Criando..." : "Criar conta"}
          </Button>
        </form>

    </AuthLayout>
  );
}
