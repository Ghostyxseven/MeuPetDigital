# Page Specs

## Home

**Objetivo:** apresentar o produto e levar para login/dashboard.

**Conteudo essencial:**

- nome MeuPetDigital como sinal principal;
- promessa curta sobre saude preventiva;
- CTA primario para dashboard ou cadastro;
- CTA secundario para login;
- tres beneficios reais: dashboard, proximas doses, privacidade.

**Ajustes recomendados:**

- Manter a promessa de seguranca alinhada ao Supabase real: Auth, PostgreSQL e RLS.
- Reduzir dependencia de modo escuro se isso prejudicar legibilidade.
- Manter cards de beneficios com borda de ate 8px se o design system for revisado.

## Login, cadastro e recuperacao

**Objetivo:** permitir acesso sem distracao.

**Conteudo essencial:**

- formulario central;
- feedback de erro/sucesso;
- links entre login, cadastro e recuperacao;
- visual consistente entre as telas.

**Ajustes recomendados:**

- Mesmo layout base para todas as telas de auth.
- Botao primario sempre com texto claro e estado loading.
- Campos com labels persistentes.

## Dashboard

**Objetivo:** responder "meus pets estao em dia?".

**Conteudo essencial:**

- metricas: total, em dia, proximas, atrasadas;
- alerta quando houver risco;
- lista curta de pets;
- historico de aplicacoes;
- acoes: cadastrar pet, registrar vacina.

**Ajustes recomendados:**

- Dar maior destaque para atrasadas e proximas.
- Evitar tabela muito larga no mobile; usar cards ou linhas compactas abaixo de 640px.
- Se houver fallback visual de demonstracao, ele deve ser tratado como modo temporario de desenvolvimento, nao como runtime oficial.

## Pets

**Objetivo:** localizar pet e entrar no detalhe.

**Conteudo essencial:**

- busca por nome/raca;
- filtro por status;
- card com nome, raca, idade, peso e status;
- CTA para cadastrar pet.

**Ajustes recomendados:**

- Padronizar Header com o componente global.
- Evitar texto pequeno demais em badges importantes.
- Garantir alvo de toque minimo em botoes no mobile.

## Detalhe do pet

**Objetivo:** mostrar dados principais e historico de saude.

**Conteudo essencial:**

- identidade do pet;
- dados basicos;
- status vacinal;
- historico de vacinas;
- CTA para registrar vacina.

**Ajustes recomendados:**

- Agrupar informacoes em secoes: Perfil, Vacinas, Historico.
- Status deve ficar perto do nome do pet.

## Registrar vacina

**Objetivo:** salvar uma dose com minimo erro.

**Conteudo essencial:**

- selecao do pet;
- vacina;
- data de aplicacao;
- proxima dose, quando aplicavel;
- feedback de validacao.

**Ajustes recomendados:**

- Usar React Hook Form + Zod conforme padrao BMAD.
- Mostrar exemplo de data ou helper text curto.
