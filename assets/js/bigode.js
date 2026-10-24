// Easter egg "VOCÊ É BIGODE": cinco cliques rápidos na marca OdisseIA, no Hub ou na abertura.
//
// "Bigode", aqui, é quem tem palavra: pessoa de respeito, que cumpre o que promete.
//
// Não lê nem grava progresso, não toca em localStorage e não altera nenhum link: o gatilho é um
// ouvinte de clique em elementos marcados com data-bigode (a marca não é link nem botão). Clique do
// mouse e toque chegam ao mesmo evento "click". A apresentação é um <dialog> nativo em tela cheia
// (foco preso, Esc fecha), montado só na primeira vez. O movimento segue data-movimento, que
// acessibilidade.js grava no <html>; com "reduzido" o CSS desliga toda a animação.
(function () {
  "use strict";

  const CLIQUES = 5;
  // Intervalo máximo entre dois cliques seguidos. Um clique mais lento recomeça a contagem.
  const INTERVALO_MS = 700;
  // Repetições do letreiro da faixa: o bastante para cobrir telas largas (até 2560px com escala).
  const FAIXA_REPETICOES = 12;

  let dialogo = null;
  let fechar = null;

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

    // Fundo: linhas de foco que irrompem do centro, cruzes de registro e a faixa que corre embaixo.
    dialogo.appendChild(decorativo(criar("div", "bigode__foco textura-foco")));
    dialogo.appendChild(decorativo(criar("span", "registro bigode__registro-a")));
    dialogo.appendChild(decorativo(criar("span", "registro bigode__registro-b")));

    const faixa = decorativo(criar("div", "bigode__faixa"));
    faixa.appendChild(criar("div", "bigode__correr", "PALAVRA DADA · PALAVRA CUMPRIDA · ".repeat(FAIXA_REPETICOES)));
    dialogo.appendChild(faixa);

    const palco = criar("div", "bigode__palco");

    const carimbo = criar("div", "ficha bigode__carimbo");
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
    carimbo.appendChild(titulo);

    const frase = criar("p", "bigode__frase", "Palavra dada, palavra cumprida.");
    frase.id = "bigode-frase";
    carimbo.appendChild(frase);
    palco.appendChild(carimbo);

    fechar = criar("button", "botao bigode__fechar", "Fechar");
    fechar.type = "button";
    fechar.addEventListener("click", function () {
      dialogo.close();
    });
    palco.appendChild(fechar);
    dialogo.appendChild(palco);

    // Clicar fora do carimbo (no fundo) também fecha.
    dialogo.addEventListener("click", function (evento) {
      if (evento.target === dialogo || evento.target === palco) dialogo.close();
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
