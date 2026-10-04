# OdisseIA

O **OdisseIA** é um projeto criado para uma feira escolar que mistura uma experiência física, dividida em estações, com uma parte digital acessada pelo celular dos visitantes.

A ideia do site é acompanhar o percurso da feira, complementar as apresentações de cada estação e conectar tudo em uma experiência única. O projeto também inclui o **X-BOT**, um jogo digital que será desbloqueado ao final da jornada.

> **Status atual:** em desenvolvimento.  
> A fundação, o sistema de progresso, o Hub e a validação dos QR Codes já foram implementados e testados em desenvolvimento.

---

## Como funciona a experiência

Atualmente, o OdisseIA está dividido em **quatro estações físicas**:

1. **Estação 1 — Evolução dos jogos até 1999**
2. **Estação 2 — Evolução dos jogos de 2001 até hoje**
3. **Estação 3 — Inteligência Artificial nos jogos**
4. **Estação 4 — X-BOT**

O fluxo oficial da experiência digital é:

```text
Visão geral
↓
Hub
↓
Estação 1
↓
Estação 2
↓
Estação 3
↓
Estação 4
↓
Conclusão
↓
X-BOT
```

Cada estação física possui um **QR Code** próprio.

O QR Code não funciona apenas como um link: ele valida que o visitante passou pela estação física e desbloqueia o conteúdo digital daquela mesma etapa.

Abrir diretamente uma página não deve avançar o progresso.

Como os visitantes vão usar o próprio celular durante a feira, o projeto está sendo pensado desde o início com foco em **mobile-first**.

No começo, o projeto tinha uma quinta estação ligada a portfólio/documentação. Depois de revisar a estrutura, essa parte foi retirada do percurso da feira e permaneceu apenas como documentação do projeto.

---

## O que já foi implementado

A base técnica do projeto já existe.

Atualmente, estão implementados:

- estrutura inicial das páginas;
- organização base de `assets`;
- configuração central do projeto;
- sistema de progresso usando `localStorage`;
- persistência do progresso após recarregar a página;
- limite de progresso até a quarta estação;
- Hub com estados 0 a 4;
- validação dos QR Codes por `validar.html` e `qr.js`.

O sistema de progresso já foi testado manualmente e versionado na branch `dev`.

---

## O que ainda está em desenvolvimento

Entre os próximos passos estão:

- conteúdo e comportamento final das páginas das estações;
- página de conclusão;
- integração final com o X-BOT;
- refinamentos visuais;
- testes da experiência completa da feira.

Alguns detalhes da Estação 4 continuam dependendo diretamente da versão final do X-BOT.

---

## Tecnologias

A stack inicial do site foi mantida simples:

- HTML;
- CSS;
- JavaScript;
- Git;
- GitHub;
- hospedagem a definir (GitHub Pages usado em testes);
- `localStorage`;
- QR Codes.

A ideia é não adicionar frameworks, backend ou outras tecnologias só para deixar o projeto mais complexo. Se surgir uma necessidade real, isso pode ser revisto depois.

O X-BOT é tratado separadamente, porque possui seu próprio desenvolvimento.

---

## Desenvolvimento com IA

O projeto utiliza IA de forma assumida e organizada.

De forma geral:

- **ChatGPT** é usado principalmente para planejamento, análise, arquitetura, UX, revisão, documentação e preparação de tarefas;
- **Claude Code** é usado principalmente para implementação e alterações diretas no código;
- decisões finais, testes, validação e responsabilidade pelo resultado continuam sendo humanas.

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

O projeto já saiu da fase de planejamento puro e entrou em implementação.

A fundação, o sistema de progresso, o Hub e a validação dos QR Codes já formam a base funcional atual do site.

Já existem: sistema de progresso, Hub e validação dos QR Codes, testados em desenvolvimento. Ainda faltam o conteúdo das estações, a conclusão e a integração com o X-BOT.

Screenshots, demonstração, instruções de execução e links públicos serão adicionados quando essas partes realmente existirem.
