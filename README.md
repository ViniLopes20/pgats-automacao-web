# PGATS Automação Web

Este projeto realiza automação de testes end-to-end utilizando Cypress para o site [Automation Exercise](https://www.automationexercise.com).

## Tecnologias e Ferramentas Utilizadas

- **Cypress**: Framework principal para automação de testes web.
- **Mochawesome**: Geração de relatórios HTML customizados dos testes.
- **Chance.js**: Geração de dados dinâmicos e aleatórios para testes.
- **GitHub Actions**: Integração contínua (CI) para execução automática dos testes.

## Site Automatizado

- **URL**: [https://www.automationexercise.com](https://www.automationexercise.com)
- O projeto cobre cenários de cadastro, login, contato, produtos, carrinho, checkout e subscription.

## Padrões de Projeto Utilizados

- **Page Object Model (POM)**: Separação dos comandos e ações em arquivos por página (ex: `loginPage.js`, `productPage.js`).
- **Fixtures**: Dados de teste organizados em arquivos JSON para fácil manutenção e reuso.
- **Funções utilitárias**: Reutilização de comandos comuns (ex: navegação, validações, scroll).
- **Testes modulares**: Cada cenário de teste é independente e pode ser executado isoladamente.
- **Cleanup automático**: Usuários criados nos testes são removidos após cada execução.

## Estrutura do Projeto

```
pgats-automacao-web/
├── cypress/
│   ├── e2e/                # Testes end-to-end organizados por funcionalidade
│   ├── fixtures/           # Dados de teste em JSON
│   ├── pages/              # Page Objects e funções utilitárias
│   ├── support/            # Comandos customizados do Cypress
│   └── upload-files/       # Arquivos para upload em testes
├── .github/workflows/      # Configuração do CI (GitHub Actions)
├── cypress.config.js       # Configuração do Cypress
├── package.json            # Dependências e scripts do projeto
└── README.md               # Documentação do projeto
```

## Como Configurar e Executar os Testes

1. **Pré-requisitos**
   - Node.js 20.x
   - npm
2. **Instalação**
   ```bash
   npm install
   ```
3. **Executar os testes localmente**
   - Para rodar em modo headless:
     ```bash
     npm run cypress:run
     ```
   - Para abrir o Cypress interativo:
     ```bash
     npm run cypress:open
     ```
4. **Relatórios**
   - Após a execução, os relatórios HTML estarão disponíveis em `cypress/reports`.
   - Screenshots e vídeos dos testes ficam em `cypress/screenshots` e `cypress/videos`.

## Configuração do CI (GitHub Actions)

- O workflow `.github/workflows/webTest.yaml` executa os testes automaticamente em cada push ou pull request para a branch `main`.
- Artefatos dos testes (relatórios, screenshots, vídeos) são salvos e podem ser baixados diretamente pelo GitHub.
- O CI utiliza Node.js 20.x e instala todas as dependências antes de rodar os testes.

## Outros Detalhes Importantes

- **Limpeza de dados**: Usuários criados via API são removidos após cada teste para evitar poluição de dados.
- **Geração dinâmica de dados**: Utiliza Chance.js para garantir que os testes sejam sempre executados com dados únicos.
- **Cobertura de cenários**: O projeto cobre desde cadastro, login, manipulação de produtos, checkout, subscription e contato.
- **Configuração de retries**: O Cypress está configurado para tentar novamente testes que falharem em modo CI.
- **Padronização de código**: O projeto segue boas práticas de organização, modularização e reutilização de código.

## Contato

Para dúvidas ou sugestões, abra uma issue no repositório ou entre em contato com o mantenedor.
