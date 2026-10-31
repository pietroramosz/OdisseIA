// Leitor do portfólio na Conclusão (final.html): um <dialog> modal com o documento do projeto.
//
// O documento é a página local portfolio.html (HTML estático, somente leitura), carregada num <iframe>
// da mesma origem. Não depende de endereço externo, de conta nem de configuração. Não toca em
// localStorage.
//
// Acessibilidade: o <dialog> modal prende o foco, Esc fecha e o fundo fica inerte. O foco inicial vai ao
// "Fechar" (primeiro controle do leitor) e, ao fechar, volta ao "Ver portfólio". Com o foco dentro do
// documento o Esc não chega a esta página; portfolio-documento.js o repassa por postMessage, e só a
// mensagem do próprio quadro é aceita. O documento é carregado na primeira abertura e continua
// carregado depois, para reabrir sem recomeçar. Sem suporte a <dialog>, o botão abre a página inteira.
(function () {
  "use strict";

  const DOCUMENTO = "portfolio.html";
  const MENSAGEM_FECHAR = "odisseia:fechar-portfolio";

  const abrirBotao = document.getElementById("portfolio-abrir");
  if (!abrirBotao) return;

  let dialogo = null;
  let quadro = null;

  function criar(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
  }

  function montar() {
    dialogo = criar("dialog", "ficha portfolio");
    dialogo.setAttribute("aria-labelledby", "portfolio-titulo");

    const topo = criar("header", "portfolio__topo");
    const titulo = criar("h2", "portfolio__titulo", "Portfólio do OdisseIA");
    titulo.id = "portfolio-titulo";
    topo.appendChild(titulo);

    const fechar = criar("button", "botao portfolio__fechar", "Fechar");
    fechar.type = "button";
    fechar.setAttribute("aria-label", "Fechar o portfólio");
    fechar.addEventListener("click", function () {
      dialogo.close();
    });
    topo.appendChild(fechar);
    dialogo.appendChild(topo);

    const corpo = criar("div", "portfolio__corpo");
    const carregando = criar("p", "portfolio__carregando", "Carregando o portfólio…");
    carregando.setAttribute("role", "status");
    corpo.appendChild(carregando);

    quadro = criar("iframe", "portfolio__quadro");
    quadro.title = "Portfólio do OdisseIA, documento em modo de leitura";
    quadro.addEventListener("load", function () {
      corpo.classList.add("portfolio__corpo--pronto");
      carregando.hidden = true;
    });
    corpo.appendChild(quadro);
    dialogo.appendChild(corpo);

    dialogo.appendChild(criar("p", "portfolio__nota", "Documento em modo de leitura."));

    // Clique no fundo escurecido (o próprio <dialog>, que não tem margem interna) também fecha.
    dialogo.addEventListener("click", function (evento) {
      if (evento.target === dialogo) dialogo.close();
    });
    // Botão, Esc e clique fora passam por aqui: libera a rolagem da página e devolve o foco.
    dialogo.addEventListener("close", function () {
      document.documentElement.classList.remove("portfolio-aberto");
      abrirBotao.focus();
    });

    // Esc dentro do documento: só vale a mensagem que vem do quadro do leitor.
    window.addEventListener("message", function (evento) {
      if (evento.source !== quadro.contentWindow) return;
      if (evento.data && evento.data.tipo === MENSAGEM_FECHAR && dialogo.open) dialogo.close();
    });

    document.body.appendChild(dialogo);
  }

  function abrir() {
    if (typeof HTMLDialogElement !== "function") {
      window.location.href = DOCUMENTO;
      return;
    }
    if (!dialogo) montar();
    if (dialogo.open) return;
    if (!quadro.getAttribute("src")) quadro.src = DOCUMENTO;
    document.documentElement.classList.add("portfolio-aberto");
    dialogo.showModal();
    dialogo.querySelector(".portfolio__fechar").focus();
  }

  abrirBotao.addEventListener("click", abrir);
})();
