# MeuPetDigital 🐾

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green)](https://supabase.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**MeuPetDigital** é uma aplicação web focada no gerenciamento inteligente da saúde preventiva de cachorros. A plataforma permite que tutores centralizem o histórico vacinal de seus pets, visualizem status de imunização em tempo real e nunca mais percam o prazo de uma dose.

![Dashboard PetVacina](./public/images/dashboard-preview.png)

> 💡 **Demo:** [https://meupetdigital.vercel.app](https://meupetdigital.vercel.app) (em breve)

---

## 📋 Índice

- [Funcionalidades](#-principais-funcionalidades)
- [Tecnologias](#-arquitetura-técnica)
- [Início Rápido](#-início-rápido)
- [Documentação](#-documentação)
- [Como Contribuir](#-como-contribuir)
- [Licença](#-licença)

---

## 📋 Principais Funcionalidades

### 🐕 Gestão de Pets
- ✅ Cadastro de múltiplos pets por tutor
- ✅ Perfil completo (nome, raça, data de nascimento, peso)
- ✅ Upload de foto do pet (em desenvolvimento)

### 💉 Controle Vacinal
- ✅ Histórico vacinal completo
- ✅ Cálculo automático de datas de revacinação
- ✅ Catálogo de vacinas pré-cadastradas
- ✅ Registro de doses com observações

### 📊 Dashboard Inteligente
- ✅ Status visual em tempo real
- ✅ Indicadores coloridos (Em dia, Pendente, Crítico)
- ✅ Filtros por pet e status
- ✅ Próximas vacinações em destaque

### 🔒 Segurança
- ✅ Autenticação com email/senha
- ✅ Row Level Security (RLS) no Supabase
- ✅ Dados isolados por usuário
- ✅ Recuperação de senha

---

## 🏗️ Arquitetura Técnica

### Frontend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| [Next.js](https://nextjs.org/) | 14+ | Framework React (App Router) |
| [React](https://react.dev/) | 18+ | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5+ | Type-safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3+ | Estilização utilitária |
| [React Hook Form](https://react-hook-form.com/) | 7+ | Gestão de formulários |
| [Zod](https://zod.dev/) | 3+ | Validação de schemas |

### Backend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| [Supabase](https://supabase.com/) | Latest | Backend as a Service |
| PostgreSQL | 15 | Banco de dados relacional |
| Supabase Auth | Latest | Autenticação de usuários |

### Estrutura
```
meupetdigital/
├── src/
│   ├── app/          # Rotas da aplicação (Next.js App Router)
│   ├── components/   # Componentes React reutilizáveis
│   ├── hooks/        # Custom Hooks (usePets, useVacinas)
│   ├── lib/          # Utilitários e config do Supabase
│   └── types/        # Definições TypeScript
├── docs/             # Documentação técnica
├── public/           # Arquivos estáticos
└── tests/            # Suite de testes
```

📖 **Veja a estrutura completa:** [docs/tecnico/ESTRUTURA.md](./docs/tecnico/ESTRUTURA.md)

---

## 🚦 Início Rápido

### Pré-requisitos

- **Node.js** 18.x ou superior ([baixar](https://nodejs.org/))
- **npm** ou **yarn** (gerenciador de pacotes)
- **Conta no Supabase** ([criar grátis](https://supabase.com))

### Passo a Passo

#### 1. Clone o Repositório

```bash
git clone https://github.com/SEU_USUARIO/meupetdigital.git
cd meupetdigital
```

#### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

#### 3. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

📖 **Guia completo de setup:** [docs/tecnico/VARIAMBIENT.md](./docs/tecnico/VARIAMBIENT.md)

#### 4. Execute o Setup do Banco de Dados

Acesse o SQL Editor no dashboard do Supabase e execute o script de criação das tabelas.

📖 **Schema detalhado:** [docs/interno/Documentação.md](./docs/interno/Documentação.md)

#### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em **http://localhost:3000**

---

## 📚 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Build de produção
npm run start            # Inicia servidor de produção

# Qualidade de código
npm run lint             # Roda ESLint
npm run format           # Formata com Prettier

# Testes
npm run test             # Roda testes unitários
npm run test:e2e         # Roda testes end-to-end
```

---

## 📚 Documentação

| Categoria | Documento | Descrição |
|-----------|-----------|-----------|
| 🏠 | [README](./README.md) | Visão geral e início rápido |
| 📖 | [docs/index.md](./docs/index.md) | **Central de documentação** (comece aqui!) |
| 🤝 | [docs/externo/CONTRIBUTING.md](./docs/externo/CONTRIBUTING.md) | Guia para contribuidores |
| 📁 | [docs/tecnico/ESTRUTURA.md](./docs/tecnico/ESTRUTURA.md) | Organização do código |
| 🔐 | [docs/tecnico/VARIAMBIENT.md](./docs/tecnico/VARIAMBIENT.md) | Setup de ambiente |
| 🔧 | [docs/tecnico/TROUBLESHOOTING.md](./docs/tecnico/TROUBLESHOOTING.md) | Problemas comuns |
| 📝 | [docs/externo/CHANGELOG.md](./docs/externo/CHANGELOG.md) | Histórico de versões |
| 📘 | [docs/interno/Documentação.md](./docs/interno/Documentação.md) | Requisitos e arquitetura |

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Siga estes passos:

- [ ] **Fork** o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

📖 **Guia completo:** [CONTRIBUTING.md](./CONTRIBUTING.md)

### Precisando de Ajuda?

- 📧 Email: cardosomicaelreis245@gmail.com
- 💬 Issues: [GitHub Issues](https://github.com/SEU_USUARIO/meupetdigital/issues)
- 📖 Docs: [Central de Documentação](./docs/index.md)

---

## 👥 Créditos

**Desenvolvido por:**
- Micael Cardoso Reis
- [Seu GitHub](https://github.com/SEU_USUARIO)

**Instituição:**
- IFPI - Campus Piripiri
- Curso: Análise e Desenvolvimento de Sistemas
- Disciplina: Programação para Internet I
- Professor: Jeferson Soares

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2026 Micael Cardoso Reis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🚀 Roadmap

### Em Desenvolvimento (v1.1.0)
- [ ] Notificações por email para vacinas próximas
- [ ] Exportação de histórico em PDF
- [ ] Upload de foto do pet
- [ ] Modo escuro

### Planejado (v1.2.0)
- [ ] Integração com WhatsApp para lembretes
- [ ] Dashboard com gráficos de vacinação
- [ ] Multi-idioma (PT/EN/ES)

---

<div align="center">

**Feito com ❤️ para os amantes de animais**

[Topo](#petvacina-)

</div>