# 🤝 Como Contribuir para o MeuPetDigital

Obrigado pelo seu interesse em contribuir com o MeuPetDigital! Este guia vai te ajudar a começar.

## 📚 Índice

- [Código de Conduta](#código-de-conduta)
- [Primeiros Passos](#primeiros-passos)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Submetendo Pull Requests](#submetendo-pull-requests)
- [Dúvidas](#dúvidas)

---

## 🎯 Código de Conduta

### Nossos Compromissos

- **Ambiente acolhedor**: Independentemente de experiência, gênero, orientação sexual, raça ou religião
- **Respeito mútuo**: Trate todos com cortesia e profissionalismo
- **Foco técnico**: Mantenha discussões relacionadas ao projeto
- **Feedback construtivo**: Critique código, não pessoas

### Comportamentos Inaceitáveis

- Comentários ofensivos ou discriminatórios
- Assédio público ou privado
- Publicar informação privada de terceiros sem consentimento
- Spam ou auto-promoção excessiva

---

## 🚀 Primeiros Passos

### 1. Fork do Projeto

```bash
# Clone seu fork
git clone https://github.com/SEU_USUARIO/meupetdigital.git

# Entre no diretório
cd meupetdigital

# Adicione o remoto original
git remote add upstream https://github.com/ORIGINAL_OWNER/meupetdigital.git
```

### 2. Setup do Ambiente

```bash
# Instale as dependências
npm install

# Copie o arquivo de ambiente
cp .env.local.example .env.local

# Edite .env.local com suas credenciais do Supabase
```

### 3. Rodar em Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

---

## 🔄 Fluxo de Desenvolvimento

### Branches

- **`main`**: Branch principal (produção)
- **`develop`**: Branch de desenvolvimento (integração)
- **`feature/*`**: Novas funcionalidades
- **`fix/*`**: Correções de bugs
- **`docs/*`**: Melhorias de documentação

### Passo a Passo

```bash
# 1. Atualize sua branch main
git checkout main
git pull upstream main

# 2. Crie uma branch para sua feature
git checkout -b feature/nome-da-feature

# 3. Desenvolva e faça commits
git add .
git commit -m "feat: descrição clara da mudança"

# 4. Envie para seu fork
git push origin feature/nome-da-feature
```

---

## 📝 Padrões de Código

### Commits Semânticos

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona funcionalidade X
fix: corrige bug Y
docs: atualiza documentação Z
style: formata código (sem mudança de lógica)
refactor: refatora código existente
test: adiciona ou modifica testes
chore: atualiza build, deps, configs
```

### Exemplos de Mensagens

✅ **Bom:**
```
feat: adiciona validação de CPF no cadastro de tutores
fix: corrige cálculo de data de revacinação
docs: atualiza README com exemplos de uso
```

❌ **Ruim:**
```
arrumei bug
atualização
pequena mudança
```

### Estilo de Código

- **JavaScript/TypeScript**: Siga as regras do ESLint configurado
- **CSS**: Use Tailwind classes utilitárias
- **Componentes**: Nome em PascalCase (`PetCard.jsx`)
- **Hooks**: Prefixo `use` (`usePets.js`)
- **Utilitários**: CamelCase (`formatDate.js`)

---

## 🔍 Submetendo Pull Requests

### Checklist Antes do PR

- [ ] Código segue os padrões do projeto
- [ ] Commits estão descritivos e organizados
- [ ] Funcionalidade foi testada localmente
- [ ] Documentação atualizada (se necessário)
- [ ] Não há console.errors ou warnings
- [ ] Branch está atualizada com `develop`

### Template de PR

```markdown
## Descrição
Descreva o que foi feito e por quê.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Melhoria de performance
- [ ] Documentação
- [ ] Refatoração

## Como Testar
Passos para testar suas mudanças:
1. ...
2. ...

## Screenshots (se aplicável)
Antes: [imagem]
Depois: [imagem]

## Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Testei localmente
- [ ] Documentação atualizada
```

---

## ❓ Dúvidas?

- **Issues**: Abra uma issue para bugs ou sugestões
- **Discussões**: Use as Discord/GitHub Discussions para dúvidas gerais
- **Email**: Entre em contato via [seu-email@dominio.com]

---

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

**Obrigado por contribuir para tornar o MeuPetDigital melhor! 🐾**