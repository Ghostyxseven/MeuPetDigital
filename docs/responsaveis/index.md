# 👥 Responsáveis pelo Projeto

Esta pasta organiza as responsabilidades de cada membro da equipe MeuPetDigital.

---

## 📋 Equipe e Funções

| Membro | Função | Área Principal | Contato |
|--------|--------|----------------|---------|
| [**Micael**](./micael/RESPONSAVEL.md) | Tech Lead / Full-Stack | Arquitetura, Auth, Dashboard | [cardosomicaelreis245@gmail.com](mailto:cardosomicaelreis245@gmail.com) |
| [**Gisele**](./gisele/RESPONSAVEL.md) | Front-End / Design System | UI Components, Telas de Auth | [adicionar] |
| [**Marcos**](./marcos/RESPONSAVEL.md) | Back-End / Banco de Dados | Supabase, RLS, Deploy | [adicionar] |
| [**Carlos**](./carlos/RESPONSAVEL.md) | Full-Stack / Features | CRUD Pets, Vacinas, Zod | [adicionar] |
| [**Josiane**](./josiane/RESPONSAVEL.md) | QA / Documentação Final | Testes Manuais, PDF entrega | [adicionar] |

---

## 🗂️ Divisão de Responsabilidades por Área

### 🔐 Autenticação e Segurança
**Responsável:** Micael  
Hook `useAuth`, login, registro, sessão, RLS no Supabase.

### 🎨 Design System e Interface
**Responsável:** Gisele  
Paleta de cores, tipografia, componentes base (`Button`, `Input`, `Card`, `Badge`), telas de login e cadastro.

### 🗄️ Banco de Dados e Deploy
**Responsável:** Marcos  
Schema SQL, seed de dados, validação de RLS, configuração do Vercel.

### 🐕 CRUD de Pets e Vacinação
**Responsável:** Carlos  
Páginas de pets (`/pets`, `/pets/novo`, `/pets/[id]`), registro de vacinas, hooks `usePets` e `useRegistrosVacinais`, validações Zod.

### ✅ Testes e Entrega Final
**Responsável:** Josiane  
Testes manuais de todos os fluxos, reporte de bugs, PDF final e assinaturas.

---

## 🎯 O que cada um entrega no trabalho

| Membro | Entregável principal |
|--------|----------------------|
| Micael | Sistema arquitetado, auth funcionando, dashboard com status |
| Gisele | Design System aplicado + telas de login/cadastro |
| Marcos | Banco real no Supabase + deploy na Vercel |
| Carlos | CRUD completo + 2 Custom Hooks + validação Zod |
| Josiane | Testes manuais documentados + PDF final assinado |

---

## 📊 Matriz de Apoio (Backup)

| Área | Responsável | Apoio |
|------|-------------|-------|
| Arquitetura | Micael | Marcos |
| Design System | Gisele | Carlos |
| Banco de Dados | Marcos | Micael |
| CRUD / Hooks | Carlos | Micael |
| QA / Entrega | Josiane | Todos |

---

## 📁 Estrutura

```
responsaveis/
├── index.md          # Este arquivo
├── micael/
│   └── RESPONSAVEL.md
├── gisele/
│   └── RESPONSAVEL.md
├── marcos/
│   └── RESPONSAVEL.md
├── carlos/
│   └── RESPONSAVEL.md
└── josiane/
    └── RESPONSAVEL.md
```

---

**Última atualização:** 17 de Junho de 2026  
**Mantenedor:** Micael Cardoso Reis
