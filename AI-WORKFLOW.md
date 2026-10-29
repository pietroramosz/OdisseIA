# OdisseIA — AI Workflow

Este arquivo explica como as ferramentas de IA são usadas no desenvolvimento do OdisseIA.

A intenção é registrar o processo com transparência: não fingimos que tudo foi feito à mão, mas também seria errado resumir o projeto a "a IA fez tudo".

---

## 1. Quem faz o quê

**Pietro**, o responsável pelo projeto, participa principalmente de:

- explicar o problema, definir objetivos e passar contexto;
- comparar possibilidades, tomar ou consolidar decisões e aceitar, alterar ou rejeitar sugestões;
- preparar as tarefas de implementação e acompanhar o código;
- testar manualmente, pedir correções e usar Git e GitHub;
- assumir a responsabilidade pelo resultado final.

Quando uma parte depende de outro grupo, como o X-B0T, a responsabilidade por ela continua com aquele grupo.

**As ferramentas de IA** entram assim:

- **ChatGPT** ajuda a organizar ideias, transformar ideias em requisitos, comparar alternativas, discutir arquitetura e UX, identificar riscos, explicar código, apoiar o debugging e preparar documentação.
- **Claude (chat)** funciona como uma camada de revisão crítica, quando vale a pena questionar uma ideia antes de implementá-la: levanta riscos, refina a composição e a UX, e ajuda a montar uma tarefa mais clara para o Claude Code.
- **Claude Code** trabalha direto no repositório: cria arquivos, implementa funcionalidades, corrige bugs, refatora e executa tarefas já discutidas.

Essa divisão não é rígida, e nenhuma resposta é aceita automaticamente: uma sugestão pode ser usada, adaptada, rejeitada ou deixada para depois.

---

## 2. Como uma tarefa é feita

```text
ideia / requisito
↓
planejamento e revisão (quando útil, crítica no Claude chat)
↓
tarefa enxuta para o Claude Code
↓
implementação
↓
revisão e teste manual
↓
commit na branch dev
↓
registro das decisões relevantes
```

Nem toda tarefa passa pelas três ferramentas: cada uma entra quando melhora a clareza ou reduz risco, não por ritual.

Antes de implementar, o contexto geral do projeto é estabelecido, e o trabalho segue uma tarefa por vez. Os prompts para o Claude Code são curtos e organizados em tarefa, contexto necessário, requisitos, restrições e critério de conclusão. O Claude Code decide os detalhes internos da implementação; produto, UX, fluxo e regras do projeto são definidos antes.

Mudanças maiores ou mais arriscadas começam por um diagnóstico, sem alterar o código. As tarefas ficam pequenas o bastante para o resultado ser entendido, testado e versionado sem misturar responsabilidades.

---

## 3. Validação

- **Revisão de uma IA que não rodou o código não é validação.** Quem valida é uma pessoa, no navegador e no celular, ou um teste que realmente executa o código.
- **"Rodou sem erro" não é o mesmo que "está correto".**
- **Planejado não é o mesmo que implementado.** A documentação só afirma o que existe, principalmente sobre o X-B0T.
- Iteração visual melhora o resultado, mas precisa de critério de parada para não consumir o tempo das partes mais críticas.

---

## 4. Casos reais

### 4.1 Site e X-B0T: planejado não é implementado

A Estação 4 depende de um jogo que outro grupo ainda estava desenvolvendo. Percebemos que, se o site documentasse regras ou tecnologias ainda não implementadas, poderia apresentar algo que não existia. Então separamos as responsabilidades: o grupo do jogo cuida das mecânicas, e o site recebe só as informações finais necessárias para integrar e apresentar o X-B0T (DEC-007).

### 4.2 Da especificação ao commit

A fundação do site e o sistema de progresso foram os primeiros ciclos completos. Cada tarefa foi especificada com limites claros (a fundação, por exemplo, não antecipava progresso, QR Codes nem desbloqueio), implementada com o Claude Code, revisada, testada manualmente e commitada em `dev`.

No progresso, a decisão de usar `localStorage` já existia. A implementação reduziu o estado a `{ versao, ultimaEstacaoDesbloqueada }`, na chave `odisseia:progresso`, derivando o resto da interface desse valor. Os testes cobriram o avanço, a persistência após recarregar, o limite de quatro estações e o estado inválido.

### 4.3 A validação que aceitava número decimal

Uma revisão em chat considerou a validação do progresso robusta. Uma auditoria feita direto no código mostrou que o valor `2.5` passava, porque a checagem só testava se era número. A correção usou `Number.isInteger` e foi testada no console.

### 4.4 A IA não conseguiu testar o resultado

O Claude Code avisou que o painel de pré-visualização dele bloqueia o `localStorage` e que, por isso, não testou os estados do Hub. Os testes foram feitos por uma pessoa, no navegador e no celular.

---

## 5. O que não vai neste arquivo

Este arquivo não é uma coleção de prompts, um histórico de conversas, propaganda de IA nem uma tentativa de exagerar (ou de apagar) a participação humana.

Um novo caso só entra quando mostra algo útil sobre o processo: uma IA que sugeriu algo errado, uma proposta rejeitada, uma solução que precisou mudar bastante, uma limitação importante ou uma decisão humana que mudou o rumo.

---

## 6. Responsabilidade

As ferramentas ajudam bastante, mas não assumem responsabilidade pelo projeto. No fim, o resultado precisa ser entendido, revisado, testado, versionado e assumido por quem o desenvolve.
