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
- integração com o jogo **Robot TCG**.

O site não foi pensado para substituir a apresentação física. Ele funciona como uma extensão da experiência, ajudando a conectar as estações e oferecendo conteúdo e interações que fazem sentido no celular.

---

## 2. Como tratamos o estado das funcionalidades

Durante o desenvolvimento, usamos quatro estados para evitar confusão:

- **Definido:** a decisão já foi tomada;
- **Planejado:** sabemos como queremos que funcione, mas ainda não foi implementado;
- **Implementado:** já existe no código;
- **Validado:** foi implementado e testado no fluxo esperado.

No momento, boa parte do projeto ainda está entre **definido** e **planejado**.

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
- não transformar imagens ilustrativas em “marcos históricos” sem base;
- evitar comparações ou afirmações que não tenham suporte suficiente.

### Estação 3 — Inteligência Artificial nos jogos

A terceira estação mostra como a IA foi sendo usada nos jogos ao longo do tempo.

A linha conceitual atualmente considerada passa por ideias como:

- regras;
- pathfinding;
- behavior trees;
- utility systems;
- machine learning;
- IA generativa.

O conteúdo final ainda depende da versão aprovada da estação.

### Estação 4 — Robot TCG

A quarta estação apresenta o **Robot TCG**, um jogo desenvolvido por outro núcleo do projeto.

O que já está definido:

- a versão final será executada no navegador;
- existe intenção de oferecer uma versão adaptada para mobile;
- existe também a ideia de disponibilizar download, mas o formato ainda não foi fechado;
- o site só deve apresentar mecânicas e tecnologias que realmente existirem na versão final.

As regras internas, o balanceamento, as cartas, a energia, a IA adversária e outras decisões do jogo ficam com o grupo responsável pelo Robot TCG.

---

## 4. De cinco para quatro estações

No começo, o projeto tinha uma quinta estação ligada a portfólio/documentação.

Depois de revisar a experiência, decidimos que essa parte não precisava ocupar uma estação física.

A estrutura atual ficou com quatro estações, enquanto o portfólio e a documentação continuam existindo separadamente.

Essa mudança é importante porque alterou diretamente o fluxo do site e o escopo da experiência.

---

## 5. Fluxo do visitante

### Já definido

- o visitante usa o próprio celular;
- a experiência é mobile-first;
- cada estação possui um QR Code;
- as estações são visitadas em ordem;
- o site deve mostrar o progresso do visitante.

### Planejado

O fluxo esperado é:

1. o visitante chega à estação;
2. acompanha a apresentação física;
3. escaneia o QR Code;
4. acessa a parte digital daquela etapa;
5. a conclusão é registrada;
6. a próxima estação é liberada;
7. o processo continua até o final.

A forma exata de entrada no Robot TCG ainda depende da versão final do jogo.

---

## 6. Sistema de progresso

A ideia é registrar no próprio navegador quais estações já foram concluídas.

Para a primeira versão, a solução escolhida é usar `localStorage`.

Essa escolha faz sentido porque o projeto:

- não precisa de conta de usuário;
- não precisa sincronizar progresso entre celulares;
- não trabalha com dados críticos;
- será hospedado como site estático.

Ao mesmo tempo, sabemos que `localStorage` pode ser alterado pelo próprio usuário.

Por isso, esse sistema serve para **organizar a experiência**, e não como mecanismo real de segurança.

---

## 7. QR Codes

Cada estação terá um QR Code que leva o visitante para a parte correspondente do site.

Eles funcionam como ponte entre:

**estação física → parte digital**

A ordem das etapas será controlada pelo próprio site.

Como essa lógica fica no navegador, uma pessoa com conhecimento técnico pode tentar contornar o fluxo. Isso é aceitável porque o projeto não está protegendo informações sensíveis ou recursos críticos.

---

## 8. Arquitetura inicial

A arquitetura foi mantida simples de propósito.

### Frontend

- HTML;
- CSS;
- JavaScript.

### Hospedagem

Planejada com **GitHub Pages** ou **Vercel**.

### Persistência

Planejada com `localStorage`.

### Versionamento

- Git;
- GitHub.

### Backend

Não existe backend previsto para a primeira versão.

Se no futuro surgir uma necessidade real — como autenticação, sincronização ou proteção de dados — essa decisão pode ser revista.

---

## 9. Segurança

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

## 10. Mobile-first

O mobile-first não foi escolhido por moda.

Durante a feira, o visitante estará circulando entre as estações e usando o próprio celular. Por isso, a experiência precisa ser rápida de entender e fácil de usar em telas pequenas.

Alguns princípios que guiam o design:

- pouca informação por tela;
- navegação simples;
- consistência entre as estações;
- leitura rápida;
- o site complementa a apresentação em vez de competir com ela.

---

## 11. Conteúdo

O conteúdo digital está sendo construído junto com as apresentações físicas.

Algumas regras que seguimos:

- usar como base a pesquisa real dos grupos;
- não tratar conteúdo ainda em discussão como definitivo;
- não inventar marcos ou tecnologias;
- manter a Estação 4 sempre sincronizada com o jogo real.

Decisões pequenas de conteúdo não precisam virar registros técnicos.

---

## 12. Integração com o Robot TCG

Para evitar confusão entre os grupos, as responsabilidades foram separadas.

### Grupo do Robot TCG

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
- eventual desbloqueio;
- documentação apenas do que realmente existir na versão final.

---

## 13. O que não faz parte do escopo atual

Neste momento, não há motivo para adicionar:

- framework frontend;
- backend;
- banco de dados;
- login;
- autenticação;
- infraestrutura complexa.

A ideia é manter o projeto simples enquanto isso for suficiente.

---

## 14. Outros arquivos

- [`README.md`](./README.md)
- [`AI-WORKFLOW.md`](./AI-WORKFLOW.md)
- [`DECISIONS.md`](./DECISIONS.md)
- [`DEVLOG.md`](./DEVLOG.md)
