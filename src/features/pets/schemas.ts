import { z } from 'zod';

export const petSchema = z.object({
  nome: z.string().min(1, 'O nome do pet é obrigatório.'),
  raca: z.string().nullable().optional().or(z.literal('')),
  data_nascimento: z.string()
    .nullable()
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      return date <= new Date();
    }, {
      message: 'A data de nascimento não pode ser no futuro.',
    }),
  peso: z.number().min(0, 'O peso deve ser maior ou igual a 0.').nullable().optional(),
  foto_url: z.string().nullable().optional().or(z.literal('')),
  rg_sinpatinhas: z.string().nullable().optional().or(z.literal('')),
});

export type PetFormData = z.infer<typeof petSchema>;
