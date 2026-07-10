-- ==========================================
-- SCHEMA DO MEUPETDIGITAL
-- ==========================================

-- 1. TABELA: vacinas (Catálogo público)
CREATE TABLE public.vacinas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    intervalo_dias INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABELA: pets (Privado ao usuário)
CREATE TABLE public.pets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    especie TEXT NOT NULL,
    raca TEXT,
    data_nascimento DATE,
    peso NUMERIC,
    foto_url TEXT,
    rg_sinpatinhas TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABELA: registros (Histórico de vacinação, privado)
CREATE TABLE public.registros (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    vacina_id UUID NOT NULL REFERENCES public.vacinas(id) ON DELETE CASCADE,
    data_aplicacao DATE NOT NULL,
    proxima_dose DATE,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.vacinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registros ENABLE ROW LEVEL SECURITY;

-- Políticas para 'vacinas' (Leitura pública, escrita só para admins - omitida aqui, só select para usuários autenticados)
CREATE POLICY "Vacinas são visíveis para todos os usuários autenticados" 
    ON public.vacinas FOR SELECT 
    TO authenticated 
    USING (true);

-- O catálogo é colaborativo: usuários autenticados podem incluir outros tipos
-- de vacina para utilizá-los imediatamente no registro de doses.
CREATE POLICY "Usuários autenticados podem cadastrar vacinas"
    ON public.vacinas FOR INSERT
    TO authenticated
    WITH CHECK (char_length(trim(nome)) >= 2 AND intervalo_dias >= 0);

-- Políticas para 'pets' (Somente o dono vê/edita)
CREATE POLICY "Usuários podem ver seus próprios pets" 
    ON public.pets FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios pets" 
    ON public.pets FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios pets" 
    ON public.pets FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios pets" 
    ON public.pets FOR DELETE 
    TO authenticated 
    USING (auth.uid() = user_id);

-- Políticas para 'registros' (Somente dono do pet vê/edita os registros do pet)
CREATE POLICY "Usuários podem ver registros de seus próprios pets" 
    ON public.registros FOR SELECT 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = registros.pet_id AND pets.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários podem inserir registros para seus pets" 
    ON public.registros FOR INSERT 
    TO authenticated 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_id AND pets.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários podem atualizar registros de seus pets" 
    ON public.registros FOR UPDATE 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = registros.pet_id AND pets.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_id AND pets.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários podem deletar registros de seus pets" 
    ON public.registros FOR DELETE 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = registros.pet_id AND pets.user_id = auth.uid()
        )
    );

-- ==========================================
-- DADOS INICIAIS (SEED)
-- ==========================================

INSERT INTO public.vacinas (nome, descricao, intervalo_dias) VALUES
('V10 / V8 (Múltipla)', 'Protege contra Cinomose, Parvovirose, Coronavirose, Adenovirose, Parainfluenza e Leptospirose.', 365),
('Antirrábica', 'Protege contra a Raiva. Obrigatória anualmente.', 365),
('Gripe Canina (Pneumodog)', 'Protege contra a Tosse dos Canis (Bordetella bronchiseptica e Parainfluenza).', 365),
('Giárdia', 'Previne a Giardíase canina.', 365),
('Leishmaniose', 'Previne a Leishmaniose Visceral Canina.', 365);

-- ==========================================
-- COMPARTILHAMENTO DA CARTEIRINHA POR QR CODE
-- ==========================================

CREATE TABLE public.pet_share_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
    revoked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX pet_share_links_token_idx ON public.pet_share_links (token);
CREATE INDEX pet_share_links_pet_id_idx ON public.pet_share_links (pet_id);

ALTER TABLE public.pet_share_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutores podem ver compartilhamentos de seus pets"
    ON public.pet_share_links FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Tutores podem criar compartilhamentos de seus pets"
    ON public.pet_share_links FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() = user_id
        AND expires_at > now()
        AND EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_share_links.pet_id
              AND pets.user_id = auth.uid()
        )
    );

CREATE POLICY "Tutores podem atualizar compartilhamentos de seus pets"
    ON public.pet_share_links FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Tutores podem excluir compartilhamentos de seus pets"
    ON public.pet_share_links FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

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
            'rg_sinpatinhas', pet.rg_sinpatinhas,
            'whatsapp', pet.whatsapp
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
