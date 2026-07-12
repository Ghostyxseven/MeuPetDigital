"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Dog,
  PawPrint,
  FileText,
  Filter,
  Plus,
  Syringe,
  Bell,
} from "lucide-react";
import { getVacinaStatus } from "@/core/lib/vacinaStatus";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MOCK_PETS, MOCK_REGISTROS } from "@/features/dashboard/mockData";
import type {
  DashboardPet,
  DashboardRegistro,
} from "@/features/dashboard/types";
import {
  AppShell,
  Button,
  MetricCard,
  PetCard,
  StatusBadge,
  EmptyState,
  Spinner,
} from "@/core/components";
import { supabase } from "@/core/lib/supabase/client";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState<DashboardPet[]>([]);
  const [registros, setRegistros] = useState<DashboardRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedPet, setSelectedPet] = useState("todos");
  const [isNotifying, setIsNotifying] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const requestRefresh = () => setRefreshKey((current) => current + 1);
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "meupetdigital:registros-updated") requestRefresh();
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") requestRefresh();
    };
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        const { data: dbPets, error: petsError } = await supabase
          .from("pets")
          .select("*")
          .order("created_at", { ascending: false });
        if (petsError) throw petsError;

        const { data: dbRegistros, error: registrosError } = await supabase
          .from("registros")
          .select("*, vacinas(nome), pets(nome)")
          .order("data_aplicacao", { ascending: false });
        if (registrosError) throw registrosError;

        const mappedRegistros: DashboardRegistro[] = (dbRegistros || []).map(
          (item) => {
            return {
              id: item.id,
              pet_nome: item.pets?.nome || "Pet removido",
              vacina_nome: item.vacinas?.nome || "Vacina geral",
              data_aplicacao: item.data_aplicacao,
              proxima_dose: item.proxima_dose,
              status: getVacinaStatus(item.proxima_dose),
            };
          },
        );

        const mappedPets: DashboardPet[] = (dbPets || []).map((pet) => {
          const petRegistros = mappedRegistros.filter(
            (registro) => registro.pet_nome === pet.nome,
          );
          const statusVacinal = petRegistros.some(
            (registro) => registro.status === "atrasada",
          )
            ? "atrasada"
            : petRegistros.some((registro) => registro.status === "proxima")
              ? "proxima"
              : "em_dia";

          return {
            id: pet.id,
            nome: pet.nome,
            especie: pet.especie || "Cachorro",
            raca: pet.raca,
            data_nascimento: pet.data_nascimento,
            peso: pet.peso,
            foto_url: pet.foto_url,
            rg_sinpatinhas: pet.rg_sinpatinhas,
            statusVacinal,
          };
        });

        setPets(mappedPets);
        setRegistros(mappedRegistros);
        setUseMockData(false);
      } catch (error) {
        console.error("Erro ao buscar dados locais, usando simulados:", error);
        setPets(MOCK_PETS);
        setRegistros(MOCK_REGISTROS);
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user, refreshKey]);

  const filteredPets = useMemo(
    () =>
      pets.filter(
        (pet) =>
          selectedStatus === "todos" || pet.statusVacinal === selectedStatus,
      ),
    [pets, selectedStatus],
  );

  const filteredRegistros = useMemo(
    () =>
      registros.filter((registro) => {
        const matchesPet =
          selectedPet === "todos" || registro.pet_nome === selectedPet;
        const matchesStatus =
          selectedStatus === "todos" || registro.status === selectedStatus;
        return matchesPet && matchesStatus;
      }),
    [registros, selectedPet, selectedStatus],
  );

  const totals = {
    pets: pets.length,
    emDia: pets.filter((pet) => pet.statusVacinal === "em_dia").length,
    proxima: pets.filter((pet) => pet.statusVacinal === "proxima").length,
    atrasada: pets.filter((pet) => pet.statusVacinal === "atrasada").length,
  };

  const handleNotify = () => {
    setIsNotifying(true);
    // Simulate API call for WhatsApp/Email
    setTimeout(() => {
      setIsNotifying(false);
      setHasNotified(true);
      setTimeout(() => setHasNotified(false), 5000);
    }, 1500);
  };

  if (loading) {
    return <Spinner size="lg" label="Buscando dados vacinais..." fullscreen />;
  }

  return (
    <AppShell>
      {useMockData && (
        <div className="bg-amber-500 px-4 py-1.5 text-center text-xs font-semibold text-white">
          Modo de demonstração: não foi possível carregar o Supabase. Exibindo dados simulados.
        </div>
      )}

      <main className="mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Título + Ações */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center animate-slide-up">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Visão geral da saúde
            </h1>
            <p className="mt-1 text-sm text-slate-500 ">
              Veja rapidamente quem está em dia e o que precisa de atenção.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={totals.atrasada > 0 || totals.proxima > 0 ? "primary" : "secondary"}
              icon={<Syringe className="h-4 w-4 text-emerald-600" />}
              onClick={() => router.push("/vacinas/registrar")}
            >
              Registrar vacina
            </Button>
            <Button
              icon={<Plus className="h-4 w-4" />}
              onClick={() => router.push("/pets/novo")}
            >
              Cadastrar pet
            </Button>
          </div>
        </div>

        {/* Notifications Alert */}
        {(totals.proxima > 0 || totals.atrasada > 0) && (
          <div className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  Atenção necessária
                </h3>
                <p className="text-xs text-amber-700">
                  Você tem {totals.proxima + totals.atrasada} vacina(s)
                  próxima(s) ou atrasada(s).
                </p>
              </div>
            </div>
            <button
              onClick={handleNotify}
              disabled={isNotifying || hasNotified}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                hasNotified
                  ? "bg-emerald-500 text-white cursor-not-allowed"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              } disabled:opacity-80`}
            >
              {hasNotified
                ? "Notificações enviadas"
                : isNotifying
                  ? "Enviando..."
                  : "Simular aviso no WhatsApp"}
            </button>
          </div>
        )}

        {/* Métricas */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard
            icon={<Dog className="h-5 w-5" />}
            label="Total de Pets"
            value={totals.pets}
            tone="slate"
          />
          <MetricCard
            icon={<CheckCircle className="h-5 w-5" />}
            label="Em Dia"
            value={totals.emDia}
            tone="emerald"
          />
          <MetricCard
            icon={<Clock className="h-5 w-5" />}
            label="Próximas doses"
            value={totals.proxima}
            tone="amber"
          />
          <MetricCard
            icon={<AlertTriangle className="h-5 w-5" />}
            label="Atrasadas"
            value={totals.atrasada}
            tone="red"
          />
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5">
            {[
              ["todos", "Todos"],
              ["em_dia", "Em dia"],
              ["proxima", "Próximas"],
              ["atrasada", "Atrasadas"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  selectedStatus === value
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 "
                }`}
                type="button"
                onClick={() => setSelectedStatus(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              value={selectedPet}
              onChange={(event) => setSelectedPet(event.target.value)}
            >
              <option value="todos">Todos os pets</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.nome}>
                  {pet.nome}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Lista de Pets */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 ">Seus Pets</h2>
              <Link
                href="/pets"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Ver todos
              </Link>
            </div>
            {filteredPets.length === 0 ? (
              <EmptyState
                icon={<PawPrint className="h-8 w-8" />}
                title="Nenhum pet encontrado"
                description={pets.length === 0 ? "Cadastre seu primeiro pet para começar a acompanhar vacinas e cuidados." : "Tente ajustar os filtros."}
                action={pets.length === 0 ? <Button icon={<Plus className="h-4 w-4" />} onClick={() => router.push("/pets/novo")}>Cadastrar primeiro pet</Button> : undefined}
              />
            ) : (
              <div className="flex flex-col gap-4">
                {filteredPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onClick={() => router.push(`/pets/${pet.id}`)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Tabela de Registros */}
          <section className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-bold text-slate-900 ">
              Histórico de aplicações
            </h2>
            {filteredRegistros.length === 0 ? (
              <EmptyState
                icon={<FileText className="h-10 w-10" />}
                title="Nenhum registro de vacina"
              />
            ) : (
              <div className="animate-fade-in">
                <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm md:block">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="px-6 py-3.5">Pet</th>
                        <th className="px-6 py-3.5">Vacina</th>
                        <th className="px-6 py-3.5">Data</th>
                        <th className="px-6 py-3.5">Próxima dose</th>
                        <th className="px-6 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRegistros.map((registro) => (
                        <tr
                          key={registro.id}
                          className="transition-colors hover:bg-slate-50 /50"
                        >
                          <td className="px-6 py-4 font-bold text-slate-900 ">
                            {registro.pet_nome}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-700 ">
                            {registro.vacina_nome}
                          </td>
                          <td className="px-6 py-4 text-slate-500 ">
                            {formatDate(registro.data_aplicacao)}
                          </td>
                          <td className="px-6 py-4 text-slate-500 ">
                            {registro.proxima_dose
                              ? formatDate(registro.proxima_dose)
                              : "Dose única"}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={registro.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid gap-3 md:hidden">
                  {filteredRegistros.map((registro) => (
                    <article key={registro.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-slate-950">{registro.pet_nome}</p>
                          <p className="mt-0.5 text-sm text-slate-600">{registro.vacina_nome}</p>
                        </div>
                        <StatusBadge status={registro.status} />
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-xs">
                        <div><dt className="font-semibold text-slate-500">Aplicação</dt><dd className="mt-1 font-bold text-slate-800">{formatDate(registro.data_aplicacao)}</dd></div>
                        <div><dt className="font-semibold text-slate-500">Próxima dose</dt><dd className="mt-1 font-bold text-slate-800">{registro.proxima_dose ? formatDate(registro.proxima_dose) : "Dose única"}</dd></div>
                      </dl>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Banner informativo */}
        <section className="mt-12 rounded-2xl bg-emerald-800 p-6 text-white shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold">
                Roteiro de imunização recomendado
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-emerald-100">
                Filhotes devem tomar doses iniciais de V8/V10 com reforços
                definidos pelo veterinário. O painel ajuda a acompanhar
                próximas doses e atrasos.
              </p>
            </div>
            <Calendar className="h-8 w-8 text-emerald-200" />
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}
