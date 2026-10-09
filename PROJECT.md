# OdisseIA — Project Documentation

Este arquivo explica como o OdisseIA foi pensado e como o projeto está sendo organizado.

Ele não é um diário de desenvolvimento e também não tenta fingir que tudo já está pronto. Quando alguma funcionalidade ainda estiver só no planejamento, isso será deixado claro.

---

## 1. Visão geral

O **OdisseIA** é um projeto para uma feira escolar que combina:

- estações físicas;
- conteúdo digital;
- QR Codes;
- progressão entre etapas;
- acesso pelo celular do visitante;
- integração com o jogo **X-BOT** (antes chamado Robot TCG).

O site não foi pensado para substituir a apresentação física. Ele funciona como uma extensão da experiência, ajudando a conectar as estações e oferecendo conteúdo e interações que fazem sentido no celular.

---

## 2. Como tratamos o estado das funcionalidades

Durante o desenvolvimento, usamos quatro estados para evitar confusão:

- **Definido:** a decisão já foi tomada;
- **Planejado:** sabemos como queremos que funcione, mas ainda não foi implementado;
- **Implementado:** já existe no código;
- **Validado:** foi implementado e testado no fluxo esperado.

Situação revisada em 08/10/2026:

- **Validado:** sistema de progresso (`progresso.js`), testado no console, incluindo dado corrompido e número decimal.
- **Implementado e testado em emulador e no celular:** Hub (`hub.html`), nos estados 0 a 4.
- **Implementado e revisado:** `index.html` como porta de entrada estática, sem JavaScript e sem dependência de `localStorage`.
- **Implementadas e revisadas:** Estações 1–3 com conteúdo, estados `desbloqueada`, `próxima` e `futura`, além da composição editorial compartilhada.
- **Implementado e testado por console e URL, ainda não validado com câmera real nem com WhatsApp:** validação de QR (`validar.html` e `qr.js`).
- **Ainda pendente:** Estação 4, conclusão, integração com o X-BOT, hospedagem final, QR Codes definitivos e teste físico completo da jornada.

---

## 3. Estrutura atual das estações

O projeto possui atualmente **quatro estações**.

### Estação 1 — Evolução dos jogos até 1999

A primeira estação cobre a evolução dos jogos até 1999.

Algumas definições importantes:

- a linha do tempo termina em 1999;
- conteúdos de 2000 ficam para a estação seguinte;
- o site deve complementar a apresentação física em vez de repetir exatamente o mesmo conteúdo.

### Estação 2 — Evolução dos jogos de 2001 até hoje

A segunda estação continua a linha do tempo a partir de 2001.

Algumas decisões já tomadas:

- não forçar um marco exclusivo para 2026;
- tratar 2024–2026 como um período de tendências atuais quando fizer sentido;
- não transformar imagens ilustrativas em marcos históricos sem base;
- evitar comparações ou afirmações que não tenham suporte suficiente.

### Estação 3 — Inteligência Artificial nos jogos

A terceira estação apresenta a evolução de abordagens de IA em jogos.

A linha conceitual atual passa por:

- regras;
- perseguição e tomada de decisão simples;
- máquinas de estado;
- pathfinding;
- behavior trees;
- utility AI;
- machine learning;
- IA generativa.

O conteúdo final continua dependente da versão aprovada da apresentação da estação.

### Estação 4 — X-BOT

A quarta estação apresenta o **X-BOT**, jogo desenvolvido por outro núcleo do projeto.

O site deve mostrar apenas mecânicas e tecnologias que realmente existirem na versão final do jogo.

As regras internas, balanceamento, cartas, energia, IA adversária e outras decisões do X-BOT continuam sob responsabilidade do grupo responsável pelo jogo.

---

## 4. De cinco para quatro estações

No começo, o projeto tinha uma quinta estação ligada a portfólio/documentação.

Depois de revisar a experiência, decidimos que essa parte não precisava ocupar uma estação física.

A estrutura atual ficou com quatro estações, enquanto o portfólio e os bastidores permanecem apenas na documentação do projeto.

Essa mudança alterou diretamente o fluxo do site e o escopo da experiência.

---

## 5. Estrutura atual de páginas

A fundação inicial do site já foi criada.

Atualmente o projeto possui as seguintes páginas principais:

```text
index.html
hub.html
validar.html
estacao-1.html
estacao-2.html
estacao-3.html
estacao-4.html
final.html
```

Também existe uma estrutura de `assets` para organizar CSS, JavaScript e imagens.

### Função geral das páginas

- `index.html` — visão geral e porta de entrada estática da experiência; não lê nem altera progresso;
- `hub.html` — central das estações e representação do progresso;
- `validar.html` — página usada pelo fluxo de validação dos QR Codes;
- `estacao-1.html` a `estacao-3.html` — conteúdo editorial e estados de acesso das três primeiras estações;
- `estacao-4.html` — reservada para a integração da estação ligada ao X-BOT;
- `final.html` — conclusão da jornada antes do acesso ao X-BOT.

A existência dessas páginas não significa que todas as funcionalidades internas já estejam finalizadas.

---

## 6. Fluxo do visitante

O fluxo oficial da experiência é:

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

A experiência física e a experiência digital estão ligadas pelos QR Codes.

### Regra principal

O QR Code de uma estação valida que o visitante passou por aquela etapa física e desbloqueia o conteúdo digital da própria estação.

Apenas navegar diretamente até uma página não deve avançar o progresso.

Estações futuras podem ser acessadas pelo Hub para mostrar seu estado bloqueado, mas o conteúdo permanece indisponível até a validação correta.

Depois de um QR válido, a experiência deve permitir voltar ao Hub ou seguir para o conteúdo desbloqueado. Após a quarta estação, a conclusão também passa a fazer parte do fluxo.

---

## 7. Sistema de progresso

O sistema de progresso já foi implementado.

Os dados são armazenados no navegador utilizando `localStorage`.

### Chave utilizada

```text
odisseia:progresso
```

### Estrutura base

```js
{
  versao: 1,
  ultimaEstacaoDesbloqueada: 0
}
```

`ultimaEstacaoDesbloqueada` varia de `0` a `4`.

Os demais estados da interface devem ser derivados desse valor sempre que possível, evitando armazenamento redundante.

### Objetivo

O progresso existe para representar a jornada do visitante durante a feira.

Ele não funciona como mecanismo de segurança.

Como os dados ficam no próprio navegador, uma pessoa com conhecimento técnico pode alterá-los manualmente.

Isso é aceitável porque nenhuma informação sensível ou recurso crítico depende desse controle.

### Estado atual

O sistema já foi implementado, testado manualmente e versionado na branch `dev`.

Ele cobre a leitura e gravação do progresso, persistência após recarregar a página, limite das quatro estações e tratamento de estado inválido.

---

## 8. QR Codes

Os QR Codes fazem a conexão entre a parte física e a parte digital do OdisseIA.

Cada estação possui seu próprio QR Code.

A função dele é validar que o visitante chegou àquela estação física e então desbloquear o conteúdo digital correspondente.

Por isso, o progresso não deve avançar apenas porque alguém abriu diretamente uma página.

A validação digital já está implementada em `validar.html` e `qr.js`. O que ainda falta é validar o fluxo físico com QR real pela câmera, testar a abertura por aplicativos como o WhatsApp e gerar/imprimir os QR Codes definitivos depois que a URL final estiver fechada.

O QR Code faz parte da lógica da experiência, mas não deve ser tratado como mecanismo de segurança real.

Cada QR abre `validar.html?estacao=N`. Só o QR da próxima estação na ordem avança o progresso; QR repetido, fora de ordem ou inválido não altera nada. O progresso fica salvo no navegador usado, então abrir o QR em um navegador diferente do Hub resulta em "fora de ordem". A tela explica isso ao visitante (DEC-014).

---

## 9. Arquitetura inicial

A arquitetura foi mantida simples de propósito.

### Frontend

- HTML;
- CSS;
- JavaScript.

### Hospedagem

Ainda não definida. O GitHub Pages está ligado na branch `dev` apenas para testes. A URL final precisa estar fechada antes de imprimir os QR Codes.

### Persistência

Implementada com `localStorage`.

### Versionamento

- Git;
- GitHub;
- desenvolvimento incremental na branch `dev`.

### Backend

Não existe backend previsto para a primeira versão.

Se no futuro surgir uma necessidade real — como autenticação, sincronização ou proteção de dados — essa decisão pode ser revista.

### Configuração central

O projeto possui uma configuração central em JavaScript.

Ela foi mantida em JavaScript puro, utilizando `const`.

Nesta fase, módulos ES foram evitados para preservar compatibilidade com execução local através de `file://`.

Essa escolha reduz dependências durante etapas simples de desenvolvimento e teste e está registrada em `DECISIONS.md`.

---

## 10. Segurança

Uma regra simples foi adotada para o projeto:

> Se alguma coisa puder ser descoberta ou alterada facilmente pelo DevTools/F12 e isso causar um problema real, ela não deve depender só do frontend.

Na prática, isso significa que não devemos colocar no cliente:

- segredos;
- tokens privados;
- credenciais;
- chaves sensíveis;
- dados que precisem permanecer ocultos;
- regras críticas de autorização.

O frontend pode controlar a experiência do visitante, mas não é tratado como uma camada real de segurança.

---

## 11. Mobile-first

O mobile-first não foi escolhido por moda.

Durante a feira, o visitante estará circulando entre as estações e usando o próprio celular. Por isso, a experiência precisa ser rápida de entender e fácil de usar em telas pequenas.

Alguns princípios que guiam o design:

- pouca informação por tela;
- navegação simples;
- consistência entre as estações;
- leitura rápida;
- o site complementa a apresentação em vez de competir com ela.

---

## 12. Identidade visual

O site e o X-BOT devem parecer partes da mesma experiência.

A identidade definida combina tecnologia e jogos com uma estética cyberpunk mais limpa, sem exagerar em efeitos que prejudiquem a leitura.

A base visual utiliza principalmente:

- tons de cinza;
- roxo como cor de destaque;
- elementos tecnológicos;
- contraste forte;
- interface limpa.

O roxo deve aparecer principalmente em destaques, estados, bordas, ícones e componentes interativos, e não como cor dominante em textos longos.

Como a experiência é mobile-first, legibilidade e contraste têm prioridade sobre efeitos visuais.

Estados importantes da interface também não devem depender exclusivamente de cor para serem compreendidos.

---

## 13. Conteúdo

O conteúdo digital é construído junto com as apresentações físicas.

As Estações 1–3 já possuem copy integrada e uma estrutura editorial comum. A Estação 4 continua dependente do estado real do X-BOT.

Algumas regras que seguimos:

- usar como base a pesquisa real dos grupos;
- não tratar conteúdo ainda em discussão como definitivo;
- não inventar marcos ou tecnologias;
- manter a Estação 4 sincronizada com o jogo real.

Decisões pequenas de conteúdo não precisam virar registros técnicos.

---

## 14. Integração com o X-BOT

Para evitar confusão entre os grupos, as responsabilidades foram separadas.

### Grupo do X-BOT

Cuida de:

- regras;
- cartas;
- energia;
- balanceamento;
- turnos;
- IA;
- implementação do jogo.

### Site do OdisseIA

Cuida de:

- como o jogo aparece na experiência;
- acesso e integração;
- apresentação da estação;
- desbloqueio dentro do fluxo;
- documentação apenas do que realmente existir na versão final.

A página de conclusão deve informar que o X-BOT foi desbloqueado e conduzir o visitante para o jogo quando a integração estiver pronta.

---

## 15. O que não faz parte do escopo atual

Neste momento, não há motivo para adicionar:

- framework frontend;
- backend;
- banco de dados;
- login;
- autenticação;
- infraestrutura complexa.

A ideia é manter o projeto simples enquanto isso for suficiente.

---

## 16. Pendências atuais

**Última revisão:** 08/10/2026  
**Data externa principal:** feira em **29/10/2026**.

Esta seção guarda apenas trabalho concreto ainda aberto. Ela não substitui o DEVLOG: quando uma pendência relevante for concluída, ela sai daqui e pode virar um marco no histórico.

### Necessárias para fechar a experiência da feira

- [ ] Implementar a Estação 4 apenas com informações e mecânicas confirmadas no X-BOT.
- [ ] Obter um status/build utilizável do X-BOT para destravar a integração da Estação 4 e da conclusão.
- [ ] Resolver a duplicação de nome entre “Estação 4 — X-BOT” e o card final do jogo, sem renomear nada antes da decisão.
- [ ] Implementar a página de conclusão e a mensagem de desbloqueio do X-BOT.
- [ ] Preencher `gameUrl`; decidir `downloadUrl` apenas se houver versão para download.
- [ ] Adicionar no Hub um caminho claro de volta para a Visão geral (`index.html`).
- [ ] Definir hospedagem e URL final antes de gerar ou imprimir os QR Codes definitivos.
- [ ] Testar QR real pela câmera e abertura por WhatsApp/navegador interno.
- [ ] Ampliar ou confirmar a orientação de “mesmo navegador”: hoje o Index já avisa, mas o problema ainda pode aparecer durante o fluxo de QR.
- [ ] Fazer um teste completo em celular do fluxo: visão geral → Hub → QR1 → 1 → QR2 → 2 → QR3 → 3 → QR4 → 4 → conclusão → X-BOT.
- [ ] Confirmar a cor final do X-BOT; enquanto isso, `#CD5EFA` continua provisório.

### Risco operacional

- [ ] A cópia de trabalho local ainda está dentro do OneDrive. Mover o repositório de desenvolvimento para uma pasta local não sincronizada ou adotar uma forma equivalente de evitar conflitos de sincronização; o Git/GitHub deve continuar sendo a fonte de versionamento.

### A avaliar antes da versão final

- créditos da equipe e do grupo do X-BOT;
- favicon;
- comportamento do site depois da feira;
- necessidade de tutorial/instruções do X-BOT.

Não serão criados prazos artificiais para esses itens. Se algum deles virar requisito, entra na lista principal com contexto e, quando necessário, data.
---

## 17. Outros arquivos

- [`README.md`](./README.md)
- [`AI-WORKFLOW.md`](./AI-WORKFLOW.md)
- [`DECISIONS.md`](./DECISIONS.md)
- [`DEVLOG.md`](./DEVLOG.md)
- [`docs/ESTILO.md`](./docs/ESTILO.md)
