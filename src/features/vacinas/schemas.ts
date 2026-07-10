import { z } from "zod";

export const registroVacinalSchema = z.object({
  pet_id: z.string().min(1, "Selecione o pet."),
  vacina_id: z.string().min(1, "Selecione a vacina."),
  data_aplicacao: z
    .string()
    .min(1, "A data de aplicação é obrigatória.")
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        return date <= new Date();
      },
      {
        message: "A data de aplicação não pode ser no futuro.",
      },
    ),
  observacoes: z.string().nullable().optional().or(z.literal("")),
});

export type RegistroVacinalFormData = z.infer<typeof registroVacinalSchema>;

export const editarRegistroVacinalSchema = z
  .object({
    vacina_id: z.string().min(1, "Selecione a vacina."),
    data_aplicacao: z
      .string()
      .min(1, "A data de aplicação é obrigatória.")
      .refine((value) => new Date(`${value}T12:00:00`) <= new Date(), {
        message: "A data de aplicação não pode ser no futuro.",
      }),
    proxima_dose: z.string().nullable().optional().or(z.literal("")),
    observacoes: z.string().max(500, "Use no máximo 500 caracteres.").nullable().optional().or(z.literal("")),
  })
  .superRefine((data, context) => {
    if (
      data.proxima_dose &&
      new Date(`${data.proxima_dose}T12:00:00`) <
        new Date(`${data.data_aplicacao}T12:00:00`)
    ) {
      context.addIssue({
        code: "custom",
        path: ["proxima_dose"],
        message: "A próxima dose não pode ser anterior à aplicação.",
      });
    }
  });

export type EditarRegistroVacinalFormData = z.infer<
  typeof editarRegistroVacinalSchema
>;
