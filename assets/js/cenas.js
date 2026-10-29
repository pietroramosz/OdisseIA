// Visualizações que se desenham uma vez, quando chegam à tela (crise de 1983, ondas da Twitch e rota
// do A*). Só marca o estado: "espera" antes de aparecer e "toca" quando entra na tela; quem desenha é o
// CSS (estacao-editorial.css, seção "Cenas"). Com movimento reduzido, ou sem IntersectionObserver, o
// atributo nem é criado e a ilustração fica completa e parada.
(function () {
  "use strict";

  const cenas = document.querySelectorAll("[data-cena]");
  if (cenas.length === 0) {
    return;
  }

  if (movimentoReduzido() || typeof window.IntersectionObserver !== "function") {
    return;
  }

  // Dispara quando o topo da figura passa a linha dos 75% da janela, mesmo que ela seja mais alta
  // que a janela (um limiar de área visível nunca seria atingido num celular deitado).
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.setAttribute("data-cena", "toca");
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: "0px 0px -25% 0px", threshold: 0 });

  cenas.forEach(function (cena) {
    cena.setAttribute("data-cena", "espera");
    observador.observe(cena);
  });

  // acessibilidade.js grava data-movimento antes da primeira pintura; sem ele vale o sistema.
  function movimentoReduzido() {
    const escolha = document.documentElement.getAttribute("data-movimento");
    if (escolha) {
      return escolha === "reduzido";
    }
    return typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
})();
