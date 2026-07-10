'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, Trash2, AlertTriangle, Syringe, Plus, Download, QrCode, Pencil } from 'lucide-react';
import { CarteirinhaPDF } from "@/features/pets/components/CarteirinhaPDF";
import { PetPhotoInput } from "@/features/pets/components/PetPhotoInput";

import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { usePets } from '@/features/pets/hooks/usePets';
import { petSchema, type PetFormData } from '@/features/pets/schemas';
import { useRegistrosVacinais } from '@/features/vacinas/hooks/useRegistrosVacinais';
import { getVacinaStatus, getStatusUI } from '@/core/lib/vacinaStatus';
import { SharePetCardModal } from '@/features/sharing/components/SharePetCardModal';
import { EditVaccineRecordModal } from '@/features/vacinas/components/EditVaccineRecordModal';
import type { RegistroVacinalDetailed } from '@/features/vacinas/types';

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
  const {
    registros,
    isLoading: registrosLoading,
    updateRegistro,
    deleteRegistro,
  } = useRegistrosVacinais(petId);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState<RegistroVacinalDetailed | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [isPhotoProcessing, setIsPhotoProcessing] = useState(false);

  // PDF Export
  const pdfRef = React.useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
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
          setValue('especie', pet.especie);
          setValue('raca', pet.raca || '');
          setValue('data_nascimento', pet.data_nascimento || '');
          setValue('peso', pet.peso);
          setValue('rg_sinpatinhas', pet.rg_sinpatinhas || '');
          setValue('whatsapp', pet.whatsapp || '');
          setFotoUrl(pet.foto_url || null);
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
    if (isPhotoProcessing) {
      setFormError('Aguarde a foto terminar de carregar antes de salvar as alterações.');
      return;
    }

    setFormError(null);
    setSuccessMsg(null);
    setSaving(true);
    try {
      await updatePet(petId, {
        nome: data.nome,
        raca: data.raca || null,
        data_nascimento: data.data_nascimento || null,
        peso: data.peso || null,
        foto_url: fotoUrl,
        rg_sinpatinhas: data.rg_sinpatinhas || null,
        whatsapp: data.whatsapp || null,
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


  const handleExportPDF = async () => {
    if (!pdfRef.current) return;
    try {
      setIsExporting(true);

      const htmlToImage = await import("html-to-image");
      const { jsPDF } = await import("jspdf");
      const card = pdfRef.current;

      await document.fonts.ready;

      const width = card.scrollWidth;
      const height = card.scrollHeight;

      const imgData = await htmlToImage.toPng(card, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        width,
        height,
        style: {
          position: 'relative',
          left: '0',
          top: '0',
          opacity: '1',
        },
      });

      const img = new Image();
      img.src = imgData;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Falha ao carregar a imagem da carteirinha.'));
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`carteirinha-${watch("nome") || "pet"}.pdf`);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Não foi possível gerar o PDF da carteirinha.");
    } finally {
      setIsExporting(false);
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

        {/* Componente fora da tela para geração do PDF. Não use opacity-0 aqui:
            a opacidade também seria aplicada à captura. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-10000px] top-0"
        >
          <CarteirinhaPDF
            ref={pdfRef}
            pet={{
              id: petId,
              user_id: "",
              nome: watch("nome") || "",
              especie: watch("especie") || "Cachorro",
              raca: watch("raca") || "",
              data_nascimento: watch("data_nascimento") || "",
              peso: watch("peso") || null,
              rg_sinpatinhas: watch("rg_sinpatinhas") || "",
              foto_url: fotoUrl,
              whatsapp: null,
              created_at: new Date().toISOString(),
            }}
            registros={registros}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col items-center gap-4">
                <PetPhotoInput
                  value={fotoUrl}
                  especie={watch("especie") || null}
                  onChange={setFotoUrl}
                  onProcessingChange={setIsPhotoProcessing}
                />
                <div className="text-center">
                  <h2 className="text-base font-bold text-slate-950">Editar Cadastro</h2>
                  <p className="text-xs text-slate-500">Atualize os dados cadastrais.</p>
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

                <div>
                  <label className="block text-sm font-semibold text-slate-700">WhatsApp para contato (Perdido)</label>
                  <input
                    type="text"
                    {...register('whatsapp')}
                    placeholder="Ex: 11999999999"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <p className="mt-1 text-[10px] text-slate-500">
                    Se preenchido, aparecerá um botão para quem escanear a carteirinha.
                  </p>
                  {errors.whatsapp && (
                    <span className="mt-1 block text-xs font-semibold text-red-600">{errors.whatsapp.message}</span>
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
                    disabled={saving || isPhotoProcessing}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Save className="h-4 w-4" />
                    {isPhotoProcessing ? 'Preparando foto...' : saving ? 'Salvando...' : 'Salvar Alterações'}
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

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setShowShareModal(true)}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-amber-100 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200"
                  >
                    <QrCode className="h-4 w-4" />
                    Compartilhar QR
                  </button>
                  <button
                    type="button"
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-70 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {isExporting ? "Gerando PDF..." : "Exportar Carteirinha"}
                  </button>

                  <Link
                    href={`/vacinas/registrar?petId=${petId}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Aplicar Vacina
                  </Link>
                </div>
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
                <div>
                  <div className="hidden overflow-hidden rounded-xl border border-slate-100 md:block">
                    <table className="w-full border-collapse text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="px-4 py-3">Vacina</th>
                          <th className="px-4 py-3">Data Aplicação</th>
                          <th className="px-4 py-3">Próxima Dose</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Observações</th>
                          <th className="px-4 py-3 text-right">Ações</th>
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
                              <td className="px-4 py-3.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => setSelectedRegistro(r)}
                                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                                  aria-label={`Editar registro de ${r.vacinas?.nome || 'vacina'}`}
                                >
                                  <Pencil className="h-4 w-4" /> Editar
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid gap-3 md:hidden">
                    {registros.map((registro) => {
                      const status = getVacinaStatus(registro.proxima_dose);
                      const ui = getStatusUI(status);
                      return (
                        <article key={registro.id} className="rounded-xl border border-slate-200 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-bold text-slate-950">{registro.vacinas?.nome || 'Vacina geral'}</h3>
                              <p className="mt-1 text-xs text-slate-500">Aplicada em {formatDate(registro.data_aplicacao)}</p>
                            </div>
                            <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${ui.bgClass}`}>{ui.label}</span>
                          </div>
                          <p className="mt-3 text-xs font-semibold text-slate-600">
                            Próxima dose: {registro.proxima_dose ? formatDate(registro.proxima_dose) : 'Dose única'}
                          </p>
                          {registro.observacoes && <p className="mt-2 text-xs text-slate-500">{registro.observacoes}</p>}
                          <button
                            type="button"
                            onClick={() => setSelectedRegistro(registro)}
                            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 text-xs font-bold text-emerald-800"
                          >
                            <Pencil className="h-4 w-4" /> Editar registro
                          </button>
                        </article>
                      );
                    })}
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
      {showShareModal && (
        <SharePetCardModal
          petId={petId}
          petName={watch('nome') || 'pet'}
          onClose={() => setShowShareModal(false)}
        />
      )}
      {selectedRegistro && (
        <EditVaccineRecordModal
          registro={selectedRegistro}
          onUpdate={updateRegistro}
          onDelete={deleteRegistro}
          onClose={() => setSelectedRegistro(null)}
        />
      )}
    </div>
  );
}
