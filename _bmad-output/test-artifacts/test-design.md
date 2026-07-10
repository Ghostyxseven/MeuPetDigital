# Estratégia e Design de Testes (Test Plan)

**Projeto:** MeuPetDigital
**Fase:** Planejamento (Uma vez que os testes ainda não foram construídos)
**Data:** 2026-07-09

## 1. Visão Geral da Qualidade
A arquitetura baseada em features permite que nossos testes sejam fortemente delimitados. Atualmente não há testes no repositório, mas esta é a estratégia para garantir estabilidade contínua.

## 2. Camadas de Teste Planejadas

### 2.1. Testes Unitários de Componentes de UI Puros (Core)
Os componentes em `src/core/components` devem ser os primeiros a receber testes. Por serem amplamente usados, bugs nesses botões/cards afetam o sistema todo.
- **Ferramentas:** Vitest / Jest + React Testing Library.
- **Escopo de Teste:** Verificar renderização base, checar disparos do evento `onClick`, validar a cor de um StatusBadge baseado na propriedade enviada.

### 2.2. Testes Unitários de Regra de Negócio (Hooks)
Os hooks exportados de `src/features/*/hooks/` controlam o estado local e as chamadas ao Supabase.
- **Ferramentas:** Vitest / Jest (com mock do cliente do supabase).
- **Escopo de Teste:**
  - `useAuth`: Validar se o estado muda de "deslogado" para "logado" ao retornar um sucesso do Supabase Mock.
  - `usePets`: Validar se chamar a função de "Adicionar Pet" sem os parâmetros obrigatórios lança erro, e se no cenário feliz o pet é inserido.

### 2.3. Testes End-to-End (E2E)
A validação suprema para garantir que as rotas (`src/app/`) realmente colam com o frontend (`src/features`).
- **Ferramentas:** Playwright ou Cypress.
- **Fluxos Críticos a serem Testados:**
  1. *Fluxo de Login & Visualização:* O Playwright acessa `/login`, insere credenciais de teste, clica em Entrar e espera que `/dashboard` apareça na tela.
  2. *Criação de Pet:* Um script entra no formulário de novo Pet, preenche tudo (testando o Zod indirectly), submete e valida que um Card do novo pet apareceu na página `/pets`.
  3. *Adição de Vacina:* Dentro dos detalhes de um pet mockado, testa a janela modal de nova vacina.

## 3. Integração Contínua (Próximos Passos)
Sugerimos o setup de `Github Actions` onde o comando de **linting (eslint)** e a suíte **Vitest** sejam rodados para aprovar ou não qualquer Pull Request, prevenindo a introdução de falhas humanas na UI ou lógica do projeto.

---
_Documento gerado automaticamente para o plano de qualidade pela metodologia BMad._
