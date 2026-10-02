# OdisseIA — Decisions

Este arquivo guarda as decisões que realmente mudaram o rumo, a estrutura ou a forma de desenvolver o OdisseIA.

A ideia não é registrar cada detalhe.

Trocar uma cor, ajustar margem, mudar uma frase ou mover um botão não precisa virar decisão formal.

---

## DEC-001 — Trabalhar com mobile-first

**Status:** aceita

### Contexto

Na feira, os visitantes vão usar o próprio celular enquanto passam pelas estações.

### Decisão

O site será pensado primeiro para telas pequenas.

### Por quê?

Porque esse é o cenário real de uso.

### O que isso muda?

- menos informação por tela;
- navegação mais simples;
- foco em leitura rápida;
- desktop continua sendo suportado, mas não é a prioridade.

---

## DEC-002 — Fazer as estações seguirem uma ordem

**Status:** aceita

### Contexto

A experiência física já possui uma sequência definida.

Se o site deixasse tudo aberto desde o começo, ele poderia acabar se desconectando do percurso da feira.

### Decisão

O visitante seguirá as estações em ordem, e o site deverá acompanhar esse progresso.

### Consequências

- precisamos registrar quais etapas já foram concluídas;
- a próxima etapa deve ser liberada conforme o avanço;
- os QR Codes passam a fazer parte desse fluxo.

---

## DEC-003 — Começar sem framework

**Status:** aceita

### Contexto

O projeto não possui, neste momento, uma complexidade que obrigue o uso de React, Vue ou outro framework.

### Decisão

Começar com:

- HTML;
- CSS;
- JavaScript.

### Por quê?

Porque isso já atende ao que precisamos e evita adicionar dependências sem necessidade.

### Consequências

O projeto fica mais simples, mas exige cuidado com a organização manual do código.

Se no futuro surgir uma necessidade real, essa decisão pode ser revista.

---

## DEC-004 — Usar `localStorage` para o progresso

**Status:** aceita para a primeira versão

### Contexto

Precisamos lembrar quais estações o visitante já concluiu.

### Opções consideradas

- `localStorage`;
- servidor;
- conta de usuário.

### Decisão

Usar `localStorage`.

### Por quê?

Porque o projeto não precisa, neste momento, de:

- login;
- conta;
- sincronização entre dispositivos;
- persistência crítica.

### Limitações aceitas

O progresso fica preso ao navegador e pode ser alterado manualmente.

Isso não é tratado como um problema grave porque o sistema serve para organizar a experiência, não para proteger dados importantes.

---

## DEC-005 — Reduzir de cinco para quatro estações

**Status:** aceita  
**Substitui:** estrutura inicial de cinco estações

### Contexto

No começo, existia uma quinta estação ligada a portfólio/documentação.

### Decisão

A experiência principal ficou com quatro estações:

1. jogos até 1999;
2. jogos de 2001 até hoje;
3. IA nos jogos;
4. Robot TCG.

### Por quê?

Porque o portfólio e a documentação não precisavam ocupar uma etapa física do percurso.

### Consequências

- o fluxo principal ficou menor;
- materiais antigos que falam em cinco estações precisam ser atualizados;
- o portfólio continua existindo, mas fora da experiência do visitante.

---

## DEC-006 — Não confiar no frontend como segurança real

**Status:** aceita

### Contexto

Qualquer pessoa pode abrir o DevTools e inspecionar JavaScript, URLs e `localStorage`.

### Decisão

O frontend será usado para controlar a experiência, não para proteger algo crítico.

### Regra adotada

Se algo puder ser descoberto ou alterado facilmente pelo F12 e isso causar um problema real, não deve depender só do frontend.

### Consequências

Não colocar no cliente:

- credenciais;
- tokens privados;
- segredos;
- chaves sensíveis;
- dados que precisem ficar ocultos;
- regras críticas de autorização.

---

## DEC-007 — Separar o site das decisões internas do Robot TCG

**Status:** aceita

### Contexto

A Estação 4 depende de um jogo desenvolvido por outro grupo.

### Problema

Se a equipe do site começasse a definir ou documentar as mecânicas antes do jogo ficar pronto, poderíamos criar divergências entre o que está escrito e o que realmente existe.

### Decisão

O grupo do Robot TCG continua responsável por:

- regras;
- cartas;
- energia;
- balanceamento;
- turnos;
- IA;
- implementação.

O site recebe apenas as informações finais necessárias para integração.

### Consequência

A Estação 4 só deve apresentar aquilo que realmente existir na versão final do jogo.

---

## DEC-008 — Não usar backend sem necessidade

**Status:** aceita para a primeira versão

### Contexto

O projeto atual é um site estático para uma feira escolar.

### Decisão

Não adicionar backend apenas por “boa prática” ou para deixar a arquitetura mais complexa.

### Por quê?

Porque hoje não existe requisito que justifique isso.

### Quando rever?

Se surgir necessidade de:

- autenticação;
- sincronização;
- persistência centralizada;
- segurança real;
- dados compartilhados.

---

## DEC-009 — Ser transparente sobre o uso de IA

**Status:** aceita

### Contexto

ChatGPT e Claude Code fazem parte do processo de desenvolvimento.

### Decisão

Assumir isso claramente na documentação.

### Como dividimos o trabalho

De forma geral:

- ChatGPT ajuda mais em planejamento, análise, arquitetura, UX, revisão e documentação;
- Claude Code ajuda mais na implementação;
- as pessoas responsáveis definem contexto, tomam decisões, testam e assumem o resultado.

### Consequências

- existe um `AI-WORKFLOW.md`;
- casos importantes de uso de IA podem ser registrados;
- não vamos fingir autoria manual de algo que não aconteceu;
- também não vamos tratar o projeto como se tivesse sido criado automaticamente.
