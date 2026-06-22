import type { DashboardPet, DashboardRegistro } from './types';

export const MOCK_PETS: DashboardPet[] = [
  {
    id: '1',
    nome: 'Thor',
    raca: 'Golden Retriever',
    data_nascimento: '2022-04-15',
    peso: 32.4,
    foto_url: null,
    rg_sinpatinhas: 'SP-109283-A',
    statusVacinal: 'em_dia',
  },
  {
    id: '2',
    nome: 'Luna',
    raca: 'Bulldog Frances',
    data_nascimento: '2023-08-10',
    peso: 11.2,
    foto_url: null,
    rg_sinpatinhas: 'SP-304918-B',
    statusVacinal: 'proxima',
  },
  {
    id: '3',
    nome: 'Max',
    raca: 'Vira-lata (SRD)',
    data_nascimento: '2020-01-05',
    peso: 18.7,
    foto_url: null,
    rg_sinpatinhas: null,
    statusVacinal: 'atrasada',
  },
];

export const MOCK_REGISTROS: DashboardRegistro[] = [
  {
    id: 'r1',
    pet_nome: 'Thor',
    vacina_nome: 'Multipla Canina (V10)',
    data_aplicacao: '2025-06-10',
    proxima_dose: '2026-06-10',
    status: 'em_dia',
  },
  {
    id: 'r2',
    pet_nome: 'Luna',
    vacina_nome: 'Antirrabica',
    data_aplicacao: '2025-07-20',
    proxima_dose: '2026-07-20',
    status: 'proxima',
  },
  {
    id: 'r3',
    pet_nome: 'Max',
    vacina_nome: 'Gripe Canina',
    data_aplicacao: '2024-05-15',
    proxima_dose: '2025-05-15',
    status: 'atrasada',
  },
];
