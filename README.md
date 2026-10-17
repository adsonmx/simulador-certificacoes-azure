# ☁️ Simulador de Certificações Cloud 

Aplicação web para preparação focada nos exames da Microsoft).

---

## Funcionalidades Principais

- **Seleção de Certificação:** Foco em AZ-900 e AZ-104.
- **Dois Modos de Treinamento:**
  - **Modo Estudo:** Feedback imediato com bordas contextuais (certo/errado) e justificativa técnica oficial a cada resposta.
  - **Modo Exame Real:** Cronômetro contínuo regressivo, fluxo ininterrupto de questões e resultado apenas ao término da avaliação.
- **Relatório e Diagnóstico de Fraquezas:**
  - Cálculo de nota com nota de corte oficial da Microsoft (70%).
  - Mapeamento de desempenho por área/domínio técnico.
  - Alerta inteligente indicando o domínio prioritário para revisão.
  - Filtros dinâmicos de revisão de questões: *Todas*, *Apenas Acertos* e *Apenas Erros*.
- **Testes Automatizados:** Suíte de testes unitários com Vitest cobrindo a integridade do cálculo de notas e critérios de aprovação.

---

##  Tecnologias Utilizadas

- **Linguagem & Framework:** React 19, TypeScript
- **Build Tool:** Vite
- **Estilização:** Tailwind CSS, Lucide React
- **Testes Unitários:** Vitest
- **Arquitetura:** Componentização SPA, TypeScript Interfaces/Types, JSON Mock Data

---

## Como Executar Localmente

### Opção 1: Via Script Automático (Windows)
Dê um duplo clique no arquivo `iniciar_projeto.bat` na raiz do projeto.

### Opção 2: Via Terminal -(mode_preguica)
```bash
# 1. Clone o repositório
git clone [https://github.com/SEU_USUARIO/simulador-certificacoes-azure.git](https://github.com/SEU_USUARIO/simulador-certificacoes-azure.git)

# 2. Acesse a pasta do projeto
cd simulador-certificacoes-azure

# 3. Instale as dependências
npm install

# 4. Execute a suíte de testes unitários
npm test

# 5. Inicie a aplicação
npm run dev
