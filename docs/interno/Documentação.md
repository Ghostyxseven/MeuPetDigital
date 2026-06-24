# MeuPetDigital - Documento Oficial do Projeto

**Instituição:** Instituto Federal de Educação, Ciência e Tecnologia do Piauí (IFPI) - Campus Piripiri  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Programação para Internet I  
**Professor:** Jeferson Soares  
**Projeto:** MeuPetDigital

---

## 1. Resumo Executivo

O MeuPetDigital é uma aplicação web para organização da saúde preventiva de cães. O sistema resolve o problema de controle manual de vacinas, centralizando cadastro de pets, histórico vacinal, status de imunização e acompanhamento de próximas doses.

A proposta atende aos requisitos do trabalho da disciplina ao combinar problema real, solução funcional, interface dinâmica, persistência de dados, autenticação e demonstração prática.

---

## 2. Problema e Oportunidade

### Problema

Tutores costumam controlar vacinas por cartão físico, anotações soltas ou memória. Isso aumenta o risco de atraso em doses, perda de histórico e dificuldade para acompanhar a saúde preventiva dos animais.

### Oportunidade

Uma plataforma simples, focada em pets, permite organizar o histórico vacinal, reduzir esquecimentos e dar visibilidade imediata ao que está em dia, próximo do vencimento ou atrasado.

### Público-alvo

- Tutores de cães
- Clínicas pequenas
- ONGs e projetos de proteção animal

### Proposta de valor

- Centralizar dados do pet
- Exibir status vacinal de forma clara
- Facilitar o registro de doses e revisões
- Preparar o terreno para lembretes e relatórios futuros
- Possibilitar a vinculação do pet ao **SinPatinhas** (Cadastro Nacional de Animais Domésticos do Governo Federal)

---

## 3. Requisitos Funcionais

### RF01 - Autenticação

O sistema permite cadastro, login e isolamento dos dados por usuário autenticado.

### RF02 - Gestão de Pets

O sistema permite criar, listar, editar e excluir pets.

### RF03 - Controle de Vacinação

O sistema registra vacinas, doses aplicadas e próximas datas recomendadas.

### RF04 - Dashboard de Status

O sistema exibe indicadores visuais para pets em dia, próximos da dose e atrasados.

---

## 4. Stack Tecnológica

### Frontend

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### Formulários e validação

- React Hook Form
- Zod

### Backend e persistência

- Supabase Auth
- PostgreSQL no Supabase
- Row Level Security para isolamento de dados

---

## 5. Modelo de Dados

### Tabela `pets`

Armazena os dados principais do animal.

Campos esperados:

- `id`
- `user_id`
- `nome`
- `raca`
- `data_nascimento`
- `peso`
- `foto_url`
- `rg_sinpatinhas` (Opcional - Link/QR Code do documento oficial do governo)
- `created_at`

### Tabela `vacinas`

Catálogo de vacinas disponíveis e intervalos recomendados.

Campos esperados:

- `id`
- `nome`
- `descricao`
- `intervalo_dias`
- `created_at`

### Tabela `registros`

Registra a aplicação das vacinas em cada pet.

Campos esperados:

- `id`
- `pet_id`
- `vacina_id`
- `data_aplicacao`
- `proxima_dose`
- `observacoes`
- `created_at`

### Relações

- Um usuário possui vários pets
- Um pet possui vários registros
- Uma vacina pode aparecer em vários registros

---

## 6. Design System

O projeto adota uma identidade visual própria para garantir consistência em toda a interface.

### Diretrizes

- Tipografia legível e hierarquia clara
- Paleta com contraste adequado
- Botões e inputs padronizados
- Estados visuais para foco, erro e sucesso
- Layout responsivo para desktop e mobile

### Componentes base

- Botão
- Campo de texto
- Card
- Badge de status
- Tabela/lista de registros

---

## 7. Custom Hooks e Validações Zod

O trabalho implementa a separação de responsabilidades isolando as regras de negócio em Custom Hooks e as regras de integridade dos dados em schemas Zod.

### Validações de Formulários (Zod Schemas)

#### Schema de Pets (`petSchema`)
Localizado em `src/features/pets/schemas.ts`, valida os dados cadastrais do animal:
- `nome`: Obrigatório (string não vazia).
- `raca`: Opcional (string ou nulo).
- `data_nascimento`: Opcional, com validação personalizada impedindo datas futuras.
- `peso`: Opcional, pré-processado para converter strings vazias em nulo e garantir que seja um valor numérico não negativo.
- `rg_sinpatinhas`: Opcional (registro nacional do animal).

#### Schema de Registros Vacinais (`registroVacinalSchema`)
Localizado em `src/features/vacinas/schemas.ts`, valida o registro de imunização aplicado:
- `pet_id`: Obrigatório (UUID do pet selecionado).
- `vacina_id`: Obrigatório (UUID do catálogo de vacinas).
- `data_aplicacao`: Obrigatório, com validação impedindo datas futuras.
- `observacoes`: Opcional (clínica, lote da vacina, etc.).

---

### Custom Hooks Implementados

#### `useAuth`
Responsável por autenticação, sessão e proteção de rotas, integrando com o Supabase Auth.

#### `usePets`
Centraliza o CRUD completo de pets conectado ao Supabase:
- `pets`: Lista de pets cadastrados pelo usuário.
- `getPetById(id)`: Busca os detalhes de um cão específico.
- `createPet(input)`: Insere um novo pet associando ao `user_id` autenticado.
- `updatePet(id, input)`: Atualiza dados cadastrais.
- `deletePet(id)`: Exclui o pet de forma definitiva.

#### `useVacinas`
Responsável por carregar o catálogo público de vacinas disponíveis (`vacinas`).

#### `useRegistrosVacinais`
Responsável pelo histórico de imunização e cálculo inteligente de próximas doses:
- `registros`: Histórico vacinal carregado (com relações de nome do pet e nome da vacina).
- `createRegistro(input)`: Insere a aplicação de vacina. Realiza o cálculo automático da `proxima_dose` no momento da inserção: busca o `intervalo_dias` da vacina selecionada e soma à `data_aplicacao` informada para computar a data de reforço recomendada.


---

## 8. Metodologia e Uso de IA

O desenvolvimento foi apoiado pela ferramenta Gemini CLI como assistente técnico, sem substituir a autoria do grupo.

### Uso relatado

- Apoio na modelagem das tabelas
- Ajuda na organização da arquitetura
- Apoio na escrita de regras e validações
- Revisão de clareza textual em documentação

### Limites do uso

- A IA não foi usada como “autora” final
- O grupo deve entender e defender o código e a documentação
- Partes geradas ou auxiliadas por IA devem ser revisadas antes da entrega

---

## 9. Padrões de Projeto e Versionamento

### Organização

- Separação por domínio
- Componentes reutilizáveis
- Hooks para regras de negócio
- Tipos centralizados

### Commits

O repositório segue a ideia de Conventional Commits.

Exemplos:

- `feat: adiciona cadastro de pets`
- `fix: corrige validacao do formulario`
- `docs: atualiza roteiro da apresentacao`

---

## 10. Entregas Esperadas

### Entregável 1 - Documento de especificação

Este arquivo serve como base para o PDF final com:

- Plano de negócio
- Requisitos funcionais
- Modelo de dados
- Stack
- Custom hooks
- Metodologia de IA

### Entregável 2 - Repositório GitHub

O README do repositório deve apresentar:

- nome do projeto
- descrição
- tecnologias
- instruções de execução
- estrutura do projeto

### Entregável 3 - Apresentação

A apresentação oral deve ter de 7 a 8 slides com demonstração ao vivo do sistema.

---

## 11. Critérios de Alinhamento com o Professor

### Atendido

- Problema real
- Stack exigida definida
- Requisitos funcionais especificados
- Uso de IA documentado
- Documentação acadêmica completa
- Estrutura de pastas definida (Vertical Slice Architecture)
- Divisão de responsabilidades por membro da equipe

### Pendente (depende da implementação)

- Inicialização do projeto Next.js (package.json, configs)
- Sistema rodando ao vivo
- CRUD real integrado ao Supabase
- Schema SQL final versionado (supabase/schema.sql)
- Row Level Security configurada e validada
- PDF final assinado via gov.br

---

## 12. Equipe

- **Micael Cardoso Reis** — Tech Lead / Full-Stack ([@Ghostyxseven](https://github.com/Ghostyxseven))
- **Gisele** — Front-End / Design System ([@Gisele002](https://github.com/Gisele002))
- **Marcos Vinícius** — Back-End / Banco de Dados ([@MarcsVinny](https://github.com/MarcsVinny))
- **Antonio Carlos** — Full-Stack / Features ([@gomes738](https://github.com/gomes738))
- **Josiane** — QA / Testes e Documentação Final ([@Josiane10](https://github.com/Josiane10))

---

## 13. Conclusão

O MeuPetDigital está alinhado com a proposta pedagógica da disciplina. A documentação já cobre o núcleo conceitual do projeto e agora precisa ser acompanhada pela implementação real e pela montagem do PDF final da entrega.

