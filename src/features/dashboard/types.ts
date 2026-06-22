import type { VacinaStatus } from '@/core/lib/vacinaStatus';

export interface DashboardPet {
  id: string;
  nome: string;
  raca: string | null;
  data_nascimento: string | null;
  peso: number | null;
  foto_url: string | null;
  rg_sinpatinhas: string | null;
  statusVacinal: VacinaStatus;
}

export interface DashboardRegistro {
  id: string;
  pet_nome: string;
  vacina_nome: string;
  data_aplicacao: string;
  proxima_dose: string | null;
  status: VacinaStatus;
}
