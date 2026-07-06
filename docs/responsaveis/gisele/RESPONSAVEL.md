# Responsabilidades - Gisele

**Role:** Front-End / Design System  
**GitHub:** @Gisele002

---

## Responsabilidade Unica

Gisele e a responsavel por **design system, consistencia visual e acabamento das telas de autenticacao**.

Ela nao e a responsavel principal por banco, deploy, regras de negocio ou CRUD. Essas areas ficam com os demais membros definidos no indice geral.

---

## Entregas da Gisele

### Design System

- [x] Definir tokens visuais em `src/app/globals.css`.
- [x] Criar componentes base: `Button`, `Input`, `Card` e `StatusBadge`.
- [x] Criar componentes de apoio: `Alert`, `Spinner`, `EmptyState`, `Header`, `MetricCard` e `PetCard`.
- [x] Documentar o design system em `docs/tecnico/DESIGN-SYSTEM.md`.
- [ ] Revisar consistencia visual final em todas as paginas.
- [ ] Validar responsividade em celular.

### Paginas de Autenticacao

- [x] Tela de login (`/login`).
- [x] Tela de cadastro (`/cadastro`).
- [x] Tela de recuperacao de senha (`/recuperar-senha`).
- [x] Tela de redefinicao de senha (`/redefinir-senha`).
- [x] Estados visuais de erro e sucesso com `Alert`.
- [ ] Revisar textos finais e acentos visiveis nas telas.

### Componentes de UI Reutilizaveis

- [x] `PetCard` para exibicao compacta de pet.
- [x] `StatusBadge` para status vacinal.
- [x] `Header` para navegacao principal.
- [x] `Spinner` para carregamento.
- [x] `EmptyState` para listas vazias.
- [ ] Reduzir classes manuais nas paginas de pets e vacinas quando houver tempo.

---

## Bugs Resolvidos

### Borda dupla no foco dos inputs

- Status: resolvido.
- Ajuste: campos de formulario usam foco proprio; a regra global `:focus-visible` nao se aplica mais a `input`, `select` e `textarea`.
- Arquivos principais: `src/app/globals.css` e `src/core/components/Input.tsx`.

---

## Fora do Escopo da Gisele

| Area | Responsavel principal |
|------|------------------------|
| Arquitetura, autenticacao e dashboard | Micael |
| Banco, RLS e deploy | Marcos Vinicius |
| CRUD de pets e registros vacinais | Antonio Carlos |
| Testes manuais e PDF final | Josiane |

---

## Documentos Sob Responsabilidade

| Documento | Status |
|-----------|--------|
| [docs/tecnico/DESIGN-SYSTEM.md](../../tecnico/DESIGN-SYSTEM.md) | Criado |
| [docs/externo/CONTRIBUTING.md](../../externo/CONTRIBUTING.md) | Apoio |
| [docs/tecnico/TROUBLESHOOTING.md](../../tecnico/TROUBLESHOOTING.md) | Apoio |

---

## Status Final do Escopo

- [x] Design system base criado.
- [x] Telas de auth usam componentes compartilhados.
- [x] Mensagens de erro/sucesso padronizadas.
- [x] Bug de foco duplo resolvido.
- [ ] Falta revisao visual em mobile e prints finais para apresentacao.

---

**Ultima atualizacao:** 06 de Julho de 2026
