# Pendencias por Responsavel

Este documento registra o estado real do projeto apos validacao local em 06 de julho de 2026.

Validado nesta data:

- `npm install`
- `npm run lint`
- `npm run build`

Resultado: lint e build passam.

## O que voce pode fazer agora

Responsavel: Micael Cardoso Reis.

Estas sao as pendencias dentro do seu alcance direto, sem depender de outro membro:

- Atualizar textos da documentacao que ainda dizem que a autenticacao atual usa Supabase Auth.
- Decidir e registrar se a entrega vai usar SQLite local ou Supabase real em producao.
- Melhorar a seguranca da sessao local, trocando o cookie Base64 simples por sessao assinada ou token seguro.
- Substituir o reset de senha simulado por uma mensagem clara de demonstracao ou por integracao real, conforme a decisao do banco/auth.
- Testar manualmente o fluxo completo: cadastro, login, dashboard, cadastro de pet, edicao de pet, exclusao e registro de vacina.
- Gravar evidencias para apresentacao: prints das telas principais e resultado do `npm run build`.

## Micael - Arquitetura, Auth e Dashboard

Status atual:

- Arquitetura base com Next.js App Router implementada.
- `AuthProvider`, `useAuth` e `ProtectedRoute` implementados.
- Login, cadastro, recuperacao e redefinicao de senha existem como telas.
- Dashboard autenticado funciona e consome APIs locais.
- Lint e build passam.

Falta:

- Fortalecer a sessao local. Hoje o cookie guarda dados em Base64 e nao e assinado.
- Alinhar a documentacao com a decisao final de auth/banco.
- Revisar se o fallback de dados demonstrativos no dashboard deve permanecer na entrega final.

## Marcos Vinicius - Banco, RLS e Deploy

Status atual:

- Existe `supabase/schema.sql` documentando o modelo Supabase com RLS.
- O runtime atual do projeto usa SQLite local em `database.db`, nao Supabase.
- O app compila localmente com as APIs SQLite.

Falta:

- Confirmar se o projeto final sera SQLite local ou Supabase real.
- Se for Supabase: conectar as rotas/hooks ao Supabase, validar RLS e configurar variaveis na Vercel.
- Se for SQLite: atualizar a documentacao removendo promessas de RLS/Supabase em producao.
- Validar deploy publico. SQLite local com `better-sqlite3` pode exigir ajuste de plataforma.

## Antonio Carlos - CRUD de Pets e Vacinas

Status atual:

- Rotas de pets existem: listar, criar, detalhar, editar e excluir.
- Rotas de registros vacinais existem: listar e criar.
- Hooks `usePets` e `useRegistrosVacinais` consomem as APIs locais.
- Formulario e calculo de proxima dose estao implementados.

Falta:

- Testar manualmente CRUD completo com usuario logado.
- Validar mensagens de erro em campos obrigatorios.
- Confirmar se edicao/exclusao de registros vacinais entra no escopo final ou se criar/listar basta.
- Garantir que os nomes exibidos nas telas estejam com acentos corretos.

## Gisele - Design System e Telas Visuais

Status atual:

- Componentes base existem em `src/core/components`.
- Telas de login, cadastro, recuperacao, dashboard, pets e vacinas usam o mesmo estilo visual.

Falta:

- Revisar responsividade em celular.
- Corrigir textos sem acento ou com codificacao quebrada quando aparecerem na UI.
- Padronizar estados visuais de erro, vazio e carregamento.
- Separar prints finais das telas para a apresentacao.

## Josiane - QA e Documentacao Final

Status atual:

- Existe estrutura de documentacao em `docs/`.
- O projeto ja tem build validado localmente.

Falta:

- Criar roteiro de testes manuais com resultado esperado e resultado obtido.
- Atualizar PDF/documentacao final com o estado real do projeto.
- Conferir se todos os requisitos do trabalho aparecem na documentacao.
- Organizar evidencias da entrega: prints, link do repositorio, link do deploy e comandos de validacao.

## Decisao pendente mais importante

O projeto precisa escolher uma destas duas direcoes antes da entrega final:

1. Manter SQLite local para demonstracao academica.
2. Voltar para Supabase real com Auth, PostgreSQL e RLS.

Enquanto essa decisao nao estiver documentada, README, docs e runtime vao continuar se contradizendo.
