# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Qualquer pessoa interessada em IA e jogos que abra o site, no celular ou no computador. Na feira de ciências escolar de 29/10/2026, os visitantes circulavam entre quatro estações físicas usando o próprio celular, em pé, com atenção dividida entre o site e a apresentação. Mobile continua sendo o cenário principal de uso; desktop é suportado, mas não é prioridade (DEC-001).

## Product Purpose

O OdisseIA é um projeto educacional sobre a evolução da IA e a sua relação com os jogos, organizado em quatro estações (IA nos jogos; evolução dos jogos até 2000; evolução de 2001 até hoje; X-B0T). Nasceu como a camada digital de uma feira escolar, onde usava QR Codes para comprovar a passagem física por cada estação; depois da feira, o site foi aberto (DEC-016) e todo o conteúdo pode ser consultado livremente, em qualquer ordem. A página de conclusão reúne o resumo e o acesso ao X-B0T, um jogo digital (TCG) desenvolvido por outro núcleo do projeto. Sucesso = o visitante encontra e consulta o conteúdo sem fricção, no próprio celular, e chega ao X-B0T entendendo que o desbloqueou.

## Positioning

A experiência não é "um site sobre a feira" nem "um jogo com um site de apoio": é uma jornada única e aberta, e o site compartilha a linguagem visual do X-B0T (grafite, cantos cortados, Chakra Petch), cada um com a sua cor (DEC-010), para que sair do site e entrar no jogo pareça a mesma experiência contínua, não dois produtos separados.

## Operating Context

- Evento físico real: feira escolar em **29/10/2026** (já realizada). Hoje o site é público e livre.
- Fluxo sugerido (nenhuma ordem é obrigatória): Visão geral → Hub → Estação 1 → Estação 2 → Estação 3 → Estação 4 → Conclusão → X-B0T.
- Sem QR Codes, sem progresso e sem bloqueios: toda página abre direto pela URL (DEC-016). O sistema da feira (DEC-002, DEC-004, DEC-011, DEC-014) foi descontinuado.
- Execução local via `file://`, sem servidor — por isso sem ES modules, sem build step (DEC-009).
- Hospedagem definitiva: GitHub Pages (`https://pietroramosz.github.io/OdisseIA/`), com caminhos relativos.
- A Estação 4 depende de outro grupo (X-B0T): o site só pode mostrar mecânicas/tecnologias que realmente existirem na versão final do jogo (DEC-007).

## Capabilities and Constraints

- Stack travada em HTML/CSS/JS puro, sem framework, sem backend, sem CDN (DEC-003) — revisitar só se surgir necessidade real.
- Configuração central em JS puro (`const OdisseIAConfig = {...}`), carregada via `<script>` comum, não ES module, para funcionar em `file://` (DEC-009). Demais scripts (`app.js`, `cenas.js`…) seguem o mesmo padrão.
- Sem progresso: nenhum estado de interface depende de dados salvos no navegador. O único `localStorage` do site guarda as preferências de acessibilidade (DEC-013); `app.js` apaga a chave antiga `odisseia:progresso`. Nada crítico deve depender só do frontend (DEC-006).
- Conteúdo das 4 estações é escrito direto no HTML (`estacao-1.html`–`estacao-4.html`), sem arquivo de dados nem geração por JS. As páginas compartilham componentes e a ordem dos blocos, e cada estação tem a sua composição.
- Páginas atuais: `index.html` (porta de entrada estática), `hub.html` (menu livre), `estacao-1.html`–`estacao-4.html`, `final.html` (conclusão), `portfolio.html` (documento exibido no leitor da Conclusão, DEC-015), `minijogos.html` e `creditos.html`.
- **Testes realizados**: o painel de acessibilidade foi testado fisicamente. O sistema de QR Codes e progresso (hoje descontinuado) foi testado no console, por URL, em emulador e com a câmera de um celular. Não há registro de testes em Safari, Firefox ou com leitor de tela.
- **Endereços**: `gameUrl` aponta para https://robot-tcg.netlify.app/; `downloadUrl` segue `null`, porque não há link de download.

## Brand Commitments

- Nome do projeto: **OdisseIA**. Jogo final: **X-B0T**.
- Identidade visual (DEC-014): base grafite, escura e neutra; o azul (escala do #142146, acento #5b8cff) como acento principal; o branco só para texto; o **roxo** (`#CD5EFA`, cor definitiva do X-B0T) reservado ao jogo — nunca cor dominante em texto corrido, e nunca fora das partes do jogo.
- Tipografia: **Chakra Petch** SemiBold(600)/Bold(700), local em `assets/fonts/` (sem CDN), para títulos/rótulos/números; texto corrido em fonte de sistema. Inter guardada na pasta como alternativa futura, não carregada.
- Motivo de forma único e repetido: cantos cortados em diagonal (cards, segmentos de barra).
- Proibido: glow generalizado, gradiente excessivo, glassmorphism, emoji como ícone, hover como requisito, texto pequeno em contorno, fonte nova sem decisão explícita.
- Energia de mangá crescente: linhas de velocidade, retícula e carimbos aparecem pouco na abertura, como faixa de movimento na próxima estação, como explosão na Estação 4 e na densidade máxima na **Conclusão**, que continua sendo o pico visual e o único lugar com sombra suave. Tudo dentro da paleta e das regras de contraste e movimento.

## Evidence on Hand

- Documentação viva do projeto é fonte de verdade e deve ser tratada como tal: `README.md`, `PROJECT.md`, `DECISIONS.md`, `DESIGN.md` (sistema visual) e `AI-WORKFLOW.md`.
- As decisões numeradas em `DECISIONS.md` registram as escolhas de produto, arquitetura e visual — qualquer mudança que contradiga uma DEC existente exige decisão explícita, não apenas uma preferência de implementação.
- Nenhuma mecânica, carta, regra ou dado do X-B0T deve ser inventado ou documentado pelo site além do que realmente existir na versão final do jogo (DEC-007).

## Product Principles

- Mobile-first não é estética: é a realidade de uso (DEC-001) — pouca informação por tela, navegação simples, leitura rápida.
- O conteúdo é aberto: nenhuma página exige cadastro, validação ou ordem de leitura (DEC-016).
- Simplicidade deliberada: sem framework, sem backend, sem complexidade adicionada "por boa prática" — só revisitar quando houver necessidade real (DEC-003).
- Frontend controla a experiência, não é camada de segurança real (DEC-006); nada crítico depende só do navegador.
- Planejado não é implementado: a Estação 4 e qualquer menção ao X-B0T só refletem o que existe de fato na versão final do jogo (DEC-007, lição registrada em AI-WORKFLOW.md §4.1).
- Transparência assumida sobre uso de IA no desenvolvimento (DEC-008) — decisões finais, testes e responsabilidade continuam humanos.

## Accessibility & Inclusion

- Contraste mínimo 4,5:1 em texto e 3:1 em elementos de interface.
- Alvos de toque de 44px; foco visível (atenção a `clip-path` cortando o contorno dos cantos diagonais).
- `prefers-reduced-motion` respeitado.
- Estados de interface (disponível, pendente) nunca dependem só de cor — sempre também texto, tamanho e ícone.
- Sem rolagem horizontal entre 360–430px (faixa mobile real de uso).
