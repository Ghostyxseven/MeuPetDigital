'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog, LogIn } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authSchema, type AuthFormData } from '@/features/auth/schemas';

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
      router.push('/dashboard');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Nao foi possivel entrar.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <AuthHeader title="Entrar" subtitle="Acesse o painel do MeuPetDigital." />
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <AuthField label="Email" type="email" autoComplete="email" registration={register('email')} error={errors.email?.message} />
          <AuthField
            label="Senha"
            type="password"
            autoComplete="current-password"
            registration={register('password')}
            error={errors.password?.message}
          />
          {formError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{formError}</p>}
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            <LogIn className="h-4 w-4" />
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-5 flex items-center justify-between text-sm">
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/recuperar-senha">
            Esqueci a senha
          </Link>
          <Link className="font-semibold text-slate-700 hover:text-slate-950" href="/cadastro">
            Criar conta
          </Link>
        </div>
      </section>
    </main>
  );
}

function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
        <Dog className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-950">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function AuthField({
  label,
  type,
  autoComplete,
  registration,
  error,
}: {
  label: string;
  type: string;
  autoComplete: string;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
        type={type}
        autoComplete={autoComplete}
        {...registration}
      />
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
