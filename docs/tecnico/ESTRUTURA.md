# 📁 Estrutura de Pastas do MeuPetDigital

Este documento descreve a organização do código-fonte do projeto.

```
meupetdigital/
├── 📁 .github/                  # Configurações do GitHub
│   └── workflows/               # CI/CD pipelines
│
├── 📁 .husky/                   # Git hooks (pre-commit, pre-push)
│
├── 📁 docs/                     # Documentação do projeto
│   ├── Documentação.md          # Doc técnica principal
│   ├── ESTRUTURA.md             # Este arquivo
│   ├── VARIAMBIENT.md           # Variáveis de ambiente
│   └── TROUBLESHOOTING.md       # Problemas comuns
│
├── 📁 public/                   # Arquivos estáticos públicos
│   ├── favicon.ico              # Ícone da aplicação
│   ├── logo.png                 # Logo do PetVacina
│   └── images/                  # Imagens gerais
│
├── 📁 src/                      # Código-fonte principal
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── layout.tsx           # Layout root da aplicação
│   │   ├── page.tsx             # Página inicial (dashboard)
│   │   ├── login/               # Módulo de autenticação
│   │   │   └── page.tsx         # Página de login
│   │   ├── registro/            # Módulo de cadastro
│   │   │   └── page.tsx         # Página de registro
│   │   ├── pets/                # Módulo de gestão de pets
│   │   │   ├── page.tsx         # Lista de pets
│   │   │   ├── novo/            # Cadastro de pet
│   │   │   │   └── page.tsx
│   │   │   └── [id]/            # Detalhes do pet
│   │   │       └── page.tsx
│   │   ├── vacinas/             # Módulo de vacinação
│   │   │   ├── page.tsx         # Lista de vacinas
│   │   │   └── registrar/       # Registro de vacinação
│   │   │       └── page.tsx
│   │   └── api/                 # API routes (se necessário)
│   │
│   ├── 📁 components/           # Componentes React reutilizáveis
│   │   ├── ui/                  # Componentes de UI base
│   │   │   ├── Button.tsx       # Botão customizado
│   │   │   ├── Card.tsx         # Card container
│   │   │   ├── Input.tsx        # Campo de input
│   │   │   └── Modal.tsx        # Modal/Dialog
│   │   ├── pet/                 # Componentes específicos de Pet
│   │   │   ├── PetCard.tsx      # Card de pet
│   │   │   ├── PetForm.tsx      # Formulário de pet
│   │   │   └── PetList.tsx      # Lista de pets
│   │   ├── vacina/              # Componentes específicos de Vacina
│   │   │   ├── VacinaCard.tsx   # Card de vacina
│   │   │   ├── VacinaForm.tsx   # Formulário de vacina
│   │   │   └── StatusBadge.tsx  # Badge de status
│   │   └── layout/              # Componentes de layout
│   │       ├── Header.tsx       # Cabeçalho
│   │       ├── Footer.tsx       # Rodapé
│   │       ├── Sidebar.tsx      # Menu lateral
│   │       └── Navbar.tsx       # Barra de navegação
│   │
│   ├── 📁 hooks/                # Custom React Hooks
│   │   ├── usePets.ts           # Lógica de pets (CRUD)
│   │   ├── useVacinas.ts        # Lógica de vacinas (CRUD)
│   │   ├── useAuth.ts           # Lógica de autenticação
│   │   └── useStatus.ts         # Cálculo de status vacinal
│   │
│   ├── 📁 lib/                  # Utilitários e configurações
│   │   ├── supabase/            # Configuração do Supabase
│   │   │   └── client.ts        # Cliente Supabase
│   │   ├── utils/               # Funções utilitárias
│   │   │   ├── formatDate.ts    # Formatação de datas
│   │   │   ├── calculateStatus.ts # Cálculo de status
│   │   │   └── validators.ts    # Validações diversas
│   │   └── constants.ts         # Constantes do projeto
│   │
│   ├── 📁 types/                # Definições de tipos TypeScript
│   │   ├── pet.ts               # Tipos relacionados a Pet
│   │   ├── vacina.ts            # Tipos relacionados a Vacina
│   │   ├── registro.ts          # Tipos relacionados a Registro
│   │   └── index.ts             # Exportação de todos os tipos
│   │
│   └── 📁 styles/               # Estilização global
│       ├── globals.css          # Estilos globais
│       └── theme.ts             # Configuração do tema
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
Contém todas as páginas da aplicação usando **App Router** do Next.js 14+. Cada subdiretório representa uma rota da aplicação.

**Convenções:**
- `page.tsx`: Arquivo principal de cada rota
- `layout.tsx`: Layout específico da rota
- `[id]`: Parâmetro dinâmico (ex: `/pets/123`)

### `/src/components/`
Componentes React reutilizáveis divididos por categoria:

- **`ui/`**: Componentes genéricos (botões, inputs, cards)
- **`pet/`**: Componentes específicos do domínio de Pets
- **`vacina/`**: Componentes específicos do domínio de Vacinas
- **`layout/`**: Componentes estruturais (header, footer, nav)

### `/src/hooks/`
Custom Hooks que encapsulam lógica de negócio e chamadas ao Supabase:

| Hook | Responsabilidade |
|------|-----------------|
| `usePets` | CRUD de pets, busca, filtros |
| `useVacinas` | CRUD de vacinas e registros |
| `useAuth` | Autenticação e sessão do usuário |
| `useStatus` | Cálculo de status vacinal |

### `/src/lib/`
Biblioteca de utilitários e configurações:

- **`supabase/`**: Cliente e configurações do Supabase
- **`utils/`**: Funções puras de formatação e cálculo
- **`constants.ts`**: Valores constantes (status, cores, etc.)

### `/src/types/`
Definições de tipos TypeScript para type-safety em todo o projeto.

### `/tests/`
Suite de testes separada por tipo:
- **Unitários**: Testam funções e componentes isolados
- **Integração**: Testam interação entre módulos
- **E2E**: Testam fluxos completos do usuário

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

## 📐 Princípios de Organização

### 1. **Separação por Domínio**
Componentes e hooks são organizados por funcionalidade (pets, vacinas, auth).

### 2. **Reutilização**
Componentes de UI genéricos ficam em `/components/ui/` para uso em toda a aplicação.

### 3. **Type-Safety**
Todos os tipos centralizados em `/src/types/` para importar facilmente.

### 4. **Testabilidade**
Código modular facilita testes unitários e de integração.

---

**Última atualização:** Junho 2026