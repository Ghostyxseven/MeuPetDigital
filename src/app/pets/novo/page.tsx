"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { usePets } from "@/features/pets/hooks/usePets";
import { petSchema, type PetFormData } from "@/features/pets/schemas";
import { Alert, AppShell, Button } from "@/core/components";
import { PetPhotoInput } from "@/features/pets/components/PetPhotoInput";
import { PetAvatar } from "@/features/pets/components/PetAvatar";

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
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      nome: "",
      especie: "",
      raca: "",
      data_nascimento: "",
      peso: null,
      rg_sinpatinhas: "",
    },
  });

  const onSubmit = async (data: PetFormData) => {
    setFormError(null);
    setLoading(true);
    try {
      await createPet({
        nome: data.nome,
        especie: data.especie,
        raca: data.raca || null,
        data_nascimento: data.data_nascimento || null,
        peso: data.peso || null,
        foto_url: fotoUrl,
        rg_sinpatinhas: data.rg_sinpatinhas || null,
        whatsapp: data.whatsapp || null,
      });
      alert("Sucesso! Pet cadastrado.");
      router.push("/pets");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Não foi possível cadastrar o pet.";
      alert("Erro do Supabase: " + msg);
      setFormError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (errs: any) => {
    alert("Faltam campos ou há erros de preenchimento:\n" + JSON.stringify(errs, null, 2));
  };

  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
        <button type="button" onClick={() => router.push("/pets")} className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <ArrowLeft className="h-4 w-4" /> Voltar para meus pets
        </button>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <PetPhotoInput
              value={fotoUrl}
              especie={watch("especie") || null}
              onChange={setFotoUrl}
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-black tracking-tight text-slate-950">Cadastrar pet</h1>
              <p className="mt-1 text-sm text-slate-500">
                Preencha as informações principais. Você poderá editar depois.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 ">
                Nome *
              </label>
              <input
                type="text"
                {...register("nome")}

                placeholder="Ex: Thor, Pipoca"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.nome && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ">
                Espécie *
              </label>
              <select
                {...register("especie")}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-800 "
              >
                <option value="">-- Escolha uma espécie --</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Pássaro">Pássaro</option>
                <option value="Coelho">Coelho</option>
                <option value="Porquinho da Índia">Porquinho da Índia</option>
                <option value="Réptil">Réptil</option>
                <option value="Outros">Outros</option>
              </select>
              {errors.especie && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.especie.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ">
                Raça
              </label>
              <input
                type="text"
                {...register("raca")}
                placeholder="Ex: Golden Retriever, SRD"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.raca && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.raca.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ">
                Data de Nascimento
              </label>
              <input
                type="date"
                {...register("data_nascimento")}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-700 "
              />
              {errors.data_nascimento && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.data_nascimento.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ">
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("peso", {
                  setValueAs: (v) => (v === "" ? null : Number(v)),
                })}
                placeholder="Ex: 14.5"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.peso && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.peso.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ">
                RG SinPatinhas
              </label>
              <input
                type="text"
                {...register("rg_sinpatinhas")}
                placeholder="Ex: SP-123456-X"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.rg_sinpatinhas && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.rg_sinpatinhas.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ">
                WhatsApp para contato (Perdido)
              </label>
              <input
                type="text"
                {...register("whatsapp")}
                placeholder="Ex: 11999999999"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <p className="mt-1 text-[10px] text-slate-500">
                Se preenchido, aparecerá um botão para quem escanear a carteirinha.
              </p>
              {errors.whatsapp && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.whatsapp.message}
                </span>
              )}
            </div>

            {formError && <Alert tone="error">{formError}</Alert>}

            <div className="pt-2 flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/pets")}
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
                {loading ? "Cadastrando..." : "Salvar Pet"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </AppShell>
  );
}
