export interface Vacina {
  id: string;
  nome: string;
  descricao: string | null;
  intervalo_dias: number;
  created_at: string;
}

export interface RegistroVacinal {
  id: string;
  pet_id: string;
  vacina_id: string;
  data_aplicacao: string;
  proxima_dose: string | null;
  observacoes: string | null;
  created_at: string;
}

export interface RegistroVacinalDetailed extends RegistroVacinal {
  pets?: {
    id: string;
    nome: string;
  } | null;
  vacinas?: {
    id: string;
    nome: string;
    intervalo_dias: number;
  } | null;
}

