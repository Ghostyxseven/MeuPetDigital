# Épicos e Histórias de Usuário

**Projeto:** MeuPetDigital
**Fase:** Implementado (Engenharia Reversa)

## Epic 1: Autenticação e Segurança (Auth)
**Status:** ✅ Concluído

- **[Auth-001] Cadastro de Usuário**
  - *Como* um novo usuário, *quero* criar uma conta *para* acessar a plataforma.
  - *Critérios de Aceite:* Integração com Supabase Auth via email/senha. Formulário validado com Zod.
- **[Auth-002] Login de Usuário**
  - *Como* usuário existente, *quero* fazer login *para* gerenciar meus pets.
  - *Critérios de Aceite:* Redirecionar para `/dashboard` ao logar com sucesso.
- **[Auth-003] Recuperação de Senha**
  - *Como* um usuário esquecido, *quero* redefinir minha senha *para* recuperar o acesso.

## Epic 2: Gestão de Pets
**Status:** ✅ Concluído

- **[Pets-001] Adicionar Pet**
  - *Como* dono, *quero* adicionar meu pet no sistema *para* criar seu perfil.
  - *Critérios de Aceite:* Campos nome, espécie, raça, data de nascimento. Salvar no Supabase (Tabela `pets`).
- **[Pets-002] Visualizar Lista de Pets**
  - *Como* dono, *quero* ver todos os meus pets cadastrados *para* acessá-los rapidamente.
  - *Critérios de Aceite:* Página `/pets` e resumo no `/dashboard` utilizando o componente `PetCard`.
- **[Pets-003] Detalhes do Pet**
  - *Como* dono, *quero* ver a página do meu pet *para* checar informações detalhadas.
  - *Critérios de Aceite:* Rota `/pets/[id]`.

## Epic 3: Saúde e Vacinas
**Status:** ✅ Concluído

- **[Vac-001] Registrar Vacina**
  - *Como* dono, *quero* adicionar uma nova dose de vacina *para* manter o histórico atualizado.
  - *Critérios de Aceite:* Tabela `vacinas` associada a `pet_id`. Data de aplicação e data de validade/reforço.
- **[Vac-002] Status de Vacinação**
  - *Como* dono, *quero* ver um alerta de vacinas atrasadas *para* não esquecer a data.
  - *Critérios de Aceite:* Badges de status (Em dia, Pendente, Atrasada).

---
_Documento gerado automaticamente com base na base de código atual pelo fluxo BMad._
