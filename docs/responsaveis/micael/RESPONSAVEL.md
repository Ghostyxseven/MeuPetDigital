# Responsabilidades - Micael Cardoso Reis

**Role:** Tech Lead / Full-Stack  
**Email:** cardosomicaelreis245@gmail.com  
**GitHub:** @Ghostyxseven

---

## Responsabilidade Unica

Micael e o responsavel por **arquitetura da aplicacao, fluxo de autenticacao e dashboard principal**.

Ele nao e o responsavel principal por CRUD de pets, banco/deploy ou documentacao final. Essas areas ficam com os demais membros definidos no indice geral.

---

## Entregas do Micael

### Arquitetura da Aplicacao
- [x] Definir estrutura geral com Next.js App Router.
- [x] Organizar providers globais da aplicacao.
- [x] Manter a separacao entre paginas, features e bibliotecas compartilhadas.

### Autenticacao e Sessao
- [x] Implementar hook `useAuth`.
- [x] Implementar `AuthProvider` para sessao do Supabase Auth.
- [x] Implementar `ProtectedRoute` para proteger rotas autenticadas.
- [x] Criar pagina de login (`/login`).
- [x] Criar pagina de cadastro (`/cadastro`).
- [x] Criar fluxo de recuperacao de senha (`/recuperar-senha` e `/redefinir-senha`).

### Dashboard Principal
- [x] Implementar dashboard autenticado (`/dashboard`).
- [x] Exibir indicadores de pets em dia, proximos e atrasados.
- [x] Implementar filtros por status e por pet.
- [x] Consumir dados reais do Supabase quando configurado.
- [x] Manter dados de demonstracao separados da pagina em `src/features/dashboard/mockData.ts`.

---

## Fora do Escopo do Micael

| Area | Responsavel principal |
|------|------------------------|
| Banco real, schema final, RLS e deploy | Marcos Vinicius |
| CRUD de pets e registros vacinais | Antonio Carlos |
| Design system e telas visuais de auth | Gisele |
| Testes manuais e PDF final | Josiane |

---

## Documentos Sob Responsabilidade

| Documento | Status |
|-----------|--------|
| [docs/tecnico/ESTRUTURA.md](../../tecnico/ESTRUTURA.md) | Completo |
| [docs/interno/Documentacao.md](../../interno/Documentação.md) | Apoio tecnico |

---

## Status Final do Escopo

- [x] Arquitetura base criada.
- [x] Autenticacao implementada.
- [x] Dashboard implementado.
- [x] Mock removido da pagina e separado em modulo proprio.
- [ ] Revisar integracao final quando Marcos concluir Supabase real e Antonio concluir CRUD.

---

**Ultima atualizacao:** 22 de Junho de 2026
