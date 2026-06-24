'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { passwordSchema, type PasswordFormData } from '@/features/auth/schemas';
import { Button, Input } from '@/core/components';

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
      router.push('/dashboard');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Nao foi possivel atualizar a senha.');
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
            <h1 className="text-xl font-bold text-slate-950">Nova senha</h1>
            <p className="text-sm text-slate-500">Defina a nova senha da sua conta.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nova senha"
            type="password"
            autoComplete="new-password"
            registration={register('password')}
            error={errors.password?.message}
          />

          {formError && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {formError}
            </p>
          )}

          <Button
            type="submit"
            loading={loading}
            icon={<KeyRound className="h-4 w-4" />}
            className="w-full"
          >
            {loading ? 'Salvando...' : 'Salvar nova senha'}
          </Button>
        </form>

        <Link className="mt-5 block text-center text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors" href="/login">
          Voltar para login
        </Link>
      </section>
    </main>
  );
}
