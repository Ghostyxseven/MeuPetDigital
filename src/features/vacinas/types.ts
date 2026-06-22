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
