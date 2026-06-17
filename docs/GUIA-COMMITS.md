# 📌 Guia de Commits — MeuPetDigital

> Manda esse guia pro grupo antes de começar a codar. Leva 2 minutos pra ler.

---

## ⚙️ Setup inicial (só na primeira vez)

```bash
# 1. Clone o repositório
git clone https://github.com/Ghostyxseven/MeuPetDigital.git
cd MeuPetDigital

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de ambiente
cp .env.local.example .env.local
# Pede o conteúdo do .env.local para o Micael

# 4. Rode o projeto
npm run dev
# Acesse: http://localhost:3000
```

---

## 🌿 Fluxo de trabalho

> **Nunca commite direto na `main`.** Sempre crie uma branch para sua tarefa.

```bash
# 1. Atualize sua main local
git checkout main
git pull origin main

# 2. Crie sua branch (use seu nome ou a feature)
git checkout -b feature/carlos-crud-pets
git checkout -b feature/gisele-design-system
git checkout -b feature/marcos-deploy-vercel

# 3. Trabalhe, salve, teste...

# 4. Adicione e commite
git add .
git commit -m "feat: adiciona listagem de pets"

# 5. Envie para o GitHub
git push origin feature/carlos-crud-pets
```

---

## ✍️ Como escrever a mensagem do commit

O padrão é: **`tipo: descrição curta do que foi feito`**

| Tipo | Quando usar |
|------|------------|
| `funcionalidade` | Adicionou uma funcionalidade nova |
| `correcao` | Corrigiu um bug |
| `estilo` | Mudança visual (CSS, layout) sem lógica |
| `documentacao` | Atualizou algum documento |
| `refatoracao` | Reorganizou código sem mudar o que ele faz |
| `configuracao` | Configuração, dependências, setup |

### ✅ Exemplos certos

```
funcionalidade: cria formulário de cadastro de pet
funcionalidade: adiciona hook usePets com CRUD completo
correcao: corrige validação do campo data_nascimento
estilo: ajusta cores do badge de status
documentacao: atualiza README com instruções de execução
configuração: adiciona variáveis de ambiente no .env.example
```

### ❌ Exemplos errados

```
arrumei
update
teste
agora vai
commitando
```

---

## 🚫 Regras rápidas

- ❌ Não commite o arquivo `.env.local` (está no `.gitignore`)
- ❌ Não commite `node_modules/`
- ✅ Commite pequeno e com frequência — não deixe acumular
- ✅ Uma tarefa = uma branch = vários commits pequenos
- ✅ Antes de subir, sempre faça `git pull origin main` pra evitar conflito

---

## 🔁 Quando terminar sua parte

1. Faça push da sua branch
2. Avisa o **Micael** no grupo — ele faz o merge na `main`
3. Depois do merge, delete sua branch local:
   ```bash
   git checkout main
   git pull origin main
   git branch -d feature/sua-branch
   ```

---

## 🆘 Deu conflito?

```bash
# Atualize sua branch com a main
git checkout main
git pull origin main
git checkout feature/sua-branch
git merge main

# Abra os arquivos com conflito, resolva manualmente,
# depois salve e commite:
git add .
git commit -m "fix: resolve conflito de merge"
```

Se travar, chama o **Micael** ou o **Marcos** no grupo.

---

## 📋 Checklist antes de commitar

- [ ] O código está rodando sem erros?
- [ ] A mensagem do commit descreve o que foi feito?
- [ ] Não tem `.env.local` no commit?
- [ ] A branch tem um nome descritivo?

---

*MeuPetDigital — IFPI Campus Piripiri | Programação para Internet I*
