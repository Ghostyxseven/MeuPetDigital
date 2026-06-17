# MeuPetDigital - Documentação Técnica

**Instituição:** Instituto Federal de Educação, Ciência e Tecnologia do Piauí (IFPI) - Campus Piripiri  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Programação para Internet I  
**Professor:** Jeferson Soares  

---

## 1. Visão Geral do Projeto
O **MeuPetDigital** é uma solução web desenvolvida para mitigar o problema do esquecimento vacinal em animais domésticos. O sistema centraliza o histórico de saúde, substituindo métodos manuais por uma interface dinâmica que alerta o tutor sobre doses pendentes e atrasadas.

## 2. Requisitos do Sistema

### 2.1 Requisitos Funcionais
* **RF01 - Autenticação:** Registro e autenticação de tutores com segregação de dados.
* **RF02 - Gestão de Pets (CRUD):** Ciclo completo de manutenção de perfis caninos (Criar, Ler, Atualizar, Deletar).
* **RF03 - Controle de Vacinação (CRUD):** Registro histórico de aplicações e agendamento de doses futuras.
* **RF04 - Análise Visual de Status:** Dashboard interativo com indicadores de urgência (Em dia, Próxima, Atrasada).

## 3. Arquitetura e Tecnologia
* **Frontend:** Next.js 14+ (App Router), React, Tailwind CSS.
* **Backend as a Service (BaaS):** Supabase (PostgreSQL para persistência e Auth para segurança).
* **Camada de Lógica:** React Hook Form e Zod para integridade de dados e validação de esquemas.
* **Custom Hooks:** Implementação de `usePets` e `useVacinas` para isolamento de regras de negócio.

## 4. Modelo de Dados Relacional
O banco de dados PostgreSQL (Supabase) está estruturado para garantir a integridade referencial:
* **Tabela `pets`**: Entidade principal que armazena dados biométricos e vínculo com o tutor.
* **Tabela `vacinas`**: Catálogo de imunizantes disponíveis e seus intervalos recomendados.
* **Tabela `registros`**: Tabela de junção que rastreia aplicações, próximas doses e observações veterinárias.

## 5. Metodologia e Uso de IA
O desenvolvimento foi suportado pela ferramenta **Gemini CLI**, atuando como assistente técnico nas seguintes etapas:
* Modelagem do esquema relacional e políticas de segurança (RLS).
* Estruturação de componentes reutilizáveis e Design System.
* Implementação de lógica complexa em Custom Hooks.
* Refatoração para garantir as melhores práticas de Clean Code e acessibilidade.
