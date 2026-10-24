// Easter egg "VOCÊ É BIGODE": cinco cliques rápidos na marca OdisseIA, no Hub ou na abertura.
//
// "Bigode", aqui, é quem tem palavra: pessoa de respeito, que cumpre o que promete.
//
// Não lê nem grava progresso, não toca em localStorage e não altera nenhum link: o gatilho é um
// ouvinte de clique em elementos marcados com data-bigode (a marca não é link nem botão). Clique do
// mouse e toque chegam ao mesmo evento "click". A apresentação é uma janela pequena no centro da
// página (um <dialog> nativo: foco preso, Esc fecha) sobre um fundo escurecido. Ela se fecha sozinha
// depois de DURACAO_MS, pelo botão "Fechar", por Esc ou por um clique fora dela. O movimento segue
// data-movimento, que acessibilidade.js grava no <html>; com "reduzido" o CSS desliga toda a animação.
(function () {
  "use strict";

  const CLIQUES = 5;
  // Intervalo máximo entre dois cliques seguidos. Um clique mais lento recomeça a contagem.
  const INTERVALO_MS = 700;
  // Tempo até a janela se fechar sozinha. A barra de tempo do CSS usa o mesmo valor (--bigode-duracao).
  const DURACAO_MS = 5000;

  let dialogo = null;
  let fechar = null;
  let temporizador = 0;

  function criar(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
  }

  function decorativo(elemento) {
    elemento.setAttribute("aria-hidden", "true");
    return elemento;
  }

  function montar() {
    dialogo = criar("dialog", "bigode");
    dialogo.setAttribute("aria-labelledby", "bigode-titulo");
    dialogo.setAttribute("aria-describedby", "bigode-frase");
    dialogo.style.setProperty("--bigode-duracao", DURACAO_MS + "ms");

    // Linhas de foco ao redor da janela: irrompem do centro e ficam atrás do cartão.
    dialogo.appendChild(decorativo(criar("div", "bigode__foco textura-foco")));

    const cartao = criar("div", "ficha bigode__cartao");
    const titulo = criar("h2", "bigode__titulo");
    titulo.id = "bigode-titulo";
    // O texto completo vai no aria-label; as letras separadas são só para a animação.
    titulo.setAttribute("aria-label", "VOCÊ É BIGODE");
    titulo.appendChild(decorativo(criar("span", "bigode__voce", "VOCÊ É")));
    const palavra = decorativo(criar("span", "bigode__palavra"));
    "BIGODE".split("").forEach(function (letra, indice) {
      const parte = criar("span", "bigode__letra", letra);
      parte.style.setProperty("--i", String(indice));
      palavra.appendChild(parte);
    });
    titulo.appendChild(palavra);
    cartao.appendChild(titulo);

    const frase = criar("p", "bigode__frase", "Palavra dada, palavra cumprida.");
    frase.id = "bigode-frase";
    cartao.appendChild(frase);

    fechar = criar("button", "botao bigode__fechar", "Fechar");
    fechar.type = "button";
    fechar.addEventListener("click", function () {
      dialogo.close();
    });
    cartao.appendChild(fechar);

    // Barra de tempo: esvazia até a janela se fechar. Decorativa; o botão e Esc seguem valendo.
    const tempo = decorativo(criar("div", "bigode__tempo"));
    tempo.appendChild(criar("span", "bigode__tempo-barra"));
    cartao.appendChild(tempo);
    dialogo.appendChild(cartao);

    // Um clique no fundo escurecido (fora da janela) também fecha.
    dialogo.addEventListener("click", function (evento) {
      const caixa = dialogo.getBoundingClientRect();
      const dentro = evento.clientX >= caixa.left && evento.clientX <= caixa.right &&
        evento.clientY >= caixa.top && evento.clientY <= caixa.bottom;
      if (!dentro) dialogo.close();
    });
    // Qualquer forma de fechar (botão, Esc, clique fora, tempo) cancela o relógio.
    dialogo.addEventListener("close", function () {
      window.clearTimeout(temporizador);
    });

    document.body.appendChild(dialogo);
  }

  function abrir() {
    if (!dialogo) montar();
    if (dialogo.open) return;
    if (typeof dialogo.showModal === "function") {
      dialogo.showModal();
    } else {
      dialogo.setAttribute("open", "");
    }
    fechar.focus();
    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(function () {
      if (dialogo.open) dialogo.close();
    }, DURACAO_MS);
  }

  // Conta cliques seguidos num mesmo elemento; o quinto abre a apresentação.
  function observar(alvo) {
    let cliques = 0;
    let ultimo = 0;
    alvo.addEventListener("click", function (evento) {
      cliques = evento.timeStamp - ultimo <= INTERVALO_MS ? cliques + 1 : 1;
      ultimo = evento.timeStamp;
      if (cliques >= CLIQUES) {
        cliques = 0;
        abrir();
      }
    });
  }

  document.querySelectorAll("[data-bigode]").forEach(observar);
})();
