// Página do portfólio (portfolio.html): o documento do projeto, em HTML estático e somente leitura.
//
// Dentro do leitor da Conclusão (um <iframe> da mesma origem, criado por portfolio.js), ela não monta o
// painel de acessibilidade de novo (a Conclusão já tem o seu; tema, tamanho do texto, contraste e
// movimento continuam aplicados por acessibilidade.js) e repassa o Esc ao leitor, porque o teclado
// dentro do quadro não chega à página que o contém. Aberta direto, é só o documento, com o painel.
// Não toca em localStorage. Carregado no <head>, antes de acessibilidade.js.
(function () {
  "use strict";

  if (window.parent === window) return;

  document.documentElement.setAttribute("data-sem-painel", "");
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      window.parent.postMessage({ tipo: "odisseia:fechar-portfolio" }, "*");
    }
  });
})();
