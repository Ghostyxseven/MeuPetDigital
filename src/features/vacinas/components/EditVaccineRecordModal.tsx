"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertTriangle, Save, Trash2, X } from "lucide-react";
import { Alert, Button, Spinner } from "@/core/components";
import { useVacinas } from "../hooks/useVacinas";
import {
  editarRegistroVacinalSchema,
  type EditarRegistroVacinalFormData,
} from "../schemas";
import type {
  RegistroVacinalDetailed,
  UpdateRegistroVacinalInput,
} from "../types";

interface EditVaccineRecordModalProps {
  registro: RegistroVacinalDetailed;
  onUpdate: (id: string, input: UpdateRegistroVacinalInput) => Promise<unknown>;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}

export function EditVaccineRecordModal({
  registro,
  onUpdate,
  onDelete,
  onClose,
}: EditVaccineRecordModalProps) {
  const { vacinas, isLoading: vacinasLoading } = useVacinas();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditarRegistroVacinalFormData>({
    resolver: zodResolver(editarRegistroVacinalSchema),
    defaultValues: {
      vacina_id: registro.vacina_id,
      data_aplicacao: registro.data_aplicacao,
      proxima_dose: registro.proxima_dose ?? "",
      observacoes: registro.observacoes ?? "",
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving && !isDeleting) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDeleting, isSaving, onClose]);

  const submitUpdate = async (data: EditarRegistroVacinalFormData) => {
    setIsSaving(true);
    setError(null);
    try {
      await onUpdate(registro.id, {
        vacina_id: data.vacina_id,
        data_aplicacao: data.data_aplicacao,
        proxima_dose: data.proxima_dose || null,
        observacoes: data.observacoes?.trim() || null,
      });
      onClose();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível atualizar a vacina.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDeletion = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await onDelete(registro.id);
      onClose();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível excluir a vacina.",
      );
      setConfirmDelete(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-vaccine-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving && !isDeleting) {
          onClose();
        }
      }}
    >
      <section className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 id="edit-vaccine-title" className="text-lg font-extrabold text-slate-950">
              {confirmDelete ? "Excluir registro de vacina?" : "Editar vacina"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {registro.vacinas?.nome ?? "Registro vacinal"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving || isDeleting}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 disabled:opacity-50"
            aria-label="Fechar edição"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {confirmDelete ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
              <AlertTriangle className="mx-auto h-10 w-10 text-red-700" />
              <p className="mt-3 text-sm font-bold text-red-950">
                Esta ação é permanente
              </p>
              <p className="mt-2 text-xs leading-5 text-red-800">
                A aplicação será removida do histórico, do dashboard, do PDF e da carteirinha compartilhada.
              </p>
            </div>
            {error && <Alert tone="error">{error}</Alert>}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => setConfirmDelete(false)} disabled={isDeleting}>
                Voltar
              </Button>
              <Button variant="danger" loading={isDeleting} onClick={() => void confirmDeletion()}>
                Confirmar exclusão
              </Button>
            </div>
          </div>
        ) : vacinasLoading ? (
          <div className="flex min-h-56 items-center justify-center">
            <Spinner label="Carregando vacinas..." />
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitUpdate)} className="mt-6 space-y-4">
            <Field label="Vacina" error={errors.vacina_id?.message}>
              <select {...register("vacina_id")} className={inputClass}>
                <option value="">Selecione</option>
                {vacinas.map((vacina) => (
                  <option key={vacina.id} value={vacina.id}>{vacina.nome}</option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Data da aplicação" error={errors.data_aplicacao?.message}>
                <input type="date" {...register("data_aplicacao")} className={inputClass} />
              </Field>
              <Field label="Próxima dose" error={errors.proxima_dose?.message}>
                <input type="date" {...register("proxima_dose")} className={inputClass} />
              </Field>
            </div>
            <Field label="Observações" error={errors.observacoes?.message}>
              <textarea rows={4} maxLength={500} {...register("observacoes")} className={`${inputClass} py-3`} />
            </Field>

            <div aria-live="polite">{error && <Alert tone="error">{error}</Alert>}</div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="danger"
                icon={<Trash2 className="h-4 w-4" />}
                onClick={() => setConfirmDelete(true)}
                disabled={isSaving}
              >
                Excluir registro
              </Button>
              <Button
                type="submit"
                loading={isSaving}
                icon={<Save className="h-4 w-4" />}
              >
                Salvar alterações
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

const inputClass =
  "mt-1 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
