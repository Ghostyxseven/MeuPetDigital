# MeuPetDigital

MeuPetDigital e uma aplicacao web para gerenciamento da saude preventiva de cachorros. O sistema permite que tutores cadastrem pets, registrem vacinas, acompanhem proximas doses e visualizem status de imunizacao em um dashboard.

## Funcionalidades

- Autenticacao de usuarios com Supabase Auth.
- CRUD completo de pets.
- Catalogo de vacinas no PostgreSQL do Supabase.
- Registro de doses aplicadas e proximas doses.
- Dashboard com indicadores de pets, vacinas em dia, proximas e atrasadas.
- Carteirinha compartilhável por QR Code, com link temporário e revogável.
- Formularios com React Hook Form e validacao Zod.
- Hooks personalizados para autenticacao, pets e registros vacinais.
- Isolamento dos dados por tutor com RLS no Supabase.

## Tecnologias

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase Auth
- PostgreSQL no Supabase com RLS
- React Hook Form
- Zod
- Lucide React

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Copie as variaveis de ambiente:

```powershell
Copy-Item .env.local.example .env.local
```

3. Configure `.env.local` com as credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

4. Execute no SQL Editor do Supabase o conteudo de:

```text
supabase/schema.sql
```

Em um banco que já possui o schema anterior, aplique também a migration:

```text
supabase/migrations/202607092230_add_pet_share_links.sql
```

5. Inicie o servidor:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura

```text
src/app                 Rotas do Next.js (App Router)
src/core/               Codigo global e compartilhado
  components/           Componentes genericos (UI base)
  lib/                  Utilitarios e cliente Supabase
  hooks/                Hooks globais
  types/                Tipos globais
src/features/           Vertical Slices (por dominio de negocio)
  auth/                 Autenticacao (componentes, hooks, tipos)
  pets/                 Gestao de pets (componentes, hooks, tipos)
  vacinas/              Vacinacao e registros (componentes, hooks, tipos)
supabase/schema.sql     Modelo de dados, seed e politicas RLS do Supabase
docs/                   Documentacao academica e tecnica
```

## BMAD

O projeto possui artefatos BMAD para planejamento, arquitetura, historias e QA. Veja `docs/BMAD-USO.md` antes de usar o BMAD como guia de implementacao.

## Estado atual

O runtime atual usa Supabase real para autenticacao, banco PostgreSQL e RLS. A entrega deve manter `supabase/schema.sql`, `.env.local.example` e a documentacao alinhados a essa decisao.

As pendencias por responsavel estao documentadas em `docs/responsaveis/PENDENCIAS.md`.

## Entrega academica

A documentacao oficial esta em `docs/interno/Documentação.md`. O roteiro da apresentacao de 15 minutos esta em `docs/apresentacao/roteiro-15-minutos.md`.

## Equipe

- **Micael Cardoso Reis** — Tech Lead / Full-Stack ([@Ghostyxseven](https://github.com/Ghostyxseven))
- **Gisele** — Front-End / Design System ([@Gisele002](https://github.com/Gisele002))
- **Marcos Vinícius** — Back-End / Banco de Dados ([@MarcsVinny](https://github.com/MarcsVinny))
- **Antonio Carlos** — Full-Stack / Features ([@gomes738](https://github.com/gomes738))
- **Josiane** — QA / Testes e Documentação Final ([@Josiane10](https://github.com/Josiane10))
