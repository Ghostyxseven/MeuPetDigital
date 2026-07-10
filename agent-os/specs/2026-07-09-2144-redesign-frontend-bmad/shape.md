# Redesign Frontend BMAD - Shaping Notes

## Escopo

Alinhar o frontend existente ao pacote BMAD/WDS, com consistencia visual, navegacao operacional, dashboard mobile, formularios compartilhados e estados acessiveis.

## Decisoes

- Preservar Supabase e regras de negocio atuais.
- Preservar a identidade marrom/bege escolhida para o MeuPetDigital.
- Implementar tabelas responsivas com cards no mobile.
- Centralizar navegacao e layout de autenticacao em componentes compartilhados.
- Preservar alteracoes existentes no worktree.
- Permitir cadastrar outro tipo de vacina no próprio fluxo e reutilizá-lo no catálogo.
- Compartilhar a carteirinha por QR Code usando link público temporário, revogável e somente leitura.
- Não expor `user_id` nem liberar leitura direta das tabelas privadas para visitantes.

## Referencias

- `design-artifacts/E-Development/design-delivery.md`
- `design-artifacts/C-UX-Scenarios/page-specs.md`
- `design-artifacts/D-Design-System/design-tokens.md`
