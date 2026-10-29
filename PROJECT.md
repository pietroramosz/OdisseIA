# OdisseIA — Project Documentation

Este arquivo explica como o OdisseIA está organizado e o que é preciso saber para mantê-lo. A apresentação do projeto fica no [`README.md`](./README.md), o público e os princípios do produto em [`PRODUCT.md`](./PRODUCT.md), o sistema visual em [`DESIGN.md`](./DESIGN.md) e o porquê das escolhas em [`DECISIONS.md`](./DECISIONS.md).

Quando algo ainda não existe, o texto diz isso com todas as letras.

---

## 1. Visão geral

O **OdisseIA** é um projeto para uma feira escolar que combina estações físicas, conteúdo digital, QR Codes e progressão entre etapas, tudo acessado pelo celular do visitante. No fim, ele libera o jogo **X-B0T** (antes chamado Robot TCG).

O site não substitui a apresentação física: é uma extensão dela, que conecta as estações e oferece o que faz sentido no celular.

---

## 2. Estado das funcionalidades

Usamos quatro estados para evitar confusão:

- **Definido:** a decisão foi tomada;
- **Planejado:** sabemos como deve funcionar, mas ainda não foi implementado;
- **Implementado:** já existe no código;
- **Validado:** foi implementado e testado no fluxo esperado.

Situação em 28/10/2026:

- **Validado:** sistema de progresso (`progresso.js`), testado no console, inclusive com dado corrompido e número decimal; Hub, nos estados 0 a 4, em emulador e no celular; validação de QR (`validar.html` e `qr.js`), por console, por URL e com a câmera de um celular; painel de acessibilidade; e a experiência com os QR Codes finais, nos testes físicos.
- **Implementado:** `index.html` (porta de entrada estática); Estações 1 a 4, com conteúdo e estados `desbloqueada`, `próxima` e `futura`; `final.html`, com estados de jornada completa e incompleta; scanner de QR pela câmera; portfólio na Conclusão (testado em Chrome headless; sem registro de teste em Safari, Firefox ou leitor de tela); e a página de minijogos.
- **Em aberto:** nada. Não há pendências conhecidas.

---

## 3. Estações

O projeto tem **quatro estações**.

### Estação 1 — Inteligência Artificial nos jogos

Apresenta a evolução das abordagens de IA em jogos: regras, perseguição e decisão simples, máquinas de estado, pathfinding, behavior trees, utility AI, machine learning e IA generativa.

### Estação 2 — Evolução dos jogos até 2000

- A linha do tempo termina em 2000. O ano fecha a linha como limite da estação, sem marco próprio e sem eventos inventados para preencher o período.
- Os 15 marcos vão de 1950 a 1996; o conteúdo de 2001 em diante fica para a estação seguinte.

### Estação 3 — Evolução dos jogos de 2001 até hoje

- Não forçamos um marco exclusivo para 2026; 2024–2026 aparece como período de tendências atuais, quando faz sentido.
- Imagens ilustrativas não viram marcos históricos sem base, e evitamos afirmações sem suporte suficiente.

### Estação 4 — X-B0T

Apresenta o jogo, desenvolvido por outro grupo. O site só mostra mecânicas e tecnologias que existam na versão final (DEC-007).

Em todas elas, o site complementa a apresentação física em vez de repeti-la. O texto-fonte do conteúdo está em `docs/OdisseIA_Conteudo_Site_Estacoes.md`.

---

## 4. Páginas

```text
index.html       visão geral; porta de entrada estática, não lê nem altera o progresso
hub.html         central das estações e do progresso
validar.html     destino dos QR Codes (validar.html?estacao=N)
estacao-1.html … estacao-4.html
final.html       conclusão, com "Ver portfólio", "Jogar X-B0T" e o acesso aos minijogos
portfolio.html   documento do portfólio, exibido no leitor da Conclusão (DEC-015)
minijogos.html   Pong, Snake, Space Invaders e o desafio de pathfinding; fora da jornada
```

O CSS fica em `assets/css/` (a base compartilhada em `style.css`, uma folha por página em `paginas/`), o JavaScript em `assets/js/` e as imagens e fontes em `assets/img/` e `assets/fonts/`.

O projeto teve uma quinta estação, ligada a portfólio e documentação, que saiu do percurso (DEC-005). O portfólio ficou como recurso complementar, aberto num leitor sobre a Conclusão. A página não acompanha o `.docx` de origem: se o documento mudar, é preciso regerar `portfolio.html` e republicar.

---

## 5. Fluxo do visitante

```text
Visão geral → Hub → Estação 1 → Estação 2 → Estação 3 → Estação 4 → Conclusão → X-B0T
```

**Regra principal:** o QR Code de uma estação valida que o visitante passou por ela fisicamente e libera o conteúdo digital dela. Navegar direto até uma página não avança o progresso.

Estações futuras podem ser abertas pelo Hub para mostrar o estado bloqueado, mas o conteúdo só aparece depois da validação. Depois de um QR válido, o visitante volta ao Hub ou segue para o conteúdo liberado; ao completar a quarta estação, a Conclusão entra no fluxo.

---

## 6. Sistema de progresso

O progresso fica no `localStorage`, na chave `odisseia:progresso`:

```js
{
  versao: 1,
  ultimaEstacaoDesbloqueada: 0 // de 0 a 4
}
```

Os demais estados da interface são derivados desse valor, sem armazenamento redundante. O sistema cobre leitura e gravação, persistência após recarregar, limite de quatro estações e tratamento de estado inválido.

Ele representa a jornada do visitante, não é mecanismo de segurança: quem tem conhecimento técnico pode alterar o valor no navegador. Isso é aceitável, porque nada sensível depende dele (DEC-004, DEC-006).

---

## 7. QR Codes e scanner

Cada QR abre `validar.html?estacao=N`. Só o QR da próxima estação na ordem avança o progresso; QR repetido, fora de ordem ou inválido não altera nada (DEC-011).

O progresso é salvo no navegador usado. Abrir o QR em um navegador diferente do que abriu o Hub resulta em "fora de ordem", e as telas do site explicam isso ao visitante.

O **scanner** (`scanner.js`, `scanner.css`) lê o QR pela câmera dentro do site (DEC-014):

- pede a câmera só depois de "Abrir câmera" e não grava nem envia nada;
- aceita apenas um link http(s) que termine em `/validar.html` com o parâmetro `estacao` de 1 a 4. O endereço não é comparado e **nada é aberto**: o texto lido só serve para obter o número;
- reaproveita `resultadoParaEstacao()` de `qr.js`, a mesma regra de `validar.html`;
- usa a API `BarcodeDetector`, que existe no Chrome e no Samsung Internet do Android, mas não no Safari do iOS nem no Firefox. Nesses navegadores o scanner explica que o app Câmera lê o mesmo QR e cai no mesmo fluxo;
- a câmera exige contexto seguro (HTTPS); em `file://` só o Chrome a libera para teste.

O QR não é segurança real. Nenhuma tela manda escanear o QR da estação seguinte: o código é sempre entregue pelo orientador, depois da visita física.

---

## 8. Arquitetura

- **Frontend:** HTML, CSS e JavaScript puros, sem framework (DEC-003).
- **Backend:** não existe. Se surgir uma necessidade real, como autenticação ou sincronização, a decisão pode ser revista.
- **Persistência:** `localStorage`.
- **Configuração central:** `assets/js/config.js` define `OdisseIAConfig` (`totalEstacoes`, `gameUrl`, `downloadUrl`) com `const`. Todos os scripts são `<script>` comuns, sem módulos ES, para o site funcionar também via `file://` (DEC-009). `downloadUrl` continua `null`: não há link de download.
- **Hospedagem:** GitHub Pages, em `https://pietroramosz.github.io/OdisseIA/`. Todos os caminhos são relativos e respeitam maiúsculas e minúsculas, porque o site roda sob o prefixo `/OdisseIA/`.
- **Versionamento:** Git e GitHub, com desenvolvimento na branch `dev`.

---

## 9. Segurança

> Se alguma coisa puder ser descoberta ou alterada facilmente pelo DevTools/F12 e isso causar um problema real, ela não deve depender só do frontend.

Por isso o cliente não guarda segredos, tokens, credenciais, dados que precisem ficar ocultos nem regras críticas de autorização. O frontend controla a experiência do visitante, mas não é camada de segurança (DEC-006).

---

## 10. Mobile-first e identidade visual

Os visitantes circulam pelas estações usando o próprio celular, então a experiência precisa ser rápida de entender em telas pequenas: pouca informação por tela, navegação simples, consistência entre as estações e leitura rápida (DEC-001).

O site e o X-B0T devem parecer partes da mesma experiência, cada um com a sua cor (DEC-010). A base é grafite; o azul (escala do `#142146`, com acento `#5b8cff`) marca estados, progresso e ações; o branco é só para texto; e o roxo **`#CD5EFA`**, cor definitiva do X-B0T, aparece apenas nas partes do jogo. Legibilidade e contraste vêm antes de efeito visual, e nenhum estado depende só de cor. As regras completas estão em `DESIGN.md`; o sistema visual foi criado com a skill Impeccable.

---

## 11. Conteúdo

O conteúdo digital nasce junto com as apresentações físicas e fica escrito direto no HTML das estações, sem arquivo de dados nem geração por JavaScript. Regras que seguimos:

- usar como base a pesquisa real dos grupos;
- não tratar conteúdo em discussão como definitivo;
- não inventar marcos, dados ou tecnologias;
- manter a Estação 4 fiel ao jogo real.

Decisões pequenas de conteúdo não viram registro técnico.

---

## 12. Integração com o X-B0T

O **grupo do X-B0T** cuida de regras, cartas, energia, balanceamento, turnos, IA e implementação do jogo. O **site** cuida de como o jogo aparece na experiência: a apresentação da estação, o acesso, o desbloqueio no fluxo e a documentação apenas do que existe na versão final (DEC-007).

O acesso vem de `OdisseIAConfig.gameUrl` (https://robot-tcg.netlify.app/) e só é liberado com as quatro estações validadas (DEC-012). A Conclusão avisa que o X-B0T foi desbloqueado e leva o visitante ao jogo. A grafia oficial é **X-B0T**, com zero.

---

## 13. Fora do escopo

Framework frontend, backend, banco de dados, login, autenticação e infraestrutura complexa. O projeto continua simples enquanto isso bastar.

---

## 14. Outros arquivos

- [`README.md`](./README.md)
- [`PRODUCT.md`](./PRODUCT.md)
- [`DESIGN.md`](./DESIGN.md)
- [`DECISIONS.md`](./DECISIONS.md)
- [`AI-WORKFLOW.md`](./AI-WORKFLOW.md)
