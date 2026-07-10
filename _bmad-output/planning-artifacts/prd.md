# Product Requirements Document (PRD)

**Projeto:** MeuPetDigital
**Fase:** Implementado (Engenharia Reversa)
**Data:** 2026-07-09

## 1. Visão do Produto
O MeuPetDigital é uma aplicação focada na gestão da saúde e dos dados de animais de estimação. Ele permite que os donos tenham um controle digital das vacinas, histórico e informações essenciais dos seus pets, facilitando o acesso rápido a esses dados.

## 2. Público-Alvo
- Donos de animais de estimação que buscam organizar o histórico de vacinação e saúde dos seus pets.
- Pessoas que precisam de acesso rápido a essas informações para viagens, consultas veterinárias ou creches para pets.

## 3. Requisitos Funcionais (Core Features)
As seguintes funcionalidades compõem o escopo principal:

1. **Autenticação e Gestão de Usuários**
   - [x] O usuário deve poder se cadastrar na plataforma.
   - [x] O usuário deve poder fazer login.
   - [x] O usuário deve poder recuperar/redefinir sua senha.
2. **Gestão de Pets**
   - [x] O usuário deve poder adicionar um novo pet (com nome, espécie, raça, etc).
   - [x] O usuário deve poder ver a lista de seus pets no dashboard.
   - [x] O usuário deve poder visualizar os detalhes de um pet específico.
3. **Gestão de Vacinas**
   - [x] O usuário deve poder registrar uma vacina tomada pelo pet.
   - [x] O sistema deve exibir o status da vacinação (em dia, atrasada, pendente).
4. **Dashboard Geral**
   - [x] A tela principal deve fornecer um resumo do status dos pets e alertas de vacinas pendentes.

## 4. Requisitos Não Funcionais
1. **Segurança:** A autenticação e o banco de dados devem ser gerenciados pelo Supabase, garantindo RLS (Row Level Security) para que um usuário só veja seus próprios pets.
2. **Performance:** A interface deve ser ágil e construída com Next.js (App Router) otimizando carregamentos no lado do servidor quando possível.
3. **Design System:** Utilizar Tailwind CSS para uma UI limpa, responsiva e moderna.
4. **Resiliência:** Validação rígida de dados via Zod e React Hook Form no frontend antes de qualquer submissão de dados.

## 5. Casos de Uso Críticos
- **Cadastro de Primeiro Pet:** O usuário recém-cadastrado entra no dashboard (que exibe o "Empty State") e é guiado a criar seu primeiro pet.
- **Registro de Vacina:** O usuário acessa a página de um pet específico e registra uma nova dose, o sistema atualiza o status de proteção.

---
_Documento gerado automaticamente com base na base de código atual pelo fluxo BMad._
