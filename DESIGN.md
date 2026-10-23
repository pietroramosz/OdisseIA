---
name: OdisseIA
description: Arquivo de missão grafite, com traçado azul #142146 e energia de mangá, para a jornada física+digital de uma feira escolar; o roxo é do X-B0T
colors:
  void-black: "#0c0c10"
  graphite-surface: "#16161d"
  graphite-surface-dim: "#111116"
  graphite-surface-elevated: "#1f1f29"
  signal-white: "#f3f3f6"
  signal-white-secondary: "#c2c2cc"
  signal-white-muted: "#9d9daa"
  azul-tracado: "#142146"
  xbot-roxo: "#cd5efa"
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
    backgroundColor: "{colors.signal-white}"
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
  card-next:
    backgroundColor: "{colors.graphite-surface-elevated}"
    textColor: "{colors.signal-white}"
    padding: "32px 24px 16px 16px"
  card-locked:
    backgroundColor: "{colors.void-black}"
    textColor: "{colors.signal-white-muted}"
    padding: "16px 24px 16px 16px"
  chip-state:
    backgroundColor: "{colors.signal-white}"
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

O OdisseIA é um arquivo de missão aberto página a página. Um traçado esquemático, em azul #142146, liga as quatro estações ao X-B0T, que é o único ponto roxo da jornada. Na abertura ele é a rota inteira; no Hub, a posição do visitante; nas estações, um trilho na margem; na Conclusão, a rota fechada com quatro carimbos. Sobre esse esqueleto técnico, a energia de mangá do X-B0T (linhas de velocidade, retícula, silhuetas, carimbos) irrompe nos pontos de conquista e aumenta conforme a jornada avança: um pouco na abertura, uma faixa de movimento na próxima estação, uma explosão na Estação 4, a densidade máxima na Conclusão.

Cada página tem composição própria: palavra-marca monumental na abertura, rota no Hub, em cada estação uma capa com motivo próprio, um percurso do assunto e módulos editoriais, o placar 4/4 na Conclusão. Todas falam a mesma gramática: numerais gigantes vazados, linhas esquemáticas de nós quadrados, recorte diagonal, o azul de traçado e o branco-sinal. O roxo é só do jogo.

A direção está registrada como contrato em `.impeccable/surfaces/index-html.md` e como decisão em DEC-018.

**Key Characteristics:**
- Escala tipográfica de contraste extremo: palavra-marca e placar monumentais, texto de leitura em fonte de sistema.
- Numerais vazados (só contorno) como planos de fundo: identificam sem competir com o título.
- Linhas esquemáticas (traço de 1,5–2px, nós quadrados, tracejado = ainda não percorrido, sólido = percorrido).
- Texturas de mangá como máscaras SVG coloridas pelos tokens, nunca como imagem com cor própria.
- O título sempre abre a seção. Estado e rótulo vêm depois, como selo ou anotação de margem.

## Colors

Fundo quase preto, planos de grafite e branco-sinal para leitura e ênfase. Três cores com função fixa se somam a essa base: o azul #142146 desenha a estrutura, o branco-sinal marca estado e o roxo é do X-B0T. A direção azul da DEC-020 foi revista pela DEC-023: a base grafite voltou, e o azul ficou restrito ao traçado.

### Primary
- **Azul de traçado** (`#142146`, `--cor-azul`, o azul intermediário da sala da feira): traçados, filetes, trilhos, separadores de seção, molduras dos módulos, grade, retícula, linhas de foco e de movimento, marca-texto sob nomes e conceitos, e o preenchimento do "IA" da palavra-marca (com contorno branco). Nunca é fundo de painel, cartão ou página, nem cor de texto. Sobre o grafite tem pouco contraste (1,2:1), então só desenha o que é decorativo ou estrutural; o estado nunca depende dele.
- **Branco-sinal como tinta de ênfase** (`--cor-destaque`, `#f3f3f6`): estado e ação (validada, próxima estação, progresso, selos e carimbos, botão principal, foco). No tema claro vira o texto escuro.
- **Roxo do X-B0T** (`--cor-xbot`, `#cd5efa`, provisório até a confirmação com a arte final do jogo): só onde o jogo é o assunto. Ver "The Purple Is the Game Rule".

### Neutral
- **Void Black** (`#0c0c10`): fundo de todas as páginas e cor de texto sobre branco-sinal e sobre o roxo do X-B0T.
- **Graphite Surface** (`#16161d`): painel padrão (cards, figuras, folha de passos).
- **Graphite Surface Dim** (`#111116`): palco de ilustração, figura, escala do tempo e herói da Conclusão.
- **Elevated Graphite** (`#1f1f29`): painel em destaque (próxima estação, Conclusão disponível, fechamento da estação). Também é a cor da hachura de "ainda fechado".
- **Signal White** (`#f3f3f6`): títulos, texto de leitura principal, frase de abertura dos capítulos.
- **Signal White Secondary** (`#c2c2cc`): explicação dos capítulos, rótulos, texto secundário.
- **Signal White Muted** (`#9d9daa`): numerais vazados, estado bloqueado, legendas.
- **Dormant Gray** (`#6f6f7d`): filetes, trilho não percorrido, traços de diagrama. Nunca é usado para texto.
- **Grid Line** (`rgba(255,255,255,0.04)`): grade fixa de 32px atrás da página. As colunas de leitura têm fundo sólido e a escondem.

### Temas
O tema escuro é o padrão e a identidade. O tema claro tem paleta própria (fundo `#f5f3f8`, superfícies brancas, texto `#17151c`, que também é a tinta de ênfase) e usa um azul de traçado mais claro (`#b7c0dc`) e um roxo mais fundo (`#8f26c7`), porque o `#cd5efa` tem só 3,2:1 sobre branco. Texto sobre a tinta de ênfase usa `--cor-sobre-destaque`, que muda junto. O alto contraste existe nos dois temas (azul de traçado `#3a4a8a` e `#7b88b8`). As escolhas (tema, tamanho de texto, contraste, movimento) vêm do painel de acessibilidade e ficam em `odisseia:acessibilidade`.

### Named Rules
**The Trace-Blue Rule.** O #142146 desenha estrutura e textura e nada mais: filetes, trilhos, molduras de módulo, grade, retícula, linhas de velocidade e de foco. Onde o roxo era a tinta dessas coisas, agora é ele (DEC-023). Informação que precisa ser vista (o que já foi percorrido, o que está ativo, uma rota num diagrama) usa o branco-sinal ou o apagado, nunca o azul.

**The State Ink Rule.** O branco-sinal marca estado e ação: validada, próxima, progresso, botão principal. Nunca é preenchimento de painel inteiro (só barras de ação, selos e botões) e substitui a antiga "Rare Ink Rule" e a tinta de estado roxa (DEC-018, DEC-023).

**The Purple Is the Game Rule.** O roxo só aparece onde o X-B0T é o assunto: cartão, engrenagem e selo do X-B0T no Hub, carta e explosão no fim da rota da abertura, silhueta do destino final, quarta linha do índice, capa e módulos da Estação 4 e o bloco do X-B0T na Conclusão. As áreas do jogo re-pintam `--cor-destaque` com `--cor-xbot`; a navegação da jornada (trilho, painel de acessibilidade, fechamento das páginas) o devolve com `--cor-marca`, mesmo dentro da Estação 4. As engrenagens das quatro estações são a clara (prata, validada) e a cinza (ainda não); a roxa é só do X-B0T.

**The Two-Dark Rule.** Graphite Surface Dim marca palco ou fechado; Elevated Graphite marca destaque ou próximo. Nunca usar um no lugar do outro.

**The Token-Colored Texture Rule.** Retícula, linhas de foco, linhas de movimento, hachura, grade e seta são SVGs usados como `mask`, com `background-color` vindo de um token. Nenhuma textura carrega cor própria, então a troca de qualquer cor acontece num ponto só (DEC-013).

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
  - título de card no Hub: 1.125rem; o card da próxima estação usa 1.5rem.
- **Body** (400, 1.0625rem, linha 1.6):
  - corpo de leitura com no máximo 62ch;
  - frase de abertura do briefing em 1.1875rem (1.375rem a partir de 900px);
  - primeira frase de cada capítulo em Signal White, o resto em Signal White Secondary.
- **Label** (600, 0.75rem, espaçamento 0.08–0.16em, caixa alta): ficha técnica, selos, carimbos e anotações de margem. Nada de texto visível abaixo de 12px.

### Named Rules
**The Heading-First Rule.** O título abre a seção. Rótulos de estado (PRÓXIMA ESTAÇÃO, BLOQUEADA, DESBLOQUEADO, SUCESSO) vêm depois dele, como selo. Rótulos de seção (BRIEFING, LINHA DO TEMPO) ficam na coluna de margem a partir de 900px e somem no celular. Nenhum rótulo acima de título.

**The Hollow Numeral Rule.** Contorno sem preenchimento só em numerais grandes e decorativos (a partir de 1.75rem). Texto pequeno em contorno continua proibido.

**The No New Font Rule.** Nenhuma fonte entra sem decisão explícita. A Inter continua na pasta como alternativa futura e não é carregada.

## Layout

Mobile-first: cada página foi composta primeiro a 390px e recomposta, não esticada, a partir de 900px. Nenhuma página rola na horizontal entre 360 e 430px.

- **Espaçamento:** escala fechada `--espaco-1` a `--espaco-24` (4, 8, 12, 16, 24, 32, 48, 64, 96px).
- **Palco e margem (DEC-021):** a área útil é a viewport menos a margem `--gutter: clamp(1rem, 3.4vw, 3.5rem)` (16px no celular, cerca de 3,4% da largura no desktop), até o teto `--palco: 108rem`. Medido: 93% da largura em 1280, 1440 e 1920px, e cerca de 84% em 2560px. O mesmo palco vale para todas as páginas; quem precisa de medida de leitura confortável limita o próprio texto (a validação do QR é a exceção, com 36rem).
- **Escala por tela:** `html` usa `font-size: calc(var(--escala-tela) * 100%)`, com `--escala-tela` em 1, 1,125 (a partir de 1600px) e 1,25 (a partir de 2200px). O painel de acessibilidade multiplica essa escala (115% e 130%). Tudo o que usa rem cresce junto, e o desktop de 1920px lê como uma composição maior, não como uma tela de 1280px com margens.
- **Breakpoints:**
  - 480px: os destinos do Hub empilham abaixo dessa largura;
  - 600px: respiro e numerais maiores;
  - 900px: recomposição de todas as páginas;
  - 1100px: margem de 9rem, texto de 1,125rem e abertura em duas colunas do briefing nas estações;
  - 1360px: trilho da rota nas estações e diagramas sem texto na coluna lateral;
  - 1600px e 2200px: escala por tela.
- **Abertura (≥900px):** palavra-marca na largura toda; proposta, frase das estações e CTA em 7 colunas à esquerda; rota nas 5 colunas da direita. No celular, o CTA fica logo abaixo da proposta, no primeiro terço da tela.
- **Hub (≥900px):** rota horizontal de quatro paradas, com o trilho em azul de traçado ligando os nós e os cards abaixo deles; abaixo, o destino final com a Conclusão e o X-B0T lado a lado. Substitui a grade 2×2 (DEC-018 substitui DEC-015). No celular, trilho vertical.
- **Estações (≥900px):** capítulos e briefing são grades de margem (rótulo, 7rem; 9rem a partir de 1100px), coluna de leitura (até 44rem, com no máximo 66 caracteres por linha) e coluna lateral (1fr). Os módulos (`.nota`) e os diagramas sem texto ficam na coluna lateral, à altura do trecho que ilustram; diagramas com texto (`.figura--legivel`), linha do tempo e percurso usam o fluxo, com os diagramas limitados a 28rem. Nos capítulos, o numeral fica fixo (sticky) na margem enquanto o capítulo é lido. A partir de 1100px a primeira frase do briefing vira a abertura da estação: corpo grande (até 2,125rem) atravessando as duas colunas. A partir de 1360px, a página ganha uma coluna de 9rem com o trilho da rota fixo (sticky). Substitui o dossiê de 832px (DEC-018 substitui DEC-016) e a terceira coluna vazia (DEC-019).
- **Capa das estações:** numeral, texto e arte são áreas de uma grade (`grid-template-areas`), nunca posições por deslocamento. O numeral é uma linha da grade sobre o título, na mesma borda esquerda.
- **Composições por estação** (via `[data-estacao]`):
  - 1: texto à esquerda, quadra de Pong à direita; linha do tempo horizontal de quatro épocas;
  - 2: rede de conexões em faixa larga abaixo do título; linha do tempo horizontal de quatro épocas;
  - 3: árvore de decisão à esquerda, numeral e título à direita; percurso em escada ascendente;
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
- **Painel de acessibilidade** (`.a11y`): dois interruptores diretos, "Reduzir animações" e "Alto contraste", cada um com o estado em texto (Ativado/Desativado). "Mais opções", recolhido, guarda o tema, o tamanho do texto e "Restaurar padrão". O interruptor de animações mostra o que vale agora e nunca fica travado: sem escolha salva ele reflete o sistema ("Ativado pelo sistema"); ao ser mexido grava a escolha explícita, que vence o sistema.
- **Zero do X-B0T** (`.zero`): na Chakra Petch o zero é quase igual à letra O, então em títulos e botões ele leva uma barra desenhada em CSS. No texto corrido (fonte de sistema) não é necessário.
- **Link do jogo** (`.link-jogo`, Estação 4): ação de texto, sublinhada, que leva ao site do jogo na mesma aba. O endereço vem só de `OdisseIAConfig.gameUrl` e o trecho fica oculto sem uma URL válida.
- **Texturas** (`.textura-reticula`, `.textura-foco`, `.textura-movimento`, `.textura-hachura`): máscaras SVG geradas com semente fixa e coloridas por token. A retícula e as linhas de foco marcam conquista; as linhas de movimento marcam "a seguir"; a hachura marca "ainda fechado".
- **Carimbo** (desenhado em cada página: estado do cartão no Hub, Conclusão, validação): moldura dupla em aresta dura, Chakra 700 espaçado, levemente girado. Marca o que foi conquistado (VALIDADA, JORNADA CONCLUÍDA, SUCESSO). No Hub, o carimbo é o próprio rótulo de estado, visível e lido, sem cópia escondida.
- **Ficha** (`.ficha`): o cartão do sistema, em três camadas. O elemento tem a cor do miolo (`--miolo`), então o texto continua legível se as camadas falharem; `::before` pinta a moldura (`--moldura`) e `::after` repinta o miolo recuado em `--espessura`, para a moldura seguir também o corte diagonal. Usada nos cartões do Hub e nos passos de "Como funciona" da abertura. Os dois pseudo-elementos ficam reservados para a ficha; detalhes extras vêm de elementos próprios (ex.: `.cartao__faixa`).
- **Pular para o conteúdo** (`.pular`): primeiro link de toda página, só aparece com foco e leva ao `<main id="conteudo">`.
- **Módulo editorial** (`.nota`, sempre uma `.ficha`): complementa o capítulo e nunca o substitui. Título (h3), selo opcional (ano ou estado), uma ilustração SVG e, só quando acrescenta algo, um trecho curto. Um módulo que apenas repetiria o parágrafo vizinho não existe (DEC-023). Uma gramática, uma forma por tipo de conteúdo:
  - `--marco`: o ano é o monumento do módulo, moldura em azul de traçado;
  - `--conexao`: o diagrama vai primeiro (A liga a B);
  - `--orbita`: o assunto no centro, o que vem dele em volta;
  - `--ideia`: a frase do capítulo em corpo grande, miolo elevado;
  - `--conceito`: o termo técnico e a ilustração que o resume;
  - `--cautela`: o que não deve ser entendido ao pé da letra (Estação 3);
  - `--heranca` e `--status` (Estação 4): o que o site herdou do X-B0T e o que ainda não foi confirmado.
  - Regras: só fatos que já estão na página; no máximo um módulo por trecho do capítulo; sem módulo dentro de módulo; nunca repetir o parágrafo vizinho. A Estação 3 não tem módulos: os dois diagramas dela (máquina de estados e rota de pathfinding) são figuras.
- **Esquema** (`.esquema__*`): linhas, nós e textos dos diagramas SVG.
- **Seta** (`.seta`, `.seta--voltar`): ícone desenhado em SVG por máscara, que herda a cor do texto. Substitui os glifos ← e →.
- **Cruz de registro** (`.registro`): marca de impressão no canto da capa.
- **Sem quebra** (`.sem-quebra`): mantém nomes com hífen inteiros (ex.: "X-B0T" no título da Estação 4).

### Buttons
- **Forma:** recorte de 12px, altura mínima de 48px (56px nos CTAs principais), Chakra 700 em caixa alta, texto centralizado e balanceado.
- **Primary** (`.botao--principal`): fundo branco-sinal, texto Void Black.
- **Secondary** (`.botao`): fundo Elevated Graphite. Sobre painel elevado, usa fundo Void Black com contorno de 1px.
- **Focus:** aresta interna de 3px, porque o `clip-path` cortaria o outline.

### Hub — rota
- **Nó:**
  - engrenagem acesa = validada; apagada = ainda não;
  - a próxima estação ganha um alvo branco em volta do nó;
  - o trilho é azul de traçado: sólido e grosso = percorrido, tracejado grosso = até a próxima, tracejado fino cinza = futuro; o estado principal está nas engrenagens (clara = validada, cinza = ainda não) e no texto do cartão.
- **Anatomia do cartão** (`.cartao__corpo`, uma `.ficha`), de cima para baixo:
  - faixa de estado (`.cartao__faixa`, decorativa);
  - título;
  - descrição curta (o título do briefing da estação);
  - linha de estado: selo à esquerda, registro "EST. 0N / 04" à direita (decorativo);
  - barra de ação com altura mínima de 48px.
  - O link inteiro é o alvo. Nome acessível: título, estado e ação; a descrição entra como `aria-describedby`.
- **Validada:** faixa branca cheia (como o segmento cheio da barra) e carimbo VALIDADA.
- **Próxima:**
  - moldura branca de 2px, miolo elevado, faixa de linhas de movimento e título maior;
  - selo PRÓXIMA ESTAÇÃO branco cheio e barra de ação branca;
  - folha anexa com os três passos reais, fora do link.
- **Bloqueada:** miolo no fundo, faixa hachurada, cadeado ao lado de BLOQUEADA, texto atenuado e ação "Ver o que falta", que leva à explicação de como desbloquear.
- Estado sempre por texto, forma e cor juntos; nenhum depende só da cor.
- **Interação:** no hover o cartão sobe 2px, o miolo clareia e a seta avança; no toque ele desce 1px; no foco a moldura vira Signal White de 3px seguindo o recorte e o número do nó ganha sublinhado.
- **≥900px:** os quatro cartões dividem a mesma linha (subgrid), então as linhas de estado e as barras de ação se alinham; a folha de passos fica numa segunda linha, só embaixo da próxima.
- **Destino final:** mesma anatomia, sem o registro.
  - Conclusão disponível: moldura branca, faixa de movimento e barra de ação branca;
  - X-B0T: o único cartão do Hub com a cor do jogo (moldura, faixa, selo e engrenagem roxos). Bloqueado até 4/4, com cadeado e engrenagem cinza; com 4/4 e `gameUrl` válida o cartão inteiro é um link para o jogo (mesma aba) com o aviso de giro dentro dele;
  - bloqueados: faixa hachurada e cadeado; sem link, o detalhe é texto de status, não ação;
  - X-B0T sem `gameUrl` válida (nula, vazia, relativa ou de outro protocolo): selo só contornado e "AGUARDANDO LIBERAÇÃO", sem link e sem aviso.

### Estação — dossiê
- **Capa** (`.dossie-capa`): numeral vazado gigante, título, "ESTAÇÃO 0N / 04", ficha técnica (`.dossie-ficha`) só com fatos do próprio conteúdo e ilustração SVG do assunto (`.dossie-capa__arte`). O título leva um contorno da cor do fundo (`paint-order: stroke fill`) que corta as linhas do numeral atrás das letras.
- **Capítulo:** numeral vazado à esquerda do título (na margem a partir de 900px), corpo com a frase de abertura em destaque e marcadores quadrados cinza nas listas.
  - **Abertura do capítulo:** a primeira frase tem corpo maior e cor de texto pleno; o resto fica em texto secundário. Os rótulos de seção que só repetiam o título (BRIEFING, LINHA DO TEMPO, SEQUÊNCIA, PRÓXIMA CONEXÃO, IDENTIDADE) foram retirados; ficam só CAPÍTULO/BASTIDOR com o numeral.
  - **Conceitos:** nomes e termos em negrito levam um marca-texto no azul de traçado sob a palavra, sem glow.
- **Figuras** (`.figura`): diagramas que desenham o próprio conteúdo, com legenda (`figcaption`):
  - a máquina de estados das quatro regras da Estação 3;
  - a rota de pathfinding, marcada como ilustração.
- **Linha do tempo** (`.rota-tempo`, Estações 1 e 2): uma espinha só, e cada acontecimento aparece uma vez.
  - Os marcos são agrupados por época (`.epoca`, com h3); cada marco é ano + nome, sem card.
  - Desktop: espinha horizontal, épocas lado a lado com hastes em alturas alternadas.
  - Celular: espinha vertical conectada, nós quadrados em cada época e marco.
  - A escala proporcional por ano e a lista repetida foram removidas (DEC-019).
- **Percurso** (`.percurso`, Estação 3): as seis etapas como um caminho. Desktop: escada ascendente, nós que crescem e trechos que sobem de uma etapa e entram na seguinte pela esquerda; o último nó tem anel branco. Celular: linha vertical. As etapas não são caixas.
- **Trilho da rota** (`.dossie-rota`, a partir de 1360px): paradas anteriores cheias, parada atual grande, futuras tracejadas, terminando em CONCLUSÃO. É decorativo (`aria-hidden`) e só aparece no conteúdo desbloqueado.
- **Bloqueio:**
  - próxima: painel elevado com faixa de movimento, passos numerados e "Seu progresso";
  - futura: painel hachurado com link para a próxima estação válida.

### X-B0T Card Image
O verso da carta (`verso-carta.png`) continua só na Estação 4 e na Conclusão, entre 200 e 280px de largura e com dimensões declaradas. Na Estação 4 ele está na capa, acima da dobra, então carrega sem `loading="lazy"`; na Conclusão continua lazy.
- **Estação 4** (`.palco-carta`): a carta é um artefato num palco. O verso inclinado (-5°) em moldura branca de 2px, duas cartas abertas em leque por baixo, as linhas de foco saindo do centro da carta (é para ela que conduzem), retícula no canto e uma etiqueta de arquivo "VERSO DA CARTA". Sem drop-shadow. Desktop: palco quadrado na coluna direita; celular: palco de borda a borda depois do título.
- **Conclusão** (`.final-xbot`): palco com linhas de foco, carta inclinada (-4°) com drop-shadow roxo e moldura roxa no bloco, que re-pinta o destaque com o roxo do X-B0T. É o único lugar com sombra suave.

### Conclusão
- **Herói:**
  - explosão de linhas de foco atrás do placar 4/4;
  - carimbo JORNADA CONCLUÍDA batido sobre o placar;
  - título com contorno de letreiro (`paint-order: stroke fill`) para se separar das linhas.
- **Resumo:** a rota fechada, uma linha contínua em azul de traçado pelas quatro engrenagens claras, com os carimbos VALIDADA batendo em sequência.
- **Acesso ao jogo:** botão "Jogar X-B0T" só com `gameUrl` absoluta http(s). Sem ela, o painel `.final-status` mostra a jornada concluída (marcador cheio) separada do acesso pendente (marcador vazado e etiqueta "AGUARDANDO LIBERAÇÃO").

### Validação do QR
O resultado é um carimbo depois do título: branco-sinal para sucesso e "já validada", cinza para fora de ordem, inválido e erro. O sucesso ganha linhas de foco no canto, cortadas na diagonal. A ação principal vem primeiro. Na Conclusão, o aviso de giro fica logo acima do botão "Jogar X-B0T".

## Motion
O movimento é um gesto por página, sempre partindo de um estado já visível:
- na abertura, a rota se desenha e as paradas entram;
- Estação 1: a linha do tempo acende conforme a rolagem (a espinha se traça e cada marco acende em branco ao passar);
- Estação 2: o sinal sai do controle e se espalha pela rede em quatro voltas (as cinco conexões do centro, a segunda volta, as pontas e, por fim, as conexões ativas em branco-sinal); cada nó surge quando a linha chega e os ativos acendem quando a conexão ativa os alcança. Cerca de 2,2s, uma vez. Cada trecho é um `<path>` com `--t` (atraso) e `--d` (duração) em segundos;
- Estação 3: as etapas do percurso se ligam em sequência, conforme a rolagem;
- Estação 4: numeral, linhas de foco, carta e leque entram em sequência, como o quadro de uma página de mangá;
- na Conclusão, a explosão irrompe e os carimbos batem em sequência;
- na validação, o carimbo bate.

Os gestos das Estações 1 e 3 usam `animation-timeline: view()` dentro de `@supports`, sem JavaScript; sem suporte, a página fica estática e completa. Os keyframes levam o prefixo da estação (`tempo-`, `rede-`, `percurso-`, `palco-`), e nenhuma estação usa o gesto de outra.

Fora desses gestos, só respostas de interação: cartões e botões que sobem no hover e descem no toque, setas que avançam (0,15s).

Easing `cubic-bezier(0.22, 1, 0.36, 1)`, sem curvas com ricochete.

**Quem decide o movimento (DEC-022).** `acessibilidade.js` grava `data-movimento="reduzido"` ou `"normal"` no `<html>` antes da primeira pintura. Sem escolha salva, vale a preferência do sistema (`prefers-reduced-motion`); a escolha explícita do interruptor "Reduzir animações" vence o sistema nos dois sentidos, inclusive religando as animações num computador que pede menos movimento. Nenhuma regra de animação do site pode ficar atrás de `@media (prefers-reduced-motion)`: o único corte é `:root[data-movimento="reduzido"]` em `style.css`, mais um plano B por mídia que só vale quando o atributo não existe (script ausente).

Com movimento reduzido, todas as animações e deslocamentos desligam: a rota já aparece desenhada, a linha do tempo acesa, o percurso ligado e os carimbos já batidos. Ficam só trocas de cor, borda e opacidade em 0,12s, para o hover e o foco continuarem perceptíveis.

## Do's and Don'ts

### Do:
- **Do** abrir toda seção pelo título e pôr estado e rótulo depois, como selo ou anotação de margem.
- **Do** expressar estado por texto, forma e cor juntos: carimbo, hachura, faixa de movimento, alvo no nó (DEC-013).
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
- **Don't** pintar texto corrido de azul ou de roxo, nem usar o azul de traçado como fundo de painel, de cartão ou de página.
- **Don't** usar o roxo fora do X-B0T (The Purple Is the Game Rule) nem misturar azul e roxo no mesmo elemento.
- **Don't** repetir num módulo, legenda ou título o que o parágrafo vizinho já diz.
- **Don't** condicionar uma animação a `prefers-reduced-motion` por conta própria: a decisão é de `data-movimento`.
- **Don't** escrever o nome do jogo com a letra O: a grafia é X-B0T, com zero.
- **Don't** mostrar a arte da carta fora da Estação 4 e da Conclusão. Na abertura e no Hub, só a silhueta.
- **Don't** inventar mecânicas, dados ou datas do X-B0T nem de qualquer estação em diagramas, fichas ou legendas.
- **Don't** introduzir fonte nova, carregar a Inter ou usar texto visível abaixo de 12px.
- **Don't** permitir rolagem horizontal entre 360 e 430px.
