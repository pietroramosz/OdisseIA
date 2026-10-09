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

**Status:** aceita e implementada

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

