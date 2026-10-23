# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Visitantes de uma feira de ciências escolar, circulando entre quatro estações físicas e usando o próprio celular durante o percurso. O uso é em pé, em movimento, com atenção dividida entre o site e a apresentação física, possivelmente sob iluminação variável de ambiente de feira. Mobile é o cenário real de uso; desktop é suportado mas não é prioridade (DEC-001).

## Product Purpose

O OdisseIA é a camada digital de uma feira escolar dividida em quatro estações físicas (evolução dos jogos até 1999; de 2001 até hoje; IA nos jogos; X-B0T). O site acompanha o percurso do visitante, complementa — sem repetir — o conteúdo apresentado presencialmente, e usa QR Codes para validar que o visitante realmente passou por cada estação física antes de desbloquear o conteúdo digital correspondente. Ao final das quatro estações, uma página de conclusão desbloqueia o acesso ao X-B0T, um jogo digital (TCG) desenvolvido por outro núcleo do projeto. Sucesso = o visitante completa o fluxo físico+digital sem fricção, no próprio celular, e chega ao X-B0T entendendo que o desbloqueou.

## Positioning

A experiência não é "um site sobre a feira" nem "um jogo com um site de apoio": é uma jornada única em que o progresso digital só avança mediante validação física (QR Code por estação), e a identidade visual do site é deliberadamente a mesma do X-B0T (DEC-011) para que sair do site e entrar no jogo pareça a mesma experiência contínua, não dois produtos separados.

## Operating Context

- Evento físico real: feira escolar em **29/10/2026**.
- Fluxo oficial: Visão geral → Hub → Estação 1 → Estação 2 → Estação 3 → Estação 4 → Conclusão → X-B0T.
- Cada estação física tem QR Code próprio; abrir uma página diretamente (sem QR) não avança o progresso.
- O progresso é salvo por navegador via `localStorage` (chave `odisseia:progresso`); abrir o QR num navegador diferente do Hub resulta em "fora de ordem" — limitação conhecida e comunicada ao visitante (DEC-014).
- Execução local via `file://`, sem servidor — por isso sem ES modules, sem build step (DEC-010).
- Hospedagem de testes: GitHub Pages na branch `dev`; hospedagem e URL definitivas ainda em aberto, e precisam estar fechadas antes de gerar/imprimir os QR Codes finais.
- A Estação 4 depende de outro grupo (X-B0T): o site só pode mostrar mecânicas/tecnologias que realmente existirem na versão final do jogo (DEC-007).

## Capabilities and Constraints

- Stack travada em HTML/CSS/JS puro, sem framework, sem backend, sem CDN (DEC-003, DEC-008) — revisitar só se surgir necessidade real.
- Configuração central em JS puro (`const OdisseIAConfig = {...}`), carregada via `<script>` comum, não ES module, para funcionar em `file://` (DEC-010). Demais scripts (`progresso.js`, `qr.js`, `app.js`) seguem o mesmo padrão.
- Progresso: `{ versao: 1, ultimaEstacaoDesbloqueada: 0 }` (0 a 4), derivando os demais estados de UI desse valor sempre que possível. Não é mecanismo de segurança (DEC-004, DEC-006) — nada crítico deve depender só do frontend.
- QR: cada QR abre `validar.html?estacao=N`; só o QR da próxima estação na ordem avança o progresso (DEC-014). O scanner pela câmera (DEC-024) reaproveita `resultadoParaEstacao()` de `qr.js` e nunca abre a URL lida. Cinco resultados possíveis: sucesso, repetido, fora de ordem, inválido, erro de armazenamento.
- Conteúdo das 4 estações é escrito direto no HTML (`estacao-1.html`–`estacao-4.html`), sem arquivo de dados nem geração por JS (DEC-012); esqueleto das 4 páginas deve ser idêntico.
- Páginas atuais: `index.html` (porta de entrada estática, sem JS, sem progresso), `hub.html` (estados 0–4), `validar.html`, `estacao-1.html`–`estacao-4.html`, `final.html` (conclusão).
- **Estação 4 e `final.html` (Conclusão) já estão implementadas** — não tratar como pendentes de implementação. Implementado ≠ validado: nenhuma das duas foi testada no fluxo físico completo da feira, e a jornada completa (visão geral → Hub → 4 estações → conclusão → X-B0T) ainda não foi validada ponta a ponta.
- **Testes efetivamente realizados até aqui**: sistema de progresso testado manualmente no console (incluindo dado corrompido e número decimal); Hub testado nos estados 0–4 em emulador e no celular; validação de QR (`validar.html`/`qr.js`) testada por console e por URL.
- **Validações pendentes, sem novidades**: `gameUrl` preenchida (https://robot-tcg.netlify.app/), `downloadUrl` ainda `null` por falta de link de download; cor final do X-B0T não confirmada (`#CD5EFA` segue provisório); hospedagem/URL definitiva; QR Codes definitivos; leitura de QR real pela câmera; abertura via WhatsApp; teste físico completo do fluxo em celular, do zero até o X-B0T.
- Nenhum prazo artificial deve ser inventado para itens em aberto (créditos da equipe, favicon, comportamento pós-feira, tutorial do X-B0T) — eles só entram na lista principal quando virarem requisito real.

## Brand Commitments

- Nome do projeto: **OdisseIA**. Jogo final: **X-B0T**.
- Identidade visual (DEC-024): base grafite, escura e neutra; o azul (escala do #142146, acento #5b8cff) como acento principal; o branco só para texto; o **roxo** (`#CD5EFA`, provisório) reservado ao X-B0T — nunca cor dominante em texto corrido, e nunca fora das partes do jogo.
- Tipografia: **Chakra Petch** SemiBold(600)/Bold(700), local em `assets/fonts/` (sem CDN), para títulos/rótulos/números; texto corrido em fonte de sistema. Inter guardada na pasta como alternativa futura, não carregada.
- Motivo de forma único e repetido: cantos cortados em diagonal (cards, segmentos de barra).
- Proibido: glow generalizado, gradiente excessivo, glassmorphism, emoji como ícone, hover como requisito, texto pequeno em contorno, fonte nova sem decisão explícita.
- Energia de mangá crescente (DEC-018): linhas de velocidade, retícula e carimbos aparecem pouco na abertura, como faixa de movimento na próxima estação, como explosão na Estação 4 e na densidade máxima na **Conclusão**, que continua sendo o pico visual e o único lugar com sombra suave. Tudo dentro da paleta e das regras de contraste e movimento.

## Evidence on Hand

- Documentação viva do projeto é fonte de verdade e deve ser tratada como tal: `README.md`, `PROJECT.md`, `DECISIONS.md`, `DESIGN.md` (sistema de design; substitui o antigo `docs/ESTILO.md`), `AI-WORKFLOW.md`, `DEVLOG.md`.
- Decisões numeradas (`DEC-001` a `DEC-024`) registram o histórico de escolhas de produto, arquitetura e visual — qualquer mudança que contradiga uma DEC existente exige decisão explícita, não apenas uma preferência de implementação.
- Nenhuma mecânica, carta, regra ou dado do X-B0T deve ser inventado ou documentado pelo site além do que realmente existir na versão final do jogo (DEC-007).

## Product Principles

- Mobile-first não é estética: é a realidade de uso na feira (DEC-001) — pouca informação por tela, navegação simples, leitura rápida.
- O site complementa a apresentação física, nunca a repete ou compete com ela.
- Simplicidade deliberada: sem framework, sem backend, sem complexidade adicionada "por boa prática" — só revisitar quando houver necessidade real (DEC-003, DEC-008).
- Frontend controla a experiência, não é camada de segurança real (DEC-006); nada crítico depende só de QR/localStorage.
- Planejado não é implementado: a Estação 4 e qualquer menção ao X-B0T só refletem o que existe de fato na versão final do jogo (DEC-007, lição registrada em AI-WORKFLOW.md §7.2).
- Transparência assumida sobre uso de IA no desenvolvimento (DEC-009) — decisões finais, testes e responsabilidade continuam humanos.

## Accessibility & Inclusion

- Contraste mínimo 4,5:1 em texto e 3:1 em elementos de interface.
- Alvos de toque de 44px; foco visível (atenção a `clip-path` cortando o contorno dos cantos diagonais).
- `prefers-reduced-motion` respeitado.
- Estados de interface (bloqueada/próxima/desbloqueada) nunca dependem só de cor — sempre também texto, tamanho e ícone.
- Sem rolagem horizontal entre 360–430px (faixa mobile real de uso na feira).
