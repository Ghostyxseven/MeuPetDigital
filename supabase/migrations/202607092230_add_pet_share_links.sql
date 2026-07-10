-- Compartilhamento temporário e revogável da carteirinha por QR Code.

CREATE TABLE IF NOT EXISTS public.pet_share_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
    revoked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS pet_share_links_token_idx
    ON public.pet_share_links (token);

CREATE INDEX IF NOT EXISTS pet_share_links_pet_id_idx
    ON public.pet_share_links (pet_id);

ALTER TABLE public.pet_share_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tutores podem ver compartilhamentos de seus pets" ON public.pet_share_links;
CREATE POLICY "Tutores podem ver compartilhamentos de seus pets"
    ON public.pet_share_links FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Tutores podem criar compartilhamentos de seus pets" ON public.pet_share_links;
CREATE POLICY "Tutores podem criar compartilhamentos de seus pets"
    ON public.pet_share_links FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = user_id
        AND expires_at > now()
        AND expires_at <= now() + interval '8 days'
        AND EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_share_links.pet_id
              AND pets.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Tutores podem atualizar compartilhamentos de seus pets" ON public.pet_share_links;
CREATE POLICY "Tutores podem atualizar compartilhamentos de seus pets"
    ON public.pet_share_links FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Tutores podem excluir compartilhamentos de seus pets" ON public.pet_share_links;
CREATE POLICY "Tutores podem excluir compartilhamentos de seus pets"
    ON public.pet_share_links FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- A página pública chama somente esta função. Ela não recebe permissão de
-- leitura direta em pets, registros ou usuários.
CREATE OR REPLACE FUNCTION public.get_shared_pet_card(p_token UUID)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
    SELECT jsonb_build_object(
        'pet', jsonb_build_object(
            'id', pet.id,
            'nome', pet.nome,
            'especie', pet.especie,
            'raca', pet.raca,
            'data_nascimento', pet.data_nascimento,
            'peso', pet.peso,
            'foto_url', pet.foto_url,
            'rg_sinpatinhas', pet.rg_sinpatinhas
        ),
        'registros', COALESCE((
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', registro.id,
                    'vacina_nome', vacina.nome,
                    'data_aplicacao', registro.data_aplicacao,
                    'proxima_dose', registro.proxima_dose,
                    'observacoes', registro.observacoes
                )
                ORDER BY registro.data_aplicacao DESC
            )
            FROM public.registros AS registro
            JOIN public.vacinas AS vacina ON vacina.id = registro.vacina_id
            WHERE registro.pet_id = pet.id
        ), '[]'::jsonb),
        'expires_at', link.expires_at
    )
    FROM public.pet_share_links AS link
    JOIN public.pets AS pet ON pet.id = link.pet_id
    WHERE link.token = p_token
      AND link.revoked_at IS NULL
      AND link.expires_at > now()
    LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_shared_pet_card(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_shared_pet_card(UUID) TO anon, authenticated;
