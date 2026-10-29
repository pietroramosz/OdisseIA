# OdisseIA

O **OdisseIA** é um projeto criado para uma feira escolar que combina uma experiência física, dividida em estações, com uma parte digital acessada pelo celular dos visitantes.

O site acompanha o percurso da feira, complementa a apresentação de cada estação e liga tudo numa experiência só. No fim da jornada, ele libera o **X-B0T**, um jogo digital desenvolvido por outro grupo do projeto.

> **Status atual:** publicado no GitHub Pages (https://pietroramosz.github.io/OdisseIA/) e testado fisicamente para a feira de 29/10/2026.

---

## Como funciona a experiência

São **quatro estações físicas**:

1. **Estação 1 — Inteligência Artificial nos jogos**
2. **Estação 2 — Evolução dos jogos até 2000**
3. **Estação 3 — Evolução dos jogos de 2001 até hoje**
4. **Estação 4 — X-B0T**

O fluxo digital é este:

```text
Visão geral → Hub → Estação 1 → Estação 2 → Estação 3 → Estação 4 → Conclusão → X-B0T
```

Cada estação física tem um **QR Code** próprio. Ele não é só um link: valida que o visitante passou pela estação e libera o conteúdo digital daquela etapa. Abrir uma página diretamente não avança o progresso.

Como todo mundo usa o próprio celular durante a feira, o projeto foi pensado desde o início para **mobile-first**.

O projeto chegou a ter uma quinta estação, ligada a portfólio e documentação, mas ela saiu do percurso. O portfólio continua como complemento: a Conclusão tem um botão "Ver portfólio" que abre o documento do projeto num leitor sobre a própria página (conteúdo local em `portfolio.html`).

---

## O que já foi implementado

- estrutura das páginas, organização de `assets` e configuração central (`config.js`);
- sistema de progresso em `localStorage`, com persistência após recarregar e limite na quarta estação;
- Hub com estados de 0 a 4 estações validadas;
- validação dos QR Codes por `validar.html` e `qr.js`, e scanner pela câmera (Chrome/Android) que usa as mesmas regras. No Safari do iOS e no Firefox, o QR é lido pelo app Câmera do celular;
- `index.html` como porta de entrada estática, que não lê nem grava o progresso (`odisseia:progresso`);
- Estações 1 a 4 com conteúdo, três estados de acesso (desbloqueada, próxima e futura) e linguagem editorial compartilhada;
- página de conclusão (`final.html`), com estados de jornada completa e incompleta, botão "Ver portfólio" e botão "Jogar X-B0T";
- acesso ao X-B0T pelo Hub e pela Conclusão, liberado só com as quatro estações validadas, com aviso para jogar no celular na horizontal;
- portfólio do projeto em leitor local, aberto a partir da Conclusão;
- página de minijogos (Pong, Snake, Space Invaders e um desafio de pathfinding com A*), aberta a partir da Conclusão e separada da jornada: não mexe no progresso;
- identidade visual em grafite, com o azul como acento principal (escala do `#142146`, a cor da sala da feira) e o roxo `#CD5EFA` reservado ao X-B0T;
- painel de acessibilidade com animações, alto contraste, tema, tamanho do texto e restaurar padrão;
- publicação definitiva no GitHub Pages, QR Codes finais e testes físicos da experiência, com o X-B0T apontando para https://robot-tcg.netlify.app/ (`gameUrl`).

---

## Prévia do site

Capturas reais do site rodando no Chrome, com o progresso ajustado só para mostrar cada tela. Visão geral em desktop:

![Visão geral do OdisseIA em desktop](docs/screenshots/visao-geral.png)

O site é pensado para o celular. Em telas de 390 px, da esquerda para a direita: Hub com duas estações validadas, Estação 2, Estação 4 e Conclusão.

<p>
  <img src="docs/screenshots/hub-mobile.png" alt="Hub no celular, com 2 de 4 estações validadas" width="23%">
  <img src="docs/screenshots/estacao-4-mobile.png" alt="Estação 4 no celular" width="23%">
  <img src="docs/screenshots/conclusao-mobile.png" alt="Conclusão no celular" width="23%">
</p>

O X-B0T, jogo do outro grupo, abre em endereço próprio:

![Tela inicial do X-B0T](docs/screenshots/xbot.png)

As demais capturas (desktop e celular de todas as páginas) estão em [`docs/screenshots/`](./docs/screenshots/).

---

## Tecnologias

A stack foi mantida simples de propósito:

- HTML, CSS e JavaScript puros;
- `localStorage` para o progresso;
- QR Codes;
- Git e GitHub, com publicação no GitHub Pages.

Não há frameworks nem backend, e só vale acrescentar algo se surgir uma necessidade real. O X-B0T é tratado à parte, porque tem desenvolvimento próprio.

---

## Desenvolvimento com IA

O projeto usa IA de forma assumida e organizada:

- **ChatGPT** entra no planejamento, na análise, na arquitetura, na revisão e na documentação;
- **Claude (chat)** serve de segunda camada de revisão crítica antes da implementação, quando isso ajuda;
- **Claude Code** faz a implementação e as alterações diretas no código. A skill **Impeccable**, usada com ele, ajudou a criar o sistema visual do projeto;
- decisões finais, testes, validação e responsabilidade pelo resultado continuam sendo humanas.

A intenção não é esconder o uso de IA, nem apresentar o projeto como se bastasse pedir a uma ferramenta que gerasse tudo. Os detalhes estão em [`AI-WORKFLOW.md`](./AI-WORKFLOW.md).

---

## Documentação

- [`PROJECT.md`](./PROJECT.md) — como o projeto está estruturado e como mantê-lo;
- [`PRODUCT.md`](./PRODUCT.md) — usuários, propósito e princípios do produto;
- [`DESIGN.md`](./DESIGN.md) — sistema visual: cores, tipografia, layout, componentes, movimento e acessibilidade;
- [`DECISIONS.md`](./DECISIONS.md) — as decisões essenciais e seus motivos;
- [`AI-WORKFLOW.md`](./AI-WORKFLOW.md) — como as ferramentas de IA entram no processo.

---

## Estado atual

O site está no ar no GitHub Pages (endereço definitivo), os QR Codes finais foram gerados e os testes físicos da experiência foram realizados. O X-B0T tem endereço final em https://robot-tcg.netlify.app/, configurado em `gameUrl`.
