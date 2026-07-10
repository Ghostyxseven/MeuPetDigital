# UX Scenario Overview

## Cenario 1: Primeiro acesso com nenhum pet

**Entrada:** usuario loga e chega ao dashboard vazio.

**Resultado esperado:** entende que precisa cadastrar o primeiro pet.

**Fluxo:** login -> dashboard empty state -> cadastrar pet -> lista/detalhe do pet.

**Risco:** usuario achar que o sistema falhou por nao haver dados.

**Design necessario:** empty state com titulo claro, descricao curta e CTA unico.

## Cenario 2: Tutor acompanha vacinas

**Entrada:** usuario abre dashboard com pets e registros.

**Resultado esperado:** identifica rapidamente atrasos e proximas doses.

**Fluxo:** dashboard -> filtro por status -> detalhe do pet -> registrar vacina.

**Risco:** excesso de cards/tabelas esconder a proxima acao.

**Design necessario:** hierarquia visual por risco: atrasada > proxima > em dia.

## Cenario 3: Registro de nova vacina

**Entrada:** usuario sabe que uma vacina foi aplicada.

**Resultado esperado:** registra dose e volta a ver status atualizado.

**Fluxo:** dashboard/pet -> registrar vacina -> formulario -> confirmacao -> dashboard.

**Risco:** formulario longo ou campos confusos.

**Design necessario:** campos agrupados por pet, vacina e datas; feedback de sucesso/erro.

## Cenario 4: Apresentacao academica

**Entrada:** equipe apresenta o app em 15 minutos.

**Resultado esperado:** avaliador entende proposta, stack e funcionalidades.

**Fluxo:** home -> login/demo -> dashboard -> pets -> cadastro -> vacina -> docs.

**Risco:** divergencia entre documentos e runtime.

**Design necessario:** textos do app e README alinhados ao estado atual.

