"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Dog, Plus, Search, Shield, Filter } from "lucide-react";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { usePets } from "@/features/pets/hooks/usePets";
import { useRegistrosVacinais } from "@/features/vacinas/hooks/useRegistrosVacinais";
import { getVacinaStatus, getStatusUI } from "@/core/lib/vacinaStatus";
import { AppShell, Button, EmptyState, Spinner } from "@/core/components";

import { PetAvatar } from "@/features/pets/components/PetAvatar";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");

  // Compute vaccine status for each pet using the real registers
  const petsWithStatus = useMemo(() => {
    return pets.map((pet) => {
      const petRegistros = registros.filter((r) => r.pet_id === pet.id);

      let statusVacinal: "em_dia" | "proxima" | "atrasada" = "em_dia";
      if (petRegistros.length > 0) {
        const statuses = petRegistros.map((r) =>
          getVacinaStatus(r.proxima_dose),
        );
        if (statuses.includes("atrasada")) {
          statusVacinal = "atrasada";
        } else if (statuses.includes("proxima")) {
          statusVacinal = "proxima";
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
        selectedStatus === "todos" || pet.statusVacinal === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [petsWithStatus, searchTerm, selectedStatus]);

  const calculateAge = (dateString: string | null) => {
    if (!dateString) return "Idade não informada";
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age === 0) {
      const months =
        today.getMonth() -
        birthDate.getMonth() +
        12 * (today.getFullYear() - birthDate.getFullYear());
      return months <= 1 ? "Menos de 1 mês" : `${months} meses`;
    }
    return age === 1 ? "1 ano" : `${age} anos`;
  };

  const loading = petsLoading || registrosLoading;

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-emerald-700">Sua família</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Meus pets</h1>
            <p className="mt-1 text-sm text-slate-500">Encontre um pet e consulte rapidamente seu estado de saúde.</p>
          </div>
          <Button className="hidden sm:inline-flex" icon={<Plus className="h-4 w-4" />} onClick={() => router.push("/pets/novo")}>
            Cadastrar pet
          </Button>
        </div>
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
              aria-label="Filtrar pets por status"
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
          <div className="flex h-64 items-center justify-center"><Spinner label="Carregando seus pets..." /></div>
        ) : filteredPets.length === 0 ? (
          <EmptyState
            icon={<Dog className="h-8 w-8" />}
            title="Nenhum pet encontrado"
            description={searchTerm || selectedStatus !== "todos" ? "Tente ajustar a busca ou os filtros." : "Cadastre seu primeiro pet para começar o acompanhamento."}
            action={!searchTerm && selectedStatus === "todos" ? <Button icon={<Plus className="h-4 w-4" />} onClick={() => router.push("/pets/novo")}>Cadastrar primeiro pet</Button> : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet) => {
              const ui = getStatusUI(pet.statusVacinal);
              return (
                <button
                  type="button"
                  key={pet.id}
                  onClick={() => router.push(`/pets/${pet.id}`)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md cursor-pointer text-left"
                >
                  {/* Header da "Carteirinha" */}
                  <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-800 to-emerald-600 px-4 py-2.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-100/80">
                      ID Animal
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm ${
                        pet.statusVacinal === "em_dia"
                          ? "bg-emerald-500 text-white"
                          : pet.statusVacinal === "atrasada"
                            ? "bg-red-500 text-white"
                            : "bg-amber-400 text-amber-950"
                      }`}
                    >
                      <span className="h-1 w-1 rounded-full bg-current opacity-70" />
                      {ui.label}
                    </span>
                  </div>

                  <div className="flex w-full items-start gap-4 p-4">
                    <div className="rounded-xl border-2 border-slate-100 bg-slate-50 p-1">
                      <PetAvatar
                        fotoUrl={pet.foto_url}
                        especie={pet.especie}
                        nome={pet.nome}
                        size="lg"
                        className="rounded-lg shadow-sm"
                      />
                    </div>
                    
                    <div className="min-w-0 flex-1 space-y-3">
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Nome do Pet
                        </div>
                        <h3 className="truncate text-lg font-black leading-tight text-slate-900 group-hover:text-emerald-700">
                          {pet.nome}
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                        <div>
                          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Espécie / Raça</div>
                          <div className="truncate text-xs font-semibold text-slate-700">
                            {pet.especie} {pet.raca ? `• ${pet.raca}` : ""}
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Idade</div>
                          <div className="truncate text-xs font-semibold text-slate-700">
                            {calculateAge(pet.data_nascimento)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {pet.rg_sinpatinhas && (
                    <div className="flex w-full items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Shield className="h-3.5 w-3.5 text-emerald-600" />
                        <span>SinPatinhas:</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-800">
                        {pet.rg_sinpatinhas}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
        <Button className="fixed bottom-20 right-4 z-40 shadow-xl sm:hidden" icon={<Plus className="h-4 w-4" />} onClick={() => router.push("/pets/novo")}>
          Cadastrar pet
        </Button>
      </main>
    </AppShell>
  );
}
