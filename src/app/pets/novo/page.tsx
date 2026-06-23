'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog, ArrowLeft, Save } from 'lucide-react';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { usePets } from '@/features/pets/hooks/usePets';
import { petSchema, type PetFormData } from '@/features/pets/schemas';

export default function NovoPetPage() {
  return (
    <ProtectedRoute>
      <NovoPetContent />
    </ProtectedRoute>
  );
}

function NovoPetContent() {
  const router = useRouter();
  const { createPet } = usePets();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      nome: '',
      raca: '',
      data_nascimento: '',
      peso: null,
      rg_sinpatinhas: '',
    },
  });

  const onSubmit = async (data: PetFormData) => {
    setFormError(null);
    setLoading(true);
    try {
      await createPet({
        nome: data.nome,
        raca: data.raca || null,
        data_nascimento: data.data_nascimento || null,
        peso: data.peso || null,
        rg_sinpatinhas: data.rg_sinpatinhas || null,
      });
      router.push('/pets');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Não foi possível cadastrar o pet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/pets"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-md font-bold tracking-tight text-slate-900">Cadastrar Novo Pet</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Dog className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-950">Ficha do Pet</h1>
              <p className="text-xs text-slate-500">Insira os dados cadastrais do seu cão.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Nome *</label>
              <input
                type="text"
                {...register('nome')}
                placeholder="Ex: Thor, Pipoca"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.nome && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.nome.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Raça</label>
              <input
                type="text"
                {...register('raca')}
                placeholder="Ex: Golden Retriever, SRD"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.raca && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.raca.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Data de Nascimento</label>
              <input
                type="date"
                {...register('data_nascimento')}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-700"
              />
              {errors.data_nascimento && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.data_nascimento.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register('peso', { setValueAs: (v) => (v === '' ? null : Number(v)) })}
                placeholder="Ex: 14.5"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.peso && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.peso.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">RG SinPatinhas</label>
              <input
                type="text"
                {...register('rg_sinpatinhas')}
                placeholder="Ex: SP-123456-X"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.rg_sinpatinhas && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.rg_sinpatinhas.message}</span>
              )}
            </div>

            {formError && (
              <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-700">{formError}</p>
            )}

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => router.push('/pets')}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {loading ? 'Cadastrando...' : 'Salvar Pet'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
