# 👤 Responsabilidades - Antonio Carlos

**Role:** Full-Stack / Features de Pets e Vacinação
**GitHub:** @gomes738

---

## 📋 Responsabilidades Principais

### 🐕 CRUD de Pets
- [x] Página de listagem de pets (`/pets`)
- [x] Formulário de cadastro de pet com React Hook Form + Zod (`/pets/novo`)
- [x] Página de detalhes/edição de pet (`/pets/[id]`)
- [x] Excluir pet com confirmação
- [x] Hook `usePets` — CRUD completo integrado ao Supabase

### 💉 Registro de Vacinação
- [x] Formulário de registro de dose aplicada (`/vacinas/registrar`)
- [x] Hook `useRegistrosVacinais` — histórico + cálculo de próxima dose
- [x] Listagem de registros vacinais por pet
- [x] Validação de campos obrigatórios (data de aplicação, vacina selecionada)

### 📋 Validação de Formulários
- [x] Schemas Zod para pet (`nome`, `raça`, `data_nascimento`, `peso`)
- [x] Schemas Zod para registro vacinal (`pet_id`, `vacina_id`, `data_aplicacao`)
- [x] Mensagens de erro claras e visíveis ao usuário

---

## 📁 Documentos Sob Responsabilidade

| Documento | Status |
|-----------|--------|
| [docs/interno/Documentação.md](../../interno/Documentação.md) | ✅ Concluído e Atualizado com validações Zod e Hooks |

---

## 🎯 Tasks do Trabalho (entrega)

- [x] CRUD de pets funcionando do início ao fim no banco real
- [x] Registro de vacina funcionando com cálculo de próxima dose
- [x] Formulários com validação Zod exibindo erros corretamente
- [x] Pelo menos 2 Custom Hooks implementados (`usePets` + `useRegistrosVacinais`)

---

**Última atualização:** 23 de Junho de 2026

