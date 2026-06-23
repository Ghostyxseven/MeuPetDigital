'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog, ArrowLeft, Save, Trash2, AlertTriangle, Syringe, Plus } from 'lucide-react';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { usePets } from '@/features/pets/hooks/usePets';
import { petSchema, type PetFormData } from '@/features/pets/schemas';
import { useRegistrosVacinais } from '@/features/vacinas/hooks/useRegistrosVacinais';
import { getVacinaStatus, getStatusUI } from '@/core/lib/vacinaStatus';

export default function PetDetailPage() {
  return (
    <ProtectedRoute>
      <PetDetailContent />
    </ProtectedRoute>
  );
}

function PetDetailContent() {
  const router = useRouter();
  const params = useParams();
  const petId = params.id as string;

  const { getPetById, updatePet, deletePet } = usePets();
  const { registros, isLoading: registrosLoading } = useRegistrosVacinais(petId);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
  });

  useEffect(() => {
    async function loadPetData() {
      try {
        setLoading(true);
        const pet = await getPetById(petId);
        if (pet) {
          setValue('nome', pet.nome);
          setValue('raca', pet.raca || '');
          setValue('data_nascimento', pet.data_nascimento || '');
          setValue('peso', pet.peso);
          setValue('rg_sinpatinhas', pet.rg_sinpatinhas || '');
        }
      } catch {
        setFormError('Não foi possível carregar os dados do pet.');
      } finally {
        setLoading(false);
      }
    }
    loadPetData();
  }, [petId, getPetById, setValue]);

  const onSubmit = async (data: PetFormData) => {
    setFormError(null);
    setSuccessMsg(null);
    setSaving(true);
    try {
      await updatePet(petId, {
        nome: data.nome,
        raca: data.raca || null,
        data_nascimento: data.data_nascimento || null,
        peso: data.peso || null,
        rg_sinpatinhas: data.rg_sinpatinhas || null,
      });
      setSuccessMsg('Dados do pet atualizados com sucesso!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro ao atualizar dados.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setFormError(null);
    setDeleting(true);
    try {
      await deletePet(petId);
      router.push('/pets');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro ao excluir o pet.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">Buscando dados do pet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/pets"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-md font-bold tracking-tight text-slate-900">Detalhes do Pet</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <Dog className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950">Editar Cadastro</h2>
                    <p className="text-xs text-slate-500">Atualize os dados cadastrais.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Nome *</label>
                  <input
                    type="text"
                    {...register('nome')}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-700"
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
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.rg_sinpatinhas && (
                    <span className="mt-1 block text-xs font-semibold text-red-600">{errors.rg_sinpatinhas.message}</span>
                  )}
                </div>

                {formError && (
                  <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{formError}</p>
                )}

                {successMsg && (
                  <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">{successMsg}</p>
                )}

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir Pet
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* History Column */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm min-h-[400px]">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Syringe className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950">Histórico de Vacinação</h2>
                    <p className="text-xs text-slate-500">Lista de vacinas aplicadas e próximas doses.</p>
                  </div>
                </div>

                <Link
                  href={`/vacinas/registrar?petId=${petId}`}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 border border-emerald-100 hover:bg-emerald-100/50"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Aplicar Vacina
                </Link>
              </div>

              {registrosLoading ? (
                <div className="flex h-48 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
                </div>
              ) : registros.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Syringe className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">Nenhuma vacina aplicada</h3>
                  <p className="mt-1 text-xs text-slate-500 max-w-xs">
                    Este pet ainda não possui nenhum registro de vacinação cadastrado.
                  </p>
                  <Link
                    href={`/vacinas/registrar?petId=${petId}`}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Registrar Primeira Dose
                  </Link>
                </div>
              ) : (
                <div className="overflow-hidden border border-slate-100 rounded-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="px-4 py-3">Vacina</th>
                          <th className="px-4 py-3">Data Aplicação</th>
                          <th className="px-4 py-3">Próxima Dose</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Observações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {registros.map((r) => {
                          const status = getVacinaStatus(r.proxima_dose);
                          const ui = getStatusUI(status);
                          return (
                            <tr key={r.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3.5 font-bold text-slate-900">
                                {r.vacinas?.nome || 'Geral'}
                              </td>
                              <td className="px-4 py-3.5 text-slate-500">
                                {formatDate(r.data_aplicacao)}
                              </td>
                              <td className="px-4 py-3.5 text-slate-500 font-semibold">
                                {r.proxima_dose ? formatDate(r.proxima_dose) : 'Dose única'}
                              </td>
                              <td className="px-4 py-3.5">
                                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${ui.bgClass}`}>
                                  <span className={`h-1 w-1 rounded-full ${ui.dotClass}`} />
                                  {ui.label}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-xs text-slate-400 max-w-[150px] truncate" title={r.observacoes || ''}>
                                {r.observacoes || '-'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Excluir Pet?</h3>
            <p className="mt-2 text-sm text-slate-500">
              Esta ação é permanente e apagará todos os dados de cadastro e histórico de vacinação deste pet.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? 'Excluindo...' : 'Sim, Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
