# MeuPetDigital

MeuPetDigital e uma aplicacao web para gerenciamento da saude preventiva de cachorros. O sistema permite que tutores cadastrem pets, registrem vacinas, acompanhem proximas doses e visualizem status de imunizacao em um dashboard.

## Funcionalidades

- Autenticacao de usuarios com API local e sessao por cookie.
- CRUD completo de pets.
- Catalogo de vacinas em banco local SQLite.
- Registro de doses aplicadas e proximas doses.
- Dashboard com indicadores de pets, vacinas em dia, proximas e atrasadas.
- Formularios com React Hook Form e validacao Zod.
- Hooks personalizados para autenticacao, pets e registros vacinais.
- Isolamento dos dados por tutor nas rotas da API.

## Tecnologias

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS
- SQLite local com `better-sqlite3`
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

3. Configure `.env.local` se optar pela integracao Supabase futura:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

4. Opcional: se a equipe decidir voltar para Supabase real, execute no SQL Editor o conteudo de:

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
supabase/schema.sql     Modelo de dados e politicas RLS para integracao Supabase futura
docs/                   Documentacao academica e tecnica
```

## Estado atual

O runtime atual usa `database.db` com SQLite local. A pasta `supabase/` permanece como base para uma integracao futura com Supabase real, caso a equipe escolha essa direcao antes da entrega.

As pendencias por responsavel estao documentadas em `docs/responsaveis/PENDENCIAS.md`.

## Entrega academica

A documentacao oficial esta em `docs/interno/Documentação.md`. O roteiro da apresentacao de 15 minutos esta em `docs/apresentacao/roteiro-15-minutos.md`.

## Equipe

- **Micael Cardoso Reis** — Tech Lead / Full-Stack ([@Ghostyxseven](https://github.com/Ghostyxseven))
- **Gisele** — Front-End / Design System ([@Gisele002](https://github.com/Gisele002))
- **Marcos Vinícius** — Back-End / Banco de Dados ([@MarcsVinny](https://github.com/MarcsVinny))
- **Antonio Carlos** — Full-Stack / Features ([@gomes738](https://github.com/gomes738))
- **Josiane** — QA / Testes e Documentação Final ([@Josiane10](https://github.com/Josiane10))
