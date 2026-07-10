# Arquitetura do Sistema

**Projeto:** MeuPetDigital
**Tipo:** Web Application
**Estilo:** Monolith Baseado em Componentes e Domínios

## 1. Visão Executiva
O sistema foi desenhado como uma SPA/SSR híbrida usando Next.js App Router conectado diretamente a um BaaS (Supabase). O frontend faz as chamadas de banco e gerencia o estado da aplicação através de React Hooks encapsulados por "Features".

## 2. Stack Tecnológica
- **Linguagem Principal:** TypeScript 5 (Strict Mode)
- **Framework Frontend:** Next.js 15 (App Router) + React 19
- **Estilização:** Tailwind CSS 4
- **Backend/DB:** Supabase (PostgreSQL + Go/Elixir edge functions internamente)
- **Validação de Dados:** Zod + React Hook Form

## 3. Padrão Arquitetural

A arquitetura do projeto adota a separação **Feature-Sliced Design (parcial)**, dividindo o código em `core` e `features`:

### `src/core/`
Armazena lógica que é agnóstica de negócio ou amplamente compartilhada:
- `/components`: UI base genérica (Botões, Inputs, Spinners, Cards).
- `/lib`: Clientes de API, utilitários, inicializador do Supabase.
- `/types`: Tipos globais e genéricos.

### `src/features/`
A lógica de negócios viva fica aqui. Separada por Domínio (`auth`, `dashboard`, `pets`, `vacinas`).
Dentro de cada domínio:
- `/components`: UI estritamente acoplada à regra de negócio da feature.
- `/hooks`: Custom hooks contendo regras de negócio (ex: `useAuth`, `usePets`).
- `schemas.ts` e `types.ts`: Modelos de dados e validações exclusivas daquele domínio.

### `src/app/`
Trata exclusivamente do Roteamento Next.js.
- Conecta URLs às `features`.
- Os arquivos `page.tsx` são componentes majoritariamente Server Components, enquanto componentes importados da `features` carregam os diretórios de cliente `"use client"` quando necessário.

## 4. Arquitetura de Dados & Segurança
O sistema é *Database-Centric*, utilizando o **Supabase** como hub principal.
A segurança é garantida via RLS (Row Level Security) diretamente nas tabelas do PostgreSQL. O cliente frontend faz as requisições autenticadas usando a chave anônima (JWT session). Nunca chaves de serviço ou lógicas de elevação de permissão são executadas no lado cliente.

---
_Documento gerado automaticamente com base na base de código atual pelo fluxo BMad._
