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

Ainda não fazia sentido tratar funcionalidades planejadas como se já estivessem prontas.

---

## 02/10/2026 — Início da implementação

### Contexto

Depois da fase inicial de planejamento, conteúdo, UX e documentação, o projeto entrou oficialmente em desenvolvimento.

Até esse momento, a estrutura principal do site ainda não tinha sido implementada.

### O que foi feito

Foi criada a fundação inicial do projeto, incluindo:

- `index.html`;
- `hub.html`;
- `validar.html`;
- `estacao-1.html`;
- `estacao-2.html`;
- `estacao-3.html`;
- `estacao-4.html`;
- `final.html`;
- estrutura inicial de `assets`;
- configuração central em JavaScript.

A primeira tarefa foi propositalmente limitada à fundação.

Lógica de progresso, QR Codes e desbloqueio não foram misturados nessa etapa.

### Decisões técnicas

A configuração foi mantida em JavaScript puro, utilizando `const`.

Módulos ES foram evitados nessa fase para preservar compatibilidade com execução local através de `file://`.

Essa decisão foi registrada em `DECISIONS.md`.

### Impacto

O projeto deixou a fase de planejamento puro e passou a possuir uma estrutura real sobre a qual as próximas funcionalidades podem ser desenvolvidas.

---

## 02/10/2026 — Sistema de progresso implementado

### Contexto

Com a fundação pronta, a próxima tarefa foi criar a base de progresso usada pelo restante da experiência.

### Implementação

O progresso passou a ser salvo em:

```text
odisseia:progresso
```

com a estrutura:

```js
{
  versao: 1,
  ultimaEstacaoDesbloqueada: 0
}
```

A última estação desbloqueada varia entre `0` e `4`.

Os demais estados podem ser derivados desse valor, evitando armazenamento redundante.

### Testes

O sistema foi testado manualmente quanto a:

- avanço do progresso;
- persistência após recarregar;
- limite de quatro estações;
- tratamento de estado inválido.

### Versionamento

A implementação foi commitada na branch `dev`.

### Impacto

O projeto passou a ter sua primeira funcionalidade estrutural implementada e validada.

Esse sistema será a base para o próximo grande componente: o **Hub**.

---

## 02/10/2026 — Direção visual consolidada

### Contexto

Antes de iniciar o desenvolvimento visual do Hub, foi necessário consolidar como o site e o Robot TCG deveriam se relacionar visualmente.

### Decisão

Foi definida uma identidade contínua entre as duas partes, baseada em:

- tons de cinza;
- roxo como destaque;
- estética tecnológica/cyberpunk mais limpa;
- prioridade para contraste;
- legibilidade em telas pequenas.

A decisão foi registrada em `DECISIONS.md`.

### Impacto

O Hub e as páginas seguintes passam a ter uma direção visual comum antes do início de sua implementação.

---

## 03/10/2026 — Auditoria, Hub, validação de QR e site de teste no ar

### O que foi feito

- Auditoria de segurança somente leitura: sem segredos, sem XSS, sem dependência externa. Três melhorias de baixa gravidade aplicadas (Number.isInteger, try/catch no localStorage, .gitignore).
- Hub com identidade visual inicial, testado nos estados 0 a 4, em emulador e no celular.
- validar.html e qr.js com os cinco resultados, testados por console e por URL. O progresso só avança com o QR na ordem certa.
- GitHub Pages ligado na branch dev apenas para teste. A hospedagem final não foi decidida.
- O jogo passa a se chamar X-BOT (nos documentos anteriores aparece como Robot TCG).

### O que descobrimos

O progresso é por navegador. Um QR aberto em navegador diferente do Hub cai em "fora de ordem". Hoje só a mensagem da tela mitiga isso.

### Ainda não validado

Leitura de QR real pela câmera, abertura de dentro do WhatsApp, conteúdo das estações, conclusão e integração com o X-BOT.

---

## 04/10/2026 — Guia de estilo e consolidação visual do Hub

### O que foi feito

- Foram adicionados os assets `engrenagem-acesa.png`, `engrenagem-apagada.png` e `verso-carta.png`.
- O nome X-BOT foi sincronizado no Hub, na configuração e no placeholder da conclusão.
- O roxo de destaque passou para `#CD5EFA`, ainda tratado como provisório até confirmação com a identidade final do jogo.
- O Hub passou a usar as engrenagens em PNG e recebeu grade de fundo sutil.
- No desktop, o Hub passou a usar largura de até 900px e grade 2x2 para as quatro estações.
- Foi criado `docs/ESTILO.md` para concentrar regras visuais, responsividade e acessibilidade.

### Impacto

O Hub deixou de ser apenas a primeira implementação visual e passou a funcionar como referência concreta para as próximas páginas.

Essa etapa também mostrou a necessidade de manter o guia de estilo sincronizado com o código quando uma regra de layout muda.

---

## 08/10/2026 — Visão geral e Estações 1–3 entram na experiência real

### O que foi feito

- `index.html` deixou de ser placeholder e passou a funcionar como porta de entrada estática, com Hero, explicação da jornada, quatro estações, destino final e CTAs. A página não carrega JavaScript e não depende de `localStorage`.
- As Estações 1–3 foram consolidadas no formato “Terminal Editorial”, com conteúdo real, estados `desbloqueada`, `próxima` e `futura`, retorno ao Hub e tratamento visual compartilhado.
- A implementação das três estações foi revisada quanto a estados, copy, CSS e acessibilidade.
- O desktop deixou de apenas esticar a composição mobile: as Estações 1–3 passaram a usar um dossiê técnico compacto de até 832px, enquanto o Index ganhou uma composição editorial própria de até 960px.
- O Index passou a avisar que a jornada deve continuar no mesmo navegador para preservar o progresso.

### Impacto

A jornada deixou de ter apenas Hub e validação funcionando. Agora já existe uma entrada real e conteúdo navegável nas três primeiras estações.

O principal gargalo do projeto passa a estar nas partes que dependem da reta final da experiência: Estação 4, conclusão, X-BOT, hospedagem definitiva e testes físicos de QR.

---

## Próximas entradas

O DEVLOG só deve ganhar uma nova entrada quando houver algo realmente relevante, por exemplo:

- Estação 4 integrada;
- conclusão implementada;
- integração do X-BOT;
- definição da URL final e deploy definitivo;
- testes físicos de QR e fluxo completo;
- problema técnico importante;
- versão final da feira.

Pequenos ajustes continuam ficando apenas no histórico normal do Git.
