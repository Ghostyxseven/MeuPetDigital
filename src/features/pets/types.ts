export interface Pet {
  id: string;
  user_id: string;
  nome: string;
  especie: string;
  raca: string | null;
  data_nascimento: string | null;
  peso: number | null;
  foto_url: string | null;
  rg_sinpatinhas: string | null;
  whatsapp: string | null;
  created_at: string;
}

export interface CreatePetInput {
  nome: string;
  especie: string;
  raca?: string | null;
  data_nascimento?: string | null;
  peso?: number | null;
  foto_url?: string | null;
  rg_sinpatinhas?: string | null;
  whatsapp?: string | null;
}

export interface UpdatePetInput {
  nome?: string;
  especie?: string;
  raca?: string | null;
  data_nascimento?: string | null;
  peso?: number | null;
  foto_url?: string | null;
  rg_sinpatinhas?: string | null;
  whatsapp?: string | null;
}
