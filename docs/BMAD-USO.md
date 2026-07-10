# Guia de uso do BMAD no MeuPetDigital

Este projeto tem BMAD instalado localmente em `_bmad/` e artefatos de trabalho em `_bmad-output/`.

## Para que usar

Use o BMAD como camada de organizacao do trabalho:

- entender escopo antes de alterar codigo;
- revisar PRD, arquitetura e historias;
- escolher a proxima story;
- planejar testes e QA;
- manter agentes de IA seguindo o mesmo contexto do projeto.

O BMAD nao substitui a validacao real do codigo. Antes de implementar, confira sempre o runtime atual em `src/`, `package.json`, `README.md` e scripts do projeto.

## Arquivos principais

- `_bmad-output/index.md`: ponto de entrada dos artefatos BMAD.
- `_bmad-output/planning-artifacts/prd.md`: requisitos de produto.
- `_bmad-output/planning-artifacts/architecture.md`: arquitetura planejada ou inferida.
- `_bmad-output/planning-artifacts/project-context.md`: regras para agentes de IA codificarem no projeto.
- `_bmad-output/planning-artifacts/epics-and-stories.md`: epicos e historias.
- `_bmad-output/implementation-artifacts/sprint-status.md`: status da sprint.
- `_bmad-output/test-artifacts/test-design.md`: estrategia de testes.

## Comandos uteis

Verificar instalacao:

```powershell
bmad-method status
```

Ver versao:

```powershell
bmad-method --version
```

Ver ajuda:

```powershell
bmad-method --help
```

## Como pedir trabalho ao agente

Para implementar seguindo o BMAD:

```text
usa o BMAD daqui e implementa a proxima story pendente
```

Para revisar antes de mexer no codigo:

```text
analisa pelo BMAD se essa feature esta pronta para implementar
```

Para criar ou revisar testes:

```text
usa o BMAD test-design e cria os testes que faltam
```

Para documentar uma mudanca:

```text
atualiza os artefatos BMAD com essa mudanca e depois implementa
```

Para design usando BMAD/WDS:

```text
usa o BMAD WDS para redesenhar as telas seguindo design-artifacts
```

Os artefatos de design ficam em `design-artifacts/` e devem guiar qualquer redesign antes de alterar componentes.

## Observacao sobre fonte de verdade

O projeto decidiu usar Supabase real como runtime atual. Quando houver conflito entre documentos antigos e o codigo:

1. O codigo atual em `src/` e `package.json` vence.
2. O README deve explicar o estado operacional da entrega.
3. O BMAD deve ser atualizado para refletir Supabase Auth, PostgreSQL e RLS antes de novas historias.

## Encoding

Os artefatos BMAD foram validados como UTF-8. Se o terminal mostrar texto como `VisÃ£o` ou `AutenticaÃ§Ã£o`, leia com encoding UTF-8:

```powershell
Get-Content -Encoding UTF8 -LiteralPath _bmad-output\index.md
```
