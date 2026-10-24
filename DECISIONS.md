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

**Status:** aceita; a paleta foi revisada pela DEC-020 (o site passou a ser azul, o roxo ficou como cor do X-B0T)

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

**Status:** aceita (valores de cor provisórios); as cores foram revisadas pela DEC-020, e a regra de ter um ponto único de troca de cor continua valendo

### Contexto

A DEC-011 define a direção (cyberpunk limpo, cinza/preto com roxo de destaque). O Hub foi a primeira implementação e serve de referência para as demais páginas.

### Decisão

- Base escura com roxo como destaque (estados ativos, bordas, indicadores, progresso, ícones), nunca como cor de texto corrido.
- Chakra Petch SemiBold (600) como peso padrão da interface e Bold (700) para a maior hierarquia. Texto corrido em fonte de sistema. Fontes locais em assets/fonts/, sem CDN. A Inter fica na pasta como alternativa futura, sem ser carregada.
- Motivo de forma: cantos cortados em diagonal nos cards e nos segmentos da barra.
- Escala de espaçamento em variáveis CSS (4, 8, 12, 16, 24, 32 e 48 px).
- Estados (bloqueada, próxima, desbloqueada) distinguíveis por texto, tamanho e ícone, não só por cor. Nada depende de hover.
- A engrenagem SVG foi usada como placeholder na primeira implementação. Em 04/10/2026, ela foi substituída por PNGs derivados da arte do X-B0T para os estados aceso e apagado, sem filtro CSS.

### Consequências

- As cores finais dependem dos hex do X-B0T. Ficam em variáveis CSS em :root, então a troca é num ponto só.
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
3. **Jornada concluída é diferente de jogo acessível.** O X-B0T só é tratado como acessível, no Hub e na Conclusão, quando `gameUrl` é uma URL absoluta http(s) válida. Sem isso, o X-B0T continua "desbloqueado" como recompensa, mas o acesso aparece como "aguardando liberação", sem botão. `gameUrl` e `downloadUrl` não foram alterados.
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

Foi pedido um redesenho com identidade forte e direção de arte própria: composições elaboradas, recursos gráficos autorais e páginas desenhadas para este projeto. A identidade existente (grafite, roxo, Chakra Petch, geometria) e o universo do X-B0T (arte roxa de mangá, linhas de velocidade, engrenagens) deviam evoluir, não ser abandonados.

Algumas regras anteriores impediam o resultado. A grade 2×2 fazia do Hub quatro cartões iguais. O esqueleto idêntico das estações fazia todas parecerem o mesmo template. A "Rare Ink Rule" proibia o roxo justamente onde o X-B0T é roxo: na ilustração.

### Decisão

1. **Direção "Arquivo de Missão".**
   - Um traçado esquemático liga as quatro estações ao X-B0T: rota completa na abertura, posição do visitante no Hub, trilho na margem das estações e rota fechada com carimbos na Conclusão.
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
7. **Carta do X-B0T (revisa a DEC-017).**
   - A carta continua só na Estação 4 e na Conclusão.
   - Na Estação 4 ganha palco com linhas de foco e retícula, inclinação e moldura branca, mas sem drop-shadow.
   - A sombra suave continua exclusiva da Conclusão.
   - Os pictogramas pequenos da DEC-017 deram lugar às ilustrações de capa.
8. **Ícones desenhados.** As setas ← e → em Unicode viraram um ícone SVG (`.seta`).
9. **CSS por página.** `assets/css/style.css` virou a base compartilhada: tokens, fontes, componentes e gramática gráfica. Cada página carrega também a sua folha em `assets/css/paginas/`. As páginas continuam herdando da base (mantém a DEC-013), e nenhum arquivo cresce além de cerca de 1.300 linhas.

### O que não muda

- Paleta, com `#CD5EFA` provisório (DEC-011, DEC-013); Chakra Petch 600/700 sem fonte nova; sem framework, CDN ou build; funcionamento via `file://` (DEC-010).
- Fluxo das estações, validação dos QR Codes (DEC-014), chave `odisseia:progresso` e contrato do progresso.
- O acesso ao X-B0T só vira botão com `gameUrl` absoluta http(s) (DEC-017). Sem ela, o estado pendente é mostrado como tal.
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
- Estado do X-B0T: o conteúdo em validação continua "em validação"; `gameUrl` e `downloadUrl` seguem `null`. Nada novo é afirmado sobre o jogo.
- HTML, CSS e JavaScript puros, sem dependência; `file://`; paleta, Chakra Petch e recorte diagonal como único contêiner.
- Nenhum JavaScript novo foi adicionado: o movimento é CSS.

### Consequências

- O CSS das estações foi dividido para respeitar o limite de cerca de 1.300 linhas por arquivo (DEC-018, item 9): `estacao.css` (capa em grade, capítulos, telas de bloqueio, trilho) e `estacao-modulos.css` (módulos, linha do tempo, percurso, palco da carta e movimento), carregado depois dele.
- `DESIGN.md`, `.impeccable/surfaces/index-html.md` e `.impeccable/design.json` foram atualizados para este sistema.
- A verificação usou testes fora do repositório (unidade, E2E por Chrome headless via `file://`), incluindo conferência de fatos dos módulos, unicidade dos marcos, geometria da capa da Estação 4, movimento e auditoria de contraste. Teste em celular real, leitor de tela e outros navegadores continua pendente.

---

## DEC-020 — Identidade azul do OdisseIA; o roxo fica com o X-B0T

**Status:** aceita e implementada (23/10/2026); **revisada no mesmo dia pela DEC-023**, que devolveu a base grafite e restringiu o azul ao traçado. O que continua valendo: o roxo é só do X-B0T (item 2), a grafia X-B0T com zero (item 7) e o resto abaixo que a DEC-023 não cita. Os itens 1, 3, 4 e 5 foram substituídos, e o 6 foi ajustado (sem a barra lateral no primeiro parágrafo, sem rótulos que repetem títulos e sem módulos que repetem o texto).

### Contexto

A sala da feira será azul. O site precisava conversar com esse ambiente sem perder personalidade, e o X-B0T precisava continuar reconhecível como um jogo à parte, com a sua própria cor.

### Decisão

1. **Paleta azul a partir das cores da sala:** azul da sala `#031634` (fundo), azul intermediário `#142146` (superfície em destaque) e azul do logo `#242b57` (filetes decorativos). Texto, superfícies e o azul-luz de estado (`#5b9cff`) nascem delas. Todos os pares de texto foram medidos: mínimo de 4,5:1 nos quatro temas (escuro, claro, e os dois em alto contraste).
2. **O roxo é do X-B0T (`--cor-xbot`, `#cd5efa`, ainda provisório).** Aparece no cartão e na engrenagem do X-B0T no Hub, na carta e na explosão no fim da rota da abertura, na silhueta do destino final, na capa e nos módulos da Estação 4 e no bloco do X-B0T da Conclusão. A navegação da jornada continua azul em todos esses lugares (`--cor-marca`).
3. **Engrenagens:** as quatro estações usam engrenagens azuis (`engrenagem-azul-acesa.png` e `engrenagem-azul-apagada.png`), geradas das originais por troca de matiz, sem alterar a geometria nem o tamanho. As roxas originais ficam só para o X-B0T.
4. **Luz por estação:** dentro da família azul, a Estação 1 usa gelo (`#4fd0f5`), a 2 o azul-luz e a 3 pervinca (`#9aa8ff`). A 4 usa o roxo do jogo. O alto contraste mantém um azul só.
5. **Hub reorganizado no desktop:** herói maior (palavra-marca e placar de progresso monumentais), rota num palco próprio com engrenagens maiores e trilho mais grosso onde já foi percorrido, cartão da próxima estação projetado acima dos outros e destino final com a Conclusão em azul e o X-B0T em roxo.
6. **Leitura nas estações:** abertura do capítulo com a primeira frase em corpo maior e barra na cor da estação, nomes e conceitos com marca-texto discreto, filete de abertura em cada seção, numeral do capítulo fixo na margem durante a leitura e, em telas largas, a primeira frase do briefing como abertura da estação. Nenhum texto foi reescrito por causa disso.
7. **Grafia:** o nome oficial é **X-B0T**, com zero. Na Chakra Petch o zero é quase igual à letra O, então em títulos e botões ele leva uma barra desenhada em CSS (`.zero`).

### Alterações editoriais (únicas em texto educativo)

- **Estação 4, seção Identidade.** "O cinza, o roxo e os cantos cortados que acompanham você desde o Hub vêm do X-B0T" deixou de ser verdadeiro com a nova paleta. Passou a "Os cantos cortados que acompanham você desde o Hub vêm do X-B0T, e o roxo desta estação é a cor do jogo". O marcador "cinza" do módulo foi retirado. O restante do parágrafo (as engrenagens saíram da mesma arte do verso da carta) continua igual. **Precisa de confirmação do grupo.**

### O que não muda

Fluxo, progresso (`odisseia:progresso`), QR Codes, regras de desbloqueio, conteúdo científico, HTML/CSS/JS puros, `file://`.

### Consequências

- `.impeccable/design.json` ainda descreve a paleta anterior e precisa ser regenerado com a ferramenta.
- O roxo `#cd5efa` continua dependendo da confirmação do grupo do X-B0T.

---

## DEC-021 — Área útil de 92–94% da tela e escala por tamanho de tela

**Status:** aceita e implementada (23/10/2026). Substitui a largura fixa de 75rem (84rem nas estações) da DEC-018 e da DEC-019.

### Contexto

Em monitores desktop as laterais ficavam largas demais: 75rem é 62% de uma tela de 1920px, e a coluna lateral das estações parava em 21rem.

### Decisão

1. A margem lateral é fluida (`--gutter: clamp(1rem, 3.4vw, 3.5rem)`) e o palco vai até 108rem, o que dá 93% da largura em 1280, 1440 e 1920px, e cerca de 84% em 2560px. Vale para todas as páginas.
2. A raiz cresce em monitores grandes (`--escala-tela`: 1,125 a partir de 1600px e 1,25 a partir de 2200px), então texto e espaços acompanham a largura extra. O tamanho de texto do painel de acessibilidade multiplica essa escala.
3. Texto corrido continua com 62 caracteres por linha no máximo (medido: até ~75ch em 1920px, com a escala). O espaço extra vai para a coluna lateral dos módulos (até 26rem), para figuras, linha do tempo e percurso.

### Consequências

- Nenhuma página rola na horizontal entre 360 e 2560px (testado em 14 larguras).
- A validação de QR mantém a coluna estreita de 36rem, de propósito.

---

## DEC-022 — Movimento: o sistema é o padrão, a escolha do usuário vence

**Status:** aceita e implementada (23/10/2026). Corrige o comportamento do painel de acessibilidade.

### Contexto

No computador da escola, "Reduzir animações" não podia ser desligada. A investigação reproduziu o problema: quando o sistema pede movimento reduzido, o painel mostrava o interruptor ligado e desabilitado (`disabled`), nada era gravado e o CSS desligava as animações por `@media (prefers-reduced-motion: reduce)`, sem nenhuma forma de a pessoa religá-las. Em outro computador, sem a preferência do sistema, tudo funcionava. Era um defeito de projeto, não um problema da máquina da escola.

### Decisão

1. O movimento tem três opções, como o tema: **Sistema** (padrão, segue `prefers-reduced-motion`, inclusive mudanças em tempo real), **Reduzir** e **Completas**. Nenhuma fica travada.
2. A escolha explícita é gravada em `odisseia:acessibilidade` (`movimento: "sistema" | "reduzido" | "normal"`) e vence o sistema nos dois sentidos. Dados antigos (`movimento: true`) viram "Reduzir"; `false` ou ausente vira "Sistema".
3. O script grava sempre `data-movimento="reduzido"` ou `"normal"` no `<html>` antes da primeira pintura. O CSS só corta animações por esse atributo; a mídia do sistema vale apenas se o script não rodar. As animações das Estações (antes atrás de `prefers-reduced-motion: no-preference`) deixaram de ter essa condição.
4. A opção "Sistema" mostra o que o sistema pede agora ("reduzidas" ou "completas").

### Limitação

Se o navegador da escola bloquear o `localStorage`, nenhuma preferência persiste entre páginas (o painel avisa que a escolha vale só nesta página). Isso não foi observado nem testado naquele computador.

---

## DEC-023 — Base grafite, azul #142146 só no traçado e roxo só no X-B0T

**Status:** aceita e implementada (23/10/2026); **a paleta foi revista pela DEC-024** (o azul passou a ser o acento principal). Continuam valendo os itens 4 a 12 (exceto o que a DEC-024 troca: engrenagem clara, painel com "Mais opções" e a Estação 4). A DEC-021 (largura e escala) e a DEC-022 (movimento) continuam valendo.

### Contexto

A DEC-020 pintou o site de azul de ponta a ponta (fundos, cartões, acentos, engrenagens) e misturou azul e roxo no Hub e na abertura sem uma regra clara. Pedido da equipe: recuperar a base grafite da versão anterior, usar o #142146 só no que antes era traço roxo e reservar o #CD5EFA ao X-B0T.

### Decisão

1. **Base grafite neutra de volta:** fundo `#0c0c10`, superfícies `#16161d`, `#111116` e `#1f1f29`, texto `#f3f3f6`, apagado `#6f6f7d`, os mesmos valores do commit 7f51320. Os temas claro e de alto contraste voltaram à base anterior.
2. **Três cores, três funções:**
   - **Azul de traçado `#142146` (`--cor-azul`):** filetes e separadores de seção, trilho do Hub e trilho da rota nas estações, molduras de módulos, grade, retícula, linhas de velocidade e de foco, marca-texto sob nomes e conceitos. Nunca é fundo de painel, cartão ou página, nem cor de texto.
   - **Branco-sinal (`--cor-destaque`):** estado e ênfase (validada, próxima estação, progresso, botão principal, foco). É o que a cor roxa fazia antes nesses papéis.
   - **Roxo `#CD5EFA` (`--cor-xbot`):** só onde o jogo é o assunto: cartão, engrenagem e selo do X-B0T no Hub, carta e explosão da abertura, silhueta do destino, quarta linha do índice, Estação 4 e bloco do jogo na Conclusão. A navegação da jornada continua na cor do site (`--cor-marca`).
3. **Engrenagens:** validada = `engrenagem-clara.png` (prata, derivada da roxa por dessaturação); ainda não = a cinza original. As azuis da DEC-020 foram apagadas. A roxa original é só do X-B0T.
4. **Contraste do azul:** o #142146 sobre o grafite tem 1,2:1. Por isso desenha só o que é decorativo ou estrutural, em traços de 2 a 4px, e nenhuma informação depende dele: o estado do Hub está nas engrenagens, nos selos e no texto. Informação que precisa ser vista usa branco-sinal ou apagado. A auditoria de contraste de texto passa nos quatro temas.
5. **Marca:** o "IA" da palavra-marca voltou a se distinguir do "Odisse" só por contorno (mesma gramática dos numerais vazados).
6. **Hub e abertura:** voltam à composição do commit 7f51320, com as correções da DEC-021 (largura) e da DEC-022 (movimento) e o acesso real ao X-B0T (abaixo). O herói maior e o palco escuro da rota da DEC-020 foram retirados.
7. **Acesso ao X-B0T no Hub:** o cartão do X-B0T, à direita da Conclusão, é bloqueado até 4/4 (cadeado, engrenagem cinza, moldura roxa apagada). Com 4/4 e `OdisseIAConfig.gameUrl` válida (http/https absoluta) ele vira um link para o jogo, **na mesma aba**. Sem URL válida o cartão fica como "AGUARDANDO LIBERAÇÃO", sem link. A URL continua só em `config.js`. O acesso ao jogo continua sendo uma consequência do progresso já salvo: nenhuma navegação comum o libera.
8. **Aviso de giro:** "Para jogar pelo celular, vire o aparelho na horizontal." aparece junto ao acesso liberado (cartão do Hub e acima do botão "Jogar X-B0T" na Conclusão), só com menos de 900px e na vertical. Não força a rotação nem bloqueia o acesso. Entra na descrição do link apenas enquanto é exibido.
9. **Painel de acessibilidade compacto:** dois interruptores diretos, "Reduzir animações" e "Alto contraste". Tema, tamanho do texto e "Restaurar padrão" ficam em "Mais opções", recolhido. O comportamento da DEC-022 foi mantido: o interruptor mostra o que vale agora, nunca fica travado, e mexer nele grava a escolha explícita, que vence o sistema. O seletor de três opções (Sistema, Reduzir, Completas) saiu da interface; o valor `"sistema"` continua existindo na gravação, como "sem escolha".
10. **Estação 3 simplificada:** os quatro módulos ilustrados (Utility AI, aprendizado, novos desafios, tecnologias juntas) foram removidos porque repetiam o parágrafo vizinho palavra por palavra; a chave "continuam úteis" do percurso também. Os dois diagramas que explicam algo (máquina de estados e rota de pathfinding) ficam, com no máximo 28rem de largura; o de pathfinding vai para a coluna lateral em telas largas e o da máquina de estados, que tem texto, fica no fluxo.
11. **Texto das estações:** módulos que repetiam o parágrafo foram retirados ou perderam o trecho citado (Estações 1, 2 e 4); rótulos de seção que repetiam o título (BRIEFING, LINHA DO TEMPO, SEQUÊNCIA, PRÓXIMA CONEXÃO, IDENTIDADE) saíram; "apresentado na pesquisa" saiu da Estação 3; o primeiro parágrafo do capítulo 1 da Estação 2 voltou ao texto de `docs/OdisseIA_Conteudo_Site_Estacoes.md` (a versão anterior acrescentava "lançado em 2000"). Em telas largas o texto de leitura passa a 1,125rem e 66 caracteres por linha.
12. **Estação 4, Bastidores 02:** recebe o relato do desenvolvedor principal (inspiração em Yu-Gi-Oh! e Pokémon, mecânicas próprias, demonstração na feira em formulação condicional) e um link para o site do jogo, preenchido por `app.js` a partir de `gameUrl` (oculto sem URL válida; mesma aba). O módulo "EM VALIDAÇÃO" e sua lista continuam, porque regras, cartas e papel da IA ainda dependem de confirmação.

### O que não muda

Fluxo, `progresso.js`, `qr.js`, chave `odisseia:progresso`, regras de desbloqueio, `downloadUrl: null`, HTML/CSS/JS puros e `file://`.

### Pendências para a equipe

- Confirmar a alteração editorial da Estação 4 já registrada na DEC-020 e o texto novo do Bastidores 02.
- Confirmar se o roxo `#CD5EFA` e a URL do jogo são os definitivos.

---

## DEC-024 — Azul como acento principal, painel de acessibilidade à vista, scanner de QR Code e carta do X-B0T

**Status:** aceita e implementada (23/10/2026). Substitui os itens de cor da DEC-023 (1 a 5), o painel com "Mais opções" (item 9) e o conteúdo do Bastidor 02 (item 12). Mantém o resto da DEC-023 e as DEC-021 e DEC-022.

### Contexto

A DEC-023 devolveu o grafite, mas deixou o branco como cor de estado e o #142146 quase invisível sobre ele (1,2:1): o branco virou o acento dominante e o azul "mal aparecia". Pedido: o azul deve ocupar o lugar do roxo, com o grafite como base e o roxo só no X-B0T. Também: o "Mais opções" do painel de acessibilidade incomodou, a dinâmica do site não convencia, a Estação 4 precisava de uma apresentação melhor do jogo e faltava ler os QR Codes pela câmera.

### Decisão

1. **Escala de azul da mesma matiz (~226°), com o #142146 como referência escura:** `--cor-azul` #142146 (fundos sutis), `--cor-azul-linha` #3558c4 (linhas, trilhos, separadores, molduras de módulo, texturas; 3,1:1 sobre o grafite), `--cor-destaque` #5b8cff (estado, progresso, ação, foco; 6,2:1, texto escuro sobre ele) e `--cor-azul-claro` #8fb0ff (hover). Tema claro: acento #2a55d6 (6,2:1 sobre branco). Alto contraste: #9db8ff (escuro) e #0b3a9a (claro). A base grafite não muda.
2. **Papéis:** o azul de acento volta a fazer o que o roxo fazia (barras de progresso, próxima estação, carimbo VALIDADA, botão principal, trilho percorrido, nós ativos, numerais de capítulo, "IA" da marca). O branco é só texto. Medido nas páginas renderizadas: 85 a 95% de pixels grafite, 0,4 a 6,2% de azul de acento, 0,9 a 3,2% de branco.
3. **Roxo só no X-B0T:** as áreas do jogo re-pintam `--cor-destaque` e `--cor-azul-linha` com `--cor-xbot` (cartão, engrenagem, carta e explosão da abertura, Estação 4 inteira, bloco do jogo na Conclusão). A navegação (trilho da rota, painel de acessibilidade, scanner, fechamento das páginas, barra de leitura) volta ao azul com `--cor-marca` e `--cor-marca-linha`.
4. **Engrenagens:** validada = `engrenagem-azul.png` (derivada da roxa por troca de matiz); ainda não = a cinza original. A prateada da DEC-023 foi removida.
5. **Painel de acessibilidade, tudo à vista:** o "Mais opções" saiu. O painel mostra de uma vez "Reduzir animações", "Alto contraste", "Tema", "Tamanho do texto" e "Restaurar padrão", em cerca de 430px. Nenhuma função foi removida; a persistência, a compatibilidade com dados antigos, a prioridade da escolha manual e o suporte a `prefers-reduced-motion` são os da DEC-022.
6. **Dinâmica (diagnóstico → direção):** as páginas eram blocos sem conexão (troca seca, Hub estático, nenhuma ação óbvia "agora", estação bloqueada e fim de conteúdo sem próximo passo). A direção foi **fazer a jornada ter uma próxima ação sempre visível e responder a ela com movimento proporcional**:
   - painel "Próximo QR Code" no Hub, logo depois do herói, com o QR esperado e o botão de escanear; com 4/4 vira ponte para a Conclusão;
   - o Hub se monta ao abrir (barras que enchem, trilho que se estende, engrenagens que acendem, cartões em sequência, ~1,1s);
   - troca de página com fade curto (View Transitions entre documentos), barra de leitura nas estações, scanner que sobe;
   - a próxima estação deixa de ter duas ações sólidas concorrentes: o botão do QR é a única ação cheia; a barra do cartão fica na superfície;
   - os passos de desbloqueio saíram do cartão da próxima estação (duplicavam o painel e abriam um vazio na linha); continuam nas telas de bloqueio;
   - fim das Estações 1 a 3: "Voltar ao Hub" e uma orientação para continuar a jornada física.
   Tudo respeita `data-movimento`; nada altera progresso, QR ou desbloqueio.
7. **Estação 4:**
   - o card de pendências ("Ainda não confirmado", "EM VALIDAÇÃO") foi substituído pelo card de origem do X-B0T, com o relato do desenvolvedor principal (inspiração em Yu-Gi-Oh! e Pokémon, mecânicas próprias);
   - o texto principal ficou com a explicação sobre o site do jogo, o acesso e a observação sobre o que ainda depende de confirmação;
   - o acesso é uma carta digital com frente e verso (ver DESIGN.md): virar, ativar o verso, animação curta e redirecionamento na mesma aba para `OdisseIAConfig.gameUrl`; sem URL válida a carta não aparece;
   - o "Bastidor 02" não lista mais as pendências (como funciona uma partida, cartas, IA, instruções); a observação "só entram aqui depois de confirmados" continua.
8. **Scanner de QR Code pela câmera** (`assets/js/scanner.js`, `assets/css/scanner.css`):
   - Abre num `<dialog>` a partir de botões `data-escanear` no Hub, nas telas de bloqueio e no fim das estações. Explica o uso da câmera e **só a pede depois de "Abrir câmera"**, preferindo a traseira. Não há upload nem leitura de arquivos; os quadros ficam na memória e nada é gravado ou enviado.
   - **Regras de validação reaproveitadas:** o scanner só extrai o número da estação do QR e chama `resultadoParaEstacao()` de `qr.js`, a mesma função de `validar.html`. `progresso.js` e `qr.js` não foram alterados. O QR da estação N libera a estação N; só o QR da próxima na ordem avança; repetido e fora de ordem não alteram nada; ler o conteúdo de uma estação não substitui a visita física à próxima.
   - **Formato oficial:** só vale um link completo http(s), sem credenciais, que termine em `/validar.html` com o único parâmetro `estacao` entre 1 e 4. O endereço não é comparado (o QR impresso pode apontar para a hospedagem final), mas **nada é aberto**: o texto lido só serve para obter o número. Qualquer outra coisa é "QR Code inválido".
   - **Ciclo de vida da câmera:** todas as trilhas são paradas ao cancelar, fechar, ler, Esc, trocar de aba e sair da página (inclusive bfcache). Pedidos atrasados de câmera (cancelou, reabriu, aba oculta) são descartados e a trilha que chegar é parada na hora.
   - **Textos:** nenhuma tela manda escanear o QR da estação seguinte; a orientação sempre liga o código ao orientador ("entregue pelo orientador") e à visita física.
9. **Compatibilidade (verificada em caniuse):** o scanner usa a API nativa `BarcodeDetector`. Ela existe no Chrome e no Samsung Internet do Android (e ChromeOS/macOS), **não existe no Safari do iOS** (só atrás de uma opção desligada) **nem no Firefox**. Nesses navegadores o scanner não liga a câmera e explica que o app Câmera do celular lê o mesmo QR Code (que é um link para `validar.html`) e cai no mesmo fluxo de validação, no navegador em que o Hub foi aberto. A leitura dentro do site no iOS exigiria uma biblioteca de decodificação de QR (por exemplo uma cópia local de jsQR, ~130 KB, Apache-2.0), o que conflita com a regra de não adicionar dependências. **Isso não foi feito e depende de aprovação**; o ponto de troca é `criarDecodificador()` em `scanner.js`.
10. **Limitação de ambiente:** a câmera exige contexto seguro. Em `file://` o Chrome a libera para teste, mas o alvo é a versão em HTTPS (GitHub Pages ou hospedagem final).

### O que não muda

Fluxo, `progresso.js`, `qr.js`, chave `odisseia:progresso`, regras de desbloqueio e ordem, `downloadUrl: null`, HTML/CSS/JS puros, sem CDN nem backend, `file://` para as páginas.

### Pendências para a equipe

- Aprovar (ou não) a cópia local de uma biblioteca de decodificação para o iOS; sem ela o fluxo no iPhone usa o app Câmera.
- Testar a leitura real em Chrome/Android e o fluxo do app Câmera no iPhone, com os QR Codes impressos.
- Confirmar o texto do card de origem e do acesso ao site do jogo (a frase sobre a demonstração está em formulação condicional).

---

## DEC-025 — Entrada dinâmica das estações, figuras da Estação 3 à direita, avanço pelo progresso e correção do roxo no tema claro

### Contexto

As Estações 1 e 2 liam como documentos estáticos; na Estação 3 o diagrama do capítulo ficava abaixo do texto; o fim das estações só tinha "Voltar ao Hub"; havia tons lilases fora do X-B0T; as abas não tinham ícone próprio.

### Decisão

1. **Entrada e leitura:** sequência de capa comum a todas as estações e um sotaque por estação (arcade, sinal, árvore, palco). Revelações por rolagem só dentro de `@supports (animation-timeline: view())`; sem suporte, ou com movimento reduzido (`data-movimento`, DEC-022), nada anima e nada fica escondido. Impressão desliga as animações.
2. **Estação 3:** a capa passa a ter texto à esquerda e árvore à direita; a partir de 1100px as duas figuras dos capítulos ficam à direita do texto (coluna de leitura de 27rem, coluna lateral maior, para o texto do diagrama continuar com 12px ou mais). Abaixo de 1100px a leitura continua vertical.
3. **Delta:** o triângulo de retícula do palco da Estação 4 (`.palco-carta__reticula`, `clip-path` triangular) e o delta final da árvore da Estação 3 (`.arte__delta`) foram preservados sem alteração de forma; ganharam só uma entrada animada.
4. **Avanço:** botão "Ir para a Estação 0N" (ou "Ver a Conclusão", na Estação 4) calculado a partir de `obterProgresso()` (via `estacaoDesbloqueada()` e `jornadaCompleta()`). Bloqueado é um botão `aria-disabled` com a orientação de visita física e QR do orientador. Não grava nada e não substitui o QR.
5. **Cor:** os neutros do tema claro tinham matiz lilás (`#f5f3f8`, `#e2deea`…) e liam como roxo na abertura e nas estações; passaram a azul-acinzentados. Comentários que ainda diziam "roxo" para elementos azuis foram corrigidos. O roxo `#cd5efa` continua só nas áreas do X-B0T.
6. **Favicon:** SVG local (grafite e azul, a rota da jornada), com PNG de 32px e `apple-touch-icon` de reserva.

### O que não muda

`progresso.js`, `qr.js`, `config.js`, scanner, chave `odisseia:progresso`, regras de ordem e desbloqueio, HTML/CSS/JS puros.

---

## DEC-026 — Composição editorial das Estações 1 e 2, refinos da 3 e polimento da 4

### Contexto

Mesmo com animações (DEC-025), as Estações 1 e 2 liam como texto corrido: cerca de 40% da largura ficava vazia no desktop, os quatro capítulos tinham a mesma aparência e o Pokémon e a Twitch eram módulos pequenos demais para o peso que têm no conteúdo.

### Decisão

1. **Placas** (`.placa`): uma ilustração por trecho que a pede, sem moldura de cartão, na coluna lateral do desktop e como pausa no fluxo do celular. Só representam o que o parágrafo vizinho diz e levam legenda de "Ilustração". As sete placas de S1 e S2 e a de S3 estão listadas no DESIGN.md.
2. **Palcos editoriais** (`.palco-editorial`): o módulo do Pokémon (`nota--orbita`) e o da Twitch (`nota--marco`) saíram da coluna lateral e viraram composições de largura de capítulo, com a frase do próprio texto em corpo grande. O texto foi mantido palavra por palavra (só o título e o selo "2011" do módulo da Twitch, que repetiam o parágrafo, deram lugar ao numeral e à frase). Isso revisa a regra "um módulo nunca repete o parágrafo" da DEC-019 para o caso de composição e não de módulo.
3. **Ritmo:** a abertura dos capítulos perde a barra colorida de 3px (borda lateral acima de 1px) e fica só em corpo maior e texto pleno; o espaço vertical entre seções cai no celular (2rem); a lista de sete itens da Estação 3 passa a duas colunas a partir de 600px; a frase "A IA tradicional, portanto, não desapareceu." ganha destaque de fecho.
4. **Movimento:** o texto de leitura deixa de se animar (a rodada anterior esmaecia parágrafos ao entrar, uma mesma entrada para todo o conteúdo). Ficam a linha de abertura das seções, os títulos e o desenho de cada placa por rolagem, com `view-timeline` por figura e `--i` para escalonar.
5. **Legibilidade:** todo texto de SVG das estações passa a ter 12px ou mais já renderizado em telas de 360px (diagramas da Estação 3 e rótulos da capa).
6. **Estação 4:** preservada. Só perde a barra lateral roxa dos parágrafos de abertura, como as demais.
7. **Hospedagem:** GitHub Pages em `/OdisseIA/`. Todos os caminhos são relativos; verificado com um servidor que só responde sob esse prefixo e com caixa exata.

### O que não muda

`progresso.js`, `qr.js`, `config.js`, scanner, chave `odisseia:progresso`, regras de ordem e desbloqueio, HTML/CSS/JS puros.

---

## DEC-027 — Linha do tempo da Estação 1 até 2000, marcos com link, controle de texto e easter egg "VOCÊ É BIGODE"

### Contexto

A linha do tempo da Estação 1 terminava sem fecho: no desktop a espinha seguia até a borda da página depois de "Anos 1990" e, no celular, a lista acabava em 1996. O PROJECT.md dizia "a linha do tempo termina em 1999"; a direção desta rodada fixou o limite em 2000. O controle "Tamanho do texto" do painel de acessibilidade tinha o conteúdo colado nas bordas e a terceira opção ("Extra grande") ficava mais alta que as outras. O Hub tinha descrições e estados desalinhados entre os quatro cartões. A abertura e o Hub prometiam um easter egg que não existia.

### Decisão

1. **Linha do tempo da Estação 1 termina em 2000.** O ano 2000 fecha a espinha como limite da estação (nó de alvo azul e a frase "Aqui termina a linha do tempo desta estação."), não como marco: nenhum fato novo, nenhum evento de 2000 e nenhum depois. Os 15 marcos e a ficha "Período 1950–1999" não mudam; o conteúdo de 2000 em diante continua na Estação 2. A espinha termina no nó (grade com a coluna do 2000; no celular, por `grid-row` e `bottom` negativo).
2. **Marcos com link, um por capítulo:** 1962 (Spacewar!), 1972 (Pong), 1983 (crise dos videogames) e 1994 (PlayStation) levam a `#cap-experimentos`, `#cap-arcades`, `#cap-anos-80` e `#cap-anos-90`. Os anos vizinhos (1961, 1975, 1977, 1984, 1985, 1996…) não são link, para não haver alvos apertados lado a lado. O link ocupa a linha inteira (52–73px de altura), o ano é sublinhado e uma linha "No capítulo 0N" com seta para cima diz para onde vai (a seta aponta para cima porque os capítulos vêm antes da linha do tempo). `scroll-margin-top` mantém o título do capítulo à vista, a linha de abertura do capítulo-alvo passa para o azul de acento (`:target`) e a rolagem suave só vale com `data-movimento="normal"`.
3. **Controle de tamanho do texto:** padding interno de 12px/8px, 12px entre as opções, as três opções com a mesma altura (`display: flex` no rótulo e `flex: 1` no corpo), grupos mais afastados. Funcionamento inalterado.
4. **Hub (só visual, sem tocar no progresso):** o "/4" do placar recua (o feito é o destaque); título de seção "Estações" no mesmo padrão do "Destino final" (no desktop, o bloco azul curto dos títulos de briefing no lugar do filete); títulos de duas linhas reservadas, padding superior fixo e faixa de estado com altura mínima, então título, descrição e estado alinham nos quatro cartões; a engrenagem de uma estação validada gira 30° no hover (não a da próxima, que tem o anel de alvo, nem as bloqueadas).
5. **Easter egg "VOCÊ É BIGODE"** (`assets/js/bigode.js` e `assets/css/bigode.css`): cinco cliques com no máximo 700ms entre eles na marca (`[data-bigode]` no h1 da abertura e do Hub) abrem um `<dialog>` em tela cheia: linhas de foco que irrompem, carimbo de recorte diagonal que bate, as letras de BIGODE em sequência e a frase "Palavra dada, palavra cumprida." Fecha com o botão, Esc ou clicando fora. Não lê nem grava progresso, não mexe em links e não usa biblioteca. `index.html` deixa de ser "sem scripts": carrega também `bigode.js`, que não toca na jornada. Cores só por tokens (azul; o roxo continua do X-B0T) e movimento por `data-movimento`.
6. **Polimento:** o selo "BLOQUEADO" do destino na abertura passa de 11px para 12px.

### O que não muda

`progresso.js`, `qr.js`, `config.js`, scanner, chave `odisseia:progresso`, regras de ordem e desbloqueio, conteúdo histórico, HTML/CSS/JS puros.

---

## DEC-028 — Estação 1 "até 2000", easter egg em janela pequena e acabamento do Hub

### Contexto

A DEC-027 fechou a linha do tempo da Estação 1 em 2000, mas o título, a rota, a ficha e a abertura ainda diziam "até 1999". O easter egg ocupava a tela inteira, o que o fazia parecer uma página nova e não uma surpresa. O Hub empilhava três caixas (cabeçalho, painel do QR e cartões) com o mesmo peso, e o painel do QR deixava um vazio grande no meio no desktop.

### Decisão

1. **Estação 1 = "Evolução dos jogos até 2000".** O título (página e tela de bloqueio), o nome no Hub e na abertura (`ESTACOES_NOMES`, `jornada__nome`), a rota "ATÉ 2000" das quatro estações, o rótulo da abertura, a ficha "Período 1950–2000", o ano final da quadra de Pong da capa e os documentos (README, PRODUCT, PROJECT e o texto-fonte em `docs/`) passam a dizer 2000. Isso revisa a frase da DEC-027 que mantinha "1950–1999" na ficha. Nada de conteúdo muda: os 15 marcos (1950 a 1996), os textos dos capítulos e o "Até o fim dos anos 1990" da conexão ficam como estavam, e a Estação 2 continua em 2001. As menções históricas a 1999 (DEC-005, DEVLOG) não foram reescritas.
2. **Easter egg em janela pequena** (revisa o item 5 da DEC-027). A tela cheia dá lugar a um `<dialog>` de até 23rem no centro, com fundo escurecido (`::backdrop`, mesmo véu escuro do scanner). O cartão tem recorte diagonal, moldura azul de 3px e leve giro; as linhas de foco irrompem em octógono ao redor dele; as letras de BIGODE entram em sequência. A janela se fecha sozinha em 5s (`DURACAO_MS`), com uma barra de tempo que esvazia e sincroniza pela variável `--bigode-duracao`, e também pelo botão "Fechar", por Esc e por um clique fora dela. Com movimento reduzido nada anima e a barra de tempo some (ficaria cheia para sempre). O gatilho (cinco cliques de até 700ms) e a regra de não tocar no progresso não mudaram.
3. **Hub** (só visual; `progresso.js`, `qr.js` e as regras de desbloqueio não mudam):
   - a barra de progresso ganha o estado "próxima" (segmento tracejado, número em destaque), então cheio, tracejado e fino se leem pela forma, como o trilho da rota; o número da próxima estação no trilho também fica em destaque;
   - o painel do QR ganha o numeral vazado da próxima estação (no celular, no canto; no desktop, entre o texto e as regras, onde antes havia um vazio), com título maior no desktop;
   - os cartões de estações validadas ganham a retícula de mangá no canto (a marca de conquista do sistema);
   - hover de estação ativa sublinha o título em azul (as bloqueadas não, porque não levam a nada novo); o espaço sob "Estações" no desktop foi reduzido.
4. **Polimento das demais páginas:** revisão de todas as páginas em 360, 430, 768 e 1440px (sem overflow, imagem quebrada ou erro de console). Nenhuma mudança além do que está acima, porque as páginas de leitura já têm hierarquia e ritmo adequados.

### O que não muda

`progresso.js`, `qr.js`, `config.js`, scanner, chave `odisseia:progresso`, regras de ordem e desbloqueio, conteúdo histórico, HTML/CSS/JS puros, caminhos relativos para o GitHub Pages em `/OdisseIA/`.

---

## DEC-029 — Linha do tempo nas quatro estações

### Contexto

Só a Estação 1 tinha uma linha do tempo completa (DEC-027). A 2 tinha a lista de marcos sem fecho nem links, a 3 tinha uma escada de etapas sem nenhuma data e a 4 não tinha nada. A intenção é que as quatro tenham a sua, ligada ao assunto, na mesma gramática visual.

### Decisão

1. **Mesma gramática, composição por assunto.** Espinha, nós quadrados, anos em Chakra, "No capítulo 0N" com seta para cima, no máximo um link por capítulo e nenhum ano vizinho linkado. A composição muda com o conteúdo:
   - **Estação 1** (DEC-027): linha fechada, termina em 2000 (nó de alvo).
   - **Estação 2:** os 12 marcos de 2001 a 2026 (já existentes, nenhum acrescentado), com os anos 2001, 2011, 2017 e 2020 levando aos capítulos. Termina em **"Em aberto"** (nó tracejado), porque a evolução continua; é o oposto do fecho em 2000.
   - **Estação 3:** a escada de seis técnicas vira a linha do tempo, com as etapas "Máquinas de estados", "Pathfinding", "Machine Learning" e "IA generativa" levando aos capítulos e **três datas de referência pesquisadas**: 1968 (artigo do A\*), 2004 (Halo 2 e as Behavior Trees) e 2016 (AlphaGo vence Lee Sedol). As outras etapas não têm data de propósito (são famílias de técnicas que coexistem), e uma nota sob a linha diz isso e cita as fontes. As fontes completas estão em `docs/OdisseIA_Conteudo_Site_Estacoes.md`.
   - **Estação 4:** "A trajetória do X-B0T", **sem datas** (não existem na documentação e a DEC-007 proíbe afirmar o que o jogo não confirmou). Quatro pontos tirados do que a página já diz: referências (Yu-Gi-Oh! e Pokémon), mecânicas próprias, demonstração na feira e site do jogo (com link para o bastidor 02) e um último ponto tracejado, "A confirmar" (regras, cartas e papel da IA). Roxo, como o resto da estação.
2. **Fim de linha por `--antes`.** A espinha termina no último nó (e não no fim do texto dele) com uma variável de grade: 5 nas Estações 1 e 2 (quatro épocas e o fim) e 4 na Estação 4. O nó tracejado (`.epoca--aberta`) vale para "Em aberto" e "A confirmar".
3. **Âncoras** nos capítulos das Estações 2, 3 e 4 (`cap-nova-geracao`, `cap-internet`, `cap-mundos-maiores`, `cap-hoje`, `cap-estados`, `cap-caminhos`, `cap-ml`, `cap-generativa`, `bastidor-por-que`, `bastidor-jogo`); todos os links são âncoras da própria página, então não mudam a navegação entre páginas, o progresso nem os QR Codes.
4. **Revisão do conteúdo histórico** (Estações 1 e 2): os marcos continuam batendo com o texto-fonte e com os fatos conhecidos; nada foi alterado.

### Lacunas assumidas

- Estação 4: nenhuma data disponível. Para uma linha do tempo datada, o grupo do X-B0T precisa informar datas e o que está confirmado.
- Estação 3: sem data para regras simples, máquinas de estados, Utility AI e IA generativa. O ano do Halo 2 (2004) é de conhecimento geral e não foi conferido numa fonte própria.

### O que não muda

`progresso.js`, `qr.js`, `config.js`, scanner, chave `odisseia:progresso`, regras de ordem e desbloqueio, fluxo de navegação, conteúdo dos capítulos, HTML/CSS/JS puros, caminhos relativos para o GitHub Pages em `/OdisseIA/`.

---

## DEC-030 — Acabamento das linhas do tempo das Estações 3 e 4 e da palavra-marca

### Contexto

Na revisão final, a linha do tempo da Estação 3 estava carregada (quatro linhas por etapa, três acentos azuis competindo, escada apertada em telas médias) e a da Estação 4 trazia um ponto "A confirmar" que o grupo prefere explicar na apresentação. A palavra-marca da validação do QR era a única toda branca.

### Decisão

1. **Estação 4:** o ponto "A confirmar" sai e nada entra no lugar. A trajetória fica com três pontos (referências, mecânicas próprias, na feira e no site) e a espinha termina no último (`--antes: 3`; modificador `.rota-tempo--trajetoria`, que substitui `--quatro`). A frase sobre regras, cartas e IA continua só no texto do bastidor 02.
2. **Estação 3:**
   - a escada ascendente só aparece a partir de 1200px (seis colunas de pelo menos ~130px); abaixo disso, a lista vertical na coluna de leitura;
   - o contador (`01`, `02`…) fica na mesma linha do nome na lista vertical e acima dele na escada;
   - a data vira uma frase curta sob o nome ("1968 artigo do algoritmo A*") e fica dentro do bloco clicável, na ordem nome, data, "No capítulo 0N";
   - o nome da etapa não leva mais sublinhado (o "No capítulo 0N" com seta é o sinal de link, como nas outras estações) e o espaço entre etapas passa de 24 para 32px;
   - a nota sob a linha é a versão enxuta: "As técnicas surgiram em épocas diferentes e continuam em uso; por isso, nem todas têm uma data definida. Referências: A* — Hart, Nilsson e Raphael (IEEE, 1968); Halo 2 e Behavior Trees — 2004, descritos por Damián Isla (GDC, 2005); AlphaGo contra Lee Sedol — março de 2016 (DeepMind)." As fontes completas continuam em `docs/OdisseIA_Conteudo_Site_Estacoes.md`.
3. **Identidade:** a palavra-marca da validação do QR passa a ter o "IA" em azul, como no Hub e na abertura, e a barra de rolagem usa a paleta (`scrollbar-color` em azul de linha sobre o fundo, fina). Nada mais foi alterado: a revisão de todas as páginas não achou outros defeitos reais de alinhamento, espaçamento ou estado interativo.
4. **Verificação de regressão:** as Estações 1 e 2, o Hub, a abertura e a Conclusão foram capturadas em 390px e 1440px antes e depois (com movimento reduzido) e ficaram idênticas byte a byte. As mudanças de CSS ficaram restritas a seletores da Estação 3 (`.etapa*`, `.percurso`) e da Estação 4 (`.rota-tempo--trajetoria`), mais o `html` (barra de rolagem).

### O que não muda

`progresso.js`, `qr.js`, `config.js`, scanner, chave `odisseia:progresso`, regras de ordem e desbloqueio, navegação, conteúdo dos capítulos, Estações 1 e 2, HTML/CSS/JS puros, caminhos relativos para o GitHub Pages em `/OdisseIA/`.
