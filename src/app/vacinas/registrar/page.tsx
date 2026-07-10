"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Syringe, ArrowLeft, Save, Clock, AlertCircle, Plus } from "lucide-react";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { usePets } from "@/features/pets/hooks/usePets";
import { useVacinas } from "@/features/vacinas/hooks/useVacinas";
import { useRegistrosVacinais } from "@/features/vacinas/hooks/useRegistrosVacinais";
import {
  registroVacinalSchema,
  type RegistroVacinalFormData,
} from "@/features/vacinas/schemas";
import { Alert, AppShell, Button, Spinner } from "@/core/components";

export default function RegistrarVacinaPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-slate-50"><Spinner label="Preparando formulário..." /></div>
        }
      >
        <RegistrarVacinaContent />
      </Suspense>
    </ProtectedRoute>
  );
}

function RegistrarVacinaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petIdParam = searchParams.get("petId") || "";

  const { pets, isLoading: petsLoading } = usePets();
  const { vacinas, isLoading: vacinasLoading, createVacina } = useVacinas();
  const { createRegistro } = useRegistrosVacinais();

  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [novaVacinaNome, setNovaVacinaNome] = useState("");
  const [novoIntervaloDias, setNovoIntervaloDias] = useState("0");
  const [proximaDosePrevia, setProximaDosePrevia] = useState<string | null>(
    null,
  );

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
      vacina_id: "",
      data_aplicacao: new Date().toISOString().split("T")[0], // Default today
      observacoes: "",
    },
  });

  const selectedVacinaId = watch("vacina_id");
  const selectedDataAplicacao = watch("data_aplicacao");

  // Set pet_id if query parameter changes or loads
  useEffect(() => {
    if (petIdParam) {
      setValue("pet_id", petIdParam);
    }
  }, [petIdParam, setValue]);

  // Compute next dose preview in real-time
  useEffect(() => {
    if (selectedVacinaId && selectedDataAplicacao) {
      const vacina = vacinas.find((v) => v.id === selectedVacinaId);
      const intervaloDias = selectedVacinaId === "__nova__"
        ? Number(novoIntervaloDias)
        : vacina?.intervalo_dias;
      if (intervaloDias && intervaloDias > 0) {
        try {
          const [year, month, day] = selectedDataAplicacao
            .split("-")
            .map(Number);
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const dateObj = new Date(year, month - 1, day);
            dateObj.setDate(dateObj.getDate() + intervaloDias);

            const formatted = dateObj.toLocaleDateString("pt-BR");
            setProximaDosePrevia(
              `${formatted} (em ${intervaloDias} dias)`,
            );
            return;
          }
        } catch {
          // ignore parsing issues
        }
      }
    }
    setProximaDosePrevia(null);
  }, [selectedVacinaId, selectedDataAplicacao, vacinas, novoIntervaloDias]);

  const onSubmit = async (data: RegistroVacinalFormData) => {
    setFormError(null);
    setLoading(true);
    try {
      let vacinaId = data.vacina_id;
      let intervaloDias = vacinas.find((vacina) => vacina.id === vacinaId)?.intervalo_dias ?? 0;

      if (data.vacina_id === "__nova__") {
        const nome = novaVacinaNome.trim();
        const intervalo = Number(novoIntervaloDias || 0);

        if (nome.length < 2) {
          throw new Error("Informe o nome da nova vacina.");
        }
        if (!Number.isInteger(intervalo) || intervalo < 0) {
          throw new Error("O intervalo deve ser um número inteiro maior ou igual a zero.");
        }

        const novaVacina = await createVacina({
          nome,
          descricao: "Cadastrada pelo tutor no MeuPetDigital.",
          intervalo_dias: intervalo,
        });
        vacinaId = novaVacina.id;
        intervaloDias = novaVacina.intervalo_dias;
      }

      let proximaDose: string | null = null;
      if (intervaloDias > 0) {
        const [year, month, day] = data.data_aplicacao.split("-").map(Number);
        const nextDate = new Date(year, month - 1, day);
        nextDate.setDate(nextDate.getDate() + intervaloDias);
        proximaDose = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;
      }

      await createRegistro({
        pet_id: data.pet_id,
        vacina_id: vacinaId,
        data_aplicacao: data.data_aplicacao,
        proxima_dose: proximaDose,
        observacoes: data.observacoes || null,
      });
      // Redirect back to dashboard or to pet details page
      router.push(`/pets/${data.pet_id}`);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Não foi possível registrar a vacina.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isDataLoading = petsLoading || vacinasLoading;

  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
        <button type="button" onClick={() => router.back()} className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Syringe className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950">Registrar vacina</h1>
              <p className="mt-1 text-sm text-slate-500">
                Registre os dados da dose e agende a próxima.
              </p>
            </div>
          </div>

          {isDataLoading ? (
            <div className="flex h-48 items-center justify-center"><Spinner label="Carregando pets e vacinas..." /></div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 ">
                  Selecione o Pet *
                </label>
                <select
                  aria-label="Selecione o pet"
                  {...register("pet_id")}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-800 "
                >
                  <option value="">-- Escolha um pet --</option>
                  {pets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} {p.raca ? `(${p.raca})` : ""}
                    </option>
                  ))}
                </select>
                {errors.pet_id && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">
                    {errors.pet_id.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 ">
                  Selecione a Vacina *
                </label>
                <select
                  aria-label="Selecione a vacina"
                  {...register("vacina_id")}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-800 "
                >
                  <option value="">-- Escolha uma vacina --</option>
                  {vacinas.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.nome}{" "}
                      {v.intervalo_dias
                        ? `(Reforço em ${v.intervalo_dias}d)`
                        : "(Dose única)"}
                    </option>
                  ))}
                  <option value="__nova__">+ Cadastrar outra vacina</option>
                </select>
                {errors.vacina_id && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">
                    {errors.vacina_id.message}
                  </span>
                )}
              </div>

              {selectedVacinaId === "__nova__" && (
                <fieldset className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <legend className="px-2 text-sm font-bold text-emerald-900">
                    Nova vacina
                  </legend>
                  <div className="grid gap-4 sm:grid-cols-[1fr_11rem]">
                    <label className="block text-sm font-semibold text-slate-700">
                      Nome da vacina *
                      <input
                        type="text"
                        value={novaVacinaNome}
                        onChange={(event) => setNovaVacinaNome(event.target.value)}
                        placeholder="Ex: Tríplice felina"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                      Reforço em dias
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={novoIntervaloDias}
                        onChange={(event) => setNovoIntervaloDias(event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </label>
                  </div>
                  <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-emerald-800">
                    <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Use 0 quando não houver reforço. A vacina será adicionada ao catálogo para os próximos registros.
                  </p>
                </fieldset>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 ">
                  Data da Aplicação *
                </label>
                <input
                  type="date"
                  {...register("data_aplicacao")}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                {errors.data_aplicacao && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">
                    {errors.data_aplicacao.message}
                  </span>
                )}
              </div>

              {/* Real-time next dose calculation preview */}
              {proximaDosePrevia && (
                <div className="rounded-xl bg-emerald-50/70 border border-emerald-100 p-3.5 flex items-start gap-2.5 text-emerald-800">
                  <Clock className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Previsão Próxima Dose
                    </span>
                    <span className="text-sm font-semibold mt-0.5 block">
                      {proximaDosePrevia}
                    </span>
                  </div>
                </div>
              )}

              {selectedVacinaId && !proximaDosePrevia && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 flex items-start gap-2.5 text-slate-600 ">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-slate-500" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 ">
                      Tipo de Imunização
                    </span>
                    <span className="text-sm font-semibold mt-0.5 block">
                      Dose única / Sem previsão de reforço
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 ">
                  Observações / Notas
                </label>
                <textarea
                  rows={3}
                  {...register("observacoes")}
                  placeholder="Ex: Nome da clínica, número do lote, etc."
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                {errors.observacoes && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">
                    {errors.observacoes.message}
                  </span>
                )}
              </div>

              {formError && <Alert tone="error">{formError}</Alert>}

              <div className="pt-2 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  icon={<Save className="h-4 w-4" />}
                  className="flex-1"
                >
                  {loading ? "Gravando..." : "Salvar Registro"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </AppShell>
  );
}
