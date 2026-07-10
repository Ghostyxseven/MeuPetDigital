import { z } from "zod";

export const prontuarioSchema = z.object({
  pet_id: z.string().uuid(),
  tipo: z.enum(["consulta", "exame", "pesagem", "cirurgia", "outro"]),
  data_registro: z.string().min(1, "A data é obrigatória."),
  descricao: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres."),
  peso: z.number().nullable().optional(),
  veterinario: z.string().nullable().optional(),
});

export type ProntuarioFormData = z.infer<typeof prontuarioSchema>;
