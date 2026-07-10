"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Mail } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { emailSchema, type EmailFormData } from "@/features/auth/schemas";
import { Alert, AuthLayout, Button, Input } from "@/core/components";

export default function RecuperarSenhaPage() {
  const { resetPassword, loading } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({ resolver: zodResolver(emailSchema) });

  const onSubmit = async (data: EmailFormData) => {
    setMessage(null);
    setFormError(null);
    try {
      await resetPassword(
        data.email,
        `${window.location.origin}/redefinir-senha`,
      );
      setMessage("Enviamos o link de redefinição para o e-mail informado.");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Não foi possível enviar o e-mail.",
      );
    }
  };

  return (
    <AuthLayout
      title="Recuperar senha"
      description="Informe seu e-mail para receber um link seguro de redefinição."
      icon={<KeyRound className="h-5 w-5" />}
      footer={<Link className="block text-center text-sm font-semibold text-slate-700 hover:text-slate-950" href="/login">Voltar para o login</Link>}
    >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            registration={register("email")}
            error={errors.email?.message}
          />

          {formError && <Alert tone="error">{formError}</Alert>}
          {message && <Alert tone="success">{message}</Alert>}

          <Button
            type="submit"
            loading={loading}
            icon={<Mail className="h-4 w-4" />}
            className="w-full"
          >
            {loading ? "Enviando..." : "Enviar link"}
          </Button>
        </form>

    </AuthLayout>
  );
}
