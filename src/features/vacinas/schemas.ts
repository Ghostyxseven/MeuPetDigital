import { z } from 'zod';

export const registroVacinalSchema = z.object({
  pet_id: z.string().min(1, 'Selecione o pet.'),
  vacina_id: z.string().min(1, 'Selecione a vacina.'),
  data_aplicacao: z.string()
    .min(1, 'A data de aplicação é obrigatória.')
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      return date <= new Date();
    }, {
      message: 'A data de aplicação não pode ser no futuro.',
    }),
  observacoes: z.string().nullable().optional().or(z.literal('')),
});

export type RegistroVacinalFormData = z.infer<typeof registroVacinalSchema>;
