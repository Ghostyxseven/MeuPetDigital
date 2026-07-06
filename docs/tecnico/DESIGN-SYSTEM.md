# Design System - MeuPetDigital

Responsavel principal: Gisele.

Este documento resume o sistema visual usado no projeto.

## Tokens principais

- Cores base: definidas em `src/app/globals.css`.
- Cor primaria: familia `emerald` remapeada para tons marrom/caramelo do projeto.
- Estados: `success`, `warning`, `danger` e `slate`.
- Fonte: `Inter` com fallback para Geist/system.
- Raios: `rounded-lg`, `rounded-xl` e `rounded-2xl` conforme densidade do componente.
- Foco: campos de formulario usam ring proprio; demais controles usam `focus-visible` global.

## Componentes base

Todos ficam em `src/core/components` e sao exportados por `src/core/components/index.ts`.

| Componente | Uso |
|------------|-----|
| `Button` | Acoes primarias, secundarias, destrutivas e ghost |
| `Input` | Campos de formulario com label, erro e icone opcional |
| `Alert` | Mensagens de erro, sucesso e informacao |
| `Card` | Blocos reutilizaveis e cards clicaveis |
| `StatusBadge` | Status vacinal: em dia, proxima dose e atrasada |
| `Spinner` | Loading inline ou tela cheia |
| `EmptyState` | Estados vazios com icone e acao opcional |
| `Header` | Cabecalho principal |
| `MetricCard` | Indicadores do dashboard |
| `PetCard` | Card compacto de pet no dashboard |

## Padrao de formularios

Telas de autenticacao devem usar:

- `Input` para todos os campos.
- `Button` para envio.
- `Alert tone="error"` para erro.
- `Alert tone="success"` para sucesso.

Evite mensagens com classes manuais repetidas nas paginas.

## Pendencias visuais

- Revisar responsividade em celular real.
- Corrigir textos com codificacao quebrada que ainda aparecam na interface.
- Reduzir classes manuais nas paginas de pets e vacinas quando houver tempo.
- Confirmar se a paleta marrom/caramelo sera mantida ou se a equipe prefere verde veterinario.
