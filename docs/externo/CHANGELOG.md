# 📝 Changelog - MeuPetDigital

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

Baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [Não Lançado]

### Adicionado
- Documentação completa do projeto (CONTRIBUTING.md, ESTRUTURA.md, VARIAMBIENT.md, TROUBLESHOOTING.md)
- GUIA-COMMITS.md com padrão Conventional Commits
- Este CHANGELOG.md para versionamento
- Estrutura de pastas do projeto (src/app, src/core, src/features)
- Arquivos types.ts base para auth, pets e vacinas
- Documentação por responsável (docs/responsaveis/)
- README.md com descrição, tecnologias e estrutura do projeto

---

## [0.1.0] - 2026-06-17

### Adicionado
- **Documentação e Planejamento**
  - Documento de requisitos funcionais (RF01-RF04)
  - Modelo de dados definido (tabelas pets, vacinas, registros)
  - Stack tecnológica definida (Next.js 15, React 19, TypeScript, Tailwind, Supabase)
  - Design System especificado (componentes base, badges, cards)
  - Custom Hooks planejados (useAuth, usePets, useVacinas, useRegistrosVacinais)
  - Estrutura Vertical Slice Architecture definida
  - Divisão de responsabilidades por membro da equipe

### Técnico
- Estrutura de pastas criada (src/app, src/core, src/features)
- Arquivos types.ts criados (vazios, aguardando implementação)
- Configuração do .gitignore
- Repositório GitHub inicializado

---

## Planejado (próximas versões)

### [0.2.0] - Infraestrutura Base
- Inicialização do projeto Next.js (package.json, configs)
- Configuração do Supabase (Auth + Database)
- Schema SQL final versionado (supabase/schema.sql)
- Cliente Supabase configurado
- Row Level Security (RLS) implementado

### [0.3.0] - Autenticação e Design System
- Autenticação de Usuários (registro, login, logout com Supabase Auth)
- Recuperação de senha
- Design System (paleta, tipografia, componentes base)
- Páginas de Login e Cadastro
- Componentes reutilizáveis (Button, Input, Card, Badge, StatusBadge)

### [0.4.0] - CRUD e Vacinação
- CRUD completo de pets (criar, ler, atualizar, deletar)
- Catálogo de vacinas disponíveis
- Registro de doses aplicadas
- Cálculo automático de próxima dose
- Hooks usePets e useRegistrosVacinais
- Validação de formulários com React Hook Form + Zod

### [1.0.0] - Dashboard e Deploy
- Dashboard de Monitoramento com status visual (Em dia, Pendente, Crítico)
- Cards de resumo por pet
- Indicadores de urgência coloridos
- Filtros por status
- Deploy na Vercel
- Interface responsiva (mobile-first)

---

## 📌 Formato do Changelog

Cada versão segue este padrão:

```
## [X.Y.Z] - AAAA-MM-DD

### Adicionado
- Novas funcionalidades

### Modificado
- Mudanças em funcionalidades existentes

### Corrigido
- Bug fixes

### Removido
- Funcionalidades descontinuadas

### Segurança
- Melhorias de segurança
```

### Convenções de Versionamento (SemVer)

- **MAJOR.X.Y**: Mudanças incompatíveis
- **X.MINOR.Y**: Novas funcionalidades (compatíveis)
- **X.Y.PATCH**: Correções de bugs (compatíveis)

**Exemplos:**
- `0.1.0` → Primeiro setup do projeto e documentação
- `0.2.0` → Infraestrutura base (Next.js + Supabase)
- `1.0.0` → Primeiro release estável e completo
- `1.1.0` → Nova funcionalidade adicionada
- `1.1.1` → Bug fix do módulo de autenticação
- `2.0.0` → Mudança breaking (ex: refatoração completa do schema)

---

## 🔗 Links

- [Repositório GitHub](https://github.com/Ghostyxseven/MeuPetDigital)
- [Issue Tracker](https://github.com/Ghostyxseven/MeuPetDigital/issues)
- [Documentação Completa](../index.md)

---

**Mantenedor:** Micael Cardoso Reis
**Contato:** cardosomicaelreis245@gmail.com
**Instituição:** IFPI - Campus Piripiri
**Curso:** Análise e Desenvolvimento de Sistemas
**Disciplina:** Programação para Internet I

---

*Última atualização:* 18 de Junho de 2026
