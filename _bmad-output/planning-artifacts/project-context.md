---
project_name: 'MeuPetDigital'
user_name: 'MeuPetDigital'
date: '2026-07-09'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 10
optimized_for_llm: true
---

# Contexto do Projeto para Agentes de IA

_Este arquivo contém regras críticas e padrões que agentes de IA devem seguir ao implementar código neste projeto. O foco é em detalhes não óbvios que agentes poderiam deixar passar._

---

## Stack Tecnológica e Versões

- **Next.js**: 15.5.19 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x (Strict mode habilitado)
- **Estilização**: Tailwind CSS 4.x
- **Formulários e Validação**: React Hook Form (7.80.0) + Zod (4.4.3)
- **Backend / Auth**: Supabase JS (2.108.2)

## Regras Críticas de Implementação

### Regras Específicas da Linguagem (TypeScript)
- Utilize `Strict Mode` do TypeScript obrigatoriamente.
- Não utilize `any`. Sempre defina tipos ou infira as tipagens a partir dos schemas do `Zod`.
- Importações devem utilizar caminhos absolutos com o alias `@/` (exemplo: `@/features/auth/components`).

### Regras Específicas do Framework (Next.js & React)
- Este projeto utiliza **App Router** e a pasta de rotas em `src/app`.
- Marque com `"use client"` apenas os componentes que realmente precisam de estado ou interatividade do lado do cliente. Mantenha os componentes como Server Components (comportamento padrão) sempre que possível.
- Formulários devem ser estruturados em conjunto com `React Hook Form` utilizando `resolvers` do `Zod`.

### Regras de Qualidade e Estilo de Código
- Arquitetura baseada em domínios/features: Lógica específica de domínio vai em `src/features/[dominio]` e código reutilizável em `src/core`.
- As páginas (`page.tsx`) dentro de `src/app/` devem atuar apenas como pontos de montagem e roteamento, delegando a UI pesada e as regras de negócio para as `features`.
- Siga as regras de linting do `eslint-config-next` e preserve a organização semântica.

### Regras Críticas (O que NÃO Fazer)
- **Segurança com Supabase:** Nunca exponha a variável de ambiente `SUPABASE_SERVICE_ROLE_KEY` no frontend. Apenas `NEXT_PUBLIC_SUPABASE_ANON_KEY` pode ser carregada nos componentes cliente.
- **Isolamento de Domínio:** Não acople lógicas de features distintas fortemente. (Por exemplo, `pets` e `vacinas` devem ficar separados na medida do possível).

---

## Diretrizes de Uso

**Para Agentes de IA:**
- Leia este arquivo antes de implementar qualquer código.
- Siga TODAS as regras exatamente como documentadas.
- Em caso de dúvida, prefira a opção mais restritiva.
- Atualize este arquivo se novos padrões surgirem.

**Para Humanos:**
- Mantenha este arquivo conciso e focado nas necessidades dos agentes.
- Atualize quando a stack de tecnologia mudar.
- Remova regras que se tornarem óbvias com o tempo.

Última atualização: 2026-07-09
