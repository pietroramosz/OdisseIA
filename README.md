# OdisseIA

O **OdisseIA** é um projeto criado para uma feira escolar que mistura uma experiência física, dividida em estações, com uma parte digital acessada pelo celular dos visitantes.

A ideia do site é acompanhar o percurso da feira, complementar as apresentações de cada estação e conectar tudo em uma experiência única. O projeto também inclui o **Robot TCG**, um jogo digital que fará parte da etapa final.

> **Status atual:** em desenvolvimento.  
> Neste momento, o projeto ainda está passando por definições de conteúdo, UX, estrutura e arquitetura. Nem tudo que aparece como planejado aqui já foi implementado.

---

## Como funciona a experiência

Atualmente, o OdisseIA está dividido em **quatro estações físicas**:

1. **Estação 1 — Evolução dos jogos até 1999**
2. **Estação 2 — Evolução dos jogos de 2001 até hoje**
3. **Estação 3 — Inteligência Artificial nos jogos**
4. **Estação 4 — Robot TCG**

Cada estação terá um **QR Code** ligado à parte correspondente do site.

Como os visitantes vão usar o próprio celular durante a feira, o projeto está sendo pensado desde o início com foco em **mobile-first**.

No começo, o projeto tinha uma quinta estação ligada a portfólio/documentação. Depois de revisar a estrutura, decidimos tirar essa parte do percurso da feira e manter a documentação separada no repositório.

---

## O que está planejado

Entre as principais ideias já definidas para o site estão:

- navegação pensada primeiro para celular;
- conexão entre as estações físicas e as páginas digitais;
- progresso em sequência entre as etapas;
- registro local do progresso;
- liberação das próximas estações conforme o avanço;
- integração com o Robot TCG;
- hospedagem como site estático.

Alguns detalhes da Estação 4 ainda dependem diretamente da versão final do Robot TCG.

---

## Tecnologias

A stack inicial do site foi mantida simples:

- HTML;
- CSS;
- JavaScript;
- Git;
- GitHub;
- `localStorage`;
- QR Codes.

A ideia é não adicionar frameworks, backend ou outras tecnologias só para deixar o projeto mais complexo. Se surgir uma necessidade real, isso pode ser revisto depois.

O Robot TCG é tratado separadamente, porque possui seu próprio desenvolvimento.

---

## Desenvolvimento com IA

O projeto utiliza IA de forma assumida e organizada.

De forma geral:

- **ChatGPT** é usado principalmente para planejamento, análise, arquitetura, UX, revisão, documentação e preparação de tarefas;
- **Claude Code** é usado principalmente para implementação e alterações diretas no código;
- decisões finais, validação e responsabilidade pelo resultado continuam sendo humanas.

A intenção não é esconder o uso de IA, mas também não apresentar o projeto como se bastasse pedir para uma ferramenta gerar tudo.

Mais detalhes estão em [`AI-WORKFLOW.md`](./AI-WORKFLOW.md).

---

## Documentação

Além deste README, o projeto possui:

- [`PROJECT.md`](./PROJECT.md) — explica como o projeto está estruturado;
- [`AI-WORKFLOW.md`](./AI-WORKFLOW.md) — mostra como as ferramentas de IA entram no processo;
- [`DECISIONS.md`](./DECISIONS.md) — registra decisões importantes e seus motivos;
- [`DEVLOG.md`](./DEVLOG.md) — acompanha os principais marcos da criação do site.

---

## Estado atual

O projeto ainda não está finalizado.

Neste momento, o foco está principalmente em:

- fechar o conteúdo das estações;
- organizar a experiência do visitante;
- definir a estrutura do site;
- preparar a integração com o Robot TCG;
- registrar as decisões importantes antes da implementação avançar.

Screenshots, demonstração, instruções de execução e links públicos serão adicionados quando essas partes realmente existirem.
