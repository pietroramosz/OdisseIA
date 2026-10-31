---
name: OdisseIA
description: Arquivo de missão grafite, com o azul como acento (escala do #142146) e energia de mangá, para a jornada física+digital de uma feira escolar; o roxo é do X-B0T
colors:
  void-black: "#0c0c10"
  graphite-surface: "#16161d"
  graphite-surface-dim: "#111116"
  graphite-surface-elevated: "#1f1f29"
  signal-white: "#f3f3f6"
  signal-white-secondary: "#c2c2cc"
  signal-white-muted: "#9d9daa"
  azul-profundo: "#142146"
  azul-linha: "#3558c4"
  azul-acento: "#5b8cff"
  azul-claro: "#8fb0ff"
  xbot-roxo: "#CD5EFA"
  dormant-gray: "#6f6f7d"
  grid-line: "rgba(255, 255, 255, 0.04)"
typography:
  display:
    fontFamily: "Chakra Petch, system-ui, sans-serif"
    fontSize: "4.5rem" # valor base (mobile) da palavra-marca; a escala completa está em "Typography > Hierarchy"
    fontWeight: 700
    lineHeight: 0.84
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Chakra Petch, system-ui, sans-serif"
    fontSize: "2.5rem" # valor base (mobile) do título de estação; a escala completa está em "Typography > Hierarchy"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Chakra Petch, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Chakra Petch, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
components:
  button-primary:
    backgroundColor: "{colors.azul-acento}"
    textColor: "{colors.void-black}"
    typography: "{typography.label}"
    padding: "12px 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.graphite-surface-elevated}"
    textColor: "{colors.signal-white}"
    typography: "{typography.label}"
    padding: "12px 24px"
    height: "48px"
  card-default:
    backgroundColor: "{colors.graphite-surface}"
    textColor: "{colors.signal-white}"
    padding: "16px 24px 16px 16px"
  chip-state:
    backgroundColor: "{colors.azul-acento}"
    textColor: "{colors.void-black}"
    typography: "{typography.label}"
    padding: "4px 8px"
  chip-xbot:
    backgroundColor: "{colors.xbot-roxo}"
    textColor: "{colors.void-black}"
    typography: "{typography.label}"
    padding: "4px 8px"
---

# Design System: OdisseIA

## Overview

**Creative North Star: "O Arquivo de Missão"**

O OdisseIA é um arquivo de missão aberto página a página. Um traçado esquemático azul liga as quatro estações ao X-B0T, que é o único ponto roxo da jornada. Na abertura ele é a rota inteira; no Hub, o mapa das quatro paradas, todas abertas; nas estações, um trilho na margem; na Conclusão, a rota fechada. Sobre esse esqueleto técnico, a energia de mangá do X-B0T (linhas de velocidade, retícula, silhuetas, carimbos) irrompe nos pontos de destaque e aumenta conforme a rota avança: um pouco na abertura, uma explosão na Estação 4, a densidade máxima na Conclusão.

Cada página tem composição própria: palavra-marca monumental na abertura, rota no Hub, em cada estação uma capa com motivo próprio, um percurso do assunto e módulos editoriais, o numeral monumental das quatro estações na Conclusão. Todas falam a mesma gramática: numerais gigantes vazados, linhas esquemáticas de nós quadrados, recorte diagonal e o azul de acento. O roxo é só do jogo.

O sistema foi criado com a skill Impeccable, e a direção está registrada como contrato em `.impeccable/surfaces/index-html.md`.

**Key Characteristics:**
- Escala tipográfica de contraste extremo: palavra-marca e placar monumentais, texto de leitura em fonte de sistema.
- Numerais vazados (só contorno) como planos de fundo: identificam sem competir com o título.
- Linhas esquemáticas (traço de 1,5–2px, nós quadrados, tracejado = ainda não percorrido, sólido = percorrido).
- Texturas de mangá como máscaras SVG coloridas pelos tokens, nunca como imagem com cor própria.
- O título sempre abre a seção. Estado e rótulo vêm depois, como selo ou anotação de margem.

## Colors

Fundo quase preto, planos de grafite e branco-sinal para a leitura. O azul é o acento principal e ocupa o lugar que o roxo tinha antes; o roxo ficou como assinatura do X-B0T. A regra é grafite como base e um azul que se vê, sem pintar o site todo de azul nem deixá-lo invisível (DEC-010).

### Primary
O azul parte do `#142146` (o azul intermediário da sala da feira), que é escuro demais para aparecer sobre o grafite (1,2:1). A escala usa a mesma matiz (~226°) em quatro passos:
- **Azul profundo** (`#142146`, `--cor-azul`): referência escura, para fundos muito sutis. Nunca é a cor de uma informação.
- **Azul de linha** (`#3558c4`, `--cor-azul-linha`, 3,1:1 sobre o grafite): linhas, trilhos, separadores de seção, molduras de módulos e de painéis, retícula, linhas de foco e de movimento.
- **Azul de acento** (`#5b8cff`, `--cor-destaque`, 6,2:1; texto escuro sobre ele): estados (estação disponível), ações (botão principal, barra de ação, foco), nós ativos dos diagramas, numerais de capítulo e o "IA" da palavra-marca.
- **Azul claro** (`#8fb0ff`, `--cor-azul-claro`, 9,1:1): hover e texto de acento sobre superfícies elevadas.
- **Roxo do X-B0T** (`--cor-xbot`, `#CD5EFA`, cor definitiva do X-B0T): só onde o jogo é o assunto. Ver "The Purple Is the Game Rule".

Medido nas páginas renderizadas: 85–95% de pixels grafite, 0,4–6,2% de azul de acento (mais no celular, onde a página é mais estreita) e 0,9–3,2% de branco. Onde há estado ou ação, o azul vence o branco; nas páginas de leitura o branco é o texto.

### Neutral
- **Void Black** (`#0c0c10`): fundo de todas as páginas e cor de texto sobre o azul de acento e sobre o roxo do X-B0T.
- **Graphite Surface** (`#16161d`): painel padrão (cards, figuras, folha de passos).
- **Graphite Surface Dim** (`#111116`): palco de ilustração, figura, escala do tempo e herói da Conclusão.
- **Elevated Graphite** (`#1f1f29`): painel em destaque (Conclusão, fechamento da estação). Também é a cor da hachura do acesso pendente ao jogo.
- **Signal White** (`#f3f3f6`): títulos, texto de leitura principal, frase de abertura dos capítulos.
- **Signal White Secondary** (`#c2c2cc`): explicação dos capítulos, rótulos, texto secundário.
- **Signal White Muted** (`#9d9daa`): numerais vazados, estado pendente, legendas.
- **Dormant Gray** (`#6f6f7d`): filetes, trilho não percorrido, traços de diagrama. Nunca é usado para texto.
- **Grid Line** (`rgba(255,255,255,0.04)`): grade fixa de 32px atrás da página. As colunas de leitura têm fundo sólido e a escondem.

### Temas
O tema escuro é o padrão e a identidade. O tema claro tem paleta própria, com neutros de matiz azul-acinzentada (os tons lilases anteriores liam como roxo fora do X-B0T) e sem branco puro. As camadas, da mais funda à mais próxima: fundo `#e6e9f0`, palco e "fechado" `#d9dde8`, superfície off-white `#f4f5f9` e destaque num tom do azul `#dde6f8`. Texto `#141824` (14,6:1 sobre o fundo). O limite entre as camadas vem de dois tokens novos, que no escuro coincidem com a superfície elevada (então o escuro não muda) e no claro têm valor próprio: `--cor-filete` (`#8f98ae`, divisórias, molduras de ficha, contorno do botão secundário) e `--cor-hachura` (`#b3bbcd`, listras de "fechado"). O azul de acento é mais fundo (`#2a55d6`, 5,7:1 sobre a superfície, texto branco sobre ele), o azul de linha é `#4a6ed6` (3,9:1) e o roxo do X-B0T é mais fundo (`#8f26c7`), porque o `#CD5EFA` tem só 3,2:1 sobre branco. Regra: borda, divisória e contorno usam `--cor-filete`, nunca `--cor-superficie-alta`, que é só preenchimento. O alto contraste existe nos dois temas (acento `#9db8ff` no escuro e `#0b3a9a` no claro). Texto sobre o acento usa `--cor-sobre-destaque`, que muda junto. As escolhas (tema, tamanho de texto, contraste, movimento) vêm do painel de acessibilidade e ficam em `odisseia:acessibilidade`.

### Named Rules
**The Blue-Accent Rule.** O azul de acento marca o que está ativo ou pode ser feito: estado, ação, foco. O azul de linha desenha estrutura e textura. O azul profundo só aparece como fundo sutil. Nenhum azul é cor de texto corrido nem preenchimento de painel inteiro: o grafite é a base (DEC-010).

**The Purple Is the Game Rule.** O roxo só aparece onde o X-B0T é o assunto: cartão, engrenagem e selo do X-B0T no Hub, carta e explosão no fim da rota da abertura, silhueta do destino final, quarta linha do índice, Estação 4 (capa, módulos, carta interativa) e o bloco do X-B0T na Conclusão. Essas áreas re-pintam `--cor-destaque` e `--cor-azul-linha` com `--cor-xbot`; a navegação da jornada (trilho, painel de acessibilidade, fechamento das páginas, barra de leitura) os devolve com `--cor-marca` e `--cor-marca-linha`, mesmo dentro da Estação 4. As engrenagens das estações são azuis (`engrenagem-azul.png`, derivada da roxa por troca de matiz); a roxa é só do X-B0T.

**The Two-Dark Rule.** Graphite Surface Dim marca palco ou fechado; Elevated Graphite marca destaque ou próximo. Nunca usar um no lugar do outro.

**The Token-Colored Texture Rule.** Retícula, linhas de foco, linhas de movimento, hachura, grade e seta são SVGs usados como `mask`, com `background-color` vindo de um token. Nenhuma textura carrega cor própria, então a troca de qualquer cor acontece num ponto só.

## Typography

**Display/Title/Label Font:** Chakra Petch, pesos 600 e 700, local em `assets/fonts/chakra-petch/`, sem CDN.
**Body Font:** fonte de sistema (`system-ui, sans-serif`).

**Character:** Chakra Petch fala como sistema e como letreiro: palavra-marca, títulos, numerais, rótulos, botões e carimbos. O texto de leitura usa a fonte do aparelho, que é legível e carrega na hora.

### Hierarchy
- **Monumental** (700, fluido com `clamp`):
  - palavra-marca da abertura `.capa__titulo`: `clamp(4.5rem, 23vw, 11rem)`, linha 0.84;
  - placar da Conclusão `.final-placar__feito`: `clamp(8rem, 42vw, 15rem)`;
  - título do X-B0T `.final-xbot__titulo`: `clamp(3.5rem, 18vw, 6rem)`.
- **Headline** (700, linha 0.95):
  - título de estação `.titulo-estacao`: `clamp(2.5rem, 11vw, 4.75rem)`;
  - título da Conclusão `.final-titulo`: `clamp(2.5rem, 11vw, 5rem)`, 4.75rem a partir de 900px.
- **Numerais vazados** (700, só contorno de 1,5px, decorativos com `aria-hidden`):
  - capa da estação: 9.5rem (base), 13rem (≥600px), 17rem (≥900px);
  - capítulo: 3.25rem (base), 4.25rem (≥600px), 5.5rem (≥900px);
  - índice da abertura: 4.5rem (base), 7.5rem (≥900px);
  - resumo da Conclusão: 1.75rem (base), 3.5rem (≥900px).
- **Title** (700, 1.625rem, linha 1.15):
  - título de capítulo e de seção: 2rem a 2.5rem a partir de 900px;
  - título de card no Hub: 1.25rem; o da Conclusão usa 2rem.
- **Body** (400, 1.0625rem, linha 1.6):
  - corpo de leitura com no máximo 62ch;
  - frase de abertura do briefing em 1.1875rem (1.375rem a partir de 900px);
  - primeira frase de cada capítulo em Signal White, o resto em Signal White Secondary.
- **Label** (600, 0.75rem, espaçamento 0.08–0.16em, caixa alta): ficha técnica, selos, carimbos e anotações de margem. Nada de texto visível abaixo de 12px.

### Named Rules
**The Heading-First Rule.** O título abre a seção. Rótulos de estado (DISPONÍVEL, AGUARDANDO LIBERAÇÃO) vêm depois dele, como selo. Rótulos de seção (BRIEFING, LINHA DO TEMPO) ficam na coluna de margem a partir de 900px e somem no celular. Nenhum rótulo acima de título.

**The Hollow Numeral Rule.** Contorno sem preenchimento só em numerais grandes e decorativos (a partir de 1.75rem). Texto pequeno em contorno continua proibido.

**The No New Font Rule.** Nenhuma fonte entra sem decisão explícita. A Inter continua na pasta como alternativa futura e não é carregada.

## Layout

Mobile-first: cada página foi composta primeiro a 390px e recomposta, não esticada, a partir de 900px. Nenhuma página rola na horizontal entre 360 e 430px.

- **Espaçamento:** escala fechada `--espaco-1` a `--espaco-24` (4, 8, 12, 16, 24, 32, 48, 64, 96px).
- **Palco e margem:** a área útil é a viewport menos a margem `--gutter: clamp(1rem, 3.4vw, 3.5rem)` (16px no celular, cerca de 3,4% da largura no desktop), até o teto `--palco: 108rem`. Medido: 93% da largura em 1280, 1440 e 1920px, e cerca de 84% em 2560px. O mesmo palco vale para todas as páginas; quem precisa de medida de leitura confortável limita o próprio texto.
- **Escala por tela:** `html` usa `font-size: calc(var(--escala-tela) * 100%)`, com `--escala-tela` em 1, 1,125 (a partir de 1600px) e 1,25 (a partir de 2200px). O painel de acessibilidade multiplica essa escala (115% e 130%). Tudo o que usa rem cresce junto, e o desktop de 1920px lê como uma composição maior, não como uma tela de 1280px com margens.
- **Breakpoints:**
  - 480px: os destinos do Hub empilham abaixo dessa largura;
  - 600px: respiro e numerais maiores;
  - 900px: recomposição de todas as páginas;
  - 1100px: margem de 9rem, texto de 1,125rem e abertura em duas colunas do briefing nas estações;
  - 1360px: trilho da rota nas estações e diagramas sem texto na coluna lateral;
  - 1600px e 2200px: escala por tela.
- **Abertura (≥900px):** palavra-marca na largura toda; proposta, frase das estações e CTA em 7 colunas à esquerda; rota nas 5 colunas da direita. No celular, o CTA fica logo abaixo da proposta, no primeiro terço da tela.
- **Hub (≥900px):** rota horizontal de quatro paradas, com o trilho em azul de acento ligando os nós e os cards abaixo deles; abaixo, o destino final com a Conclusão e o X-B0T lado a lado. No celular, trilho vertical.
- **Estações (≥900px):** capítulos e briefing são grades de margem (rótulo, 7rem; 9rem a partir de 1100px), coluna de leitura (até 44rem, com no máximo 66 caracteres por linha) e coluna lateral (1fr). Os módulos (`.nota`) e os diagramas sem texto ficam na coluna lateral, à altura do trecho que ilustram; diagramas com texto (`.figura--legivel`), linha do tempo e percurso usam o fluxo, com os diagramas limitados a 28rem. Nos capítulos, o numeral fica fixo (sticky) na margem enquanto o capítulo é lido. A partir de 1100px a primeira frase do briefing vira a abertura da estação: corpo grande (até 2,125rem) atravessando as duas colunas. A partir de 1360px, a página ganha uma coluna de 9rem com o trilho da rota fixo (sticky).
- **Capa das estações:** numeral, texto e arte são áreas de uma grade (`grid-template-areas`), nunca posições por deslocamento. O numeral é uma linha da grade sobre o título, na mesma borda esquerda.
- **Composições por estação** (via `[data-estacao]`):
  - 1: numeral e título à esquerda, árvore de decisão à direita; a partir de 1100px as duas figuras dos capítulos ficam à direita do texto, na coluna lateral (texto em 27rem), e abaixo disso seguem no fluxo, abaixo do texto; percurso em escada ascendente;
  - 2: texto à esquerda, quadra de Pong à direita; capítulos com uma placa na coluna lateral e, no quarto, o palco do Pokémon; linha do tempo horizontal de quatro épocas;
  - 3: rede de conexões em faixa larga abaixo do título; placas nos capítulos 1, 3 e 4, o palco da Twitch no capítulo 2 e uma frase de fecho; linha do tempo horizontal de quatro épocas;
  - 4: numeral e título à esquerda, palco da carta à direita (a carta com as linhas de foco saindo dela). No celular, o palco vem depois do título, de borda a borda.
- **Conclusão (≥900px):** herói em duas metades (título e placar), rota fechada horizontal, bloco do X-B0T com carta e texto lado a lado.
- **Ordem do DOM:** nada usa `order`. Na abertura, o CTA vem antes da rota também no DOM. Nas estações, cada módulo vem logo depois do parágrafo que destaca; no desktop a posição na grade (`--ancora`) o põe ao lado dele, sem mudar a ordem de leitura.

## Elevation & Depth

O sistema continua plano. A profundidade vem de:
1. **Camadas de superfície:** Void Black, Graphite Surface Dim, Graphite Surface, Elevated Graphite.
2. **Planos sobrepostos:** numeral vazado atrás do título, retícula atrás da palavra-marca, explosão de foco atrás do placar e da carta, carimbo batido por cima do placar.
3. **Borda interna sólida** (`box-shadow: inset`, 1–4px): foco, moldura da carta, carimbos, contorno de fechado. Nos cartões recortados, a moldura é a da `.ficha` (abaixo), porque o `box-shadow` não acompanha o canto diagonal.
4. **Drop-shadow só na carta da Conclusão.**

### Named Rules
**The Hard-Edge Rule.** Toda sombra estrutural é aresta dura (inset). Blur só na carta revelada da Conclusão.

## Shapes

Um motivo de contêiner, o **recorte diagonal** (`--recorte` 12px, `--recorte-pequeno` 8px, `--recorte-minimo` 4px), em cards, botões, painéis, figuras, selos e segmentos de barra. Não existe `border-radius`. Diagonais extras só aparecem na ilustração: o corte das áreas de retícula e de foco, a inclinação dos carimbos e da carta, o octógono da explosão.

### Named Rules
**The One Cut Rule.** O contêiner tem uma forma só. Ângulos e curvas, quando aparecem, pertencem à ilustração (trajetória da bola, carta inclinada), nunca à moldura da interface.

## Components

### Gramática gráfica (`style.css`)
- **Numeral vazado** (`.numeral-vazado`): contorno de 1,5px em Dormant Gray ou Signal White Muted. Na Estação 4 o contorno fica roxo.
- **Aviso de giro** (`.aviso-giro`): "Para jogar pelo celular, vire o aparelho na horizontal." com um ícone de celular girando. Aparece junto ao acesso ao jogo, no cartão do X-B0T no Hub e acima do botão "Jogar X-B0T" na Conclusão, só em tela com menos de 900px e na vertical (`@media (max-width: 899px) and (orientation: portrait)`). No desktop e com o aparelho deitado o parágrafo não é exibido nem lido por leitor de tela. Não força a rotação nem bloqueia o acesso.
- **Painel de acessibilidade** (`.a11y`): tudo à vista, sem seção recolhida. De cima para baixo: os interruptores "Reduzir animações" e "Alto contraste" (estado também em texto, Ativado/Desativado), "Tema" (Escuro, Claro, Sistema) e "Tamanho do texto" (100%, 115%, 130%) em linhas de três botões de 56px, com 12px entre eles e 12px de padding interno, sempre com a mesma altura (a opção "Extra grande" quebra em duas linhas sem ficar mais alta que as outras) e "Restaurar padrão". Cerca de 430px de altura, com o título e o botão Fechar numa só linha. O interruptor de animações mostra o que vale agora e nunca fica travado: sem escolha salva reflete o sistema ("Ativado pelo sistema"); ao ser mexido grava a escolha explícita, que vence o sistema.
- **Portfólio** (`.final-portfolio`, `dialog.portfolio`, `portfolio.html`; `portfolio.js`, `portfolio.css`, `portfolio-documento.js`, `portfolio-documento.css`; DEC-015): na Conclusão, logo acima do "Jogar X-B0T", uma `.ficha` com moldura azul de 1px (o roxo é só do jogo, mesmo dentro do bloco do X-B0T), título "Portfólio do projeto", uma frase e o botão de contorno "Ver portfólio", secundário para o "Jogar X-B0T" seguir como única ação sólida. O botão abre um `<dialog>` modal centralizado sobre um véu escuro: ficha de moldura azul de 2px com margem mínima de `--gutter` em todas as bordas, até 72rem × 60rem no desktop e a tela menos as margens no celular; cabeçalho com título e "Fechar" (texto), o documento num `<iframe>` de mesma origem e uma nota "Documento em modo de leitura". Esc, "Fechar" e clique no fundo fecham (o Esc dentro do documento é repassado por `postMessage`); o foco vai ao "Fechar" e volta ao "Ver portfólio". O documento é o original do Word, não um redesenho: Arial 12 pt justificado com entrelinha de 1,5, capa e títulos de seção em Times New Roman, faixas cinza dos anexos, tabela com bordas e colagem de fotos nas posições do Word, tudo com o layout do `.docx` (as regras `.pN` do CSS são geradas dele; pt vira rem). O único ajuste visual é o tema: a folha do documento e o texto seguem o tema do site (`--cor-superficie` e `--cor-texto`, também no alto contraste) e o espaço do modal ao redor da folha é de outro tom, para destacá-la (no tema claro, o cinza-azulado do palco, `--cor-superficie-escura`, com filete e uma sombra curta na folha; no escuro, `#050508`, ou `#000` no alto contraste); as faixas cinza e as imagens mantêm as cores originais, os links usam o acento do tema e o logotipo transparente ganha fundo branco no tema escuro. Sem animação, sem grade de fundo e sem elementos do site dentro do documento.
- **Zero do X-B0T** (`.zero`): na Chakra Petch o zero é quase igual à letra O, então em títulos e botões ele leva uma barra desenhada em CSS. No texto corrido (fonte de sistema) não é necessário.
- **Card de origem** (`.nota--origem`, Estação 4): ocupa a coluna lateral onde ficava o card de pendências. Faixa de linhas de movimento roxa no topo, a primeira frase em Chakra 700 (até 1,75rem) com marca-texto roxo sob os dois nomes e o resto em texto secundário. Sem selos, listas nem ícones.
- **Carta de acesso** (`.carta-acesso`, Estação 4): o momento marcante da estação. Um palco de linhas de foco roxas com uma carta de 15 a 19rem, levemente girada. A frente (um `<button>`: emblema, nome e "Virar a carta") gira 180° em 0,8s e revela o verso real do jogo com a barra "Conhecer o site do X-B0T" (um `<a>`). Ativar o verso lança a carta (0,62s: avança e some no portal de linhas) e abre o site na mesma aba. A face escondida fica `inert` e `aria-hidden`; Esc ou "Virar de volta" desvira; o foco vai ao verso quando a carta gira. Com movimento reduzido não há giro nem lançamento: a face troca na hora e o clique segue direto. Sem `gameUrl` válida a carta fica oculta. Destino só de `OdisseIAConfig.gameUrl`.
- **Texturas** (`.textura-reticula`, `.textura-foco`, `.textura-movimento`, `.textura-hachura`): máscaras SVG geradas com semente fixa e coloridas por token. A retícula e as linhas de foco marcam destaque; as linhas de movimento marcam a Conclusão; a hachura marca o acesso ao jogo ainda pendente.
- **Carimbo** (desenhado em cada página: estado do cartão no Hub, Conclusão): moldura dupla em aresta dura, Chakra 700 espaçado, levemente girado (DISPONÍVEL, ACESSO LIVRE, ABRIR). No Hub, o carimbo é o próprio rótulo de estado, visível e lido, sem cópia escondida.
- **Ficha** (`.ficha`): o cartão do sistema, em três camadas. O elemento tem a cor do miolo (`--miolo`), então o texto continua legível se as camadas falharem; `::before` pinta a moldura (`--moldura`) e `::after` repinta o miolo recuado em `--espessura`, para a moldura seguir também o corte diagonal. Usada nos cartões do Hub e nos passos de "Como funciona" da abertura. Os dois pseudo-elementos ficam reservados para a ficha; detalhes extras vêm de elementos próprios (ex.: `.cartao__faixa`).
- **Placa** (`.placa`, `estacao-editorial.css`): ilustração de um trecho do capítulo, traço direto sobre o fundo (sem moldura de cartão), SVG só com os tokens de cor (`.p-linha`, `.p-forte`, `.p-ativa`, `.p-cheio`, `.p-no`) e texto em Chakra de 12px ou mais já renderizado. Só desenha o que o parágrafo vizinho afirma e traz uma legenda que a marca como ilustração. Desktop: coluna lateral, alinhada ao parágrafo (`--ancora`); celular: no fluxo, logo depois dele, com até 17rem, como pausa entre blocos de texto. Estação 1: dados e padrões do aprendizado de máquina; Estação 2: duelo de naves (Spacewar!), cartuchos do Atari 2600, crise de 1983 e NES; Estação 3: lan house, mundo aberto conectado, console e celular na mesma partida online.
- **Palco editorial** (`.palco-editorial`): o momento marcante de um capítulo. O texto vira corpo grande (Chakra 700, até 2,5rem) e divide a largura com uma ilustração própria. Estação 2, Pokémon: a frase à esquerda e o núcleo POKÉMON ligado a JOGOS e aos quatro desdobramentos do texto, à direita (passar o mouse acende o satélite). Estação 3, Twitch: o inverso, com a transmissão (monitor, ondas, barramento e plateia que se acende) à esquerda e o numeral vazado 2011 sobre a frase, à direita. A variante `--fecho` (Estações 1 e 3) isola uma frase de conclusão sob um filete.
- **Avanço no fim da estação** (`.conexao__acoes`): escrito direto no HTML de cada estação. Nas Estações 1 a 3, "Ir para a Estação 0N" é a ação principal e "Voltar ao Hub" é secundário; na Estação 4 o destino é "Ver a Conclusão" (`final.html`). Todas as estações estão sempre abertas, então o botão nunca é desabilitado. Um numeral vazado da próxima estação marca o fecho.
- **Favicon** (`assets/img/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`): placa grafite de cantos cortados com a rota azul que sai de um nó e chega ao destino; caminhos relativos em todas as páginas.
- **Rodapé e créditos** (`.rodape` em `style.css`; `creditos.html`, `creditos.css`): o rodapé é só a marca e o link "Créditos", com um filete no topo, na mesma largura do conteúdo, nas aberturas, no Hub, nas Estações, na Conclusão e nos Mini Jogos. A página de créditos abre com a palavra-marca e traz os seis grupos num só painel (`.cred-painel`, uma `.ficha` de moldura azul): três colunas de dois grupos no desktop, dois grupos por linha no tablet e uma coluna compacta no celular. Cada grupo é o nome da área em rótulo pequeno, sob um traço de 2px, com os nomes logo abaixo, sem separadores. A ordem segue a jornada, com o site primeiro (traço em azul de acento, o único acento do painel) e o portfólio por último; o grupo do jogo tem o traço roxo, por ser do X-B0T. Nomes e grupos escritos direto no HTML, sem identificadores numéricos, cargos nem descrições individuais.
- **Pular para o conteúdo** (`.pular`): primeiro link de toda página, só aparece com foco e leva ao `<main id="conteudo-principal">`.
- **Módulo editorial** (`.nota`, sempre uma `.ficha`): complementa o capítulo e nunca o substitui. Título (h3), selo opcional (ano ou estado), uma ilustração SVG e, só quando acrescenta algo, um trecho curto. Um módulo que apenas repetiria o parágrafo vizinho não existe. Uma gramática, uma forma por tipo de conteúdo:
  - `--marco`: o ano é o monumento do módulo, moldura em azul de linha;
  - `--conexao`: o diagrama vai primeiro (A liga a B);
  - `--orbita`: o assunto no centro, o que vem dele em volta;
  - `--ideia`: a frase do capítulo em corpo grande, miolo elevado;
  - `--conceito`: o termo técnico e a ilustração que o resume;
  - `--cautela`: o que não deve ser entendido ao pé da letra (Estação 1);
  - `--heranca` e `--status` (Estação 4): o que o site herdou do X-B0T e o que ainda não foi confirmado.
  - Regras: só fatos que já estão na página; no máximo um módulo por trecho do capítulo; sem módulo dentro de módulo; nunca repetir o parágrafo vizinho. A Estação 1 não tem módulos: os dois diagramas dela (máquina de estados e rota de pathfinding) são figuras.
- **Esquema** (`.esquema__*`): linhas, nós e textos dos diagramas SVG.
- **Seta** (`.seta`, `.seta--voltar`): ícone desenhado em SVG por máscara, que herda a cor do texto. Substitui os glifos ← e →.
- **Cruz de registro** (`.registro`): marca de impressão no canto da capa.
- **Sem quebra** (`.sem-quebra`): mantém nomes com hífen inteiros (ex.: "X-B0T" no título da Estação 4).

### Buttons
- **Forma:** recorte de 12px, altura mínima de 48px (56px nos CTAs principais), Chakra 700 em caixa alta, texto centralizado e balanceado.
- **Primary** (`.botao--principal`): fundo azul de acento, texto Void Black.
- **Secondary** (`.botao`): fundo Elevated Graphite. Sobre painel elevado, usa fundo Void Black com contorno de 1px.
- **Focus:** aresta interna de 3px, porque o `clip-path` cortaria o outline.

### Hub — rota
Todas as estações e a Conclusão estão sempre abertas; o Hub é um menu de navegação, sem progresso, sem estados bloqueados e sem barra de avanço. O cabeçalho é só a palavra-marca com o título "Rota da jornada".
- **Nó:** engrenagem azul acesa com o número da estação. O trilho é azul de acento, sólido e grosso, ligando as quatro paradas.
- **Seções:** a rota e o destino têm título de seção do mesmo padrão ("Estações", "Destino final"): no celular, título e filete; a partir de 900px, título e bloco azul curto.
- **Anatomia do cartão** (`.cartao__corpo`, uma `.ficha`), de cima para baixo:
  - faixa azul cheia (`.cartao__faixa`, decorativa) e retícula de mangá no canto superior direito (o texto passa por cima dela);
  - título;
  - descrição curta (o título do briefing da estação);
  - linha de estado: carimbo DISPONÍVEL à esquerda, registro "EST. 0N / 04" à direita (decorativo);
  - barra de ação "Ver conteúdo", com altura mínima de 48px.
  - O link inteiro é o alvo. Nome acessível: título, estado e ação; a descrição entra como `aria-describedby`.
- **Interação:** no hover o cartão sobe 2px, o miolo clareia, a seta avança, o título ganha sublinhado azul e a engrenagem gira 30°; no toque ele desce 1px; no foco a moldura vira Signal White de 3px seguindo o recorte e o número do nó ganha sublinhado.
- **≥900px:** os quatro cartões dividem a mesma linha (subgrid), então as linhas de estado e as barras de ação se alinham; o padding superior é fixo, o título reserva duas linhas e a faixa de estado tem altura mínima, então título, descrição e estado também se alinham.
- **Destino final:** mesma anatomia, sem o registro.
  - Conclusão: moldura azul, faixa de movimento, carimbo DISPONÍVEL e barra de ação azul "Ver conclusão";
  - X-B0T: o único cartão do Hub com a cor do jogo (moldura, faixa, selo e engrenagem roxos). Com `gameUrl` válida o cartão inteiro é um link para o jogo (mesma aba) com o aviso de giro dentro dele;
  - X-B0T sem `gameUrl` válida (nula, vazia, relativa ou de outro protocolo): selo só contornado e "AGUARDANDO LIBERAÇÃO", sem link e sem aviso; o detalhe é texto de status, não ação.

### Estação — dossiê
- **Capa** (`.dossie-capa`): numeral vazado gigante, título, "ESTAÇÃO 0N / 04", ficha técnica (`.dossie-ficha`) só com fatos do próprio conteúdo e ilustração SVG do assunto (`.dossie-capa__arte`). O título leva um contorno da cor do fundo (`paint-order: stroke fill`) que corta as linhas do numeral atrás das letras.
- **Capítulo:** numeral vazado à esquerda do título (na margem a partir de 900px), corpo com a frase de abertura em destaque e marcadores quadrados cinza nas listas.
  - **Abertura do capítulo:** a primeira frase tem corpo maior e cor de texto pleno; o resto fica em texto secundário. Os rótulos de seção que só repetiam o título (BRIEFING, LINHA DO TEMPO, SEQUÊNCIA, PRÓXIMA CONEXÃO, IDENTIDADE) foram retirados; ficam só CAPÍTULO/BASTIDOR com o numeral.
  - **Conceitos:** nomes e termos em negrito levam um marca-texto em azul de acento (30%) sob a palavra, sem glow.
- **Figuras** (`.figura`): diagramas que desenham o próprio conteúdo, com legenda (`figcaption`):
  - a máquina de estados das quatro regras da Estação 1;
  - a rota de pathfinding, marcada como ilustração: o A* examina as células (áreas sombreadas) e depois traça a rota (cena por tempo, ver Motion).
- **Linha do tempo** (uma por estação, mesma gramática: espinha, nós quadrados, anos em Chakra, "No capítulo 0N" com seta para cima; no máximo um link por capítulo; composição por assunto):
  - **Estação 1:** a escada do percurso é a linha do tempo, só a partir de 1200px; abaixo disso, uma lista vertical na coluna de leitura (contador na linha do nome, 32px entre etapas). Etapas linkadas (`.etapa__link`, sem sublinhado no nome: o sinal é o "No capítulo 0N") e três datas (`.etapa__marco`: 1968, 2004, 2016, dentro do bloco clicável, na ordem nome, data, link); as demais etapas ficam sem data e uma nota curta (`.linha-tempo__fonte`) explica e cita as referências.
  - **Estação 3:** os marcos de 2001 a 2026 com quatro anos linkados e o final "Em aberto" (nó tracejado, `.epoca--aberta`): a evolução continua.
  - **Estação 4:** "A trajetória do X-B0T", em roxo e sem datas (`.rota-tempo--trajetoria`): referências, mecânicas próprias, e na feira e no site. Não há ponto de "a confirmar": o grupo explica isso na apresentação.
  - A espinha termina no último nó (`--antes`: 5 nas Estações 2 e 3, 3 na 4).
- **Linha do tempo** (`.rota-tempo`, Estações 2 e 3): uma espinha só, e cada acontecimento aparece uma vez.
  - Na Estação 2 (`.rota-tempo--fim`) o ano 2000 fecha a espinha (`.epoca--fim`: nó de alvo azul e uma frase de fim). É o limite da estação, não um marco, e a espinha termina nesse nó.
  - Marcos com link (`.marco--ligado`, um por capítulo: 1962, 1972, 1983, 1994): o link ocupa a linha inteira por subgrid, o ano é sublinhado e a linha "No capítulo 0N" com seta para cima diz o destino. Os capítulos têm `id` e `scroll-margin-top`, e o capítulo de chegada acende a linha de abertura (`:target`).
  - Os marcos são agrupados por época (`.epoca`, com h3); cada marco é ano + nome, sem card.
  - Desktop: espinha horizontal, épocas lado a lado com hastes em alturas alternadas.
  - Celular: espinha vertical conectada, nós quadrados em cada época e marco.
- **Percurso** (`.percurso`, Estação 1): as seis etapas como um caminho. Desktop: escada ascendente, nós que crescem e trechos que sobem de uma etapa e entram na seguinte pela esquerda; o último nó tem anel azul. Celular: linha vertical. As etapas não são caixas.
- **Trilho da rota** (`.dossie-rota`, a partir de 1360px): paradas anteriores cheias, parada atual grande, futuras tracejadas, terminando em CONCLUSÃO. É decorativo (`aria-hidden`).

### X-B0T Card Image
O verso da carta (`verso-carta.png`) continua só na Estação 4 e na Conclusão, entre 200 e 280px de largura e com dimensões declaradas. Na Estação 4 ele está na capa, acima da dobra, então carrega sem `loading="lazy"`; na Conclusão continua lazy.
- **Estação 4** (`.palco-carta`): a carta é um artefato num palco. O verso inclinado (-5°) em moldura branca de 2px, duas cartas abertas em leque por baixo, as linhas de foco saindo do centro da carta (é para ela que conduzem), retícula no canto e uma etiqueta de arquivo "VERSO DA CARTA". Sem drop-shadow. Desktop: palco quadrado na coluna direita; celular: palco de borda a borda depois do título.
- **Conclusão** (`.final-xbot`): palco com linhas de foco, carta inclinada (-4°) com drop-shadow roxo e moldura roxa no bloco, que re-pinta o destaque com o roxo do X-B0T. É o único lugar com sombra suave.

### Conclusão
- **Herói:**
  - explosão de linhas de foco atrás do numeral "4" ("ESTAÇÕES PARA EXPLORAR");
  - carimbo ACESSO LIVRE batido sobre o numeral;
  - título "Fim da jornada." com contorno de letreiro (`paint-order: stroke fill`) para se separar das linhas.
- **Resumo:** a rota fechada, uma linha contínua em azul de acento pelas quatro engrenagens azuis. Cada estação tem um carimbo "ABRIR" que é o link para a página dela.
- **Acesso ao jogo:** botão "Jogar X-B0T" só com `gameUrl` absoluta http(s). Sem ela, o painel `.final-status` mostra o acesso pendente (marcador vazado e etiqueta "AGUARDANDO LIBERAÇÃO"). O aviso de giro fica logo acima do botão.

## Motion
O movimento é um gesto por página, sempre partindo de um estado já visível:
- na abertura, a rota se desenha e as paradas entram;
- no Hub, a rota se monta em cerca de 1,1s: o trilho se estende, as engrenagens acendem e os cartões entram um a um;
- Estação 1: as etapas do percurso se ligam em sequência, conforme a rolagem;
- Estação 2: a linha do tempo acende conforme a rolagem (a espinha se traça e cada marco acende em azul ao passar);
- Estação 3: o sinal sai do controle e se espalha pela rede em quatro voltas (as cinco conexões do centro, a segunda volta, as pontas e, por fim, as conexões ativas em azul de acento); cada nó surge quando a linha chega e os ativos acendem quando a conexão ativa os alcança. Cerca de 2,2s, uma vez. Cada trecho é um `<path>` com `--t` (atraso) e `--d` (duração) em segundos;
- Estação 4: numeral, linhas de foco, carta e leque entram em sequência, como o quadro de uma página de mangá;
- na Conclusão, a explosão irrompe e os carimbos batem em sequência;
- na validação, o carimbo bate.

Há três mecanismos de movimento, e cada gesto usa um só:
- **Por tempo, só CSS, ao abrir a página:** abertura, Hub, capa das estações (incluindo a rede da Estação 3), Estação 4, Conclusão e validação;
- **Por rolagem, só CSS** (`animation-timeline: view()` e `scroll()`, dentro de `@supports`): linha do tempo da Estação 2, percurso da Estação 1, entrada das seções, placas e palcos editoriais e barra de leitura;
- **Por tempo, disparado por `cenas.js`, ao chegar à tela:** as três visualizações abaixo. É o único movimento que precisa de JavaScript, e ele só marca o estado; quem desenha é o CSS. Nas figuras dessas três cenas ele substitui o desenho por rolagem das placas (`p-tracar`, `p-surgir`, `p-acender`), que continua nas demais placas e palcos.

As três cenas contam uma sequência, por isso rodam por tempo, uma vez (`cenas.js` marca `data-cena="espera"` e depois `"toca"`; o CSS, na seção "Cenas" de `estacao-editorial.css`, desenha; cada peça tem `--t` atraso, `--d` duração e `--e` curva; keyframes `cena-`):
- Estação 1, rota do A*: as células que o A* examinou aparecem em nove ondas, na ordem de expansão (calculada offline com Manhattan, sobre a grade da figura; 61 células), e só depois a rota de 22 passos se traça de A até B. A rota é a mesma de antes: é o menor caminho.
- Estação 2, crise de 1983: a curva sobe, cai (curva de queda, mais rápida), o marco 1983 surge, há uma pausa e a recuperação do NES se traça; o rótulo NES entra por último. Os pontos da curva não mudaram;
- Estação 3, ondas da Twitch: cada uma das quatro curvas é revelada do centro para fora, nos dois lados ao mesmo tempo (as internas antes das externas), e acende do azul de linha ao azul claro (com um halo curto de 3px) até assentar no azul de acento;
Sem `cenas.js` ou com movimento reduzido o atributo não existe e a figura fica completa e parada.

Os gestos por rolagem das Estações 2 (linha do tempo) e 1 (percurso) não usam JavaScript; sem suporte a `animation-timeline`, a página fica estática e completa. Os keyframes levam o prefixo da estação (`tempo-`, `rede-`, `percurso-`, `palco-`), e nenhuma estação usa o gesto de outra. A exceção é `cena-`, a mecânica compartilhada das três cenas acima, em que cada figura tem a sua própria sequência.

Transversais, sem coreografia própria: a troca de página é um fade curto com subida de 10px (View Transitions entre documentos, `@view-transition`; sem efeito em file:// e nos navegadores sem suporte), a barra de leitura de 3px no topo das estações acompanha a rolagem (`animation-timeline: scroll()`, na cor do site, invisível sem suporte).

Entrada das estações: toda capa entra em sequência (numeral, título, rótulo, ficha, arte) e, onde há `animation-timeline: view()`, a linha de abertura de cada seção se traça e os títulos sobem ao chegar à tela, sempre a partir de um estado visível; o texto de leitura nunca se anima, e cada ilustração se desenha sozinha, por rolagem, exceto as três cenas acima, que rodam por tempo. Sotaques: Estação 1 traça a árvore de decisão nível a nível e o delta pousa no fim, Estação 2 é arcade (título digitado e bola que cruza a quadra aos saltos, com `steps()`), Estação 3 é sinal (marcos e nós da linha do tempo entram como o sinal que se espalha pela rede), Estação 4 cresce o delta de retícula do palco depois do leque de cartas. Microinterações: marca-texto que se expande sob termos em negrito, nós da linha do tempo que crescem, módulos e figuras que sobem 3px, setas que avançam.

Fora desses gestos, só respostas de interação: cartões e botões que sobem no hover e descem no toque, setas que avançam (0,15s).

Easing `cubic-bezier(0.22, 1, 0.36, 1)`, sem curvas com ricochete.

**Quem decide o movimento (DEC-013).** `acessibilidade.js` grava `data-movimento="reduzido"` ou `"normal"` no `<html>` antes da primeira pintura. Sem escolha salva, vale a preferência do sistema (`prefers-reduced-motion`); a escolha explícita do interruptor "Reduzir animações" vence o sistema nos dois sentidos, inclusive religando as animações num computador que pede menos movimento. Nenhuma regra de animação do site pode ficar atrás de `@media (prefers-reduced-motion)`: o único corte é `:root[data-movimento="reduzido"]` em `style.css`, mais um plano B por mídia que só vale quando o atributo não existe (script ausente).

Com movimento reduzido, todas as animações e deslocamentos desligam: a rota já aparece desenhada, a linha do tempo acesa, o percurso ligado e os carimbos já batidos. Ficam só trocas de cor, borda e opacidade em 0,12s, para o hover e o foco continuarem perceptíveis.

## Do's and Don'ts

### Do:
- **Do** abrir toda seção pelo título e pôr estado e rótulo depois, como selo ou anotação de margem.
- **Do** expressar estado por texto, forma e cor juntos: carimbo, hachura, faixa de movimento.
- **Do** desenhar diagramas só com relações que o conteúdo afirma, e marcar como ilustração o que for exemplo.
- **Do** usar texturas apenas pelas máscaras de `style.css`, coloridas por token.
- **Do** manter contraste mínimo de 4,5:1 em texto, 3:1 em elementos de interface, alvos de 44px e foco sempre visível.
- **Do** contornar títulos que passam sobre linhas de foco (`paint-order: stroke fill`).

### Don't:
- **Don't** pôr rótulo, kicker ou selo acima de título.
- **Don't** usar glifos Unicode (←, →, ✓) ou emoji como ícone. Use a `.seta` ou um SVG desenhado.
- **Don't** transformar capítulos em cards, aninhar módulos nem pôr o mesmo módulo oito vezes: o card complementa o capítulo e muda de forma com o conteúdo.
- **Don't** posicionar numeral ou arte da capa por `calc()` e deslocamentos: use as áreas da grade.
- **Don't** pôr linhas de foco que não partam de um objeto real da composição (a carta, o numeral).
- **Don't** usar glow difuso, gradiente decorativo, glassmorphism, `border-radius` ou uma segunda linguagem de contêiner.
- **Don't** pintar texto corrido de azul ou de roxo, nem usar o azul como fundo de painel, de cartão ou de página: o grafite é a base.
- **Don't** deixar o azul tão discreto que não se veja (linhas de estado em #142146 sobre o grafite) nem deixar o branco assumir o papel do acento.
- **Don't** usar o roxo fora do X-B0T (The Purple Is the Game Rule) nem misturar azul e roxo no mesmo elemento.
- **Don't** repetir num módulo, legenda ou título o que o parágrafo vizinho já diz.
- **Don't** condicionar uma animação a `prefers-reduced-motion` por conta própria: a decisão é de `data-movimento`.
- **Don't** escrever o nome do jogo com a letra O: a grafia é X-B0T, com zero.
- **Don't** mostrar a arte da carta fora da Estação 4 e da Conclusão. Na abertura e no Hub, só a silhueta.
- **Don't** inventar mecânicas, dados ou datas do X-B0T nem de qualquer estação em diagramas, fichas ou legendas.
- **Don't** introduzir fonte nova, carregar a Inter ou usar texto visível abaixo de 12px.
- **Don't** permitir rolagem horizontal entre 360 e 430px.
