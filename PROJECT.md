# OdisseIA — Project Documentation

Este arquivo explica como o OdisseIA está organizado e o que é preciso saber para mantê-lo. A apresentação do projeto fica no [`README.md`](./README.md), o público e os princípios do produto em [`PRODUCT.md`](./PRODUCT.md), o sistema visual em [`DESIGN.md`](./DESIGN.md) e o porquê das escolhas em [`DECISIONS.md`](./DECISIONS.md).

Quando algo ainda não existe, o texto diz isso com todas as letras.

---

## 1. Visão geral

O **OdisseIA** é um projeto educacional sobre a evolução da inteligência artificial e a sua relação com os jogos. Ele nasceu para uma feira escolar, e hoje é um site aberto e livre: as quatro estações, a Conclusão, o jogo **X-B0T** (antes chamado Robot TCG), os Mini Jogos, o portfólio e os créditos podem ser acessados por qualquer pessoa, em qualquer ordem, sem QR Codes, validações ou bloqueios.

Na feira de 29/10/2026 o site complementava as estações físicas, e os QR Codes serviam para comprovar a passagem presencial dos visitantes. Essa etapa terminou, e o sistema foi retirado em 30/10/2026 (DEC-016).

---

## 2. Estado das funcionalidades

Usamos quatro estados para evitar confusão:

- **Definido:** a decisão foi tomada;
- **Planejado:** sabemos como deve funcionar, mas ainda não foi implementado;
- **Implementado:** já existe no código;
- **Validado:** foi implementado e testado no fluxo esperado.

Situação em 30/10/2026:

- **Validado:** painel de acessibilidade; durante a feira, a experiência com QR Codes (sistema agora descontinuado, DEC-016).
- **Implementado:** `index.html` (porta de entrada estática); Hub como menu livre; Estações 1 a 4, sempre abertas; `final.html` (conclusão), acessível diretamente; portfólio na Conclusão (testado em Chrome headless; sem registro de teste em Safari, Firefox ou leitor de tela); a página de minijogos; e a página de créditos.
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
index.html       visão geral; porta de entrada estática
hub.html         menu das estações e da Conclusão; todas sempre disponíveis
estacao-1.html … estacao-4.html
final.html       conclusão, com "Ver portfólio", "Jogar X-B0T" e o acesso aos minijogos
portfolio.html   documento do portfólio, exibido no leitor da Conclusão (DEC-015)
minijogos.html   Pong, Snake, Space Invaders e o desafio de pathfinding
creditos.html    créditos dos seis grupos; estática; acessada pelo rodapé
```

O CSS fica em `assets/css/` (a base compartilhada em `style.css`, uma folha por página em `paginas/`), o JavaScript em `assets/js/` e as imagens e fontes em `assets/img/` e `assets/fonts/`.

O projeto teve uma quinta estação, ligada a portfólio e documentação, que saiu do percurso (DEC-005). O portfólio ficou como recurso complementar, aberto num leitor sobre a Conclusão. A página não acompanha o `.docx` de origem: se o documento mudar, é preciso regerar `portfolio.html` e republicar. O documento descreve a feira como ela aconteceu, inclusive o uso dos QR Codes, e por isso não foi alterado.

---

## 5. Fluxo do visitante

Não há fluxo obrigatório. O visitante pode abrir qualquer página pelo Hub ou direto pela URL. O percurso sugerido é:

```text
Visão geral → Hub → Estação 1 → Estação 2 → Estação 3 → Estação 4 → Conclusão → X-B0T
```

Ao final de cada estação há um botão para a seguinte (ou para a Conclusão, na Estação 4) e outro para voltar ao Hub. A Conclusão também leva ao portfólio, ao X-B0T e aos Mini Jogos.

---

## 6. Dados no navegador

O site não guarda progresso. O único dado persistente é `odisseia:acessibilidade` (tema, tamanho do texto, alto contraste e movimento, DEC-013), em `localStorage`.

Para quem usou a versão da feira, `app.js` apaga a chave antiga `odisseia:progresso` (que guardava `{ versao: 1, ultimaEstacaoDesbloqueada }`) a cada carregamento. Essa limpeza pode ser removida quando não houver mais navegadores com o dado antigo.

---

## 7. QR Codes e progresso (descontinuados)

Na feira, cada QR abria `validar.html?estacao=N` e liberava, em ordem, o conteúdo da estação (DEC-002, DEC-004, DEC-011); um scanner pela câmera (`scanner.js`) lia o mesmo QR (DEC-014). `progresso.js`, `qr.js`, `scanner.js`, `validar.html` e seus estilos foram removidos em 30/10/2026 (DEC-016). O histórico está em `DECISIONS.md` e no histórico do Git (último commit com o sistema: `6fd8c57`).

O site não usa mais a câmera nem pede permissões do navegador.

---

## 8. Arquitetura

- **Frontend:** HTML, CSS e JavaScript puros, sem framework (DEC-003).
- **Backend:** não existe. Se surgir uma necessidade real, como autenticação ou sincronização, a decisão pode ser revista.
- **Persistência:** `localStorage`, só para as preferências de acessibilidade.
- **Configuração central:** `assets/js/config.js` define `OdisseIAConfig` (`totalEstacoes`, `gameUrl`, `downloadUrl`) com `const`. Todos os scripts são `<script>` comuns, sem módulos ES, para o site funcionar também via `file://` (DEC-009). `downloadUrl` continua `null`: não há link de download.
- **Hospedagem:** GitHub Pages, em `https://pietroramosz.github.io/OdisseIA/`. Todos os caminhos são relativos e respeitam maiúsculas e minúsculas, porque o site roda sob o prefixo `/OdisseIA/`.
- **Versionamento:** Git e GitHub, com desenvolvimento na branch `dev`.

---

## 9. Segurança

> Se alguma coisa puder ser descoberta ou alterada facilmente pelo DevTools/F12 e isso causar um problema real, ela não deve depender só do frontend.

Por isso o cliente não guarda segredos, tokens, credenciais, dados que precisem ficar ocultos nem regras críticas de autorização. O frontend controla a experiência do visitante, mas não é camada de segurança (DEC-006).

---

## 10. Mobile-first e identidade visual

Boa parte dos visitantes usa o próprio celular, então a experiência precisa ser rápida de entender em telas pequenas: pouca informação por tela, navegação simples, consistência entre as estações e leitura rápida (DEC-001).

O site e o X-B0T devem parecer partes da mesma experiência, cada um com a sua cor (DEC-010). A base é grafite; o azul (escala do `#142146`, com acento `#5b8cff`) marca estados e ações; o branco é só para texto; e o roxo **`#CD5EFA`**, cor definitiva do X-B0T, aparece apenas nas partes do jogo. Legibilidade e contraste vêm antes de efeito visual, e nenhum estado depende só de cor. As regras completas estão em `DESIGN.md`; o sistema visual foi criado com a skill Impeccable.

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

O **grupo do X-B0T** cuida de regras, cartas, energia, balanceamento, turnos, IA e implementação do jogo. O **site** cuida de como o jogo aparece na experiência: a apresentação da estação, o acesso e a documentação apenas do que existe na versão final (DEC-007).

O acesso vem de `OdisseIAConfig.gameUrl` (https://robot-tcg.netlify.app/) e vira link no Hub, na Estação 4 e na Conclusão quando é uma URL http(s) válida (DEC-012). A Conclusão leva o visitante ao jogo. A grafia oficial é **X-B0T**, com zero.

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
