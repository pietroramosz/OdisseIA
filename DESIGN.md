---
name: OdisseIA
description: Arquivo de missão com energia de mangá para a jornada física+digital de uma feira escolar
colors:
  void-black: "#0c0c10"
  graphite-surface: "#16161d"
  graphite-surface-dim: "#111116"
  graphite-surface-elevated: "#1f1f29"
  signal-white: "#f3f3f6"
  signal-white-secondary: "#c2c2cc"
  signal-white-muted: "#9d9daa"
  cyber-purple: "#cd5efa"
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
    backgroundColor: "{colors.cyber-purple}"
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
    backgroundColor: "{colors.cyber-purple}"
    textColor: "{colors.void-black}"
    typography: "{typography.label}"
    padding: "4px 8px"
---

# Design System: OdisseIA

## Overview

**Creative North Star: "O Arquivo de Missão"**

O OdisseIA é um arquivo de missão aberto página a página. Um traçado esquemático liga as quatro estações ao X-BOT. Na abertura ele é a rota inteira; no Hub, a posição do visitante; nas estações, um trilho na margem; na Conclusão, a rota fechada com quatro carimbos. Sobre esse esqueleto técnico, a energia de mangá do X-BOT (linhas de velocidade, retícula, silhuetas, carimbos) irrompe nos pontos de conquista e aumenta conforme a jornada avança: um pouco na abertura, uma faixa de movimento na próxima estação, uma explosão na Estação 4, a densidade máxima na Conclusão.

Cada página tem composição própria: palavra-marca monumental na abertura, rota no Hub, um diagrama do assunto em cada estação, o placar 4/4 na Conclusão. Todas falam a mesma gramática: numerais gigantes vazados, linhas esquemáticas de nós quadrados, recorte diagonal e um único roxo.

A direção está registrada como contrato em `.impeccable/surfaces/index-html.md` e como decisão em DEC-018.

**Key Characteristics:**
- Escala tipográfica de contraste extremo: palavra-marca e placar monumentais, texto de leitura em fonte de sistema.
- Numerais vazados (só contorno) como planos de fundo: identificam sem competir com o título.
- Linhas esquemáticas (traço de 1,5–2px, nós quadrados, tracejado = ainda não percorrido, sólido roxo = percorrido).
- Texturas de mangá como máscaras SVG coloridas pelos tokens, nunca como imagem com cor própria.
- O título sempre abre a seção. Estado e rótulo vêm depois, como selo ou anotação de margem.

## Colors

Fundo quase preto, planos de grafite, branco-sinal para leitura e um único acento roxo. A paleta não mudou nesta direção. O que mudou foi o papel do roxo (ver Named Rules).

### Primary
- **Cyber Purple** (`#cd5efa`, provisório até a confirmação com a arte final do X-BOT): tinta de estado (próxima estação, validada, progresso, selos e carimbos) e tinta de ilustração (linhas de velocidade, retícula, rota percorrida, nós ativos dos diagramas). Como letra, só em display: o "IA" da palavra-marca, o "4" do placar e os numerais de estação.

### Neutral
- **Void Black** (`#0c0c10`): fundo de todas as páginas e cor de texto sobre roxo.
- **Graphite Surface** (`#16161d`): painel padrão (cards, figuras, folha de passos).
- **Graphite Surface Dim** (`#111116`): palco de ilustração, figura, escala do tempo e herói da Conclusão.
- **Elevated Graphite** (`#1f1f29`): painel em destaque (próxima estação, Conclusão disponível, fechamento da estação). Também é a cor da hachura de "ainda fechado".
- **Signal White** (`#f3f3f6`): títulos, texto de leitura principal, frase de abertura dos capítulos.
- **Signal White Secondary** (`#c2c2cc`): explicação dos capítulos, rótulos, texto secundário.
- **Signal White Muted** (`#9d9daa`): numerais vazados, estado bloqueado, legendas.
- **Dormant Gray** (`#6f6f7d`): filetes, trilho não percorrido, traços de diagrama. Nunca é usado para texto.
- **Grid Line** (`rgba(255,255,255,0.04)`): grade fixa de 32px atrás da página. As colunas de leitura têm fundo sólido e a escondem.

### Named Rules
**The State-and-Illustration Ink Rule.** O roxo tem dois papéis: sinal de estado (validada, próxima, progresso) e tinta de ilustração (linhas de velocidade, retícula, rota percorrida). Nunca é cor de texto corrido nem preenchimento de painel. Substitui a antiga "Rare Ink Rule" (DEC-018).

**The Two-Dark Rule.** Graphite Surface Dim marca palco ou fechado; Elevated Graphite marca destaque ou próximo. Nunca usar um no lugar do outro.

**The Token-Colored Texture Rule.** Retícula, linhas de foco, linhas de movimento, hachura, grade e seta são SVGs usados como `mask`, com `background-color` vindo de um token. Nenhuma textura carrega cor própria, então a troca do roxo provisório continua acontecendo num ponto só (DEC-013).

## Typography

**Display/Title/Label Font:** Chakra Petch, pesos 600 e 700, local em `assets/fonts/chakra-petch/`, sem CDN.
**Body Font:** fonte de sistema (`system-ui, sans-serif`).

**Character:** Chakra Petch fala como sistema e como letreiro: palavra-marca, títulos, numerais, rótulos, botões e carimbos. O texto de leitura usa a fonte do aparelho, que é legível e carrega na hora.

### Hierarchy
- **Monumental** (700, fluido com `clamp`):
  - palavra-marca da abertura `.capa__titulo`: `clamp(4.5rem, 23vw, 11rem)`, linha 0.84;
  - placar da Conclusão `.final-placar__feito`: `clamp(8rem, 42vw, 15rem)`;
  - título do X-BOT `.final-xbot__titulo`: `clamp(3.5rem, 18vw, 6rem)`.
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
- **Palco:** `--palco: 75rem` (1200px) de largura máxima, com `--gutter` de 16px no celular e 32px a partir de 900px.
- **Breakpoints:**
  - 480px: os destinos do Hub empilham abaixo dessa largura;
  - 600px: respiro e numerais maiores;
  - 900px: recomposição de todas as páginas;
  - 1100px: trilho da rota nas estações.
- **Abertura (≥900px):** palavra-marca na largura toda; proposta, frase das estações e CTA em 7 colunas à esquerda; rota nas 5 colunas da direita. No celular, o CTA fica logo abaixo da proposta, no primeiro terço da tela.
- **Hub (≥900px):** rota horizontal de quatro paradas, com o trilho ligando os nós e os cards abaixo deles. Substitui a grade 2×2 (DEC-018 substitui DEC-015). No celular, trilho vertical.
- **Estações (≥900px):** cada seção é uma grade com margem de 11rem, coluna de leitura de até 42rem e coluna livre (`1fr`) onde figuras e escala do tempo avançam. A partir de 1100px, a página ganha uma coluna de 9rem com o trilho da rota fixo (sticky). Substitui o dossiê de 832px (DEC-018 substitui DEC-016).
- **Composições por estação** (via `[data-estacao]`):
  - 1: capa com o texto à esquerda e a quadra de Pong à direita;
  - 2: rede em faixa larga abaixo do título;
  - 3: diagrama à esquerda e texto à direita;
  - 4: explosão de foco atrás do numeral e a carta no briefing.
- **Conclusão (≥900px):** herói em duas metades (título e placar), rota fechada horizontal, bloco do X-BOT com carta e texto lado a lado.
- **Ordem do DOM:** nada usa `order`. Na abertura, o CTA vem antes da rota também no DOM.

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
- **Texturas** (`.textura-reticula`, `.textura-foco`, `.textura-movimento`, `.textura-hachura`): máscaras SVG geradas com semente fixa e coloridas por token. A retícula e as linhas de foco marcam conquista; as linhas de movimento marcam "a seguir"; a hachura marca "ainda fechado".
- **Carimbo** (desenhado em cada página: estado do cartão no Hub, Conclusão, validação): moldura dupla em aresta dura, Chakra 700 espaçado, levemente girado. Marca o que foi conquistado (VALIDADA, JORNADA CONCLUÍDA, SUCESSO). No Hub, o carimbo é o próprio rótulo de estado, visível e lido, sem cópia escondida.
- **Ficha** (`.ficha`): o cartão do sistema, em três camadas. O elemento tem a cor do miolo (`--miolo`), então o texto continua legível se as camadas falharem; `::before` pinta a moldura (`--moldura`) e `::after` repinta o miolo recuado em `--espessura`, para a moldura seguir também o corte diagonal. Usada nos cartões do Hub e nos passos de "Como funciona" da abertura. Os dois pseudo-elementos ficam reservados para a ficha; detalhes extras vêm de elementos próprios (ex.: `.cartao__faixa`).
- **Pular para o conteúdo** (`.pular`): primeiro link de toda página, só aparece com foco e leva ao `<main id="conteudo">`.
- **Esquema** (`.esquema__*`): linhas, nós e textos dos diagramas SVG.
- **Seta** (`.seta`, `.seta--voltar`): ícone desenhado em SVG por máscara, que herda a cor do texto. Substitui os glifos ← e →.
- **Cruz de registro** (`.registro`): marca de impressão no canto da capa.
- **Sem quebra** (`.sem-quebra`): mantém nomes com hífen inteiros (ex.: "X-BOT" no título da Estação 4).

### Buttons
- **Forma:** recorte de 12px, altura mínima de 48px (56px nos CTAs principais), Chakra 700 em caixa alta, texto centralizado e balanceado.
- **Primary** (`.botao--principal`): fundo roxo, texto Void Black.
- **Secondary** (`.botao`): fundo Elevated Graphite. Sobre painel elevado, usa fundo Void Black com contorno de 1px.
- **Focus:** aresta interna de 3px, porque o `clip-path` cortaria o outline.

### Hub — rota
- **Nó:**
  - engrenagem acesa = validada; apagada = ainda não;
  - a próxima estação ganha um alvo roxo em volta do nó;
  - trecho sólido roxo = percorrido; tracejado roxo = até a próxima; tracejado cinza = futuro.
- **Anatomia do cartão** (`.cartao__corpo`, uma `.ficha`), de cima para baixo:
  - faixa de estado (`.cartao__faixa`, decorativa);
  - título;
  - descrição curta (o título do briefing da estação);
  - linha de estado: selo à esquerda, registro "EST. 0N / 04" à direita (decorativo);
  - barra de ação com altura mínima de 48px.
  - O link inteiro é o alvo. Nome acessível: título, estado e ação; a descrição entra como `aria-describedby`.
- **Validada:** faixa roxa cheia (como o segmento cheio da barra) e carimbo VALIDADA.
- **Próxima:**
  - moldura roxa de 2px, miolo elevado, faixa de linhas de movimento e título maior;
  - selo PRÓXIMA ESTAÇÃO cheio e barra de ação roxa;
  - folha anexa com os três passos reais, fora do link.
- **Bloqueada:** miolo no fundo, faixa hachurada, cadeado ao lado de BLOQUEADA, texto atenuado e ação "Ver o que falta", que leva à explicação de como desbloquear.
- Estado sempre por texto, forma e cor juntos; nenhum depende só da cor.
- **Interação:** no hover o cartão sobe 2px, o miolo clareia e a seta avança; no toque ele desce 1px; no foco a moldura vira Signal White de 3px seguindo o recorte e o número do nó ganha sublinhado.
- **≥900px:** os quatro cartões dividem a mesma linha (subgrid), então as linhas de estado e as barras de ação se alinham; a folha de passos fica numa segunda linha, só embaixo da próxima.
- **Destino final:** mesma anatomia, sem o registro.
  - Conclusão disponível: moldura roxa, faixa de movimento e barra de ação roxa;
  - X-BOT: miniatura da silhueta de carta;
  - bloqueados: faixa hachurada e cadeado; sem link, o detalhe é texto de status, não ação;
  - X-BOT sem `gameUrl` válida: marcador vazado e "AGUARDANDO LIBERAÇÃO", sem botão.

### Estação — dossiê
- **Capa** (`.dossie-capa`): numeral vazado gigante, título, "ESTAÇÃO 0N / 04", ficha técnica (`.dossie-ficha`) só com fatos do próprio conteúdo e ilustração SVG do assunto (`.dossie-capa__arte`).
- **Capítulo:** numeral vazado à esquerda do título (na margem a partir de 900px), corpo com a frase de abertura em destaque e marcadores quadrados roxos nas listas.
- **Figuras** (`.figura`): diagramas que desenham o próprio conteúdo, com legenda (`figcaption`):
  - a máquina de estados das quatro regras da Estação 3;
  - a rota de pathfinding, marcada como ilustração.
- **Escala do tempo** (`.escala`):
  - cada marco fica na posição proporcional ao ano (`--ano`, `--inicio`, `--fim`);
  - faixas de época abaixo do eixo;
  - intervalos como barra (2024–2026).
- **Lista de marcos:** ano como numeral e rótulo de época no primeiro marco de cada época (`data-era`).
- **Sequência da Estação 3:** escada de seis degraus; o último degrau tem contorno roxo.
- **Trilho da rota** (`.dossie-rota`, a partir de 1100px): paradas anteriores cheias, parada atual grande, futuras tracejadas, terminando em CONCLUSÃO. É decorativo (`aria-hidden`) e só aparece no conteúdo desbloqueado.
- **Bloqueio:**
  - próxima: painel elevado com faixa de movimento, passos numerados e "Seu progresso";
  - futura: painel hachurado com link para a próxima estação válida.

### X-BOT Card Image
O verso da carta (`verso-carta.png`) continua só na Estação 4 e na Conclusão, entre 200 e 280px de largura, com `loading="lazy"` e dimensões declaradas.
- **Estação 4** (`.carta-moldura`): palco escuro com linhas de foco roxas e retícula no canto. A carta fica inclinada (-5°) em moldura branca de 2px, com a legenda VERSO DA CARTA. Sem drop-shadow.
- **Conclusão** (`.final-xbot`): palco com linhas de foco, carta inclinada (-4°) com drop-shadow roxo e moldura roxa no bloco. É o único lugar com sombra suave.

### Conclusão
- **Herói:**
  - explosão de linhas de foco atrás do placar 4/4;
  - carimbo JORNADA CONCLUÍDA batido sobre o placar;
  - título com contorno de letreiro (`paint-order: stroke fill`) para se separar das linhas.
- **Resumo:** a rota fechada, uma linha roxa contínua pelas quatro engrenagens, com os carimbos VALIDADA batendo em sequência.
- **Acesso ao jogo:** botão "Jogar X-BOT" só com `gameUrl` absoluta http(s). Sem ela, o painel `.final-status` mostra a jornada concluída (marcador cheio) separada do acesso pendente (marcador vazado e etiqueta "AGUARDANDO LIBERAÇÃO").

### Validação do QR
O resultado é um carimbo depois do título: roxo para sucesso e "já validada", cinza para fora de ordem, inválido e erro. O sucesso ganha linhas de foco no canto, cortadas na diagonal. A ação principal vem primeiro.

## Motion
O movimento é um gesto por página, sempre partindo de um estado já visível:
- na abertura, a rota se desenha e as paradas entram;
- na Conclusão, a explosão irrompe e os carimbos batem em sequência;
- na validação, o carimbo bate.

Fora desses gestos, só respostas de interação: cartões e botões que sobem no hover e descem no toque, setas que avançam (0,15s).

Easing `cubic-bezier(0.22, 1, 0.36, 1)`, sem curvas com ricochete. Com `prefers-reduced-motion: reduce`, todas as animações e deslocamentos desligam: a rota já aparece desenhada e os carimbos já batidos. Ficam só trocas de cor, borda e opacidade em 0,12s, para o hover e o foco continuarem perceptíveis.

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
- **Don't** usar glow difuso, gradiente decorativo, glassmorphism, `border-radius` ou uma segunda linguagem de contêiner.
- **Don't** pintar texto corrido de roxo nem usar roxo como fundo de painel.
- **Don't** mostrar a arte da carta fora da Estação 4 e da Conclusão. Na abertura e no Hub, só a silhueta.
- **Don't** inventar mecânicas, dados ou datas do X-BOT nem de qualquer estação em diagramas, fichas ou legendas.
- **Don't** introduzir fonte nova, carregar a Inter ou usar texto visível abaixo de 12px.
- **Don't** permitir rolagem horizontal entre 360 e 430px.
