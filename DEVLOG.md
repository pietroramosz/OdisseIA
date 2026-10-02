# OdisseIA — Development Log

Este documento acompanha os principais marcos da criação do OdisseIA.

A ideia não é registrar cada pequena mudança. Ajustes de cor, espaçamento, tipografia, texto ou detalhes sem impacto real ficam de fora.

O foco aqui é guardar as mudanças que ajudam a entender como o projeto foi tomando forma.

---

## 23/09/2026 — Estrutura inicial do projeto

### Contexto

Começamos a organizar a experiência digital do OdisseIA para a feira.

A ideia era conectar as estações físicas a uma parte digital acessada pelo celular dos visitantes.

### O que foi definido

- o site seria mobile-first;
- cada estação teria um QR Code;
- o visitante seguiria uma sequência;
- o site registraria o progresso;
- novas etapas seriam liberadas conforme o avanço.

### Por que isso foi importante?

Essas decisões criaram a base do fluxo do site.

A partir dali, conteúdo, UX e desenvolvimento passaram a ser pensados considerando que o visitante estaria andando pela feira e usando o celular ao mesmo tempo.

---

## 25/09/2026 — Redução para quatro estações

### Contexto

A estrutura inicial previa cinco estações.

Uma delas seria ligada a portfólio/documentação.

Depois de revisar a experiência, chegamos ao consenso de que essa etapa não precisava fazer parte do percurso físico.

### Mudança

O projeto passou a ter quatro estações:

1. evolução dos jogos até 1999;
2. evolução dos jogos de 2001 até hoje;
3. Inteligência Artificial nos jogos;
4. Robot TCG.

O portfólio e a documentação continuaram existindo, mas fora da experiência principal.

### Impacto

Essa decisão deixou o percurso mais direto e também separou melhor duas coisas diferentes:

- o que o visitante vê na feira;
- o que registra o desenvolvimento do projeto.

---

## 25/09/2026 — Separação entre o site e o Robot TCG

### Contexto

A Estação 4 depende do Robot TCG, mas várias partes do jogo ainda estavam sendo decididas pelo grupo responsável.

### Problema

Se o site começasse a documentar mecânicas ou tecnologias antes da hora, existia o risco de apresentar algo que não chegasse à versão final.

### Decisão

As responsabilidades foram separadas.

O grupo do Robot TCG cuida das regras e do desenvolvimento interno do jogo.

A equipe do site recebe apenas as informações necessárias para apresentar e integrar a versão realmente implementada.

### Impacto

O restante do site pode continuar avançando sem tentar controlar decisões internas do jogo.

Também ficou definido que nenhuma mecânica deve ser apresentada como pronta antes de realmente existir.

---

## 25/09/2026 — Regra de segurança para o frontend

### Contexto

Durante uma discussão sobre o progresso das estações, surgiu uma dúvida:

> E se alguém abrir o F12 e alterar o estado do site?

### O que percebemos

Como o projeto usa JavaScript e `localStorage`, tudo que estiver no navegador pode ser inspecionado e alterado por alguém com conhecimento técnico.

### Decisão

Passamos a seguir esta regra:

> Se algo puder ser descoberto, alterado ou burlado facilmente pelo DevTools/F12 e isso causar um problema real, essa coisa não deve depender só do frontend.

### Impacto

O frontend continua servindo para organizar a experiência da feira.

Por outro lado, ele não deve guardar segredos, credenciais, tokens ou qualquer regra que dependa de segurança real.

---

## 30/09/2026 — Organização da documentação

### Contexto

Antes de entrar mais fundo na implementação, percebemos que várias decisões importantes já tinham sido tomadas.

Se deixássemos para documentar tudo no final, provavelmente perderíamos parte dos motivos por trás dessas escolhas.

### Decisão

A documentação foi organizada em cinco arquivos:

- `README.md`;
- `PROJECT.md`;
- `AI-WORKFLOW.md`;
- `DECISIONS.md`;
- `DEVLOG.md`.

### Papel do DEVLOG

O `DEVLOG.md` ficou responsável por contar a evolução do projeto de forma cronológica.

Ele também poderá ser usado pelo grupo responsável pelo portfólio para acompanhar a criação do site sem precisar ler commits, conversas ou toda a documentação técnica.

### Estado do projeto nesse momento

Até aqui, o trabalho esteve concentrado principalmente em:

- conteúdo;
- UX;
- fluxo;
- arquitetura inicial;
- decisões de escopo;
- documentação;
- preparação para implementação.

Ainda não faz sentido tratar funcionalidades planejadas como se já estivessem prontas.

---

## Próximas entradas

O DEVLOG só deve ganhar uma nova entrada quando houver algo realmente relevante, por exemplo:

- início da implementação;
- criação da estrutura real de arquivos;
- sistema de progresso funcionando;
- integração dos QR Codes;
- integração do Robot TCG;
- problema técnico importante;
- testes relevantes;
- deploy;
- versão final da feira.

Pequenos ajustes continuam ficando apenas no histórico normal do Git.
