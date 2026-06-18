# 👤 Responsabilidades - Antonio Carlos

**Role:** Full-Stack / Features de Pets e Vacinação
**GitHub:** @gomes738

---

## 📋 Responsabilidades Principais

### 🐕 CRUD de Pets
- [ ] Página de listagem de pets (`/pets`)
- [ ] Formulário de cadastro de pet com React Hook Form + Zod (`/pets/novo`)
- [ ] Página de detalhes/edição de pet (`/pets/[id]`)
- [ ] Excluir pet com confirmação
- [ ] Hook `usePets` — CRUD completo integrado ao Supabase

### 💉 Registro de Vacinação
- [ ] Formulário de registro de dose aplicada (`/vacinas/registrar`)
- [ ] Hook `useRegistrosVacinais` — histórico + cálculo de próxima dose
- [ ] Listagem de registros vacinais por pet
- [ ] Validação de campos obrigatórios (data de aplicação, vacina selecionada)

### 📋 Validação de Formulários
- [ ] Schemas Zod para pet (`nome`, `raça`, `data_nascimento`, `peso`)
- [ ] Schemas Zod para registro vacinal (`pet_id`, `vacina_id`, `data_aplicacao`)
- [ ] Mensagens de erro claras e visíveis ao usuário

---

## 📁 Documentos Sob Responsabilidade

| Documento | Status |
|-----------|--------|
| [docs/interno/Documentação.md](../../interno/Documentação.md) | 🚧 Atualizar com validações Zod implementadas |

---

## 🎯 Tasks do Trabalho (entrega)

- [ ] CRUD de pets funcionando do início ao fim no banco real
- [ ] Registro de vacina funcionando com cálculo de próxima dose
- [ ] Formulários com validação Zod exibindo erros corretamente
- [ ] Pelo menos 2 Custom Hooks implementados (`usePets` + `useRegistrosVacinais`)

---

**Última atualização:** 18 de Junho de 2026
