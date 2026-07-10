export interface PetShareLink {
  id: string;
  pet_id: string;
  user_id: string;
  token: string;
  expires_at: string;
  revoked_at: string | null;
  created_at: string;
}

export interface SharedPet {
  id: string;
  nome: string;
  especie: string;
  raca: string | null;
  data_nascimento: string | null;
  peso: number | null;
  foto_url: string | null;
  rg_sinpatinhas: string | null;
}

export interface SharedVaccineRecord {
  id: string;
  vacina_nome: string;
  data_aplicacao: string;
  proxima_dose: string | null;
  observacoes: string | null;
}

export interface SharedPetCard {
  pet: SharedPet;
  registros: SharedVaccineRecord[];
  expires_at: string;
}
