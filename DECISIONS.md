# OdisseIA — Decisions

Este arquivo guarda as decisões que realmente mudaram o rumo, a estrutura ou a forma de desenvolver o OdisseIA.

A ideia não é registrar cada detalhe. Trocar uma cor, ajustar uma margem, mudar uma frase ou mover um botão não precisa virar decisão formal.

Cada decisão segue a mesma estrutura: status, contexto, decisão, por quê e o que muda. Só ficam aqui as escolhas que orientam o projeto; o resto fica no código e em `DESIGN.md`.

As decisões ligadas à experiência presencial da feira (DEC-002, DEC-004, DEC-011, DEC-012 e DEC-014) continuam registradas como foram tomadas. Elas valeram até 30/10/2026 e foram descontinuadas pela DEC-016; o status de cada uma diz o que ficou.

---

## DEC-001 — Trabalhar com mobile-first

**Status:** aceita

### Contexto

Na feira, os visitantes usavam o próprio celular enquanto passavam pelas estações, e depois dela boa parte do público continua acessando assim.

### Decisão

O site é pensado primeiro para telas pequenas.

### Por quê?

Porque esse é o cenário real de uso.

### O que muda?

- menos informação por tela;
- navegação mais simples e leitura rápida;
- o desktop continua suportado, mas não é a prioridade.

---

## DEC-002 — Fazer as estações seguirem uma ordem

**Status:** substituída pela DEC-016 (valeu na feira de 29/10/2026)

### Contexto

A experiência física tem uma sequência definida. Se o site deixasse tudo aberto desde o começo, poderia se desconectar do percurso da feira.

### Decisão

O visitante segue as estações em ordem, e o site acompanha esse progresso.

### Por quê?

Porque o site existe para complementar o percurso físico, não para ser lido fora dele.

### O que muda?

- é preciso registrar quais etapas já foram concluídas;
- a próxima etapa só é liberada conforme o avanço;
- os QR Codes passam a fazer parte do fluxo.

---

## DEC-003 — Começar sem framework e sem backend

**Status:** aceita para a primeira versão

### Contexto

O projeto é um site estático para uma feira escolar e não tem requisito que exija React, Vue, servidor ou banco de dados.

### Decisão

Usar HTML, CSS e JavaScript puros, sem framework e sem backend.

### Por quê?

Porque isso já atende ao que precisamos e evita dependências e complexidade sem necessidade.

### O que muda?

- o código é mais simples, mas exige cuidado com a organização manual;
- a decisão pode ser revista se surgir necessidade real de autenticação, sincronização, persistência centralizada, segurança real ou dados compartilhados.

---

## DEC-004 — Usar `localStorage` para o progresso

**Status:** substituída pela DEC-016 (o progresso foi removido; `localStorage` segue só nas preferências de acessibilidade, DEC-013)

### Contexto

Precisamos lembrar quais estações o visitante já concluiu. As opções eram `localStorage`, servidor ou conta de usuário.

### Decisão

Guardar o progresso no `localStorage`, na chave `odisseia:progresso`.

### Por quê?

Porque o projeto não precisa de login, conta, sincronização entre dispositivos nem persistência crítica.

### O que muda?

- o progresso fica preso ao navegador e pode ser alterado manualmente, o que é aceitável: o sistema organiza a experiência, não protege dados importantes;
- trocar de navegador ou limpar os dados do site zera a jornada.

---

## DEC-005 — Reduzir de cinco para quatro estações

**Status:** aceita

### Contexto

No começo, existia uma quinta estação ligada a portfólio e documentação.

### Decisão

A experiência principal tem quatro estações: IA nos jogos; evolução dos jogos até 2000; evolução dos jogos de 2001 até hoje; e X-B0T.

### Por quê?

Porque o portfólio e a documentação não precisavam ocupar uma etapa física do percurso.

### O que muda?

- o fluxo principal ficou menor;
- o portfólio passou a ser um complemento aberto na Conclusão (DEC-015).

---

## DEC-006 — Não confiar no frontend como segurança real

**Status:** aceita

### Contexto

Qualquer pessoa pode abrir o DevTools e inspecionar JavaScript, URLs e `localStorage`.

### Decisão

O frontend controla a experiência, mas não protege nada crítico. Se algo puder ser descoberto ou alterado facilmente pelo F12 e isso causar um problema real, não deve depender só do frontend.

### Por quê?

Porque tudo o que roda no navegador está nas mãos de quem o usa.

### O que muda?

- o cliente não guarda credenciais, tokens privados, segredos, chaves sensíveis, dados que precisem ficar ocultos nem regras críticas de autorização;
- progresso e QR Codes eram tratados como organização da jornada, não como barreira.

---

## DEC-007 — Separar o site das decisões internas do X-B0T

**Status:** aceita

### Contexto

A Estação 4 depende de um jogo desenvolvido por outro grupo. Se o site definisse ou documentasse mecânicas antes de o jogo ficar pronto, o texto poderia divergir do que realmente existe.

### Decisão

O grupo do X-B0T continua responsável por regras, cartas, energia, balanceamento, turnos, IA e implementação. O site recebe só as informações finais necessárias para integração.

### Por quê?

Porque planejado não é o mesmo que implementado, e cada grupo deve responder pelo que construiu.

### O que muda?

- a Estação 4 apresenta apenas o que existe na versão final do jogo;
- a grafia oficial é **X-B0T**, com zero (o jogo se chamava Robot TCG).

---

## DEC-008 — Ser transparente sobre o uso de IA

**Status:** aceita

### Contexto

ChatGPT, Claude e Claude Code fazem parte do processo de desenvolvimento.

### Decisão

Assumir isso claramente na documentação: as ferramentas ajudam no planejamento, na revisão e na implementação, e as pessoas responsáveis definem o contexto, decidem, testam e assumem o resultado.

### Por quê?

Porque esconder o uso de IA seria desonesto, e apresentar o projeto como gerado automaticamente também.

### O que muda?

- existe o `AI-WORKFLOW.md`, que descreve o processo;
- a documentação não atribui a autoria manual de algo que não aconteceu.

---

## DEC-009 — Configuração em `config.js` sem ES modules

**Status:** aceita

### Contexto

Precisávamos de um lugar simples para a configuração global (`totalEstacoes`, `gameUrl`, `downloadUrl`). O projeto roda localmente por `file://`, sem servidor, e é mantido por estudantes.

### Decisão

Usar um objeto global (`const OdisseIAConfig = {...}`) carregado por `<script>` comum, em vez de ES modules.

### Por quê?

Porque ES modules exigem servidor HTTP e falham em `file://`, que é como os estudantes abrem o HTML.

### O que muda?

- os demais scripts (`app.js`, `cenas.js`…, e na feira também `progresso.js` e `qr.js`) seguem o mesmo padrão: `<script>` comuns, na mesma ordem, no fim do `<body>`;
- a URL do jogo existe só em `config.js`.

---

## DEC-010 — Identidade visual: grafite, azul e o roxo do X-B0T

**Status:** aceita; revisada em 23/10/2026 (a versão inicial seguia a paleta cinza e roxo do jogo)

### Contexto

O site e o X-B0T fazem parte da mesma jornada e devem parecer da mesma experiência, mas o jogo precisa continuar reconhecível como produto à parte. A sala da feira é azul (`#142146`).

### Decisão

- base grafite, escura e neutra, com texto em branco;
- azul como acento principal, numa escala de mesma matiz: `#142146` como referência escura, `#3558c4` para linhas e molduras, `#5b8cff` para estados, progresso, ações e foco, e `#8fb0ff` no hover;
- roxo `#CD5EFA`, cor definitiva do X-B0T, só onde o jogo é o assunto: cartão e engrenagem no Hub, carta, Estação 4 e bloco do jogo na Conclusão. A navegação da jornada continua azul mesmo dentro dessas áreas.

### Por quê?

Porque o grafite dá legibilidade sob a luz variável da feira, o azul liga o site ao ambiente da sala e o roxo mantém o X-B0T como o único ponto de outra cor.

### O que muda?

- as cores ficam em variáveis CSS em `:root`, então a troca acontece num ponto só;
- o azul nunca é fundo de painel nem cor de texto corrido, e o roxo nunca aparece fora do jogo;
- contraste e legibilidade têm prioridade sobre efeito visual, e estados nunca dependem só de cor.

Os valores completos, os temas e as regras de uso estão em `DESIGN.md`.

---

## DEC-011 — Contrato de validação dos QR Codes

**Status:** substituída pela DEC-016 (valeu na feira de 29/10/2026)

### Contexto

O QR Code é a ponte entre a estação física e o conteúdo digital, e precisa ter um resultado previsível em qualquer situação: primeira leitura, repetição, ordem errada ou falha.

### Decisão

O QR da estação N abre `validar.html?estacao=N`. Há cinco resultados possíveis: sucesso, repetido, fora de ordem, inválido e erro de armazenamento. Só "sucesso" altera o progresso.

### Por quê?

Porque um contrato fechado evita que a página avance o progresso por acidente e deixa claro, para o visitante, o que aconteceu.

### O que muda?

- se o salvamento falhar, nunca se mostra sucesso, e recarregar a página é seguro (vira "repetido");
- o parâmetro é validado antes de qualquer uso e exibido somente via `textContent`;
- o progresso é por navegador: quem abre o QR em outro navegador cai em "fora de ordem", o que foi confirmado em teste real. As telas do site orientam o visitante a usar o mesmo navegador do Hub;
- o QR não é segurança real (DEC-006).

---

## DEC-012 — Jornada concluída não é o mesmo que jogo acessível

**Status:** parcialmente substituída pela DEC-016: o X-B0T não depende mais das quatro estações validadas, mas só vira link com uma `gameUrl` válida

### Contexto

Completar as quatro estações desbloqueia o X-B0T, mas o acesso depende de um endereço válido do jogo.

### Decisão

No Hub e na Conclusão, o X-B0T só vira link quando as quatro estações estão validadas **e** `OdisseIAConfig.gameUrl` é uma URL absoluta http(s). O link abre na mesma aba.

### Por quê?

Porque o visitante não deve ver um botão que leva a lugar nenhum, e nenhuma navegação comum deve liberar o jogo: o acesso é consequência do progresso já salvo.

### O que muda?

- sem URL válida, o X-B0T continua "desbloqueado" como recompensa, mas o acesso aparece como "aguardando liberação", sem botão;
- no celular na vertical, o acesso mostra o aviso "Para jogar pelo celular, vire o aparelho na horizontal.", que não força a rotação nem bloqueia o acesso.

---

## DEC-013 — Movimento: o sistema é o padrão, a escolha do usuário vence

**Status:** aceita

### Contexto

No computador da escola, "Reduzir animações" não podia ser desligada: o sistema pedia movimento reduzido, o interruptor aparecia ligado e travado, e nada era gravado. Era um defeito de projeto, não da máquina.

### Decisão

Sem escolha salva, vale a preferência do sistema (`prefers-reduced-motion`). A escolha explícita é gravada em `odisseia:acessibilidade` (`movimento: "sistema" | "reduzido" | "normal"`) e vence o sistema nos dois sentidos.

### Por quê?

Porque a pessoa precisa poder ligar e desligar o movimento por conta própria, qualquer que seja o padrão do aparelho.

### O que muda?

- o interruptor nunca fica travado;
- `acessibilidade.js` grava `data-movimento="reduzido"` ou `"normal"` no `<html>` antes da primeira pintura, e o CSS só corta animações por esse atributo, sem condicionar nenhuma animação a `prefers-reduced-motion`;
- se o navegador bloquear o `localStorage`, nenhuma preferência persiste entre páginas, e o painel avisa que a escolha vale só naquela página.

---

## DEC-014 — Scanner de QR Code pela câmera

**Status:** substituída pela DEC-016 (valeu na feira de 29/10/2026)

### Contexto

Faltava ler os QR Codes dentro do site, sem depender do app Câmera do celular.

### Decisão

Um scanner (`scanner.js`, `scanner.css`) abre num `<dialog>` a partir do Hub, das telas de bloqueio e do fim das estações. Ele só pede a câmera depois de "Abrir câmera" e não grava nem envia nada. Usa a API nativa `BarcodeDetector`, em vez de uma biblioteca de decodificação.

### Por quê?

Porque uma biblioteca de decodificação conflitaria com a regra de não adicionar dependências (DEC-003). O custo é que a API não existe no Safari do iOS nem no Firefox; nesses navegadores o scanner explica que o app Câmera lê o mesmo QR e cai no mesmo fluxo de validação.

### O que muda?

- reaproveita `resultadoParaEstacao()` de `qr.js`, a mesma regra de `validar.html`; `progresso.js` e `qr.js` não mudam;
- aceita só um link http(s) que termine em `/validar.html` com o parâmetro `estacao` de 1 a 4. O endereço não é comparado e **nada é aberto**: o texto lido só fornece o número;
- todas as trilhas da câmera são paradas ao fechar, ler, cancelar, trocar de aba ou sair da página;
- a câmera exige contexto seguro, então o alvo é a versão em HTTPS.

---

## DEC-015 — Portfólio na Conclusão, em leitor local

**Status:** aceita

### Contexto

O portfólio (documento Word de 27 páginas, entregue como `portfolio-fonte.docx`) é um complemento da jornada, não uma quinta estação (DEC-005). Incorporar o arquivo hospedado no SharePoint da escola foi tentado e descartado: visitantes sem conta da escola viam a tela de login, e a incorporação dependia de permissões que o site não controla.

### Decisão

`portfolio.html` reproduz o documento original em HTML e CSS puros, sem URL externa: mesmo texto, mesma ordem e o layout do Word. Na Conclusão, o botão "Ver portfólio" abre esse documento num `<dialog>` modal com um `<iframe>` de mesma origem (`portfolio.js`, `portfolio.css`).

### Por quê?

Porque um documento local não depende de conta nem de permissão externa, e reproduzir o original (em vez de redesenhá-lo) mantém o conteúdo exatamente como o grupo entregou.

### O que muda?

- o `.docx` é só a fonte e não entra no site; mudar o documento exige regerar o HTML e republicar;
- o único ajuste visual é o tema: a folha e o texto seguem o tema do site, inclusive alto contraste, e as faixas cinza dos anexos e as imagens mantêm as cores originais;
- o botão é secundário, para "Jogar X-B0T" continuar sendo a única ação sólida da Conclusão;
- as imagens dos QR Codes das estações 1 a 4 não entram no site, porque o QR de cada estação só deve existir depois da visita física e `portfolio.html` é pública;
- a página é só leitura, mas isso não impede copiar texto ou salvar imagens; ela não tem paginação nem fidelidade pixel a pixel, preserva os erros de digitação do original e lista nomes de alunos, como ele.

---

## DEC-016 — Abrir o site e descontinuar QR Codes, progresso e bloqueios

**Status:** aceita (30/10/2026); substitui DEC-002, DEC-004, DEC-011 e DEC-014, e em parte a DEC-012

### Contexto

Os QR Codes e o progresso sequencial foram criados para uma finalidade temporária e declarada desde o início: comprovar a passagem física dos visitantes pelas quatro estações durante a feira. A feira aconteceu em 29/10/2026. Depois dela, bloquear o conteúdo só atrapalha quem chega ao site sem ter passado pelas estações, e a câmera e o `localStorage` do progresso não têm mais utilidade.

### Decisão

O OdisseIA passa a ser totalmente aberto. As quatro estações, a Conclusão, o X-B0T, os Mini Jogos, o portfólio e os créditos ficam sempre acessíveis, em qualquer ordem e direto pela URL. Foram removidos `validar.html`, `progresso.js`, `qr.js`, `scanner.js`, `scanner.css` e `validar.css`, junto com os estados `desbloqueada`, `proxima`, `bloqueada` e as telas de bloqueio.

### Por quê?

Porque o sistema cumpriu a finalidade e mantê-lo seria código morto e uma barreira artificial. Registrar a remoção, em vez de apagar as decisões antigas, preserva o fato de que a experiência da feira usou QR Codes e progresso.

### O que muda?

- o Hub é um menu livre, com as quatro estações e a Conclusão disponíveis; a Conclusão deixa de exigir 4/4 e o numeral do herói virou um "4" fixo, sem contagem de progresso;
- o site não usa mais a câmera nem pede permissões;
- a chave `odisseia:progresso` não é mais lida nem gravada; `app.js` a apaga dos navegadores que ainda a têm (a limpeza pode ser removida no futuro);
- o X-B0T vira link sempre que `OdisseIAConfig.gameUrl` é uma URL http(s) válida (DEC-012, nessa parte, continua valendo);
- o `portfolio.html` não foi alterado: é o documento entregue e descreve a feira como ela aconteceu;
- o histórico completo do sistema está no Git (último commit com ele: `6fd8c57`).
