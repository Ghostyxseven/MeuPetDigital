# 📚 Central de Documentação - MeuPetDigital

Bem-vindo à documentação oficial do projeto. Esta página organiza todos os documentos por categoria para facilitar a navegação.

---

## 🗂️ Estrutura de Pastas

```
docs/
├── 📄 index.md                 # Este arquivo (índice geral)
├── 📁 responsaveis/            # Documentação por responsável (NOVO!)
│   ├── index.md                # Visão geral da equipe
│   ├── micael/                 # Tech Lead
│   ├── gisele/                 # Front-End / UX
│   ├── marcos/                 # Back-End / DevOps
│   ├── josiene/                # QA / Testes
│   └── carlos/                 # Full-Stack / Features
├── 📁 tecnico/                 # Documentação técnica para desenvolvedores
│   ├── ESTRUTURA.md            # Estrutura de pastas do projeto
│   ├── VARIAMBIENT.md          # Configuração de variáveis de ambiente
│   └── TROUBLESHOOTING.md      # Solução de problemas comuns
├── 📁 interno/                 # Documentação interna do projeto
│   └── Documentação.md         # Requisitos e arquitetura do sistema
└── 📁 externo/                 # Documentação para usuários e contribuidores
    ├── CONTRIBUTING.md         # Guia de contribuição
    └── CHANGELOG.md            # Histórico de versões
```

---

## 📖 Por Onde Começar?

### 👋 Sou um Novo Desenvolvedor
Siga esta ordem:

1. **[responsaveis/index.md](./responsaveis/index.md)** - Conheça a equipe e suas responsabilidades
2. **[externo/CONTRIBUTING.md](./externo/CONTRIBUTING.md)** - Entenda como contribuir
3. **[tecnico/VARIAMBIENT.md](./tecnico/VARIAMBIENT.md)** - Configure seu ambiente
4. **[tecnico/ESTRUTURA.md](./tecnico/ESTRUTURA.md)** - Conheça a estrutura do código
5. **[interno/Documentação.md](./interno/Documentação.md)** - Entenda os requisitos

### 🔧 Estou com Problemas Técnicos
Vá direto para:

- **[tecnico/TROUBLESHOOTING.md](./tecnico/TROUBLESHOOTING.md)** - Solução de problemas comuns

### 📊 Quero Ver o Histórico do Projeto
Consulte:

- **[externo/CHANGELOG.md](./externo/CHANGELOG.md)** - Todas as versões e mudanças

### 🎓 Sou Avaliador ou Visitante
Comece por:

- **[interno/Documentação.md](./interno/Documentação.md)** - Visão geral completa do projeto
- **[../README.md](../README.md)** - Retorne ao README principal

---

## 📁 Descrição das Pastas

### `/docs/responsaveis/` - Responsáveis pela Documentação
**Público-alvo:** Todos os membros da equipe

| Documento | Descrição |
|-----------|-----------|
| [index.md](./responsaveis/index.md) | Visão geral da equipe e matriz de responsabilidades |
| [micael/](./responsaveis/micael/) | Tech Lead - Arquitetura, Backend, Security |
| [gisele/](./responsaveis/gisele/) | Front-End - Componentes, UX/UI, Acessibilidade |
| [marcos/](./responsaveis/marcos/) | Back-End - Infra, Database, APIs |
| [josiene/](./responsaveis/josiene/) | QA - Testes, Qualidade, Bug Tracking |
| [carlos/](./responsaveis/carlos/) | Features - CRUD Pets, Vacinas, Mobile |

### `/docs/tecnico/` - Documentação Técnica
**Público-alvo:** Desenvolvedores e equipe técnica

| Documento | Descrição |
|-----------|-----------|
| [ESTRUTURA.md](./tecnico/ESTRUTURA.md) | Organização detalhada de pastas e arquivos |
| [VARIAMBIENT.md](./tecnico/VARIAMBIENT.md) | Setup de ambiente e variáveis de configuração |
| [TROUBLESHOOTING.md](./tecnico/TROUBLESHOOTING.md) | Guia de solução de problemas e debugging |

### `/docs/interno/` - Documentação Interna
**Público-alvo:** Equipe do projeto, avaliadores, stakeholders

| Documento | Descrição |
|-----------|-----------|
| [Documentação.md](./interno/Documentação.md) | Requisitos funcionais, arquitetura e tecnologias |

### `/docs/externo/` - Documentação Externa
**Público-alvo:** Contribuidores externos, usuários finais

| Documento | Descrição |
|-----------|-----------|
| [CONTRIBUTING.md](./externo/CONTRIBUTING.md) | Como contribuir com código e documentação |
| [CHANGELOG.md](./externo/CHANGELOG.md) | Histórico completo de versões |

---

## 🔗 Links Rápidos

### Setup Rápido
```bash
# 1. Clone
git clone https://github.com/SEU_USUARIO/meupetdigital.git
cd meupetdigital

# 2. Instale
npm install

# 3. Configure
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase

# 4. Rode
npm run dev
```

### Recursos Úteis
- 🏠 [README Principal](../README.md)
- 🐛 [Reportar Bugs](https://github.com/SEU_USUARIO/meupetdigital/issues)
- 💬 [Discussions](https://github.com/SEU_USUARIO/meupetdigital/discussions)
- 📧 [Contato](mailto:cardosomicaelreis245@gmail.com)

---

## 📝 Convenções de Documentação

### Nomenclatura de Arquivos
- **Maiúsculas:** Nomes próprios e títulos (ESTRUTURA, CHANGELOG)
- **Hífen:** Múltiplas palavras (VARIAMBIENT, TROUBLESHOOTING)
- **Extensão:** Todos usam `.md` (Markdown)

### Estrutura de Documentos
1. **Título** com emoji descritivo
2. **Descrição** objetiva
3. **Índice** (quando aplicável)
4. **Conteúdo** dividido em seções claras
5. **Última atualização** no rodapé

### Links e Referências
- Use caminhos relativos: `./pasta/arquivo.md`
- Para arquivos na raiz: `../README.md`
- Links externos com descrição: `[texto](https://url)`

---

## 🔄 Atualizações

Esta documentação é mantida pela equipe do MeuPetDigital. Para sugerir mudanças:

1. Verifique se já existe issue relacionada
2. Crie uma nova issue descrevendo a melhoria
3. Ou envie um PR diretamente (veja [CONTRIBUTING.md](./externo/CONTRIBUTING.md))

---

**Última atualização:** 17 de Junho de 2026  
**Mantenedor:** Micael Cardoso Reis  
**Contato:** cardosomicaelreis245@gmail.com

---

<div align="center">

**Feito com ❤️ para facilitar a vida dos desenvolvedores**

[▼ Voltar ao README](../README.md)

</div>