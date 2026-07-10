# Análise da Árvore de Código-Fonte (Source Tree)

**Projeto:** MeuPetDigital

## Visão Geral

O projeto segue um padrão rigoroso de separação entre as páginas da web (Next.js Routing) e as lógicas de negócio através da pasta `src/features`. Abaixo encontra-se o mapeamento crítico dos diretórios.

```text
src/
├── app/                  # Roteamento oficial do Next.js (App Router)
│   ├── cadastro/         # Tela de registro de novo usuário
│   ├── dashboard/        # Dashboard principal do usuário
│   ├── login/            # Tela de autenticação
│   ├── pets/             # Listagem e gestão principal dos pets
│   │   ├── novo/         # Formulário de criação de pet
│   │   └── [id]/         # Página dinâmica para detalhes de um pet específico
│   ├── recuperar-senha/
│   ├── redefinir-senha/
│   └── vacinas/          # Gestão e registro de novas vacinas
│
├── core/                 # Código base reutilizável em todo o sistema
│   ├── components/       # UI genérica e "burra" (Button, Input, Spinner, Alerts)
│   ├── hooks/            # Custom hooks de uso global (sem regras de features específicas)
│   ├── lib/              # Inicializadores (ex: cliente supabase), funções utilitárias genéricas
│   └── types/            # Tipos de TypeScript cross-domain
│
└── features/             # Onde o sistema de fato ganha vida
    ├── auth/             # Autenticação (Context Providers, Zod schemas para credenciais)
    ├── dashboard/        # Tipos e dados mockados para o painel principal
    ├── pets/             # Lógica e hooks de comunicação com DB referentes aos animais
    └── vacinas/          # Validações, CRUD e estados lógicos para as vacinas
```

## Diretórios Críticos Explicados

1. **`src/app`**: Representa a hierarquia de URLs. Arquivos `.tsx` aqui determinam Layouts e Pages. Eles servem de "Cola" integrando componentes que vêm de `features` e `core`.
2. **`src/features/*`**: O coração do BMad / Arquitetura Isolada. Cada diretório de feature (como `pets` ou `vacinas`) age como um mini-projeto independente que encapsula UI (`components/`), Regras de Negócio (`hooks/`), e Modelos (`schemas.ts`).
3. **`src/core/lib/supabase`**: Único ponto de contato formal de configuração do BaaS. Evita espalhar lógicas e chaves do Supabase através de centenas de arquivos.

---
_Documento gerado automaticamente com base na base de código atual pelo fluxo BMad._
