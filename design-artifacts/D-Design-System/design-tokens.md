# Design Tokens

## Direcao visual

Interface operacional, clara e confiavel. O produto deve parecer uma ferramenta de acompanhamento de saude, nao uma landing page decorativa.

## Cores

| Papel | Token sugerido | Uso |
| --- | --- | --- |
| Primaria | marrom `#734d26` | CTA principal e identidade da marca |
| Primaria hover | marrom escuro `#5c3a1a` | Hover de CTA |
| Secundaria | bege/caramelo `#c6a07a` | Gradientes e destaques suaves |
| Neutra forte | slate-950 | Titulos |
| Neutra texto | slate-700 | Texto padrao |
| Neutra fraca | slate-500 | Texto secundario |
| Superficie | white | Cards e formularios |
| Fundo | slate-50 | Fundo de pagina |
| Aviso | amber-500 | Proximas doses e alertas |
| Erro/risco | red-600 | Vacinas atrasadas |

## Tipografia

- Fonte atual: Geist.
- Titulos de tela: `text-2xl` a `text-3xl`.
- Titulos de card: `text-sm` a `text-base`.
- Corpo: `text-sm`.
- Metadados: `text-xs`, evitando abaixo disso para informacoes criticas.

## Raios e espacamento

- Controles: `rounded-lg` ou `rounded-xl`.
- Cards repetidos: preferir raio maximo visual de 8px em revisao futura, ou manter `rounded-xl` se o sistema atual exigir consistencia.
- Grid mobile: 16px de margem lateral.
- Gap padrao: 16px para grupos, 24px para secoes.

## Componentes prioritarios

- `Button`
- `Input`
- `Card`
- `MetricCard`
- `PetCard`
- `StatusBadge`
- `EmptyState`
- `Header`
- `Spinner`

## Estados obrigatorios

- loading;
- vazio;
- erro;
- sucesso;
- desabilitado;
- foco visivel;
- hover apenas como melhoria, nunca como unica indicacao.
