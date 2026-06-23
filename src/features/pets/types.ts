export interface Pet {
  id: string;
  user_id: string;
  nome: string;
  raca: string | null;
  data_nascimento: string | null;
  peso: number | null;
  foto_url: string | null;
  rg_sinpatinhas: string | null;
  created_at: string;
}

export interface CreatePetInput {
  nome: string;
  raca?: string | null;
  data_nascimento?: string | null;
  peso?: number | null;
  foto_url?: string | null;
  rg_sinpatinhas?: string | null;
}

export interface UpdatePetInput {
  nome?: string;
  raca?: string | null;
  data_nascimento?: string | null;
  peso?: number | null;
  foto_url?: string | null;
  rg_sinpatinhas?: string | null;
}
