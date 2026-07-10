export type TipoProntuario =
  "consulta" | "exame" | "pesagem" | "cirurgia" | "outro";

export interface Prontuario {
  id: string;
  pet_id: string;
  tipo: TipoProntuario;
  data_registro: string;
  descricao: string;
  peso: number | null;
  veterinario: string | null;
  created_at: string;
}

export interface CreateProntuarioInput {
  pet_id: string;
  tipo: TipoProntuario;
  data_registro: string;
  descricao: string;
  peso?: number | null;
  veterinario?: string | null;
}
