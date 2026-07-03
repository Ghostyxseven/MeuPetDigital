# 👤 Responsabilidades - Gisele

**Role:** Front-End / Design System
**GitHub:** @Gisele002

---

## 📋 Responsabilidades Principais

### 🎨 Design System
- [ ] Definir paleta de cores, tipografia e espaçamentos
- [ ] Criar componentes base: `Button`, `Input`, `Card`, `Badge`
- [ ] Garantir consistência visual em todas as páginas
- [ ] Layout responsivo (desktop e mobile)

### 🖥️ Páginas de Autenticação
- [ ] Página de Login (`/login`)
- [ ] Página de Cadastro (`/registro`)
- [ ] Estados visuais de erro e sucesso nos formulários
- [ ] Integração com `useAuth` (recebe o hook, conecta na tela)

### 🧩 Componentes de UI Reutilizáveis
- [ ] `PetCard` — card de exibição de um pet
- [ ] `StatusBadge` — badge verde/amarelo/vermelho de status vacinal
- [ ] `Header` / `Navbar` — navegação principal
- [ ] Estados de loading (skeleton ou spinner)

---

## 📁 Documentos Sob Responsabilidade

| Documento | Status |
|-----------|--------|
| [docs/externo/CONTRIBUTING.md](../../externo/CONTRIBUTING.md) | ✅ Completo |
| [docs/tecnico/TROUBLESHOOTING.md](../../tecnico/TROUBLESHOOTING.md) | ✅ Completo |

---

## 🎯 Tasks do Trabalho (entrega)

- [ ] Implementar Design System com cores e tipografia próprias
- [ ] Telas de login e cadastro funcionando com validação visual
- [ ] Todos os componentes de UI aplicando o Design System

---

## 🐛 Bugs Reportados (Pendente de Correção)

### 🔴 Borda Dupla no Foco dos Inputs
* **Descrição:** Ao focar em qualquer campo do tipo input (como Email e Senha), o navegador renderiza uma borda dupla verde.
* **Causa:** O estilo global `:focus-visible` definido em [globals.css](file:///c:/Users/josiane/OneDrive/Documentos/atividadeProgramaçãoWeb/MeuPetDigital/src/app/globals.css) (linha 159) adiciona um `outline: 2px solid var(--primary-500)` com `outline-offset: 2px`. Isso entra em conflito com as classes de foco do próprio componente [Input.tsx](file:///c:/Users/josiane/OneDrive/Documentos/atividadeProgramaçãoWeb/MeuPetDigital/src/core/components/Input.tsx) (`focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`), gerando duas bordas concêntricas.
* **Sugestão de Solução:** Adicionar a classe `focus-visible:outline-none` ou `outline-none` no input ou ajustar a regra global de `:focus-visible` no CSS.
* **Responsável:** @Gisele002

---

**Última atualização:** 3 de Julho de 2026

