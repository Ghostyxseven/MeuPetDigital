import React from 'react';
import { Dog, Shield } from 'lucide-react';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import type { DashboardPet } from '@/features/dashboard/types';

interface PetCardProps {
  pet: DashboardPet;
  onClick?: () => void;
}

/**
 * Card de exibição de um pet com nome, raça, peso, RG e status vacinal.
 */
export function PetCard({ pet, onClick }: PetCardProps) {
  return (
    <Card hoverable onClick={onClick} className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-600">
            <Dog className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{pet.nome}</h3>
            <p className="text-xs font-medium text-slate-400">
              {pet.raca || 'Sem raça definida'}{' '}
              {pet.peso ? `— ${pet.peso}kg` : ''}
            </p>
            {pet.rg_sinpatinhas && (
              <span className="mt-1 inline-flex items-center gap-1 rounded bg-slate-50 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500">
                <Shield className="h-2.5 w-2.5" />
                {pet.rg_sinpatinhas}
              </span>
            )}
          </div>
        </div>
        <StatusBadge status={pet.statusVacinal} />
      </div>
    </Card>
  );
}
