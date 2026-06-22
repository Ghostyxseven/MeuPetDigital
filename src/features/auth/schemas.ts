import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('Informe um email valido.'),
});

export const passwordSchema = z.object({
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
});

export const authSchema = emailSchema.extend(passwordSchema.shape);

export type AuthFormData = z.infer<typeof authSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
