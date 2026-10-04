# OdisseIA — AI Workflow

Este arquivo explica como ferramentas de IA estão sendo usadas no desenvolvimento do OdisseIA.

A intenção é registrar o processo com transparência.

Não queremos fingir que tudo foi feito manualmente, mas também seria errado resumir o projeto a “a IA fez tudo”.

---

## 1. Como estamos trabalhando

O projeto utiliza IA como ferramenta de apoio em várias etapas.

De forma geral:

- **ChatGPT** ajuda mais na parte de planejamento, análise, organização, UX, arquitetura, revisão e documentação;
- **Claude (chat)** é usado principalmente para revisão crítica, análise de risco, revisão e montagem de prompts para o Claude Code e conferência de resultados;
- **Claude Code** entra mais diretamente na implementação e edição do código;
- decisões finais, testes, validação e responsabilidade continuam sendo humanas.

Essa divisão não é rígida. O importante é mostrar o que realmente aconteceu.

---

## 2. Papel humano

Pietro participa principalmente de:

- explicar o problema;
- definir objetivos;
- passar contexto;
- levantar requisitos;
- comparar possibilidades;
- tomar ou consolidar decisões;
- aceitar, modificar ou rejeitar sugestões;
- preparar tarefas para implementação;
- acompanhar o código;
- identificar problemas;
- testar manualmente;
- pedir correções;
- organizar o projeto;
- usar Git e GitHub;
- assumir responsabilidade pelo resultado final.

Quando alguma parte depende de outro grupo, como o Robot TCG, essa responsabilidade continua com os integrantes daquele grupo.

---

## 3. Como o ChatGPT é usado

O ChatGPT é usado principalmente para:

- organizar ideias;
- transformar ideias em requisitos;
- comparar alternativas;
- discutir arquitetura;
- planejar UX/UI;
- revisar decisões;
- identificar riscos;
- explicar código;
- ajudar em debugging;
- preparar documentação;
- montar instruções mais claras para implementação.

As respostas não são aceitas automaticamente.

Uma sugestão pode ser:

- usada;
- adaptada;
- rejeitada;
- deixada para depois.

---

## 4. Como o Claude Code é usado

O Claude Code é usado principalmente quando precisamos trabalhar diretamente no projeto.

Entre as tarefas estão:

- criar arquivos;
- alterar código;
- implementar funcionalidades;
- corrigir bugs;
- refatorar;
- executar tarefas técnicas já discutidas antes.

A ideia não é simplesmente pedir “faça o site”.

Antes da implementação, o contexto geral do projeto é estabelecido e depois o trabalho segue uma tarefa por vez.

Os prompts costumam ser enxutos e organizados em:

```text
Tarefa
Contexto necessário
Requisitos
Restrições
Critério de conclusão
```

Não é necessário repetir toda a história do projeto a cada tarefa.

Claude Code pode decidir detalhes internos de implementação, mas decisões de produto, UX, fluxo e regras do projeto são definidas antes.

---

## 5. Workflow atual

Com o início da implementação, o processo deixou de ser apenas planejado e passou a ser usado de verdade.

O ciclo atual é:

```text
prompt / especificação da tarefa
↓
revisão
↓
implementação pelo Claude Code
↓
teste manual
↓
commit na branch dev
↓
registro das decisões relevantes
```

Quando uma mudança é maior ou mais arriscada, primeiro é feito um diagnóstico antes de alterar o código.

A intenção é manter tarefas pequenas o suficiente para que o resultado possa ser entendido, testado e versionado sem misturar várias responsabilidades ao mesmo tempo.

---

## 6. Estado atual

O workflow já foi usado em ciclos completos de desenvolvimento.

Em 02/10/2026 foram concluídas as primeiras entregas técnicas importantes:

- fundação inicial do site;
- sistema de progresso local.

Essas tarefas passaram por especificação, implementação com Claude Code, revisão, teste manual e commit em `dev`.

O projeto continua usando IA como ferramenta de implementação, não como substituta da definição do produto.

---

## 7. Casos reais até agora

### 7.1 Mudança de cinco para quatro estações

No começo, o projeto previa cinco estações.

Depois de discutir a função da etapa de portfólio/documentação, chegamos ao consenso de que ela não precisava fazer parte do percurso físico.

A estrutura passou então para quatro estações.

A IA ajudou principalmente a organizar as consequências dessa mudança para o site e para a documentação.

A decisão final, porém, foi do grupo.

---

### 7.2 Separação entre o site e o Robot TCG

A Estação 4 depende de um jogo que ainda está sendo desenvolvido por outro grupo.

Durante o planejamento percebemos um problema: se o site começasse a documentar regras ou tecnologias ainda não implementadas, poderíamos acabar apresentando algo que não existia de verdade.

Por isso, decidimos separar as responsabilidades.

O grupo do jogo cuida das mecânicas e da implementação. O site recebe apenas as informações finais necessárias para integrar e apresentar o Robot TCG.

Essa decisão também virou uma regra de documentação: **planejado não é o mesmo que implementado**.

---

### 7.3 Segurança no frontend

Em uma discussão sobre o sistema de progresso surgiu uma dúvida simples:

> E se alguém abrir o F12 e alterar isso?

A partir daí, analisamos melhor o papel do frontend.

Como JavaScript e `localStorage` ficam no navegador, o usuário pode inspecionar ou modificar esses dados.

Então adotamos uma regra:

> O frontend pode controlar a experiência, mas não deve guardar nada que dependa de segurança real.

Essa discussão ajudou a separar duas coisas diferentes:

- impedir um usuário comum de pular uma etapa;
- proteger de verdade uma informação ou recurso.

São problemas diferentes.

---

### 7.4 Fundação inicial do projeto

Antes de desenvolver Hub, QR Codes e conteúdo das estações, era necessário criar uma base consistente para o site.

A tarefa foi especificada com limites claros: criar as páginas principais, a estrutura de `assets` e a configuração central, sem antecipar a lógica de progresso, QR Codes ou desbloqueio.

A implementação foi feita com Claude Code.

Os arquivos de documentação existentes foram preservados e a estrutura resultante foi revisada antes de seguir para a próxima tarefa.

O principal ganho dessa etapa foi criar uma fundação real sem misturar responsabilidades que pertenciam a tarefas posteriores.

---

### 7.5 Sistema de progresso

Depois da fundação, a próxima tarefa foi criar a base de progresso usada pelo restante da experiência.

A decisão de usar `localStorage` já existia. Na implementação, o estado foi reduzido a uma estrutura simples:

```js
{
  versao: 1,
  ultimaEstacaoDesbloqueada: 0
}
```

A chave definida foi:

```text
odisseia:progresso
```

Em vez de guardar vários estados redundantes, as demais informações da interface podem ser derivadas da última estação desbloqueada.

A funcionalidade foi implementada com Claude Code e depois testada manualmente.

Foram verificados o avanço do progresso, a persistência após recarregar, o limite das quatro estações e o comportamento diante de estado inválido.

Depois da validação, a mudança foi commitada na branch `dev`.

Esse foi o primeiro exemplo completo do ciclo:

```text
especificação → implementação → teste → commit
```

---

### 7.6 Validação de progresso que aceitava número decimal

Uma revisão em chat considerou a validação do progresso robusta. Uma auditoria posterior, feita direto no código, mostrou que o valor 2.5 passava na checagem, porque ela só testava se era número. Foi corrigido com `Number.isInteger` e testado no console.

Lição: revisão de uma IA que não rodou o código não é validação.

---

### 7.7 A IA não conseguiu testar o resultado

O Claude Code informou que o painel de pré-visualização dele bloqueia o `localStorage` e que, por isso, os estados do Hub não foram testados por ele. Os testes foram feitos por uma pessoa, no navegador e no celular.

Lição: "rodou sem erro" não é o mesmo que "está correto".

---

### 7.8 Referência visual sem trazer a stack

Foi usada uma referência de componentes feita para React, Tailwind e TypeScript. O prompt proibiu explicitamente instalar dependências, e o visual foi recriado em HTML e CSS puros, conforme a DEC-003.

---

## 8. O que não vamos colocar aqui

Este arquivo não deve virar:

- uma coleção de prompts;
- um histórico completo das conversas;
- propaganda de IA;
- uma lista de tudo que cada ferramenta respondeu;
- uma tentativa de exagerar a participação humana;
- uma tentativa de jogar toda a autoria para a IA.

Só entram casos que ajudam a mostrar como o projeto foi pensado, revisado e construído.

---

## 9. Quando adicionar novos casos

Vale registrar quando acontecer algo como:

- uma IA sugerir algo errado;
- uma solução precisar ser bastante alterada;
- uma proposta ser rejeitada;
- uma implementação exigir várias tentativas;
- uma decisão humana mudar o rumo da solução;
- surgir uma limitação importante;
- houver um bom exemplo de planejamento → implementação → teste;
- ChatGPT e Claude Code forem usados de formas diferentes no mesmo problema.

---

## 10. Responsabilidade

As ferramentas ajudam bastante, mas não assumem responsabilidade pelo projeto.

No final, o resultado precisa ser entendido, revisado, testado, versionado e assumido por quem está desenvolvendo.
