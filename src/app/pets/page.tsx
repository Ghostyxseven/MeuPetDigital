'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Dog, Plus, Search, Shield, ArrowLeft, Filter } from 'lucide-react';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { usePets } from '@/features/pets/hooks/usePets';
import { useRegistrosVacinais } from '@/features/vacinas/hooks/useRegistrosVacinais';
import { getVacinaStatus, getStatusUI } from '@/core/lib/vacinaStatus';

export default function PetsPage() {
  return (
    <ProtectedRoute>
      <PetsContent />
    </ProtectedRoute>
  );
}

function PetsContent() {
  const router = useRouter();
  const { pets, isLoading: petsLoading } = usePets();
  const { registros, isLoading: registrosLoading } = useRegistrosVacinais();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('todos');

  // Compute vaccine status for each pet using the real registers
  const petsWithStatus = useMemo(() => {
    return pets.map((pet) => {
      const petRegistros = registros.filter((r) => r.pet_id === pet.id);
      
      let statusVacinal: 'em_dia' | 'proxima' | 'atrasada' = 'em_dia';
      if (petRegistros.length > 0) {
        const statuses = petRegistros.map((r) => getVacinaStatus(r.proxima_dose));
        if (statuses.includes('atrasada')) {
          statusVacinal = 'atrasada';
        } else if (statuses.includes('proxima')) {
          statusVacinal = 'proxima';
        }
      }

      return {
        ...pet,
        statusVacinal,
      };
    });
  }, [pets, registros]);

  // Filtered list
  const filteredPets = useMemo(() => {
    return petsWithStatus.filter((pet) => {
      const matchesSearch =
        pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pet.raca && pet.raca.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus =
        selectedStatus === 'todos' || pet.statusVacinal === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [petsWithStatus, searchTerm, selectedStatus]);

  const calculateAge = (dateString: string | null) => {
    if (!dateString) return 'Idade não informada';
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age === 0) {
      const months = today.getMonth() - birthDate.getMonth() + (12 * (today.getFullYear() - birthDate.getFullYear()));
      return months <= 1 ? 'Menos de 1 mês' : `${months} meses`;
    }
    return age === 1 ? '1 ano' : `${age} anos`;
  };

  const loading = petsLoading || registrosLoading;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Dog className="h-5 w-5" />
              </div>
              <span className="text-md font-bold tracking-tight text-slate-900">Meus Pets</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/pets/novo')}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Cadastrar Pet
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filter controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar pet por nome ou raça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="todos">Status: Todos</option>
              <option value="em_dia">Em Dia</option>
              <option value="proxima">Próxima Dose</option>
              <option value="atrasada">Atrasadas</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
              <p className="text-sm font-medium text-slate-500">Carregando seus pets...</p>
            </div>
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Dog className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-900">Nenhum pet encontrado</h3>
            <p className="mt-1 text-xs text-slate-500">
              {searchTerm || selectedStatus !== 'todos'
                ? 'Tente ajustar os termos de busca ou filtros.'
                : 'Você ainda não possui pets cadastrados.'}
            </p>
            {!searchTerm && selectedStatus === 'todos' && (
              <button
                onClick={() => router.push('/pets/novo')}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Cadastrar Primeiro Pet
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet) => {
              const ui = getStatusUI(pet.statusVacinal);
              return (
                <div
                  key={pet.id}
                  onClick={() => router.push(`/pets/${pet.id}`)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                      <Dog className="h-8 w-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-base font-bold text-slate-900 group-hover:text-emerald-700">
                          {pet.nome}
                        </h3>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${ui.bgClass}`}>
                          <span className={`h-1 w-1 rounded-full ${ui.dotClass}`} />
                          {ui.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 font-medium">
                        {pet.raca || 'Sem raça definida'}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-slate-400 font-semibold">
                        <span>{calculateAge(pet.data_nascimento)}</span>
                        {pet.peso && (
                          <>
                            <span>•</span>
                            <span>{pet.peso} kg</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {pet.rg_sinpatinhas && (
                    <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
                      <Shield className="h-3.5 w-3.5 text-emerald-600" />
                      <span>SinPatinhas:</span>
                      <span className="font-mono text-slate-800">{pet.rg_sinpatinhas}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
