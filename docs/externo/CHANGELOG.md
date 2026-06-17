# 📝 Changelog - MeuPetDigital

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

Baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [Não Lançado]

### Adicionado
- Documentação completa do projeto (CONTRIBUTING.md, ESTRUTURA.md, VARIAMBIENT.md, TROUBLESHOOTING.md)
- Este CHANGELOG.md para versionamento

### Planejado
- Implementação de notificações por email para vacinas próximas
- Exportação de histórico vacinal em PDF
- Integração com API de lembretes (WhatsApp/SMS)
- Dashboard com estatísticas de vacinação

---

## [1.0.0] - 2026-06-17

### Adicionado
- **Autenticação de Usuários**
  - Registro com email/senha
  - Login seguro com Supabase Auth
  - Recuperação de senha
  - Row Level Security (RLS) para proteção de dados

- **Gestão de Pets**
  - CRUD completo de pets (criar, ler, atualizar, deletar)
  - Cadastro de múltiplos pets por tutor
  - Informações: nome, raça, data de nascimento, peso, observations
  - Upload de foto do pet (planejado)

- **Controle de Vacinação**
  - Catálogo de vacinas disponíveis
  - Registro de doses aplicadas
  - Cálculo automático de próxima dose
  - Histórico vacinal completo

- **Dashboard de Monitoramento**
  - Status visual de vacinação (Em dia, Pendente, Crítico)
  - Cards de resumo por pet
  - Indicadores de urgência coloridos
  - Filtros por status

- **Interface de Usuário**
  - Design responsivo (mobile-first)
  - Navegação intuitiva
  - Componentes reutilizáveis
  - Temas claro/escuro (planejado)

- **Tecnologias**
  - Next.js 14 com App Router
  - React 18+
  - TypeScript para type-safety
  - Tailwind CSS para estilização
  - Supabase (PostgreSQL + Auth)
  - React Hook Form + Zod para validação

### Técnico
- Estrutura de pastas organizada por domínio
- Custom Hooks (`usePets`, `useVacinas`, `useAuth`)
- Types TypeScript centralizados
- Configuração de ESLint + Prettier
- Scripts npm para desenvolvimento e build

---

## Versões Anteriores

### [0.3.0] - 2026-05-20
- Primeira versão funcional com CRUD de pets
- Autenticação básica implementada
- Dashboard simplificado

### [0.2.0] - 2026-05-10
- Módulo de vacinas implementado
- Sistema de registro de doses
- Cálculo de datas de revacinação

### [0.1.0] - 2026-04-15
- Setup inicial do projeto
- Configuração do Next.js + Supabase
- Schema do banco de dados definido

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
- `1.0.0` → Primeiro release estável
- `1.1.0` → Nova funcionalidade adicionada
- `1.1.1` → Bug fix do módulo de autenticação
- `2.0.0` → Mudança breaking (ex: refatoração completa do schema)

---

## 🔗 Links

- [Repositório GitHub](https://github.com/SEU_USUARIO/meupetdigital)
- [Issue Tracker](https://github.com/SEU_USUARIO/meupetdigital/issues)
- [Documentação Completa](./docs/)

---

**Mantenedor:** Micael Cardoso Reis  
**Contato:** cardosomicaelreis245@gmail.com  
**Instituição:** IFPI - Campus Piripiri  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Programação para Internet I

---

*Última atualização:* 17 de Junho de 2026