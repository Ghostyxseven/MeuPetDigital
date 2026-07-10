"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { passwordSchema, type PasswordFormData } from "@/features/auth/schemas";
import { Alert, AuthLayout, Button, Input } from "@/core/components";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const { updatePassword, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) });

  const onSubmit = async (data: PasswordFormData) => {
    setFormError(null);
    try {
      await updatePassword(data.password);
      router.push("/dashboard");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar a senha.",
      );
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

          {formError && <Alert tone="error">{formError}</Alert>}

          <Button
            type="submit"
            loading={loading}
            icon={<KeyRound className="h-4 w-4" />}
            className="w-full"
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </form>

    </AuthLayout>
  );
}
