# 📁 Estrutura de Pastas do MeuPetDigital

Este documento descreve a organização do código-fonte do projeto, seguindo a **Vertical Slice Architecture** (Arquitetura baseada em Features).

```
meupetdigital/
├── 📁 .github/                  # Configurações do GitHub
│   └── workflows/               # CI/CD pipelines
│
├── 📁 docs/                     # Documentação do projeto
│   ├── index.md                 # Índice geral da documentação
│   ├── interno/                 # Documentação interna
│   │   └── Documentação.md       # Doc técnica principal
│   ├── tecnico/                 # Documentação técnica
│   │   ├── ESTRUTURA.md           # Este arquivo
│   │   ├── VARIAMBIENT.md         # Variáveis de ambiente
│   │   └── TROUBLESHOOTING.md     # Problemas comuns
│   ├── externo/                 # Documentação externa
│   │   ├── CONTRIBUTING.md        # Guia de contribuição
│   │   └── CHANGELOG.md           # Histórico de versões
│   └── responsaveis/            # Docs por membro da equipe
│       ├── micael/
│       ├── gisele/
│       ├── marcos/
│       ├── josiane/
│       └── carlos/
│
├── 📁 public/                   # Arquivos estáticos públicos
│   ├── favicon.ico              # Ícone da aplicação
│   ├── logo.png                 # Logo do MeuPetDigital
│   └── images/                  # Imagens gerais
│
├── 📁 src/                      # Código-fonte principal
│   ├── 📁 app/                  # Next.js App Router (Apenas Roteamento)
│   │   ├── layout.tsx           # Layout root da aplicação
│   │   ├── page.tsx             # Página inicial
│   │   ├── login/               # Rota de login
│   │   ├── pets/                # Rotas de gestão de pets
│   │   └── vacinas/             # Rotas de vacinação
│   │
│   ├── 📁 core/                 # Código Global e Compartilhado
│   │   ├── components/          # Componentes genéricos (ui base, botões, inputs, cards)
│   │   ├── lib/                 # Utilitários globais e Supabase client
│   │   ├── hooks/               # Hooks globais não atrelados a um domínio
│   │   └── types/               # Tipos globais genéricos
│   │
│   └── 📁 features/             # Vertical Slices (Agrupado por Domínio de Negócio)
│       ├── 📁 auth/             # Módulo de Autenticação
│       │   ├── components/      # LoginForm, RegisterForm
│       │   ├── hooks/           # useAuth
│       │   └── types.ts         # Auth types
│       │
│       ├── 📁 pets/             # Módulo de Gestão de Pets
│       │   ├── components/      # PetCard, PetForm, PetList
│       │   ├── hooks/           # usePets
│       │   └── types.ts         # Pet types
│       │
│       └── 📁 vacinas/          # Módulo de Vacinação e Registros
│           ├── components/      # VacinaCard, RegistroForm, StatusBadge
│           ├── hooks/           # useVacinas, useRegistrosVacinais
│           └── types.ts         # Vacina e Registro types
│
├── 📁 tests/                    # Testes automatizados
│   ├── unit/                    # Testes unitários
│   ├── integration/             # Testes de integração
│   └── e2e/                     # Testes end-to-end
│
├── .env.local.example           # Exemplo de variáveis de ambiente
├── .env.local                   # Variáveis de ambiente (não versionado)
├── .eslintrc.json               # Configuração do ESLint
├── .gitignore                   # Arquivos ignorados pelo Git
├── .prettierrc                  # Configuração do Prettier
├── next.config.js               # Configuração do Next.js
├── package.json                 # Dependências e scripts
├── postcss.config.js            # Configuração do PostCSS
├── tailwind.config.js           # Configuração do Tailwind CSS
├── tsconfig.json                # Configuração do TypeScript
└── README.md                    # Documentação principal
```

---

## 📂 Descrição dos Diretórios

### `/src/app/`
Responsável **apenas** pelo roteamento e layouts da aplicação usando **App Router** do Next.js 15. Aqui não vai lógica de negócio complexa, apenas a "casca" que consome os componentes da pasta `features/`.

### `/src/core/`
Contém tudo que é **global** e compartilhado por toda a aplicação:
- `components/`: UI Base do Design System (Botões, Inputs, Cards).
- `lib/`: Configurações como o cliente do Supabase e funções utilitárias isoladas.

### `/src/features/` (Vertical Slices)
Onde mora a **Vertical Slice Architecture**. O código é agrupado pelo **contexto de negócio** em vez de por tipo de arquivo.
- Cada feature (`auth`, `pets`, `vacinas`) tem seus próprios componentes, hooks, tipos e lógicas.
- Isso torna o código extremamente fácil de manter e escalar, evitando conflitos na hora do desenvolvimento em equipe.

---

## 📄 Arquivos de Configuração

| Arquivo | Propósito |
|---------|-----------|
| `package.json` | Dependências e scripts npm |
| `next.config.js` | Configurações do Next.js |
| `tailwind.config.js` | Customização do Tailwind |
| `tsconfig.json` | Configurações do TypeScript |
| `.eslintrc.json` | Regras de linting |
| `.prettierrc` | Formatação de código |
| `.gitignore` | Arquivos ignorados pelo Git |

---

## 🔑 Arquivos de Ambiente

| Arquivo | Descrição | Versionado? |
|---------|-----------|-------------|
| `.env.local` | Variáveis locais (chaves, URLs) | ❌ Não |
| `.env.local.example` | Template para novos devs | ✅ Sim |

**Variáveis necessárias:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

---

## 📐 Princípios da Vertical Slice

### 1. Alta Coesão
Tudo relacionado a um recurso (ex: pets) fica na mesma pasta (`src/features/pets`). Se você precisar alterar algo sobre pets, não precisa pular por várias pastas diferentes.

### 2. Baixo Acoplamento
Um módulo (ex: `pets`) não deve acessar o interior de outro módulo diretamente de forma confusa. O que for comum a ambos deve subir para o `core/`.

### 3. Divisão de Trabalho Facilitada
Como a estrutura reflete os domínios do negócio, cada desenvolvedor (Micael, Gisele, Marcos, Carlos) trabalha em suas pastas específicas, minimizando conflitos de merge (Merge Conflicts).

---

**Última atualização:** Junho 2026