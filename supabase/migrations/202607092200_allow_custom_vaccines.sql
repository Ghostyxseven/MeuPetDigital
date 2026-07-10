-- Permite cadastrar novos tipos no catálogo compartilhado de vacinas.
-- Execute esta migração no projeto Supabase já existente.

DROP POLICY IF EXISTS "Usuários autenticados podem cadastrar vacinas" ON public.vacinas;

CREATE POLICY "Usuários autenticados podem cadastrar vacinas"
    ON public.vacinas FOR INSERT
    TO authenticated
    WITH CHECK (char_length(trim(nome)) >= 2 AND intervalo_dias >= 0);
