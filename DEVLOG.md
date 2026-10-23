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
- O jogo passa a se chamar X-B0T (nos documentos anteriores aparece como Robot TCG).

### O que descobrimos

O progresso é por navegador. Um QR aberto em navegador diferente do Hub cai em "fora de ordem". Hoje só a mensagem da tela mitiga isso.

### Ainda não validado

Leitura de QR real pela câmera, abertura de dentro do WhatsApp, conteúdo das estações, conclusão e integração com o X-B0T.

---

## 04/10/2026 — Guia de estilo e consolidação visual do Hub

### O que foi feito

- Foram adicionados os assets `engrenagem-acesa.png`, `engrenagem-apagada.png` e `verso-carta.png`.
- O nome X-B0T foi sincronizado no Hub, na configuração e no placeholder da conclusão.
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

O principal gargalo do projeto passa a estar nas partes que dependem da reta final da experiência: Estação 4, conclusão, X-B0T, hospedagem definitiva e testes físicos de QR.

---

## 20/10/2026 — Estação 4 e conclusão implementadas

### O que foi feito

- `estacao-4.html` passou a ter uma página própria para a estação ligada ao X-B0T.
- `final.html` passou a apresentar os estados de jornada completa/incompleta e a área de acesso ao X-B0T.
- A implementação das páginas não significa que a integração com o jogo esteja concluída: `gameUrl` e `downloadUrl` ainda dependem de endereços confirmados.

### O que continua pendente

- Confirmar com o grupo as informações finais do X-B0T e um endereço/build utilizável.
- Decidir se a conclusão também deve oferecer acesso a um portfólio/PDF.
- Testar os QR Codes físicos com câmera real e abertura pelo WhatsApp/navegador interno.
- Decidir como orientar visitantes cujo QR abre em navegador diferente daquele usado no Hub.

### Impacto

As páginas das quatro estações e a conclusão estão implementadas. O foco passa a ser confirmar as informações externas, configurar os acessos e validar a experiência física completa.

---

## 21/10/2026 — Refinamento visual da identidade atual (Direção A)

### Contexto

Um diagnóstico visual do site renderizado (desktop 1280px e mobile 390px, Chrome headless) apontou páginas de conteúdo planas, Hub repetitivo e uma Conclusão sem link que parecia tela de erro. Foi escolhida a Direção A: melhorar a execução dentro da identidade atual, sem trocar de paleta. A decisão está registrada na DEC-017.

### Problemas confirmados antes de mexer

- Hub 2×2: os cards não preenchiam a célula da grade (um card terminava 44–71px acima do fim da linha).
- Index no mobile: o numeral "4" tinha 32px, contra 120px no desktop.
- Estação 1 no mobile: 4187px de altura.
- `engrenagem-acesa.png`: halo roxo difuso embutido no canal alfa, visível mesmo em 44px.

### O que foi feito

- Hub: cards preenchem a grade; quadrado roxo marca a estação validada; rótulos de ação passaram a descrever a ação real ("Ver como desbloquear", "Ver o que falta"); o card do X-B0T mostra "AGUARDANDO LIBERAÇÃO" enquanto não houver `gameUrl` válida.
- Estações 1–4: pictograma SVG inline cinza no hero, numeral de capítulo maior, primeira frase de cada capítulo em destaque, linha do tempo com ano como numeral e rótulos de época (Estações 1 e 2).
- Estações bloqueadas: faixa "Seu progresso" com a mesma barra do Hub, no lugar de um grande vazio.
- Estação 4: carta com painel, recorte e moldura cinza; no desktop fica ao lado do texto.
- Conclusão: painel de status separando "Jornada concluída" de "Acesso ao jogo"; o botão "Jogar X-B0T" só aparece com URL absoluta http(s) válida; carta um pouco maior no desktop.
- Index: o "4" do hero fica em 72px no mobile, ao lado da frase.
- `engrenagem-acesa.png`: halo removido só do canal alfa; geometria, cores e tamanho preservados.
- `DESIGN.md` e `DECISIONS.md` (DEC-017) atualizados com as regras que mudaram.

### Medições

- Altura no mobile, antes e depois: Estação 1 de 4187px para 4281px; Estação 2 de 4688px para 4793px; Estação 3 de 4737px para 4749px. O conteúdo educativo não foi removido: os marcos e a hierarquia nova ocupam mais espaço, e só os espaçamentos excessivos entre seções foram reduzidos.
- Sem rolagem horizontal em nenhuma das capturas a 390px e 1280px. Com `prefers-reduced-motion: reduce`, as animações em execução caem de 7 para 0.

### O que continua pendente

- `gameUrl` e `downloadUrl` seguem `null`: o X-B0T aparece como "aguardando liberação" até haver endereço oficial.
- A validação foi feita em Chrome headless, por servidor local e por `file://`. Não houve teste em celular real, em outros navegadores, com câmera de QR nem pelo WhatsApp.
- O roxo `#CD5EFA` continua provisório até a confirmação com a arte final do X-B0T.

---

## 21/10/2026 — Redesenho autoral: "Arquivo de Missão"

### Contexto

Depois do refinamento da Direção A, o site ainda tinha a cara de um template: título, parágrafo, botão roxo e cards na abertura; quatro cartões iguais no Hub; três estações com o mesmo esqueleto. Foi pedida uma direção de arte própria, que evoluísse a identidade do OdisseIA e do X-B0T sem abandoná-la. A decisão está na DEC-018.

### O que foi feito

- **Abertura:**
  - palavra-marca monumental "Odisse/IA";
  - rota esquemática das quatro estações descendo até a silhueta da carta do X-B0T numa explosão de linhas de velocidade;
  - protocolo físico → digital com ícones desenhados, índice da jornada com numerais vazados e a recompensa mostrada só como silhueta;
  - no celular, o botão "Iniciar jornada" fica logo abaixo da proposta.
- **Hub:**
  - virou rota: trilho vertical no celular, horizontal no desktop;
  - estados com forma própria: carimbo VALIDADA, faixa de movimento e folha de passos na próxima estação, hachura na bloqueada;
  - ganhou o link "Visão geral" (pendência antiga do PROJECT.md).
- **Estações:**
  - capa de dossiê com numeral gigante, ficha com fatos do próprio conteúdo e ilustração do assunto (quadra de Pong, rede de conexões, árvore de decisão);
  - na Estação 1, escala 1950–2000 com os marcos na posição real; na Estação 2, escala 2001–2026 com as épocas dos capítulos;
  - na Estação 3, a máquina de estados das quatro regras do capítulo, uma rota de pathfinding marcada como ilustração e uma escada de seis etapas;
  - na Estação 4, a carta num palco de mangá;
  - trilho da rota na margem a partir de 1100px;
  - telas de bloqueio com hachura ou faixa de movimento.
- **Conclusão:**
  - explosão de foco atrás do placar 4/4 com o carimbo JORNADA CONCLUÍDA;
  - a rota fechada com os quatro carimbos batendo em sequência;
  - a carta revelada;
  - acesso ao jogo ainda condicionado a uma `gameUrl` válida.
- **Validação do QR:** o resultado virou um carimbo depois do título, e a ação principal vem primeiro.
- **Sistema:**
  - texturas de mangá como máscaras SVG coloridas pelos tokens;
  - seta desenhada no lugar dos glifos ← e →;
  - título sempre antes de rótulo ou selo;
  - CSS dividido em uma base e uma folha por página (`assets/css/paginas/`).
- **Rasters:** a origem foi registrada nos metadados das três imagens (verso da carta e engrenagens), sem alterar nenhum pixel.

### Como foi verificado

- **Testes antes de mudar:** testes de caracterização escritos fora do repositório, sem dependências nem infraestrutura nova.
  - 9 de unidade (`node:test` sobre os próprios scripts): chave e contrato do progresso, os cinco resultados do QR, estados das estações, validação da `gameUrl`.
  - 81 E2E em Chrome headless via `file://`: Hub, fluxo de QR entre páginas, estados de bloqueio, Conclusão, todos os 181 blocos de texto educativo preservados em ordem e console sem erros.
  - Duas mutações propositais no código foram detectadas pelos testes.
- **Capturas e auditoria:**
  - capturas em 1280px e 390px de todas as páginas e estados, sem rolagem horizontal;
  - auditoria de contraste sem falhas, alvos de toque de pelo menos 44px, foco visível testado com Tab e movimento desligado com `prefers-reduced-motion`.
- **Detector e revisão:**
  - o detector do Impeccable caiu de 38 para 2 apontamentos; os 2 restantes são os separadores "—" ocultos da linha do tempo, mantidos para leitores de tela;
  - uma revisão independente pediu oito correções, todas aplicadas e conferidas, e terminou em "ship".

### O que continua pendente

- Teste em celular real, em outros navegadores e pelo WhatsApp: tudo foi verificado só em Chrome headless.
- `gameUrl` e `downloadUrl` seguem `null`, então o X-B0T aparece como "aguardando liberação".
- O roxo `#CD5EFA` continua provisório.

---

## 21/10/2026 — Acabamento dos cartões e auditoria de acessibilidade

### Contexto

Depois do "Arquivo de Missão", os cartões do Hub ainda pareciam caixas de texto soltas sob a rota: alturas desiguais, sem descrição e com o estado validado repetido (rótulo escondido e carimbo decorativo). Faltava também uma auditoria de acessibilidade completa.

### O que mudou

- **Cartões do Hub:** anatomia única, com faixa de estado, título, descrição curta, linha de estado com o registro "EST. 0N / 04" e barra de ação de 48px.
  - Validada: faixa roxa e carimbo VALIDADA, agora o próprio rótulo lido.
  - Próxima: moldura roxa, faixa de movimento, selo cheio e ação roxa.
  - Bloqueada: faixa hachurada, cadeado e texto atenuado. O link continua levando à explicação de como desbloquear.
  - No desktop, os quatro cartões dividem a mesma linha (subgrid), alinhando estado e ação; a folha de passos fica embaixo da próxima.
  - Hover, toque e foco com resposta visível; o foco é uma moldura branca de 3px que segue o corte diagonal.
- **Destinos finais:** mesma anatomia. Sem link, o detalhe vira texto de status, sem parecer botão.
- **Abertura:** os passos de "Como funciona" viraram fichas ligadas por um conector tracejado; o último passo (o celular) leva a moldura roxa.
- **`.ficha`:** novo contêiner de cartão do sistema, com moldura que acompanha o recorte diagonal. O próprio elemento tem a cor do fundo, então o texto continua legível mesmo se as camadas falharem.
- **Acessibilidade:**
  - link "Pular para o conteúdo" em todas as páginas;
  - cartões com nome curto (título, estado, ação) e descrição separada;
  - barras de progresso faladas como "2 de 4 estações validadas";
  - a palavra-marca da abertura é lida como "OdisseIA", não "Odisse IA";
  - a carta da Conclusão ganhou texto alternativo;
  - texto mínimo subiu de 11px para 12px.
- **Movimento reduzido:** além de desligar as animações, desliga os deslocamentos de hover e toque e mantém só as trocas de cor, para o estado de foco continuar perceptível.

### Como foi verificado

- 9 testes de unidade e 99 E2E em Chrome headless via `file://` (os 81 anteriores e 18 novos: link de pular, nomes acessíveis dos cartões, texto da barra de progresso, destinos dos links, desenho da rota, sequência dos carimbos e movimento reduzido).
- Auditoria automática em 10 estados × 5 larguras (320, 360, 390, 768 e 1280px):
  - sem rolagem horizontal, sem texto cortado e sem contraste abaixo de 4,5:1;
  - sem alvos menores que 44px e sem saltos de título;
  - menor texto com 12px.
- Árvore de acessibilidade do Chrome lida página a página: landmarks, títulos, nomes de links, barras de progresso e a região `aria-live` da validação.
- Espaçamento de texto ampliado (WCAG 1.4.12) sem cortes.
- Detector do Impeccable: restam só os 2 avisos já aceitos dos separadores "—".

### O que continua pendente

- Leitor de tela real (NVDA, TalkBack, VoiceOver), celular real e outros navegadores: nada disso foi testado.
- O zoom de 200% e 400% foi aproximado pelas larguras de 640 e 320px, sem zoom real do navegador.
- O Chrome expõe os rótulos em caixa alta (ex.: "VALIDADA") como estão na tela; um leitor de tela pode soletrar algumas siglas.

---

## 22/10/2026 — Estações editoriais (DEC-019)

### Contexto

As quatro estações ainda pareciam o mesmo documento de texto. A coluna lateral do desktop ficava vazia, os marcos das Estações 1 e 2 apareciam duas vezes e a capa da Estação 4 tinha um numeral e linhas de foco soltos.

### O que mudou

- **Módulos editoriais:** três cards complementares por estação (quatro na Estação 3), que mudam de forma com o conteúdo (marco, conexão, órbita, ideia-chave, conceito, cautela, herança, status). Usam só trechos literais da própria página, e os capítulos continuam em fluxo de leitura.
- **Desktop:** os módulos ocupam a coluna lateral, ao lado do parágrafo que destacam; no celular entram no fluxo.
- **Linha do tempo única** nas Estações 1 e 2, agrupada por época, sem repetir nenhum dos 15 e 12 marcos.
- **Percurso** na Estação 3: as seis etapas como caminho conectado, em escada.
- **Estação 4:** a carta foi para a capa, num palco com leque de cartas, etiqueta de arquivo e linhas de foco saindo dela; o numeral é uma linha da grade, alinhado ao título.
- **Movimento próprio** em cada estação, em CSS puro, com alternativa para movimento reduzido.
- **Documentação:** DEC-019, `DESIGN.md`, contrato da superfície e `design.json` (que ainda descrevia o antigo "Terminal Editorial") atualizados.

### Como foi verificado

- Testes escritos antes da implementação e vistos falhando (141 verificações), depois verdes; mutações propositais (fato inventado, movimento renomeado, módulo fora da coluna lateral) foram detectadas.
- Chrome headless via `file://`: composição, sobreposição, medida de leitura, fatos dos módulos, marcos únicos, geometria da capa da Estação 4 em seis larguras, movimento (sistema e painel) e auditoria de contraste, alvos e rolagem em três temas e três larguras.
- Capturas de 390px e 1440px de todas as páginas principais examinadas e refinadas.

### O que continua pendente

- Celular real, leitor de tela e outros navegadores: nada disso foi testado.
- As animações ligadas à rolagem usam `animation-timeline`; em navegadores sem suporte a página fica estática.
- O roxo `#CD5EFA` continua provisório, e o X-B0T segue "em validação".

---

## 23/10/2026 — Identidade azul, Hub, leitura das estações e acessibilidade (DEC-020 a DEC-022)

### Contexto

A sala da feira será azul, o Hub desktop não convencia, os textos das estações pareciam crus, as laterais do desktop sobravam, a animação da Estação 2 não estava boa e, no computador da escola, não era possível desligar "Reduzir animações".

### O que mudou

- **Identidade azul (DEC-020):** nova paleta a partir de #031634, #142146 e #242b57; o roxo ficou como cor do X-B0T; engrenagens azuis para as estações; luz própria para cada estação.
- **Hub:** herói e placar maiores, palco da rota com engrenagens maiores, próxima estação projetada e destino final com o X-B0T em roxo.
- **Estações:** abertura de capítulo com tese em destaque, marca-texto nos conceitos, filetes na cor da estação, numeral fixo na margem, primeira frase do briefing como abertura em telas largas.
- **Largura (DEC-021):** 93% da tela no desktop, escala por tamanho de tela, coluna lateral que cresce.
- **Estação 2:** a rede da capa agora é um sinal que sai do controle e se espalha em quatro voltas, com os nós surgindo quando a linha chega e as conexões ativas acendendo por último (cerca de 2,2s, uma vez).
- **Acessibilidade (DEC-022):** movimento com Sistema, Reduzir e Completas; a escolha da pessoa vence o sistema.
- **X-B0T:** `gameUrl` = https://robot-tcg.netlify.app/ (respondeu 200); `downloadUrl` continua `null`. Grafia corrigida para X-B0T no site e na documentação, com a barra no zero dos títulos.
- Uma alteração editorial na Estação 4 (ver DEC-020), que precisa de confirmação.

### Como foi verificado

- Testes escritos fora do repositório, sem dependências, em Chrome headless via `file://`:
  - jornada, progresso, QR (sequência, repetido, fora de ordem, 6 entradas inválidas), Hub nos estados 0 a 4, bloqueio de cada estação em cada progresso, Conclusão, botão do jogo, `downloadUrl` nulo: 133 verificações;
  - rolagem horizontal em 14 larguras (360 a 2560px) em 14 páginas/estados, ocupação de 93% da largura, medida de leitura e contraste de texto em 4 temas × 2 larguras × 14 páginas/estados, mais o painel aberto: 333 verificações (a auditoria foi validada com uma mutação proposital);
  - movimento: 6 combinações de sistema e escolha em 8 páginas, mais o caso sem script: 52 verificações;
  - painel de acessibilidade: sistema ligado e desligado, escolha manual, recarga, voltar a "Sistema", restaurar padrão, dado antigo e JSON inválido.
- Comparação do texto das páginas com o último commit: única diferença real de conteúdo na Estação 4.

### O que continua pendente

- Celular real, leitor de tela e outros navegadores: tudo foi verificado só em Chrome headless. Em especial, o computador da escola não foi reproduzido: a causa foi reproduzida com a preferência do sistema emulada.
- `.impeccable/design.json` precisa ser regenerado.
- O roxo `#cd5efa` e o conteúdo da Estação 4 continuam dependendo do grupo do X-B0T.

---

## Próximas entradas

O DEVLOG só deve ganhar uma nova entrada quando houver algo realmente relevante, por exemplo:

- Estação 4 integrada;
- integração do X-B0T;
- definição da URL final e deploy definitivo;
- testes físicos de QR e fluxo completo;
- problema técnico importante;
- versão final da feira.

Pequenos ajustes continuam ficando apenas no histórico normal do Git.
