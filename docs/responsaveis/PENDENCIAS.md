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

- Validar o fluxo real com Supabase Auth.
- Confirmar que `.env.local` possui `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Validar o reset de senha real do Supabase com URL de redirecionamento correta.
- Testar manualmente o fluxo completo: cadastro, login, dashboard, cadastro de pet, edicao de pet, exclusao e registro de vacina.
- Gravar evidencias para apresentacao: prints das telas principais e resultado do `npm run build`.

## Micael - Arquitetura, Auth e Dashboard

Status atual:

- Arquitetura base com Next.js App Router implementada.
- `AuthProvider`, `useAuth` e `ProtectedRoute` implementados.
- Login, cadastro, recuperacao e redefinicao de senha existem como telas.
- Dashboard autenticado consome Supabase.
- Lint e build passam.

Falta:

- Validar sessao real do Supabase Auth no navegador.
- Alinhar qualquer documentacao restante com Supabase real.
- Revisar se o fallback de dados demonstrativos no dashboard deve permanecer na entrega final.

## Marcos Vinicius - Banco, RLS e Deploy

Status atual:

- Existe `supabase/schema.sql` documentando o modelo Supabase com RLS.
- O runtime definido para a entrega e Supabase real.
- Hooks e telas principais ja usam o cliente Supabase.

Falta:

- Executar `supabase/schema.sql` no projeto Supabase correto.
- Validar RLS com pelo menos dois usuarios diferentes.
- Configurar variaveis Supabase na Vercel.
- Validar deploy publico com Supabase real.

## Antonio Carlos - CRUD de Pets e Vacinas

Status atual:

- Rotas de pets existem: listar, criar, detalhar, editar e excluir.
- Rotas de registros vacinais existem: listar e criar.
- Hooks `usePets` e `useRegistrosVacinais` consomem Supabase.
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

## Decisao principal

O projeto decidiu usar Supabase real na entrega final:

1. Supabase Auth para autenticacao.
2. PostgreSQL do Supabase para pets, vacinas e registros.
3. RLS para isolamento por usuario.
4. `supabase/schema.sql` como script oficial de banco.

O Supabase e o unico backend persistente da aplicacao.
