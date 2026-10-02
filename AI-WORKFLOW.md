# OdisseIA — AI Workflow

Este arquivo explica como ferramentas de IA estão sendo usadas no desenvolvimento do OdisseIA.

A intenção é registrar o processo com transparência.

Não queremos fingir que tudo foi feito manualmente, mas também seria errado resumir o projeto a “a IA fez tudo”.

---

## 1. Como estamos trabalhando

O projeto utiliza IA como ferramenta de apoio em várias etapas.

De forma geral:

- **ChatGPT** ajuda mais na parte de planejamento, análise, organização, UX, arquitetura, revisão e documentação;
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

Entre as tarefas esperadas estão:

- criar arquivos;
- alterar código;
- implementar funcionalidades;
- corrigir bugs;
- refatorar;
- executar tarefas técnicas já discutidas antes.

A ideia não é simplesmente pedir “faça o site”.

Antes da implementação, tentamos chegar com contexto suficiente para explicar:

- o que precisa ser feito;
- por que aquilo existe;
- quais restrições devem ser respeitadas;
- como saber se a solução funcionou.

---

## 5. Fluxo de trabalho

O processo que estamos tentando seguir é:

```text
necessidade
↓
entender o problema
↓
definir objetivo e restrições
↓
discutir alternativas
↓
tomar uma decisão
↓
transformar isso em uma tarefa clara
↓
implementar
↓
revisar
↓
testar
↓
corrigir
↓
versionar
```

Nem toda tarefa passa exatamente por todas essas etapas, mas esse é o fluxo geral.

---

## 6. Estado atual

Até agora, o projeto passou muito mais tempo em:

- planejamento;
- conteúdo;
- UX;
- estrutura;
- arquitetura inicial;
- documentação.

Por isso, este arquivo ainda tem mais exemplos de decisões e organização do que de código implementado.

Isso é intencional.

Não faz sentido inventar histórias de implementação só para deixar a documentação mais cheia.

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

Essa discussão ajudou a separar duas coisas que pareciam semelhantes no começo:

- impedir um usuário comum de pular uma etapa;
- proteger de verdade uma informação ou recurso.

São problemas diferentes.

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
