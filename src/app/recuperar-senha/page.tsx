'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Mail } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { emailSchema, type EmailFormData } from '@/features/auth/schemas';
import { Alert, Button, Input } from '@/core/components';

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
      await resetPassword(data.email, `${window.location.origin}/redefinir-senha`);
      setMessage('Enviamos o link de redefinição para o e-mail informado.');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Não foi possível enviar o e-mail.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="animate-slide-up w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <KeyRound className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-950">Recuperar senha</h1>
            <p className="text-sm text-slate-500">Receba um link seguro por e-mail.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            registration={register('email')}
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
            {loading ? 'Enviando...' : 'Enviar link'}
          </Button>
        </form>

        <Link className="mt-5 block text-center text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors" href="/login">
          Voltar para login
        </Link>
      </section>
    </main>
  );
}
