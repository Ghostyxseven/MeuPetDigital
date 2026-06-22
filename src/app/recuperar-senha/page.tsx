'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Mail } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { emailSchema, type EmailFormData } from '@/features/auth/schemas';

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
      setMessage('Enviamos o link de redefinicao para o email informado.');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Nao foi possivel enviar o email.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <KeyRound className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-950">Recuperar senha</h1>
            <p className="text-sm text-slate-500">Receba um link seguro por email.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              type="email"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <span className="mt-1 block text-xs font-medium text-red-600">{errors.email.message}</span>}
          </label>

          {formError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{formError}</p>}
          {message && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</p>}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            <Mail className="h-4 w-4" />
            {loading ? 'Enviando...' : 'Enviar link'}
          </button>
        </form>

        <Link className="mt-5 block text-center text-sm font-semibold text-slate-700 hover:text-slate-950" href="/login">
          Voltar para login
        </Link>
      </section>
    </main>
  );
}
