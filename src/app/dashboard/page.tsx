'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Dog,
  FileText,
  Filter,
  Plus,
  Syringe,
} from 'lucide-react';
import { getStatusUI, getVacinaStatus } from '@/core/lib/vacinaStatus';
import { supabase } from '@/core/lib/supabase/client';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { MOCK_PETS, MOCK_REGISTROS } from '@/features/dashboard/mockData';
import type { DashboardPet, DashboardRegistro } from '@/features/dashboard/types';
import {
  Header,
  Button,
  MetricCard,
  PetCard,
  StatusBadge,
  EmptyState,
  Spinner,
} from '@/core/components';


export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState<DashboardPet[]>([]);
  const [registros, setRegistros] = useState<DashboardRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [selectedPet, setSelectedPet] = useState('todos');

  useEffect(() => {
    async function fetchDashboardData() {
      const isConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://seu-projeto.supabase.co';

      if (!isConfigured) {
        setPets(MOCK_PETS);
        setRegistros(MOCK_REGISTROS);
        setUseMockData(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data: dbPets, error: petsError } = await supabase
          .from('pets')
          .select('*')
          .order('nome', { ascending: true });

        if (petsError) throw petsError;

        const { data: dbRegistros, error: registrosError } = await supabase
          .from('registros')
          .select('id, data_aplicacao, proxima_dose, pets (id, nome), vacinas (nome)');

        if (registrosError) throw registrosError;

        const mappedRegistros: DashboardRegistro[] = (dbRegistros || []).map((item) => {
          const registro = item as unknown as {
            id: string;
            data_aplicacao: string;
            proxima_dose: string | null;
            pets: { id: string; nome: string } | null;
            vacinas: { nome: string } | null;
          };

          return {
            id: registro.id,
            pet_nome: registro.pets?.nome || 'Pet removido',
            vacina_nome: registro.vacinas?.nome || 'Vacina geral',
            data_aplicacao: registro.data_aplicacao,
            proxima_dose: registro.proxima_dose,
            status: getVacinaStatus(registro.proxima_dose),
          };
        });

        const mappedPets: DashboardPet[] = (dbPets || []).map((item) => {
          const pet = item as unknown as {
            id: string;
            nome: string;
            raca: string | null;
            data_nascimento: string | null;
            peso: number | null;
            foto_url: string | null;
            rg_sinpatinhas: string | null;
          };
          const petRegistros = mappedRegistros.filter((registro) => registro.pet_nome === pet.nome);
          const statusVacinal = petRegistros.some((registro) => registro.status === 'atrasada')
            ? 'atrasada'
            : petRegistros.some((registro) => registro.status === 'proxima')
              ? 'proxima'
              : 'em_dia';

          return {
            id: pet.id,
            nome: pet.nome,
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
        console.error('Erro ao buscar dados do Supabase:', error);
        setPets(MOCK_PETS);
        setRegistros(MOCK_REGISTROS);
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  const filteredPets = useMemo(
    () => pets.filter((pet) => selectedStatus === 'todos' || pet.statusVacinal === selectedStatus),
    [pets, selectedStatus],
  );

  const filteredRegistros = useMemo(
    () =>
      registros.filter((registro) => {
        const matchesPet = selectedPet === 'todos' || registro.pet_nome === selectedPet;
        const matchesStatus = selectedStatus === 'todos' || registro.status === selectedStatus;
        return matchesPet && matchesStatus;
      }),
    [registros, selectedPet, selectedStatus],
  );

  const totals = {
    pets: pets.length,
    emDia: pets.filter((pet) => pet.statusVacinal === 'em_dia').length,
    proxima: pets.filter((pet) => pet.statusVacinal === 'proxima').length,
    atrasada: pets.filter((pet) => pet.statusVacinal === 'atrasada').length,
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (loading) {
    return <Spinner size="lg" label="Buscando dados vacinais..." fullscreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {useMockData && (
        <div className="bg-amber-500 px-4 py-1.5 text-center text-xs font-semibold text-white">
          Modo de demonstracao: banco Supabase nao configurado. Exibindo dados simulados.
        </div>
      )}

      {/* Header unificado */}
      <Header user={user} onLogout={handleLogout} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Título + Ações */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center animate-slide-up">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Dashboard de Saude</h1>
            <p className="mt-1 text-sm text-slate-500">Acompanhe a imunizacao e o status vacinal dos seus pets.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              icon={<Syringe className="h-4 w-4 text-emerald-600" />}
              onClick={() => router.push('/vacinas/registrar')}
            >
              Registrar Vacina
            </Button>
            <Button
              icon={<Plus className="h-4 w-4" />}
              onClick={() => router.push('/pets/novo')}
            >
              Cadastrar Novo Pet
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard icon={<Dog className="h-5 w-5" />} label="Total de Pets" value={totals.pets} tone="slate" />
          <MetricCard icon={<CheckCircle className="h-5 w-5" />} label="Em Dia" value={totals.emDia} tone="emerald" />
          <MetricCard icon={<Clock className="h-5 w-5" />} label="Proximas Doses" value={totals.proxima} tone="amber" />
          <MetricCard icon={<AlertTriangle className="h-5 w-5" />} label="Atrasadas" value={totals.atrasada} tone="red" />
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5">
            {[
              ['todos', 'Todos'],
              ['em_dia', 'Em Dia'],
              ['proxima', 'Proximas'],
              ['atrasada', 'Atrasadas'],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  selectedStatus === value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
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
              <option value="todos">Filtrar por Pet: Todos</option>
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
              <h2 className="text-lg font-bold text-slate-900">Seus Pets</h2>
              <Link href="/pets" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
                Ver todos
              </Link>
            </div>
            {filteredPets.length === 0 ? (
              <EmptyState icon={<Dog className="h-8 w-8" />} title="Nenhum pet encontrado" />
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
            <h2 className="mb-4 text-lg font-bold text-slate-900">Historico de Aplicacao</h2>
            {filteredRegistros.length === 0 ? (
              <EmptyState icon={<FileText className="h-10 w-10" />} title="Nenhum registro de vacina" />
            ) : (
              <div className="animate-fade-in overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="px-6 py-3.5">Pet</th>
                        <th className="px-6 py-3.5">Vacina</th>
                        <th className="px-6 py-3.5">Data</th>
                        <th className="px-6 py-3.5">Proxima Dose</th>
                        <th className="px-6 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRegistros.map((registro) => (
                        <tr key={registro.id} className="transition-colors hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-slate-900">{registro.pet_nome}</td>
                          <td className="px-6 py-4 font-medium text-slate-700">{registro.vacina_nome}</td>
                          <td className="px-6 py-4 text-slate-500">{formatDate(registro.data_aplicacao)}</td>
                          <td className="px-6 py-4 text-slate-500">
                            {registro.proxima_dose ? formatDate(registro.proxima_dose) : 'Dose unica'}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={registro.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Banner informativo */}
        <section className="mt-12 rounded-2xl bg-emerald-800 p-6 text-white shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold">Roteiro de Imunizacao Recomendado</h3>
              <p className="mt-1 max-w-2xl text-sm text-emerald-100">
                Filhotes devem tomar doses iniciais de V8/V10 com reforcos definidos pelo veterinario. O dashboard ajuda a
                acompanhar proximas doses e atrasos.
              </p>
            </div>
            <Calendar className="h-8 w-8 text-emerald-200" />
          </div>
        </section>
      </main>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR');
}
