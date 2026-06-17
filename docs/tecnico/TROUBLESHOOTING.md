# 🔧 Troubleshooting - MeuPetDigital

Este documento lista problemas frequentes e suas soluções.

---

## 📋 Índice

- [Erros de Build/Instalação](#erros-de-buildinstalação)
- [Erros de Conexão com Supabase](#erros-de-conexão-com-supabase)
- [Erros de Autenticação](#erros-de-autenticação)
- [Erros no Banco de Dados](#erros-no-banco-de-dados)
- [Problemas de UI/Renderização](#problemas-de-uirenderização)
- [Erros em Produção](#erros-em-produção)

---

## 🛠️ Erros de Build/Instalação

### ❌ `npm install` falha com erro de dependência

**Sintoma:**
```bash
npm ERR! Could not resolve dependency
npm ERR! peer reacted "^18.0.0" but react@19.0.0
```

**Solução 1:** Limpe o cache e reinstale
```bash
# Limpeza completa
rm -rf node_modules package-lock.json

# Limpe o cache do npm
npm cache clean --force

# Reinstale
npm install
```

**Solução 2:** Use versão compatível do Node.js
```bash
# Verifique sua versão
node --version

# Use Node.js 18.x ou 20.x (recomendado)
# Se necessário, use nvm:
nvm install 20
nvm use 20
```

---

### ❌ `npm run dev` não inicia

**Sintoma:**
```bash
Error: Module not found: Can't resolve '@/lib/supabase/client'
```

**Solução:**
```bash
# Verifique se o arquivo existe
ls src/lib/supabase/client.ts

# Se não existir, recrie:
mkdir -p src/lib/supabase
touch src/lib/supabase/client.ts
```

**Conteúdo mínimo do `client.ts`:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

## 🔗 Erros de Conexão com Supabase

### ❌ `Invalid API key`

**Sintoma:**
```
Error: Invalid API key: JWT session could not be decoded
```

**Causas Possíveis:**
1. Chave incorreta no `.env.local`
2. Usando chave `service_role` em vez de `anon public`
3. Arquivo `.env.local` não carregado

**Solução:**
```bash
# 1. Verifique o arquivo .env.local
cat .env.local

# 2. Confirme que está usando a chave correta (anon public)
# No Supabase: Settings → API → anon public

# 3. Reinicie o servidor
npm run dev

# 4. Teste a conexão
curl https://YOUR_PROJECT.supabase.co/rest/v1/pets \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

### ❌ `Connection timeout`

**Sintoma:**
```
Error: Connection timeout after 30000ms
```

**Solução:**
1. Verifique sua conexão com a internet
2. Confirme se a URL do Supabase está correta
3. Teste se o Supabase está online: [status.supabase.com](https://status.supabase.com)

```bash
# Teste conectividade
curl -I https://YOUR_PROJECT.supabase.co
```

---

## 🔐 Erros de Autenticação

### ❌ Login não funciona

**Sintoma:** Usuário não consegue fazer login, erro silencioso.

**Solução:**
```typescript
// 1. Verifique o console do navegador (F12)
// Procure por erros em Network ou Console

// 2. Confirme que RLS está configurado corretamente
// No Supabase SQL Editor:
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('pets', 'vacinas', 'registros');

// 3. Verifique se o usuário foi criado no Supabase Auth
// Authentication → Users
```

**Causa comum:** Email não confirmado
```bash
# No Supabase: Authentication → Users
# Confirme o email manualmente ou ajuste as configurações
```

---

### ❌ `Row Level Security policy violation`

**Sintoma:**
```
Error: new row violates row-level security policy for table "pets"
```

**Causa:** Tentativa de inserir dados sem usuário autenticado.

**Solução:**
```typescript
// 1. Verifique se o usuário está autenticado
const { data: { session } } = await supabase.auth.getSession()

if (!session) {
  // Redirecione para login
  router.push('/login')
}

// 2. Confirme que está passando o user_id corretamente
const { error } = await supabase
  .from('pets')
  .insert({ user_id: session.user.id, ...dados })
```

---

## 🗄️ Erros no Banco de Dados

### ❌ Tabela não existe

**Sintoma:**
```
Error: relation "pets" does not exist
```

**Solução:**
```sql
-- Execute no SQL Editor do Supabase:
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  raca VARCHAR(100),
  data_nascimento DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crie as policies de RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios veem seus pets"
ON pets FOR ALL
USING (auth.uid() = user_id);
```

---

### ❌ Chave estrangeira inválida

**Sintoma:**
```
Error: insert or update on table "registros" violates foreign key constraint
```

**Causa:** Tentativa de inserir registro com `pet_id` ou `vacina_id` inexistente.

**Solução:**
```typescript
// 1. Verifique se o pet existe
const { data: pet } = await supabase
  .from('pets')
  .select('id')
  .eq('id', pet_id)
  .single()

if (!pet) {
  throw new Error('Pet não encontrado')
}

// 2. Verifique se a vacina existe
const { data: vacina } = await supabase
  .from('vacinas')
  .select('id')
  .eq('id', vacina_id)
  .single()
```

---

## 🎨 Problemas de UI/Renderização

### ❌ Estilos não carregam (Tailwind)

**Sintoma:** Página aparece sem estilização alguma.

**Solução:**
```bash
# 1. Verifique se o tailwind.config.js existe
cat tailwind.config.js

# 2. Confirme o conteúdo mínimo:
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

# 3. Verifique globals.css
cat src/app/globals.css

# Deve conter:
@tailwind base;
@tailwind components;
@tailwind utilities;

# 4. Reinstale dependências
npm install
```

---

### ❌ Componente não renderiza

**Sintoma:** Área branca onde deveria ter conteúdo.

**Solução:**
```bash
# 1. Abra o console do navegador (F12)
# 2. Procure erros de React:
#    - "Cannot read property of undefined"
#    - "Objects are not valid as a React child"

# 3. Verifique se os dados estão chegando:
console.log('Dados:', data)

# 4. Adicione tratamento de loading/error:
if (loading) return <p>Carregando...</p>
if (error) return <p>Erro: {error.message}</p>
if (!data) return <p>Nenhum dado encontrado</p>
```

---

## 🚀 Erros em Produção

### ❌ Build falha na Vercel/Netlify

**Sintoma:**
```
Error: Missing environment variables
```

**Solução:**
1. No dashboard da plataforma (Vercel/Netlify)
2. Vá para **Settings** → **Environment Variables**
3. Adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy

---

### ❌ 404 em rotas dinâmicas

**Sintoma:** Acessar `/pets/123` retorna 404.

**Causa:** Next.js não está gerando rotas dinâmicas corretamente.

**Solução:**
```typescript
// Verifique se o arquivo está no caminho correto:
// src/app/pets/[id]/page.tsx

// Confirme o nome do parâmetro:
export default function PetPage({ params }: { params: { id: string } }) {
  // Use params.id
}
```

---

## 📊 Debugging Tools

### Ferramentas Úteis

**1. React DevTools**
```bash
# Instale a extensão
# Chrome: https://chrome.google.com/webstore
# Firefox: https://addons.mozilla.org
```

**2. Supabase Studio**
```
# Acesse o dashboard do seu projeto
# Table Editor para ver dados em tempo real
```

**3. Network Tab**
```bash
# No navegador, abra DevTools (F12)
# Vá para Network
# Filtre por "supabase" para ver requests
```

**4. Logs do Servidor**
```bash
# Em produção (Vercel):
vercel logs

# Localmente, veja o terminal onde rodou npm run dev
```

---

## 🆘 Ainda com Problemas?

### Checklist Final

- [ ] `.env.local` configurado corretamente
- [ ] Dependências instaladas (`npm install`)
- [ ] Tabelas criadas no Supabase
- [ ] Policies de RLS configuradas
- [ ] Node.js versão compatível (18.x ou 20.x)
- [ ] Cache limpo (`rm -rf node_modules .next`)

### Como Reportar Bugs

1. **Descreva o problema**: O que você esperava vs. o que aconteceu
2. **Passos para reproduzir**: Lista numerada de ações
3. **Ambiente**: OS, Node.js, navegador
4. **Logs**: Cole erros completos do console
5. **Screenshots**: Se for problema visual

**Onde reportar:**
- GitHub Issues: [link do repo]
- Email: [seu-email@dominio.com]

---

**Última atualização:** Junho 2026