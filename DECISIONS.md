# OdisseIA — Decisions

Este arquivo guarda as decisões que realmente mudaram o rumo, a estrutura ou a forma de desenvolver o OdisseIA.

A ideia não é registrar cada detalhe.

Trocar uma cor, ajustar margem, mudar uma frase ou mover um botão não precisa virar decisão formal.

---

## DEC-001 — Trabalhar com mobile-first

**Status:** aceita

### Contexto

Na feira, os visitantes vão usar o próprio celular enquanto passam pelas estações.

### Decisão

O site será pensado primeiro para telas pequenas.

### Por quê?

Porque esse é o cenário real de uso.

### O que isso muda?

- menos informação por tela;
- navegação mais simples;
- foco em leitura rápida;
- desktop continua sendo suportado, mas não é a prioridade.

---

## DEC-002 — Fazer as estações seguirem uma ordem

**Status:** aceita

### Contexto

A experiência física já possui uma sequência definida.

Se o site deixasse tudo aberto desde o começo, ele poderia acabar se desconectando do percurso da feira.

### Decisão

O visitante seguirá as estações em ordem, e o site deverá acompanhar esse progresso.

### Consequências

- precisamos registrar quais etapas já foram concluídas;
- a próxima etapa deve ser liberada conforme o avanço;
- os QR Codes passam a fazer parte desse fluxo.

---

## DEC-003 — Começar sem framework

**Status:** aceita

### Contexto

O projeto não possui, neste momento, uma complexidade que obrigue o uso de React, Vue ou outro framework.

### Decisão

Começar com:

- HTML;
- CSS;
- JavaScript.

### Por quê?

Porque isso já atende ao que precisamos e evita adicionar dependências sem necessidade.

### Consequências

O projeto fica mais simples, mas exige cuidado com a organização manual do código.

Se no futuro surgir uma necessidade real, essa decisão pode ser revista.

---

## DEC-004 — Usar `localStorage` para o progresso

**Status:** aceita para a primeira versão

### Contexto

Precisamos lembrar quais estações o visitante já concluiu.

### Opções consideradas

- `localStorage`;
- servidor;
- conta de usuário.

### Decisão

Usar `localStorage`.

### Por quê?

Porque o projeto não precisa, neste momento, de:

- login;
- conta;
- sincronização entre dispositivos;
- persistência crítica.

### Limitações aceitas

O progresso fica preso ao navegador e pode ser alterado manualmente.

Isso não é tratado como um problema grave porque o sistema serve para organizar a experiência, não para proteger dados importantes.

---

## DEC-005 — Reduzir de cinco para quatro estações

**Status:** aceita  
**Substitui:** estrutura inicial de cinco estações

### Contexto

No começo, existia uma quinta estação ligada a portfólio/documentação.

### Decisão

A experiência principal ficou com quatro estações:

1. jogos até 1999;
2. jogos de 2001 até hoje;
3. IA nos jogos;
4. Robot TCG.

### Por quê?

Porque o portfólio e a documentação não precisavam ocupar uma etapa física do percurso.

### Consequências

- o fluxo principal ficou menor;
- materiais antigos que falam em cinco estações precisam ser atualizados;
- o portfólio continua existindo, mas fora da experiência do visitante.

---

## DEC-006 — Não confiar no frontend como segurança real

**Status:** aceita

### Contexto

Qualquer pessoa pode abrir o DevTools e inspecionar JavaScript, URLs e `localStorage`.

### Decisão

O frontend será usado para controlar a experiência, não para proteger algo crítico.

### Regra adotada

Se algo puder ser descoberto ou alterado facilmente pelo F12 e isso causar um problema real, não deve depender só do frontend.

### Consequências

Não colocar no cliente:

- credenciais;
- tokens privados;
- segredos;
- chaves sensíveis;
- dados que precisem ficar ocultos;
- regras críticas de autorização.

---

## DEC-007 — Separar o site das decisões internas do Robot TCG

**Status:** aceita

### Contexto

A Estação 4 depende de um jogo desenvolvido por outro grupo.

### Problema

Se a equipe do site começasse a definir ou documentar as mecânicas antes do jogo ficar pronto, poderíamos criar divergências entre o que está escrito e o que realmente existe.

### Decisão

O grupo do Robot TCG continua responsável por:

- regras;
- cartas;
- energia;
- balanceamento;
- turnos;
- IA;
- implementação.

O site recebe apenas as informações finais necessárias para integração.

### Consequência

A Estação 4 só deve apresentar aquilo que realmente existir na versão final do jogo.

---

## DEC-008 — Não usar backend sem necessidade

**Status:** aceita para a primeira versão

### Contexto

O projeto atual é um site estático para uma feira escolar.

### Decisão

Não adicionar backend apenas por “boa prática” ou para deixar a arquitetura mais complexa.

### Por quê?

Porque hoje não existe requisito que justifique isso.

### Quando rever?

Se surgir necessidade de:

- autenticação;
- sincronização;
- persistência centralizada;
- segurança real;
- dados compartilhados.

---

## DEC-009 — Ser transparente sobre o uso de IA

**Status:** aceita

### Contexto

ChatGPT e Claude Code fazem parte do processo de desenvolvimento.

### Decisão

Assumir isso claramente na documentação.

### Como dividimos o trabalho

De forma geral:

- ChatGPT ajuda mais em planejamento, análise, arquitetura, UX, revisão e documentação;
- Claude Code ajuda mais na implementação;
- as pessoas responsáveis definem contexto, tomam decisões, testam e assumem o resultado.

### Consequências

- existe um `AI-WORKFLOW.md`;
- casos importantes de uso de IA podem ser registrados;
- não vamos fingir autoria manual de algo que não aconteceu;
- também não vamos tratar o projeto como se tivesse sido criado automaticamente.

---

## DEC-010 — Padrão de config.js

**Status:** aceita

### Contexto

Precisávamos de uma forma simples de armazenar configuração global (totalEstacoes, gameUrl, downloadUrl) acessível por outros scripts, considerando que o projeto roda localmente (file://) sem servidor e será mantido por estudantes sem experiência avançada em front-end.

### Decisão

Usar um objeto global simples (`const OdisseIAConfig = {...}`) carregado via tag `<script>` comum, em vez de ES modules.

### Por quê?

Porque ES modules exigem servidor HTTP e falham silenciosamente em `file://`, o que quebraria a abertura local dos arquivos — justamente o cenário de uso real do projeto (estudantes abrindo o HTML direto, sem servidor).

### Consequências

Esse padrão deve ser seguido pelos outros arquivos JS do projeto (progresso.js, qr.js, app.js) para manter consistência. Todos os scripts são carregados como `<script>` comuns, na mesma ordem, no fim do `<body>`.

---

## DEC-011 — Identidade visual do site alinhada ao Robot TCG

**Status:** aceita

### Contexto

O site e o Robot TCG são etapas conectadas da mesma jornada: o visitante completa as 4 estações no site e desbloqueia o jogo ao final. O Robot TCG já possui uma identidade visual definida (tema cyberpunk, TCG digital futurista de robôs, paleta cinza + roxo, verso das cartas já desenhado nessa combinação).

### Decisão

O site adotará a mesma linguagem visual do Robot TCG — estética cyberpunk, paleta cinza/preto como base com roxo como cor de destaque — em vez de desenvolver uma identidade visual independente.

### Por quê?

Porque o site e o jogo se complementam como uma experiência única, não como dois produtos separados. Continuidade visual reforça essa conexão para o visitante ao sair do site e entrar no jogo.

### Consequências

- A paleta cinza + roxo e a estética cyberpunk devem ser seguidas em todas as páginas do site, não apenas no Hub.
- O roxo é reservado para destaque (estados ativos, bordas, indicadores, progresso, elementos tecnológicos), nunca como cor dominante de texto corrido, para preservar legibilidade.
- Contraste e legibilidade em celular, inclusive sob iluminação variável de ambiente de feira, têm prioridade sobre intensidade visual (evitar glow/neon excessivo).
- O site mantém uma versão "mais limpa" dessa linguagem (mais espaço, leitura fácil) comparado à intensidade de HUD esperada dentro do próprio jogo.

---

## DEC-012 — Conteúdo das estações direto no HTML

**Status:** aceita

### Contexto

As 4 estações têm estrutura editorial fixa (título, introdução, 4 blocos, timeline/cards quando fizer sentido, fechamento), mas a copy final depende das falas presenciais e vai mudar.

### Decisão

O conteúdo de cada estação fica escrito diretamente no HTML (estacao-1.html a estacao-4.html). A parte visual fica no CSS compartilhado, sem arquivo de dados nem geração de páginas por JavaScript.

### Por quê?

É o mais simples para estudantes editarem, não exige build nem dependência (DEC-003) e trocar texto depois das falas é abrir o arquivo e mudar.

### Consequências

- O esqueleto das 4 páginas deve ser idêntico (mesmas classes, mesma ordem de blocos).
- O nome de cada estação aparece no Hub e na página da estação: ao mudar um, mudar o outro.
- Imagens ficam em assets/img/, nunca linkadas de outro site.

---

## DEC-013 — Identidade visual do Hub

**Status:** aceita (valores de cor provisórios)

### Contexto

A DEC-011 define a direção (cyberpunk limpo, cinza/preto com roxo de destaque). O Hub foi a primeira implementação e serve de referência para as demais páginas.

### Decisão

- Base escura com roxo como destaque (estados ativos, bordas, indicadores, progresso, ícones), nunca como cor de texto corrido.
- Chakra Petch SemiBold (600) como peso padrão da interface e Bold (700) para a maior hierarquia. Texto corrido em fonte de sistema. Fontes locais em assets/fonts/, sem CDN. A Inter fica na pasta como alternativa futura, sem ser carregada.
- Motivo de forma: cantos cortados em diagonal nos cards e nos segmentos da barra.
- Escala de espaçamento em variáveis CSS (4, 8, 12, 16, 24, 32 e 48 px).
- Estados (bloqueada, próxima, desbloqueada) distinguíveis por texto, tamanho e ícone, não só por cor. Nada depende de hover.
- A engrenagem SVG foi usada como placeholder na primeira implementação. Em 04/10/2026, ela foi substituída por PNGs derivados da arte do X-BOT para os estados aceso e apagado, sem filtro CSS.

### Consequências

- As cores finais dependem dos hex do X-BOT. Ficam em variáveis CSS em :root, então a troca é num ponto só.
- As outras páginas devem herdar do style.css, sem estilos próprios divergentes.

---

## DEC-014 — Contrato de validação dos QR Codes

**Status:** aceita

### Decisão

O QR da estação N abre validar.html?estacao=N. Cinco resultados possíveis: sucesso, repetido, fora de ordem, inválido e erro de armazenamento. Só "sucesso" altera o progresso. Se o salvamento falhar, nunca se mostra sucesso. Recarregar a página é seguro (vira "repetido"). O parâmetro é validado antes de qualquer uso e exibido somente via textContent.

### Limitações aceitas

- O QR não é segurança real (DEC-006).
- O progresso é por navegador. Confirmado em teste real: dois navegadores no mesmo celular têm progressos separados, e quem abre o QR em outro navegador cai em "fora de ordem". Por ora a mensagem da tela orienta a abrir no mesmo navegador do Hub. Decisão do grupo pendente (instrução impressa nas estações e/ou saída na tela de fora de ordem).

---

## DEC-015 — Hub desktop em grade 2x2

**Status:** substituída pela DEC-018 (21/10/2026): o Hub passou a ser uma rota horizontal de quatro paradas

### Contexto

O Hub possui exatamente quatro estações. Na adaptação para desktop, destacar uma estação ocupando a largura inteira deixava a composição dependente do estado do progresso e podia criar uma estação visualmente “sobrando” em relação às demais.

### Decisão

A partir de 900px, as quatro estações do Hub usam uma grade 2x2, mantendo os cards das estações com a mesma lógica espacial independentemente de estarem desbloqueados, próximos ou bloqueados.

A área de “Destino final” continua separada das quatro estações e pode ter comportamento próprio quando a jornada estiver completa.

### Por quê?

Quatro estações formam naturalmente duas linhas de duas colunas. Isso deixa a leitura do Hub mais previsível no desktop e evita que o estado de uma estação mude a estrutura geral da grade.

### Consequências

- No celular, o Hub continua em uma coluna.
- No desktop, estados de estação não devem usar `grid-column: 1 / -1` para ocupar as duas colunas.
- A hierarquia de “próxima estação” continua sendo comunicada por texto, tamanho, barra e ícone, sem depender de mudar a posição ou a largura do card.
- Mudanças futuras para outro arranjo desktop exigem revisão desta decisão.

---

## DEC-016 — Dossiê de 832px é compartilhado por qualquer página de conteúdo desbloqueado

**Status:** substituída pela DEC-018 (21/10/2026): as estações usam grade de margem, leitura e figura, sem a largura fixa de 832px. Registrada originalmente em 20/10/2026 a partir de uma implementação já existente

### Contexto

A DEC anterior sobre o dossiê técnico (`docs/ESTILO.md`, seção de layout) associava a largura de 832px (160px de contexto + 32px de respiro + até 640px de conteúdo) apenas às Estações 1–3 desbloqueadas. Na implementação da Conclusão (`final.html`), o layout de desktop (`@media (min-width: 900px)`) já reutiliza exatamente essa mesma largura — o próprio comentário no CSS registra a intenção: "mesma largura do dossiê das estações (832px)". Essa decisão de reuso nunca tinha sido documentada numa DEC nem atualizada na documentação de estilo; a consolidação de `docs/ESTILO.md` em `DESIGN.md` expôs a divergência.

### Decisão

O dossiê de 832px não é uma medida exclusiva das Estações 1–3: é a largura compartilhada por qualquer página que siga o padrão "dossiê técnico" (coluna de contexto/rótulo + coluna de conteúdo), hoje as Estações 1–3 desbloqueadas e a Conclusão completa.

### Por quê?

A reutilização já existe no código e não está sendo alterada por esta decisão — ela só estava documentada de forma incompleta. Registrar a regra no nível certo evita que o guia de estilo pareça estar errado e deixa claro, para qualquer página futura que adote o mesmo padrão de dossiê, que ela deve herdar essa largura em vez de definir a sua própria.

### Consequências

- `DESIGN.md` passa a descrever o dossiê de 832px como regra geral de padrão "dossiê", citando esta DEC.
- Nenhuma mudança de HTML, CSS ou comportamento visual decorre desta decisão — ela formaliza o que já estava implementado.
- Uma página nova que queira usar outra largura de dossiê, ou não seguir esse padrão, continua exigindo decisão explícita (DEC-015, DEC-016).

---

## DEC-017 — Refinamento visual (Direção A): pictogramas, carta da Estação 4 e jornada concluída × jogo acessível

**Status:** aceita (21/10/2026)

### Contexto

Um diagnóstico visual de 21/10/2026 comparou duas direções: refinar a identidade atual (A) ou torná-la mais expressiva (B). A Direção A foi escolhida: melhorar a execução dentro da linguagem existente, sem trocar de paleta e sem reabrir a DEC-011 nem a DEC-013. A implementação mudou regras que o `DESIGN.md` descrevia de outro jeito, e este registro formaliza quais.

### Decisão

1. **Pictograma de estação.** As páginas das Estações 1–4 ganham um pictograma decorativo no hero, em SVG inline no HTML, só com linhas retas e quadrados, em cinza (nunca roxo). Ele não entra no Hub nem na Conclusão, para o Hub não virar uma grade de cartões com ícone.
2. **Carta na Estação 4.** O `DESIGN.md` dizia "sem tratamento especial". Passa a valer um painel com o recorte do sistema, moldura de 1px em cinza e legenda. A moldura roxa, a rotação, a sombra e a textura continuam exclusivas da Conclusão, e o limite de 200–280px de largura e as duas páginas permitidas não mudam.
3. **Jornada concluída é diferente de jogo acessível.** O X-BOT só é tratado como acessível, no Hub e na Conclusão, quando `gameUrl` é uma URL absoluta http(s) válida. Sem isso, o X-BOT continua "desbloqueado" como recompensa, mas o acesso aparece como "aguardando liberação", sem botão. `gameUrl` e `downloadUrl` não foram alterados.
4. **Rótulos de ação do Hub descrevem a ação real.** Estação próxima: "Ver como desbloquear". Estação bloqueada: "Ver o que falta". Ambas abrem a tela de bloqueio, não o conteúdo. Estação validada: "Ver conteúdo". Os destinos dos links são os mesmos de antes.
5. **Hierarquia nas estações.** Numerais de capítulo maiores, primeira frase de cada capítulo em destaque e rótulos de época na linha do tempo (só períodos já presentes no conteúdo).

### Por quê?

As páginas de estação eram texto cinza em template repetido, o Hub repetia quatro cartões idênticos e a Conclusão sem link parecia uma tela de erro. O refinamento resolve isso sem nova paleta, sem asset novo (exceto a correção abaixo) e sem mexer em fluxo, QR ou progresso.

### Consequências

- A `#CD5EFA` continua provisória (DEC-013): nenhuma cor nova foi introduzida.
- A DEC-012 se mantém: as quatro páginas de estação têm o mesmo esqueleto, agora com o sprite do pictograma e o pictograma nos dois estados do hero.
- DEC-015 (Hub 2×2) e DEC-016 (dossiê de 832px) não mudam. O alinhamento dos cards do Hub foi uma correção de execução.
- `assets/img/engrenagem-acesa.png` teve o halo difuso removido do canal alfa (geometria, cores e tamanho preservados). É correção de execução, não mudança de regra: a regra "sem glow" já existia.
- Uma versão mais expressiva (Direção B) exigiria rever a DEC-011, a DEC-013 e várias regras do `DESIGN.md`, e continua fora de escopo.

---

## DEC-018 — Redesenho autoral: "Arquivo de Missão" com energia de mangá

**Status:** aceita e implementada (21/10/2026). Substitui a DEC-015 e a DEC-016, revisa a DEC-012 e partes da DEC-017.

### Contexto

Foi pedido um redesenho com identidade forte e direção de arte própria: composições elaboradas, recursos gráficos autorais e páginas desenhadas para este projeto. A identidade existente (grafite, roxo, Chakra Petch, geometria) e o universo do X-BOT (arte roxa de mangá, linhas de velocidade, engrenagens) deviam evoluir, não ser abandonados.

Algumas regras anteriores impediam o resultado. A grade 2×2 fazia do Hub quatro cartões iguais. O esqueleto idêntico das estações fazia todas parecerem o mesmo template. A "Rare Ink Rule" proibia o roxo justamente onde o X-BOT é roxo: na ilustração.

### Decisão

1. **Direção "Arquivo de Missão".**
   - Um traçado esquemático liga as quatro estações ao X-BOT: rota completa na abertura, posição do visitante no Hub, trilho na margem das estações e rota fechada com carimbos na Conclusão.
   - A energia de mangá (linhas de velocidade, retícula, silhuetas, carimbos) cresce ao longo da jornada.
   - O contrato da direção está em `.impeccable/surfaces/index-html.md`.
2. **Roxo como tinta de estado e de ilustração.** O roxo pode colorir ilustrações (linhas de velocidade, retícula, rota percorrida, nós ativos) e letras de display: o "IA" da palavra-marca, o "4" do placar, os numerais de estação. Continua proibido em texto corrido e como fundo de painel. Substitui a "Rare Ink Rule".
3. **Texturas como máscaras coloridas por token.** Retícula, linhas de foco e de movimento, hachura, grade e a seta são SVGs usados como `mask`, com cor vinda dos tokens. Assim a troca do roxo provisório continua num ponto só (mantém a DEC-013).
4. **Hub como rota (substitui a DEC-015).**
   - Trilho vertical no celular; rota horizontal de quatro paradas a partir de 900px.
   - Cada estado tem forma própria: validada (carimbo), próxima (faixa de movimento e folha de passos), bloqueada (hachura).
   - O Hub ganhou o link "Visão geral" para `index.html`.
5. **Estações com composição própria (revisa a DEC-012 e substitui a DEC-016).**
   - O que se mantém: o conteúdo no HTML, a ordem dos blocos (capa, briefing, capítulos, linha do tempo ou sequência, conexão) e os componentes compartilhados.
   - O que cada estação ganha: ilustração e diagrama do próprio assunto, e uma composição de capa diferente (via `data-estacao`).
   - Diagramas por estação:
     - Estação 1: quadra de Pong e escala 1950–2000 com os marcos na posição real;
     - Estação 2: rede de conexões e escala 2001–2026 com as épocas dos capítulos;
     - Estação 3: máquina de estados das quatro regras do capítulo, rota de pathfinding marcada como ilustração e escada de seis etapas;
     - Estação 4: a carta em palco de mangá.
   - A partir de 900px, a largura de 832px dá lugar a uma grade de margem (11rem), leitura (até 42rem) e coluna livre para figuras. A partir de 1100px entra o trilho da rota.
6. **Título primeiro.** Nenhum rótulo ou selo acima de título. Estados (PRÓXIMA ESTAÇÃO, BLOQUEADA, DESBLOQUEADO, SUCESSO) vêm depois do título. Rótulos de seção ficam na margem a partir de 900px e somem no celular.
7. **Carta do X-BOT (revisa a DEC-017).**
   - A carta continua só na Estação 4 e na Conclusão.
   - Na Estação 4 ganha palco com linhas de foco e retícula, inclinação e moldura branca, mas sem drop-shadow.
   - A sombra suave continua exclusiva da Conclusão.
   - Os pictogramas pequenos da DEC-017 deram lugar às ilustrações de capa.
8. **Ícones desenhados.** As setas ← e → em Unicode viraram um ícone SVG (`.seta`).
9. **CSS por página.** `assets/css/style.css` virou a base compartilhada: tokens, fontes, componentes e gramática gráfica. Cada página carrega também a sua folha em `assets/css/paginas/`. As páginas continuam herdando da base (mantém a DEC-013), e nenhum arquivo cresce além de cerca de 1.300 linhas.

### O que não muda

- Paleta, com `#CD5EFA` provisório (DEC-011, DEC-013); Chakra Petch 600/700 sem fonte nova; sem framework, CDN ou build; funcionamento via `file://` (DEC-010).
- Fluxo das estações, validação dos QR Codes (DEC-014), chave `odisseia:progresso` e contrato do progresso.
- O acesso ao X-BOT só vira botão com `gameUrl` absoluta http(s) (DEC-017). Sem ela, o estado pendente é mostrado como tal.
- Nenhum diagrama, ficha ou legenda inventa dados. As fichas trazem só período, número de capítulos, número de marcos e etapas, tirados do próprio conteúdo.

### Consequências

- `DESIGN.md` foi reescrito para o novo sistema, incluindo as regras nomeadas novas.
- A verificação usou testes de caracterização fora do repositório: unidade com `node:test` e E2E em Chrome headless via `file://`, incluindo um teste de preservação de todos os blocos de texto educativo.
- O teste em celular real e em outros navegadores continua pendente.
- Uma mudança futura de paleta continua num ponto só: os tokens de `style.css`.

---

## DEC-019 — Estações editoriais: módulos complementares, linha do tempo única e capa da Estação 4

**Status:** aceita e implementada (22/10/2026). Refina a DEC-018 (estações) e revisa a DEC-017 (carta da Estação 4). Não muda nenhuma outra regra.

### Contexto

Depois da DEC-018, as quatro estações ainda liam como o mesmo documento: só texto em fluxo e figuras soltas. No desktop, a terceira coluna da grade (a que sobrava depois das colunas de margem e de leitura) media cerca de 112px e ficava vazia. A Estação 1 e a Estação 2 mostravam os mesmos marcos duas vezes (escala horizontal e lista vertical). Na Estação 4, o numeral e a textura roxa eram posicionados por `calc()` e deslocamentos, e as linhas de foco apontavam para o meio de uma coluna vazia.

### Decisão

1. **Módulos editoriais (`.nota`).** Cada estação ganha módulos complementares (três em cada uma; quatro na Estação 3).
   - O módulo é sempre uma `.ficha`: moldura, título (h3), selo opcional, um ou dois trechos curtos do próprio capítulo e uma ilustração SVG.
   - A forma muda com o conteúdo: marco (o ano como monumento), conexão (diagrama primeiro), órbita, ideia-chave, conceito, cautela e, na Estação 4, herança e status.
   - **Os capítulos continuam capítulos**, com título e texto em fluxo. O módulo nunca os substitui, nunca é aninhado e nunca repete o parágrafo vizinho palavra por palavra.
   - **Só fatos que já estão na página.** Os trechos são citações literais do capítulo, conferidas por teste (sem diferenciar maiúsculas e pontuação). A única exceção é o painel "em validação" da Estação 4, que é o conteúdo original movido para dentro do módulo.
2. **Espaço lateral (revisa a DEC-018, item 5).** A grade dos capítulos passa a ser margem, leitura (até 38rem) e coluna lateral (13,5 a 21rem). O palco das estações sobe de 75rem para 84rem e o trilho da rota só aparece a partir de 1360px, para a coluna lateral ter largura útil. O módulo ocupa a coluna lateral à altura do parágrafo que destaca (`--ancora`); no celular entra no fluxo, logo depois dele. A coluna de leitura não é alargada.
3. **Linha do tempo única (Estações 1 e 2).** A escala proporcional por ano e a lista repetida foram removidas. No lugar, uma espinha só com os marcos agrupados por época: horizontal no desktop, vertical no celular. Cada acontecimento aparece uma vez; os 15 e os 12 marcos foram preservados.
4. **Percurso (Estação 3).** A escada de seis caixas iguais virou um caminho conectado: desktop em escada ascendente com nós que crescem e trechos que entram na etapa seguinte pela esquerda; celular em linha vertical.
5. **Capa da Estação 4 (revisa a DEC-017 e a DEC-018, item 7).** A carta sai da seção Identidade e vai para a capa, num palco: verso inclinado, leque de cartas por baixo, etiqueta de arquivo e linhas de foco que saem do centro da carta. O numeral passa a ser uma linha da grade, na mesma borda esquerda do título. A carta carrega sem `loading="lazy"` (está acima da dobra). Continua só na Estação 4 e na Conclusão, sem sombra suave.
6. **Capa das estações em grade.** Numeral, texto e arte são áreas de `grid-template-areas` em todas as estações. O título ganha um contorno da cor do fundo para cortar as linhas do numeral atrás das letras.
7. **Movimento por estação.** Um gesto por página, partindo de um estado já visível: Estação 1 acende a linha do tempo conforme a rolagem; Estação 2 traça a rede da capa; Estação 3 liga as etapas do percurso; Estação 4 revela numeral, foco, carta e leque. As Estações 1 e 3 usam `animation-timeline: view()` dentro de `@supports`, sem JavaScript; as 2 e 4 usam keyframes por tempo. Todas desligam com `prefers-reduced-motion` e com "Reduzir animações" do painel, e o estado final é o estado padrão do CSS.
8. **Regras antigas revogadas.** A terceira coluna livre para "figuras e escala do tempo" (DEC-018, item 5), o diagrama de escala proporcional da Estação 1 e da 2, e a carta em `.carta-moldura` dentro do briefing da Estação 4.

### O que não muda

- Conteúdo educativo, ordem dos capítulos, estados de bloqueio, fluxo das estações, QR Codes, `odisseia:progresso` e desbloqueio sequencial.
- Estado do X-BOT: o conteúdo em validação continua "em validação"; `gameUrl` e `downloadUrl` seguem `null`. Nada novo é afirmado sobre o jogo.
- HTML, CSS e JavaScript puros, sem dependência; `file://`; paleta, Chakra Petch e recorte diagonal como único contêiner.
- Nenhum JavaScript novo foi adicionado: o movimento é CSS.

### Consequências

- O CSS das estações foi dividido para respeitar o limite de cerca de 1.300 linhas por arquivo (DEC-018, item 9): `estacao.css` (capa em grade, capítulos, telas de bloqueio, trilho) e `estacao-modulos.css` (módulos, linha do tempo, percurso, palco da carta e movimento), carregado depois dele.
- `DESIGN.md`, `.impeccable/surfaces/index-html.md` e `.impeccable/design.json` foram atualizados para este sistema.
- A verificação usou testes fora do repositório (unidade, E2E por Chrome headless via `file://`), incluindo conferência de fatos dos módulos, unicidade dos marcos, geometria da capa da Estação 4, movimento e auditoria de contraste. Teste em celular real, leitor de tela e outros navegadores continua pendente.
