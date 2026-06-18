# MeuPetDigital

MeuPetDigital e uma aplicacao web para gerenciamento da saude preventiva de cachorros. O sistema permite que tutores cadastrem pets, registrem vacinas, acompanhem proximas doses e visualizem status de imunizacao em um dashboard.

## Funcionalidades

- Autenticacao de usuarios com Supabase Auth.
- CRUD completo de pets.
- Catalogo de vacinas no Supabase.
- Registro de doses aplicadas e proximas doses.
- Dashboard com indicadores de pets, vacinas em dia, proximas e atrasadas.
- Formularios com React Hook Form e validacao Zod.
- Hooks personalizados para autenticacao, pets e registros vacinais.
- Row Level Security para isolar dados por tutor.

## Tecnologias

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase Auth e PostgreSQL
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

3. Configure `.env.local` com os dados do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

4. No SQL Editor do Supabase, execute o conteudo de:

```text
supabase/schema.sql
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
supabase/schema.sql     Modelo de dados e politicas RLS (a criar)
docs/                   Documentacao academica e tecnica
```

## Entrega academica

A documentacao oficial esta em `docs/interno/Documentação.md`. O roteiro da apresentacao de 15 minutos esta em `docs/apresentacao/roteiro-15-minutos.md`.

## Equipe

- **Micael Cardoso Reis** — Tech Lead / Full-Stack ([@Ghostyxseven](https://github.com/Ghostyxseven))
- **Gisele** — Front-End / Design System ([@Gisele002](https://github.com/Gisele002))
- **Marcos Vinícius** — Back-End / Banco de Dados ([@MarcsVinny](https://github.com/MarcsVinny))
- **Antonio Carlos** — Full-Stack / Features ([@gomes738](https://github.com/gomes738))
- **Josiane** — QA / Testes e Documentação Final ([@Josiane10](https://github.com/Josiane10))
