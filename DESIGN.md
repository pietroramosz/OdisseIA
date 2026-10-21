---
name: OdisseIA
description: Terminal editorial cyberpunk para a jornada física+digital de uma feira escolar
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
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Chakra Petch, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Chakra Petch, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
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
    lineHeight: 1.4
    letterSpacing: "0.08em"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
components:
  button-primary:
    backgroundColor: "{colors.cyber-purple}"
    textColor: "{colors.void-black}"
    typography: "{typography.title}"
    padding: "12px 16px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.graphite-surface-elevated}"
    textColor: "{colors.signal-white}"
    typography: "{typography.title}"
    padding: "12px 16px"
    height: "44px"
  card-default:
    backgroundColor: "{colors.graphite-surface}"
    textColor: "{colors.signal-white}"
    padding: "16px 32px 16px 16px"
  card-elevated:
    backgroundColor: "{colors.graphite-surface-elevated}"
    textColor: "{colors.signal-white}"
    padding: "16px 24px 24px"
  card-dormant:
    backgroundColor: "{colors.void-black}"
    textColor: "{colors.signal-white-muted}"
    padding: "24px"
  chip-label:
    backgroundColor: "{colors.cyber-purple}"
    textColor: "{colors.void-black}"
    typography: "{typography.label}"
    padding: "4px 8px"
---

# Design System: OdisseIA

## Overview

**Creative North Star: "O Terminal Editorial"**

OdisseIA lê como um terminal técnico que decidiu contar uma história: a casca é toda recortes diagonais, rótulos numerados em caixa alta e hierarquia de grade — mas o miolo de cada tela é texto corrido, respirado, feito para ser lido em pé, num celular, em pé entre estações de uma feira. É cyberpunk sem neon: a estética vem da estrutura (recorte, contraste, numeração) e não de efeito (glow, gradiente, vidro). O roxo é raro e funcional — ele marca "isto é o próximo passo" ou "isto foi conquistado", nunca decoração.

O sistema não finge ser o HUD de um jogo. Ele é a documentação de campo dessa jornada: mais espaço, leitura mais fácil, texto mais longo do que o X-BOT teria dentro do próprio jogo — a mesma linguagem visual, numa chave mais limpa (DEC-011, DEC-013).

A única exceção deliberada é a Conclusão (`final.html`): o único momento em que o roxo e o movimento podem se abrir como recompensa visual, ainda dentro da mesma paleta e das mesmas regras de contraste.

**Key Characteristics:**
- Recorte diagonal como única assinatura de forma, repetida em cards, chips, botões e nós de trilho.
- Hierarquia por numeração (`01 / 04`), não por decoração: rótulos pequenos, caixa alta, com `letter-spacing` aberto.
- Roxo como "tinta rara": destaque, nunca cor de texto corrido.
- Estados de acesso (bloqueada / próxima / desbloqueada) sempre legíveis por texto e tamanho, nunca só por cor.
- Fundo quase preto com grade sutil em CSS, nunca atrás de texto de leitura.

## Colors

Paleta cinza-grafite quase monocromática com um único acento roxo reservado para estado e progresso.

### Primary
- **Cyber Purple** (`#cd5efa`, provisório — aguarda confirmação com a arte final do X-BOT): destaque, estado "próxima estação"/"desbloqueado", bordas internas de ênfase (`box-shadow: inset`), barra de progresso preenchida, chips de rótulo, moldura e carta na Conclusão.

### Neutral
- **Void Black** (`#0c0c10`): fundo base de toda a página; também cor de texto sobre chips roxos (alto contraste sobre `cyber-purple`).
- **Graphite Surface** (`#16161d`): painel padrão (cards, cartões, linha do tempo) sobre o fundo.
- **Graphite Surface Dim** (`#111116`): painel de estado "bloqueada"/resultado negativo — mais escuro que a superfície padrão, lê como "apagado".
- **Elevated Graphite** (`#1f1f29`): painel em destaque (estação "próxima", hero da Conclusão, resultado de sucesso) — mais claro que a superfície padrão, lê como "em primeiro plano".
- **Signal White** (`#f3f3f6`): texto principal, títulos, números de estado ativo.
- **Signal White Secondary** (`#c2c2cc`): texto secundário, rótulos em estado neutro, corpo de parágrafo em painéis.
- **Dormant Gray** (`#6f6f7d`): texto/ícone/traço em estado "apagado" mas ainda legível (segmento vazio da barra, traço de linha do tempo, borda).
- **Signal White Muted** (`#9d9daa`): o degrau mais apagado — texto de estado "bloqueada"/"futura", abaixo até de Dormant Gray em ênfase.
- **Grid Line** (`rgba(255,255,255,0.04)`): grade de fundo em `background-image`, opacidade mínima, nunca por trás de texto de leitura.

### Named Rules
**The Rare Ink Rule.** Cyber Purple nunca é cor de texto corrido. Ele aparece em bordas de ênfase, chips, barra de progresso e no momento de recompensa da Conclusão — sempre como sinal de estado, nunca como preenchimento decorativo.

**The Two-Dark Rule.** Existem dois tons de "escuro" com papéis opostos: Graphite Surface Dim marca "bloqueado/apagado", Elevated Graphite marca "em destaque/próximo". Nunca usar um no lugar do outro.

## Typography

**Display/Title/Label Font:** Chakra Petch (pesos 600 e 700 apenas, hospedada localmente em `assets/fonts/chakra-petch/`, sem CDN)
**Body Font:** fonte de sistema (`system-ui, sans-serif`)

**Character:** Chakra Petch é usada só onde a interface fala como sistema — títulos, números, rótulos, botões. Texto corrido usa a fonte de sistema do dispositivo do visitante, priorizando legibilidade e carregamento imediato sobre identidade tipográfica no corpo do texto.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 6vw, 4.5rem)`, 1.05): títulos de entrada de maior escala — hero do Index (2.75rem→4.5rem) e título do X-BOT na Conclusão (2.5rem→3.5rem), ambos crescendo nos mesmos breakpoints de layout (768px/900px).
- **Headline** (700, `clamp(1.75rem, 3vw, 2.75rem)`, 1.2): título da estação (`titulo-estacao`) e título da Conclusão (`final-titulo`).
- **Title** (600, 1.25rem, 1.3): título de cartão/estação no Hub, título de capítulo e seção dentro de uma estação.
- **Body** (400, 1.0625rem, 1.6): parágrafo de abertura (briefing) e corpo de capítulo; linha de 60–75ch em telas largas.
- **Label** (600, 0.75rem, letter-spacing 0.08em, caixa alta): rótulo numerado (`01 / 04`), estado de acesso, selo de conquista — sempre o elemento que "fala como sistema".

### Named Rules
**The Single Headline Rule.** Cada página tem um único título grande (Display ou Headline), com contraste forte contra o resto do conteúdo. Nenhuma outra manchete do mesmo peso/escala compete com ele na mesma tela.

**The No New Font Rule.** Nenhuma fonte entra no projeto sem decisão explícita registrada. A Inter já está na pasta de fontes como alternativa futura e não deve ser carregada sem essa decisão.

## Layout

Mobile-first real: a leitura base é sempre uma coluna estreita (`main` com `max-width: 640px` por padrão), pensada para ser lida em pé, com um celular, entre estações físicas. Nenhuma página rola horizontalmente entre 360px e 430px de largura — a faixa real de celular usada na feira.

- **Espaçamento:** escala fechada em variáveis CSS — `--espaco-1` a `--espaco-12` (4, 8, 12, 16, 24, 32, 48px). Nenhum valor de espaçamento fora da escala.
- **Grade de fundo:** linhas finíssimas (`--cor-grade`) repetidas a cada 32px, decorativas, nunca atrás de texto de leitura (cada página escopada aplica fundo sólido na coluna de main).
- **Breakpoints reais do projeto:** `768px` (ajustes pontuais de tamanho de título) e `900px` (recomposições de layout — grade 2x2 do Hub, dossiê de duas colunas das Estações 1–3 e da Conclusão, canvas editorial do Index).
- **Hub (≥900px):** grade 2x2 fixa para as quatro estações, independente do estado de progresso — nenhuma estação ocupa as duas colunas (DEC-015).
- **Estações 1–3 desbloqueadas e Conclusão completa (≥900px):** dossiê técnico de até 832px — 160px de coluna de contexto (rótulo) + 32px de respiro + até 640px de coluna de conteúdo. É a largura compartilhada por qualquer página que siga o padrão "dossiê" (rótulo lateral + conteúdo), não uma medida exclusiva das Estações (DEC-016). Nada usa `order`; a ordem visual segue a ordem do DOM.
- **Index (≥900px):** canvas editorial próprio de até 960px, com grid assimétrico por seção (hero 520px+400px, jornada 240px+680px) — não reaproveita a métrica do dossiê.
- **Regra geral:** nenhuma outra expansão de desktop (ex: outra largura de canvas) entra sem decisão explícita — ver DEC-015 e DEC-016.

## Elevation & Depth

O sistema é flat por natureza: não existe biblioteca de `box-shadow` com blur. Profundidade e estado vêm de três mecanismos, nunca de sombra ambiente:
1. **Camada de superfície** (Void Black → Graphite Surface Dim → Graphite Surface → Elevated Graphite): cada nível é literalmente uma cor mais clara, não uma sombra projetada.
2. **Borda interna sólida** (`box-shadow: inset`, 1–4px, cor opaca): marca foco (`cartao:focus-visible`), ênfase de estado "próxima/desbloqueada" (barra lateral roxa) e moldura da carta na Conclusão. Nunca `blur`, sempre aresta dura.
3. **Drop-shadow pontual só na carta do X-BOT** (`filter: drop-shadow`, cor do próprio roxo): única exceção com suavidade, porque é a única imagem fotográfica/ilustrada do sistema — tratada como objeto físico, não como painel de UI.

### Named Rules
**The Hard-Edge Rule.** Toda sombra estrutural do sistema é uma borda sólida (inset), nunca um blur difuso. Blur é reservado ao único objeto ilustrado do site (a carta do X-BOT).

## Shapes

Um motivo só, repetido: **o recorte diagonal** (`clip-path: polygon(...)`, token `--recorte`, cantos cortados em ~12px). Ele aparece em cards, chips de rótulo, botões, segmentos de barra preenchidos e nós do trilho de estação. Não existe `border-radius` em lugar nenhum do sistema — curva não faz parte do vocabulário de forma.

O recorte tem duas escalas: o grande (`--espaco-3`, 12px) para painéis e cards; o pequeno (`--espaco-1`/`--espaco-2`, 4–8px) para chips, segmentos de barra e marcadores de passo — a diferença de escala do corte comunica hierarquia de contêiner.

### Named Rules
**The One Cut Rule.** Existe um motivo de forma — o recorte diagonal — e ele nunca compete com outro (sem cantos arredondados, sem recorte em outro ângulo, sem combinação de formas no mesmo componente).

## Components

Técnico e contível: formas cortadas e precisas, cor rara e com propósito, estados sempre legíveis em texto — nada decorativo ou gratuito. Hover é sempre um bônus de desktop (`@media (hover: hover)`), nunca a única forma de entender um estado.

### Buttons
- **Shape:** recorte diagonal (`--recorte`, 12px), sem borda.
- **Primary** (`.botao--principal`): fundo Cyber Purple, texto Void Black, altura mínima 44px, padding `12px 16px`, peso 700, fonte Chakra Petch.
- **Secondary** (`.botao`): fundo Elevated Graphite, texto Signal White, mesma forma e altura.
- **Focus:** `box-shadow: inset 0 0 0 2px` na cor de texto (nunca outline cortado pelo clip-path).

### Chips / Status Labels
- **Rótulo numerado** (`.rotulo`): texto puro, sem fundo — caixa alta, Signal White Secondary (ou Signal White quando o estado está ativo).
- **Selo de estado** (`.bloqueio__estado`, `.final-selo`): fundo Cyber Purple, texto Void Black, recorte pequeno (4px) — usado só para "próxima estação" e "conquistado na Conclusão". Nunca aparece em estado bloqueado.

### Cards / Containers
- **Corner Style:** recorte diagonal (`--recorte`, 12px); sem borda visível no estado padrão.
- **Background:** Graphite Surface (padrão) → Graphite Surface Dim (bloqueado/apagado) → Elevated Graphite (próximo/destaque).
- **Shadow Strategy:** borda interna sólida roxa (`inset`) só no card em destaque; ver Elevation & Depth.
- **Internal Padding:** escala de espaçamento do projeto, tipicamente `--espaco-4` a `--espaco-6`; o card "próxima estação" usa padding maior (`--espaco-6`/`--espaco-8`) para parecer fisicamente mais importante.

### Navigation
- **Link de voltar** (`.terminal-voltar`, `.final-voltar`): Chakra Petch 600, 0.875rem, Signal White Secondary em repouso, Signal White em hover/foco — altura mínima 44px, sem fundo, sem recorte.
- **Nó de trilho do Hub** (`.estacao__no`): engrenagem (PNG, decorativa, `alt` vazio), número da estação e linha tracejada até o próximo nó; a linha vira sólida (apagado) quando a estação anterior foi desbloqueada e roxa sólida quando leva à próxima estação. Engrenagem acesa = conteúdo desbloqueado; apagada (PNG derivado da arte original, sem filtro CSS) = ainda bloqueado ou aguardando a próxima estação. **O estado da estação "próxima" nunca é comunicado só pela engrenagem ou só pela cor** — ele depende do rótulo PRÓXIMA ESTAÇÃO, do tamanho maior do card e da barra/borda roxa juntos; a engrenagem continua puramente decorativa.

### Progress Bar
- **Segmento vazio:** trilho fino (`--espaco-1`, 4px), cor Dormant Gray — forma reduzida, não só cor diferente.
- **Segmento cheio:** bloco alto (`--espaco-3`, 12px) com recorte pequeno, cor Cyber Purple — a diferença de altura é o que comunica "preenchido", a cor reforça.

### X-BOT Card Image
O verso da carta do X-BOT (`verso-carta.png`) só aparece em duas páginas, sempre em tamanho de carta (200–280px de largura), com `loading="lazy"` e dimensões declaradas:
- **Estação 4** (`.briefing img`): uso simples, inline no texto de abertura, sem tratamento especial — a imagem fala por si.
- **Conclusão — X-BOT Card Reveal** (signature component, só nesta página): a mesma carta sobre um "palco" com textura diagonal repetida em baixa opacidade da própria cor de destaque; entra com leve rotação e `drop-shadow` colorido — o único momento do sistema em que uma sombra suave e um objeto ilustrado substituem o vocabulário plano do resto do site.

## Do's and Don'ts

### Do:
- **Do** usar o recorte diagonal (`--recorte`) como única assinatura de forma em qualquer novo contêiner (card, botão, chip).
- **Do** expressar estado (bloqueado/próximo/desbloqueado, sucesso/erro) por texto + tamanho + cor juntos, nunca só por cor (DEC-013).
- **Do** comunicar o estado da estação "próxima" pelo rótulo (PRÓXIMA ESTAÇÃO), pelo tamanho do card e pela barra/borda roxa — nunca só pela engrenagem (ícone) ou só pela cor (DEC-013).
- **Do** manter o roxo raro: destaque, borda, chip, barra — nunca bloco de texto corrido nem fundo de página inteira (exceto o momento único da Conclusão).
- **Do** manter contraste mínimo 4,5:1 em texto e 3:1 em elementos de interface, alvos de toque de 44px e foco sempre visível, mesmo com o clip-path cortando o contorno.
- **Do** respeitar `prefers-reduced-motion` em qualquer animação nova (o projeto já desliga todas as transições/animações nesse modo).
- **Do** restringir o verso da carta do X-BOT à Estação 4 e à Conclusão, sempre em tamanho de carta (200–280px de largura), com `loading="lazy"` e dimensões declaradas.

### Don't:
- **Don't** usar glow difuso, gradiente decorativo fora dos já existentes (textura da Conclusão), glassmorphism, `border-radius`, ou qualquer segunda linguagem de forma.
- **Don't** usar emoji como ícone, nem depender de hover como único jeito de revelar informação em mobile.
- **Don't** introduzir uma nova fonte, peso de fonte, ou carregar a Inter sem decisão explícita registrada.
- **Don't** reusar a largura do canvas do Index (960px) para o dossiê de conteúdo desbloqueado, nem a largura do dossiê (832px) para o Index — são composições deliberadamente diferentes (DEC-015, DEC-016).
- **Don't** usar texto pequeno em contorno (stroke/outline sem preenchimento) em nenhum tamanho de texto.
- **Don't** permitir rolagem horizontal da página em larguras de viewport entre 360px e 430px (faixa real de celular usada na feira).
- **Don't** aplicar o tratamento de "recompensa visual" (roxo ampliado, drop-shadow, textura, carta) fora da página de Conclusão.
