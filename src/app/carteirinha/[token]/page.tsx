/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  Heart,
  PawPrint,
  Scale,
  ShieldCheck,
  Syringe,
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { EmptyState, Spinner } from "@/core/components";
import { getVacinaStatus, type VacinaStatus } from "@/core/lib/vacinaStatus";
import { supabase } from "@/core/lib/supabase/client";
import { getSpeciesIcon } from "@/features/pets/utils/speciesIcon";
import type { SharedPetCard } from "@/features/sharing/types";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function SharedPetCardPage() {
  const params = useParams();
  const token = params.token as string;
  const [card, setCard] = useState<SharedPetCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSharedCard = useCallback(async () => {
    if (!UUID_PATTERN.test(token)) {
      setError("Este link de compartilhamento é inválido.");
      setIsLoading(false);
      return;
    }

    const { data, error: queryError } = await supabase.rpc(
      "get_shared_pet_card",
      { p_token: token },
    );

    if (queryError || !data) {
      setError(
        "A carteirinha não está disponível. O link pode ter expirado ou sido revogado.",
      );
      setCard(null);
    } else {
      setCard(data as SharedPetCard);
      setError(null);
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    void fetchSharedCard();
    const intervalId = window.setInterval(() => void fetchSharedCard(), 5000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") void fetchSharedCard();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchSharedCard]);

  if (isLoading) {
    return <Spinner fullscreen size="lg" label="Abrindo carteirinha..." />;
  }

  if (error || !card) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-amber-200 bg-white p-6 shadow-xl">
          <EmptyState
            icon={<AlertTriangle className="h-9 w-9" />}
            title="Carteirinha indisponível"
            description={error ?? "Não foi possível abrir esta carteirinha."}
            action={
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800"
              >
                Conhecer o MeuPetDigital
              </Link>
            }
          />
        </div>
      </main>
    );
  }

  const { pet, registros } = card;
  const totalVacinas = registros.length;
  const emDia = registros.filter((r) => getVacinaStatus(r.proxima_dose) === "em_dia").length;
  const atrasadas = registros.filter((r) => getVacinaStatus(r.proxima_dose) === "atrasada").length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-100/60 px-4 py-6 sm:px-6 sm:py-10">
      <article
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-slide-up"
        style={{ boxShadow: "0 25px 50px -12px rgba(140, 98, 57, 0.15), 0 0 0 1px rgba(140, 98, 57, 0.08)" }}
      >
        {/* ── Header ──────────────────────────────────────── */}
        <header
          className="relative overflow-hidden px-6 pb-8 pt-7 text-white sm:px-8"
          style={{
            background: "linear-gradient(135deg, #5c3a1a 0%, #8c6239 50%, #b38f6b 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {pet.foto_url ? (
                <div
                  className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl"
                  style={{
                    border: "2px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <img
                    src={pet.foto_url}
                    alt={`Foto de ${pet.nome}`}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {getSpeciesIcon(pet.especie, "h-8 w-8")}
                </span>
              )}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  MeuPetDigital
                </p>
                <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {pet.nome}
                </h1>
              </div>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ShieldCheck className="h-5 w-5 text-white/80" aria-label="Link verificado" />
            </div>
          </div>

          <p className="relative mt-4 text-sm font-medium text-white/60">
            Carteirinha compartilhada pelo tutor em modo somente leitura.
          </p>



          {/* Quick stats */}
          {totalVacinas > 0 && (
            <div className="relative mt-5 flex gap-3">
              <StatPill icon={<Syringe className="h-3.5 w-3.5" />} value={totalVacinas} label="vacinas" />
              <StatPill icon={<CheckCircle2 className="h-3.5 w-3.5" />} value={emDia} label="em dia" />
              {atrasadas > 0 && (
                <StatPill icon={<AlertCircle className="h-3.5 w-3.5" />} value={atrasadas} label="atrasadas" accent />
              )}
            </div>
          )}
        </header>

        {/* ── Body ──────────────────────────────────────── */}
        <div className="p-6 sm:p-8">
          {/* Identificação do pet */}
          <section aria-labelledby="pet-profile-title">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <PawPrint className="h-4 w-4" />
              </div>
              <h2 id="pet-profile-title" className="text-base font-extrabold text-slate-950">
                Identificação do pet
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <InfoCard
                icon={<PawPrint className="h-4 w-4" />}
                label="Espécie"
                value={pet.especie}
              />
              <InfoCard
                icon={<Tag className="h-4 w-4" />}
                label="Raça"
                value={pet.raca ?? "Não informada"}
              />
              <InfoCard
                icon={<CalendarDays className="h-4 w-4" />}
                label="Nascimento"
                value={pet.data_nascimento ? formatDate(pet.data_nascimento) : "Não informado"}
              />
              <InfoCard
                icon={<Scale className="h-4 w-4" />}
                label="Peso"
                value={pet.peso ? `${pet.peso} kg` : "Não informado"}
              />
              <InfoCard
                icon={<Heart className="h-4 w-4" />}
                label="RG SinPatinhas"
                value={pet.rg_sinpatinhas ?? "Não informado"}
                span2
              />
            </div>
          </section>

          {/* Divider */}
          <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Histórico de Vacinação */}
          <section aria-labelledby="vaccine-history-title">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Syringe className="h-4 w-4" />
              </div>
              <div>
                <h2 id="vaccine-history-title" className="text-base font-extrabold text-slate-950">
                  Histórico de vacinação
                </h2>
                <p className="text-xs text-slate-500">
                  {registros.length} registro(s) encontrado(s)
                </p>
              </div>
            </div>

            {registros.length === 0 ? (
              <div className="mt-6">
                <EmptyState
                  icon={<Syringe className="h-8 w-8" />}
                  title="Nenhuma vacina registrada"
                  description="O tutor ainda não registrou aplicações para este pet."
                />
              </div>
            ) : (
              <div className="mt-5 grid gap-3">
                {registros.map((registro, index) => {
                  const status = getVacinaStatus(registro.proxima_dose);
                  return (
                    <VaccineCard
                      key={registro.id}
                      registro={registro}
                      status={status}
                      index={index}
                    />
                  );
                })}
              </div>
            )}
          </section>

          {/* Footer */}
          <footer
            className="mt-8 flex flex-col gap-3 rounded-2xl p-4 text-xs sm:flex-row sm:items-center sm:justify-between"
            style={{
              background: "linear-gradient(135deg, #faf6f0, #f0e4d3)",
              border: "1px solid rgba(140, 98, 57, 0.12)",
            }}
          >
            <span className="flex items-center gap-2 font-bold text-emerald-800">
              <Clock className="h-4 w-4 text-emerald-600" />
              Link válido até {new Date(card.expires_at).toLocaleString("pt-BR")}
            </span>
            <span className="text-emerald-700/70 font-medium">
              Consulte um médico-veterinário para orientação clínica.
            </span>
          </footer>
        </div>
      </article>

      {/* Branding */}
      <p className="mt-6 text-center text-xs font-semibold text-emerald-600/50 tracking-wide">
        Powered by MeuPetDigital
      </p>
    </main>
  );
}

/* ── Sub-components ────────────────────────────────────────── */

function StatPill({
  icon,
  value,
  label,
  accent = false,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
      style={{
        background: accent ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.15)",
        border: `1px solid ${accent ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.12)"}`,
        color: accent ? "#fecaca" : "rgba(255,255,255,0.85)",
      }}
    >
      {icon}
      <span className="tabular-nums">{value}</span>
      <span className="font-medium opacity-80">{label}</span>
    </span>
  );
}

function InfoCard({
  icon,
  label,
  value,
  span2 = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  span2?: boolean;
}) {
  return (
    <div
      className={`group rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-all duration-200 hover:border-emerald-200/60 hover:bg-emerald-50/30 hover:shadow-sm ${span2 ? "col-span-2 sm:col-span-1" : ""}`}
    >
      <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-emerald-600 transition-colors">
        {icon}
        <dt className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </dt>
      </div>
      <dd className="mt-1.5 text-sm font-bold text-slate-900">{value}</dd>
    </div>
  );
}

interface VaccineCardProps {
  registro: {
    id: string;
    vacina_nome: string;
    data_aplicacao: string;
    proxima_dose: string | null;
    observacoes: string | null;
  };
  status: VacinaStatus;
  index: number;
}

const statusConfig: Record<VacinaStatus, {
  border: string;
  bg: string;
  dot: string;
  text: string;
  label: string;
  icon: React.ReactNode;
}> = {
  em_dia: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    label: "Em Dia",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  proxima: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
    text: "text-amber-700",
    label: "Próxima Dose",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  atrasada: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    dot: "bg-red-500",
    text: "text-red-700",
    label: "Atrasada",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  },
};

function VaccineCard({ registro, status, index }: VaccineCardProps) {
  const cfg = statusConfig[status];

  return (
    <article
      className={`overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all duration-300 hover:shadow-md hover:border-slate-300/80 border-l-4 ${cfg.border}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100/80 text-emerald-700">
              <Syringe className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">
              {registro.vacina_nome}
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${cfg.bg} ${cfg.text}`}
            style={{ borderColor: "currentColor", borderWidth: "1px", opacity: 0.9 }}
          >
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse-dot ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>

        <div className="mt-4 flex gap-4 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2 text-xs">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Aplicação
              </span>
              <span className="font-bold text-slate-800">
                {formatDate(registro.data_aplicacao)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Próxima dose
              </span>
              <span className={`font-bold ${registro.proxima_dose ? cfg.text : "text-slate-500"}`}>
                {registro.proxima_dose
                  ? formatDate(registro.proxima_dose)
                  : "Dose única"}
              </span>
            </div>
          </div>
        </div>

        {registro.observacoes && (
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600 italic">
            {registro.observacoes}
          </p>
        )}
      </div>
    </article>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}
