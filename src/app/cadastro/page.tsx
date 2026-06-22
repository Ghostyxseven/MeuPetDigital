'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog, UserPlus } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authSchema, type AuthFormData } from '@/features/auth/schemas';

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
      router.push('/dashboard');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Nao foi possivel criar a conta.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Dog className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-950">Criar conta</h1>
            <p className="text-sm text-slate-500">Cadastre o tutor para usar o painel.</p>
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

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Senha</span>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              type="password"
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && <span className="mt-1 block text-xs font-medium text-red-600">{errors.password.message}</span>}
          </label>

          {formError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{formError}</p>}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            <UserPlus className="h-4 w-4" />
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Ja tem conta?{' '}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/login">
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
}
