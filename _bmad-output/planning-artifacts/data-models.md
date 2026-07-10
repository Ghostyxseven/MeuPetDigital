# Modelagem de Dados

**Projeto:** MeuPetDigital
**Backend de Armazenamento:** PostgreSQL (Supabase)

## Esquemas de Banco de Dados Mapeados

O aplicativo utiliza tipagem rigorosa de dados através do `Zod` (para formulários e parsing de chamadas) além das próprias tabelas no Supabase.

### 1. Entidade de Usuário (`auth.users` - Nativo Supabase)
*Gerenciado inteiramente pelo Supabase. A aplicação Frontend não interage com senhas puras.*

- **id:** UUID (Chave Primária)
- **email:** String única
- **created_at:** Timestamp

### 2. Entidade: Pet (`pets`)
Armazena a informação básica de um animal.
- **id:** UUID (Chave Primária, autogerada)
- **user_id:** UUID (Chave Estrangeira apontando para `auth.users(id)`).
- **nome:** String. Nome principal do pet.
- **especie:** String (ex: Cachorro, Gato).
- **raca:** String.
- **data_nascimento:** Date / String no frontend (YYYY-MM-DD).
- **created_at:** Timestamp.

*Relacionamentos:*
- Pertence a 1 `User`.
- Possui N `Vacinas`.

### 3. Entidade: Vacinas (`vacinas`)
Armazena os registros de vacinação de cada animal associado.
- **id:** UUID (Chave Primária, autogerada).
- **pet_id:** UUID (Chave Estrangeira apontando para `pets(id)`).
- **nome_vacina:** String. Nome oficial ou categoria da dose.
- **data_aplicacao:** Date.
- **data_proxima_dose:** Date (pode ser nulo se não houver reforço previso).
- **veterinario_responsavel:** String (Opcional).

### Modelos de Frontend (Zod Schemas)
Em `src/features/*/schemas.ts`, todos os formulários refletem ou extendem levemente esses modelos do banco, garantindo que o usuário só consiga enviar os dados após ter o input estritamente validado.

---
_Documento gerado automaticamente com base na base de código atual pelo fluxo BMad._
