import React from "react";
import { Shield } from "lucide-react";
import { Card } from "./Card";
import { StatusBadge } from "./StatusBadge";
import { PetAvatar } from "@/features/pets/components/PetAvatar";
import type { DashboardPet } from "@/features/dashboard/types";

interface PetCardProps {
  pet: DashboardPet;
  onClick?: () => void;
}

/**
 * Card de exibição de um pet com foto/avatar, nome, espécie, raça, peso, RG e status vacinal.
 */
export function PetCard({ pet, onClick }: PetCardProps) {
  return (
    <Card hoverable onClick={onClick} className="overflow-hidden p-0 group">
      {/* Header da "Carteirinha" */}
      <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-800 to-emerald-600 px-4 py-2.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-100/80">
          ID Animal
        </span>
        <StatusBadge status={pet.statusVacinal} />
      </div>

      <div className="flex w-full items-start gap-4 p-4">
        <div className="rounded-xl border-2 border-slate-100 bg-slate-50 p-1">
          <PetAvatar
            fotoUrl={pet.foto_url}
            especie={pet.especie}
            nome={pet.nome}
            size="md"
            className="rounded-lg shadow-sm"
          />
        </div>
        
        <div className="min-w-0 flex-1 space-y-3 text-left">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Nome do Pet
            </div>
            <h3 className="truncate text-base font-black leading-tight text-slate-900 group-hover:text-emerald-700">
              {pet.nome}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Espécie / Raça</div>
              <div className="truncate text-[11px] font-semibold text-slate-700">
                {pet.especie} {pet.raca ? `• ${pet.raca}` : ""}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Peso</div>
              <div className="truncate text-[11px] font-semibold text-slate-700">
                {pet.peso ? `${pet.peso} kg` : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {pet.rg_sinpatinhas && (
        <div className="flex w-full items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span>SinPatinhas:</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-slate-800">
            {pet.rg_sinpatinhas}
          </span>
        </div>
      )}
    </Card>
  );
}
