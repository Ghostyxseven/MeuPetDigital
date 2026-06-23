'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Syringe, ArrowLeft, Save, Clock, AlertCircle } from 'lucide-react';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { usePets } from '@/features/pets/hooks/usePets';
import { useVacinas } from '@/features/vacinas/hooks/useVacinas';
import { useRegistrosVacinais } from '@/features/vacinas/hooks/useRegistrosVacinais';
import { registroVacinalSchema, type RegistroVacinalFormData } from '@/features/vacinas/schemas';

export default function RegistrarVacinaPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center bg-slate-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        </div>
      }>
        <RegistrarVacinaContent />
      </Suspense>
    </ProtectedRoute>
  );
}

function RegistrarVacinaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petIdParam = searchParams.get('petId') || '';

  const { pets, isLoading: petsLoading } = usePets();
  const { vacinas, isLoading: vacinasLoading } = useVacinas();
  const { createRegistro } = useRegistrosVacinais();

  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [proximaDosePrevia, setProximaDosePrevia] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistroVacinalFormData>({
    resolver: zodResolver(registroVacinalSchema),
    defaultValues: {
      pet_id: petIdParam,
      vacina_id: '',
      data_aplicacao: new Date().toISOString().split('T')[0], // Default today
      observacoes: '',
    },
  });

  const selectedVacinaId = watch('vacina_id');
  const selectedDataAplicacao = watch('data_aplicacao');

  // Set pet_id if query parameter changes or loads
  useEffect(() => {
    if (petIdParam) {
      setValue('pet_id', petIdParam);
    }
  }, [petIdParam, setValue]);

  // Compute next dose preview in real-time
  useEffect(() => {
    if (selectedVacinaId && selectedDataAplicacao) {
      const vacina = vacinas.find((v) => v.id === selectedVacinaId);
      if (vacina && vacina.intervalo_dias) {
        try {
          const [year, month, day] = selectedDataAplicacao.split('-').map(Number);
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const dateObj = new Date(year, month - 1, day);
            dateObj.setDate(dateObj.getDate() + vacina.intervalo_dias);
            
            const formatted = dateObj.toLocaleDateString('pt-BR');
            setProximaDosePrevia(`${formatted} (em ${vacina.intervalo_dias} dias)`);
            return;
          }
        } catch {
          // ignore parsing issues
        }
      }
    }
    setProximaDosePrevia(null);
  }, [selectedVacinaId, selectedDataAplicacao, vacinas]);

  const onSubmit = async (data: RegistroVacinalFormData) => {
    setFormError(null);
    setLoading(true);
    try {
      await createRegistro({
        pet_id: data.pet_id,
        vacina_id: data.vacina_id,
        data_aplicacao: data.data_aplicacao,
        observacoes: data.observacoes || null,
      });
      // Redirect back to dashboard or to pet details page
      router.push(`/pets/${data.pet_id}`);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Não foi possível registrar a vacina.');
    } finally {
      setLoading(false);
    }
  };

  const isDataLoading = petsLoading || vacinasLoading;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-md font-bold tracking-tight text-slate-900">Registrar Vacinação</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Syringe className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-950">Aplicar Dose</h1>
              <p className="text-xs text-slate-500">Registre os dados da dose e agende a próxima.</p>
            </div>
          </div>

          {isDataLoading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Selecione o Pet *</label>
                <select
                  {...register('pet_id')}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-800"
                >
                  <option value="">-- Escolha um cão --</option>
                  {pets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} {p.raca ? `(${p.raca})` : ''}
                    </option>
                  ))}
                </select>
                {errors.pet_id && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">{errors.pet_id.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Selecione a Vacina *</label>
                <select
                  {...register('vacina_id')}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-800"
                >
                  <option value="">-- Escolha uma vacina --</option>
                  {vacinas.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.nome} {v.intervalo_dias ? `(Reforço em ${v.intervalo_dias}d)` : '(Dose única)'}
                    </option>
                  ))}
                </select>
                {errors.vacina_id && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">{errors.vacina_id.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Data da Aplicação *</label>
                <input
                  type="date"
                  {...register('data_aplicacao')}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-850"
                />
                {errors.data_aplicacao && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">{errors.data_aplicacao.message}</span>
                )}
              </div>

              {/* Real-time next dose calculation preview */}
              {proximaDosePrevia && (
                <div className="rounded-xl bg-emerald-50/70 border border-emerald-100 p-3.5 flex items-start gap-2.5 text-emerald-800">
                  <Clock className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-emerald-700">Previsão Próxima Dose</span>
                    <span className="text-sm font-semibold mt-0.5 block">{proximaDosePrevia}</span>
                  </div>
                </div>
              )}

              {selectedVacinaId && !proximaDosePrevia && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 flex items-start gap-2.5 text-slate-600">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-slate-450" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Tipo de Imunização</span>
                    <span className="text-sm font-semibold mt-0.5 block">Dose única / Sem previsão de reforço</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700">Observações / Notas</label>
                <textarea
                  rows={3}
                  {...register('observacoes')}
                  placeholder="Ex: Nome da clínica, número do lote, etc."
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                {errors.observacoes && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">{errors.observacoes.message}</span>
                )}
              </div>

              {formError && (
                <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-700">{formError}</p>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
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
                  {loading ? 'Gravando...' : 'Salvar Registro'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
