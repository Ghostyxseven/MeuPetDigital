# Design Delivery

## Pacote BMAD/WDS gerado

- `A-Product-Brief/project-brief.md`
- `B-Trigger-Map/personas.md`
- `B-Trigger-Map/trigger-map.md`
- `C-UX-Scenarios/scenario-overview.md`
- `C-UX-Scenarios/page-specs.md`
- `D-Design-System/design-tokens.md`
- `E-Development/design-delivery.md`

## Criterios de aceite para redesign

1. Home, auth, dashboard, pets, detalhe do pet e registrar vacina usam linguagem visual consistente.
2. Dashboard responde rapidamente quais pets estao em dia, proximos ou atrasados.
3. Mobile nao exige zoom horizontal em listas, cards, tabelas ou formularios.
4. Textos visiveis ficam em portugues natural e sem mojibake.
5. Acoes principais usam icone e texto curto.
6. Estados vazio, loading e erro existem nos fluxos principais.
7. Supabase permanece como o unico backend persistente da aplicacao.
8. Build e lint passam ou as falhas restantes sao documentadas.

## Ordem recomendada de implementacao

1. Corrigir narrativa e textos inconsistentes.
2. Consolidar design tokens e componentes base.
3. Padronizar auth pages.
4. Ajustar dashboard para leitura operacional.
5. Ajustar pets e detalhe do pet.
6. Ajustar registrar vacina.
7. Validar mobile e estados vazios.

## Implementacao 2026-07-09

- Paleta, componentes base, navegacao responsiva e layout compartilhado de autenticacao consolidados.
- Dashboard recebeu hierarquia operacional e cards de historico no mobile.
- Lista, cadastro e detalhe de pets passaram a usar o AppShell compartilhado.
- Registro de vacina permite cadastrar outro tipo, definir reforco opcional e persistir a proxima dose.
- Lint, build e rotas publicas validados; inspecao visual automatizada ficou indisponivel na sessao.
