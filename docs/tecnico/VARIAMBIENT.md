# 🔐 Variáveis de Ambiente - MeuPetDigital

Este documento descreve todas as variáveis de ambiente necessárias para rodar o MeuPetDigital.

## 📋 Visão Geral

O MeuPetDigital usa o Supabase como backend, então você precisa configurar as credenciais de acesso. As variáveis são lidas do arquivo `.env.local` na raiz do projeto.

> ⚠️ **Importante**: O arquivo `.env.local` **NÃO** deve ser versionado no Git. Use `.env.local.example` como template.

---

## 🚀 Variáveis Obrigatórias

### Supabase

| Variável | Descrição | Onde encontrar |
|----------|-----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do seu projeto Supabase | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima (para operações client-side) | Settings → API → anon public |

### Exemplo de `.env.local`

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📦 Como Obter as Credenciais do Supabase

### Passo 1: Crie uma Conta

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **Start your project**
3. Faça login com GitHub ou email

### Passo 2: Crie um Novo Projeto

1. Clique em **New Project**
2. Preencha:
   - **Name**: `petvacina` (ou outro nome)
   - **Database Password**: senha forte (guarde em local seguro)
   - **Region**: escolha a mais próxima (ex: `us-east-1`)
3. Aguarde a criação (2-5 minutos)

### Passo 3: Obtenha as Credenciais

1. No dashboard do projeto, vá para **Settings** (ícone de engrenagem)
2. Clique em **API**
3. Copie os valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

![Supabase API Settings](https://supabase.com/docs/_images/project-settings-api.png)

---

## 🔧 Setup do Banco de Dados

Após configurar as variáveis, você precisa criar as tabelas no Supabase.

### Opção 1: SQL Editor (Recomendado)

1. No dashboard, vá para **SQL Editor**
2. Clique em **New Query**
3. Cole o script SQL (veja `../../interno/Documentação.md` para o modelo de dados; o arquivo `supabase/schema.sql` será criado futuramente)
4. Clique em **Run**

### Opção 2: Dashboard UI

1. Vá para **Table Editor**
2. Crie as tabelas manualmente:
   - `pets`
   - `vacinas`
   - `registros`
3. Configure as colunas conforme documentação

### Opção 3: Migrations (Se existir)

```bash
# Se o projeto tiver migrations configuradas
npm run db:migrate
```

---

## 🛡️ Row Level Security (RLS)

O Supabase usa RLS para proteger os dados. Certifique-se de que as policies estão configuradas:

### Policies Necessárias

```sql
-- Pets: usuários só veem seus próprios pets
CREATE POLICY "Usuarios veem seus pets"
ON pets FOR ALL
USING (auth.uid() = user_id);

-- Vacinas: leitura pública, escrita restrita
CREATE POLICY "Leitura publica de vacinas"
ON vacinas FOR SELECT
USING (true);

-- Registros: usuários só gerenciam seus registros
CREATE POLICY "Usuarios gerenciam seus registros"
ON registros FOR ALL
USING (auth.uid() = user_id);
```

---

## 🧪 Variáveis Opcionais

### Desenvolvimento

| Variável | Descrição | Default |
|----------|-----------|---------|
| `NODE_ENV` | Ambiente de execução | `development` |
| `NEXT_PUBLIC_APP_URL` | URL da aplicação | `http://localhost:3000` |

### Produção

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_APP_URL` | URL de produção | `https://petvacina.vercel.app` |

---

## ⚠️ Problemas Comuns

### Erro: `Invalid API key`

**Causa**: Chave do Supabase incorreta ou expirada.

**Solução**:
1. Verifique se copiou a chave completa
2. Confira se está usando a chave `anon public` (não a `service_role`)
3. Reinicie o servidor de desenvolvimento

```bash
npm run dev
```

### Erro: `Missing environment variables`

**Causa**: Arquivo `.env.local` não encontrado.

**Solução**:
```bash
# Copie o template
cp .env.local.example .env.local

# Edite com suas credenciais
# Reinicie o servidor
```

### Erro: `Table does not exist`

**Causa**: Tabelas não foram criadas no Supabase.

**Solução**: Execute o script SQL no **SQL Editor** do Supabase.

---

## 🔒 Boas Práticas de Segurança

### ✅ Faça

- Use `.env.local` apenas para desenvolvimento
- Em produção, use variáveis da plataforma (Vercel, Netlify, etc.)
- Rotacione chaves periodicamente
- Use RLS para proteger dados sensíveis

### ❌ Não Faça

- **Nunca** versionar `.env.local` no Git
- **Nunca** compartilhe chaves `service_role` no client-side
- **Nunca** use credenciais de produção em desenvolvimento

---

## 📚 Referências

- [Supabase Docs - Environment Variables](https://supabase.com/docs/guides/api)
- [Next.js Docs - Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel - How to use Environment Variables](https://vercel.com/docs/environment-variables)

---

**Última atualização:** Junho 2026
