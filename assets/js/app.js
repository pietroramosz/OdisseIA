// Inicialização das páginas. O site é aberto: todas as estações e a conclusão estão sempre
// disponíveis, sem progresso, validação ou bloqueio.

const ESTACOES_NOMES = [
  "Inteligência Artificial nos jogos",
  "Evolução dos jogos até 2000",
  "Evolução dos jogos de 2001 até hoje",
  "X-B0T"
];

// Descrição curta de cada cartão: o título do briefing da própria estação.
const ESTACOES_DESCRICOES = [
  "Das regras à inteligência artificial",
  "Do laboratório ao videogame",
  "A era dos jogos conectados",
  "Um jogo de cartas feito para o OdisseIA"
];

// Chave do antigo progresso das estações (QR Codes da feira). Não é mais usada: só é apagada.
const PROGRESSO_ANTIGO_CHAVE = "odisseia:progresso";

function limparProgressoAntigo() {
  try {
    localStorage.removeItem(PROGRESSO_ANTIGO_CHAVE);
  } catch (erro) {
    // Armazenamento indisponível (modo privado, bloqueado): não há nada a limpar.
  }
}

// Textos e tamanho do cartão de estação no Hub: todas as estações estão disponíveis.
const ESTACAO_ROTULO = "DISPONÍVEL";
const ESTACAO_ACAO = "Ver conteúdo";
const ESTACAO_MARCADOR_TAMANHO = 44;

// O X-B0T só é tratado como acessível com uma URL absoluta http(s) em gameUrl.
// Valores vazios, com espaços no meio, relativos ou de outro protocolo ficam como pendentes.
function urlAcessivel(valor) {
  if (typeof valor !== "string") {
    return false;
  }
  const texto = valor.trim();
  if (texto === "" || /\s/.test(texto)) {
    return false;
  }
  try {
    const protocolo = new URL(texto).protocol;
    return protocolo === "http:" || protocolo === "https:";
  } catch (erro) {
    return false;
  }
}

function renderizarHub() {
  renderizarEstacoes(OdisseIAConfig.totalEstacoes);
  renderizarFinais();
}

function renderizarEstacoes(total) {
  const lista = document.getElementById("lista-estacoes");
  lista.textContent = "";

  for (let n = 1; n <= total; n++) {
    lista.appendChild(criarCardEstacao(n));
  }
}

function criarCardEstacao(numero) {
  const item = document.createElement("li");
  item.className = "estacao estacao--disponivel";

  const cartao = document.createElement("a");
  cartao.className = "cartao";
  cartao.href = "estacao-" + numero + ".html";

  // Nó do trilho: engrenagem + número da estação.
  const no = document.createElement("span");
  no.className = "estacao__no";

  const marcador = document.createElement("img");
  marcador.className = "marcador";
  marcador.alt = "";
  // A engrenagem roxa é só do X-B0T.
  marcador.src = "assets/img/engrenagem-azul.png";
  marcador.width = ESTACAO_MARCADOR_TAMANHO;
  marcador.height = ESTACAO_MARCADOR_TAMANHO;
  no.appendChild(marcador);

  const numeroTexto = document.createElement("span");
  numeroTexto.className = "estacao__numero";
  numeroTexto.appendChild(criarTexto("span", "visualmente-oculto", "Estação "));
  numeroTexto.appendChild(document.createTextNode(doisDigitos(numero)));
  no.appendChild(numeroTexto);

  cartao.appendChild(no);

  // Anatomia do cartão: título, descrição, faixa de estado e barra de ação.
  // O título abre o cartão; o estado vem depois, nunca como rótulo acima do título.
  const id = "estacao-" + numero;
  const corpo = document.createElement("div");
  corpo.className = "ficha cartao__corpo";
  const faixa = criarTexto("span", "cartao__faixa", "");
  faixa.setAttribute("aria-hidden", "true");
  corpo.appendChild(faixa);
  // Retícula de mangá no canto do cartão.
  const reticula = criarTexto("span", "cartao__reticula textura-reticula", "");
  reticula.setAttribute("aria-hidden", "true");
  corpo.appendChild(reticula);
  corpo.appendChild(criarTexto("h2", "estacao__titulo", ESTACOES_NOMES[numero - 1], id + "-titulo"));
  corpo.appendChild(criarTexto("p", "cartao__descricao", ESTACOES_DESCRICOES[numero - 1], id + "-descricao"));

  const meta = document.createElement("div");
  meta.className = "cartao__meta";
  meta.appendChild(criarTexto("p", "rotulo cartao__estado", ESTACAO_ROTULO, id + "-estado"));
  const ficha = criarTexto("span", "cartao__ficha", "EST. " + doisDigitos(numero) + " / " + doisDigitos(OdisseIAConfig.totalEstacoes));
  ficha.setAttribute("aria-hidden", "true");
  meta.appendChild(ficha);
  corpo.appendChild(meta);

  const acao = criarTexto("span", "estacao__acao", ESTACAO_ACAO, id + "-acao");
  acao.appendChild(criarSeta());
  corpo.appendChild(acao);
  cartao.appendChild(corpo);

  // Nome acessível curto: título, estado e ação. A descrição vem como complemento.
  cartao.setAttribute("aria-labelledby", [id + "-titulo", id + "-estado", id + "-acao"].join(" "));
  cartao.setAttribute("aria-describedby", id + "-descricao");
  item.appendChild(cartao);

  return item;
}

function renderizarFinais() {
  const lista = document.getElementById("lista-finais");
  lista.textContent = "";

  lista.appendChild(criarCardFinal({
    tipo: "conclusao",
    titulo: "Conclusão",
    descricao: "O fecho da jornada: um resumo das quatro estações e o caminho até o X-B0T.",
    href: "final.html",
    principal: true,
    rotulo: "DISPONÍVEL",
    detalhe: "Ver conclusão"
  }));

  // Só uma URL válida de OdisseIAConfig.gameUrl torna o X-B0T um link (na mesma aba). Sem ela, o
  // cartão é só status: nunca há link quebrado.
  const acessivel = urlAcessivel(OdisseIAConfig.gameUrl);
  lista.appendChild(criarCardFinal({
    tipo: "xbot",
    titulo: "X-B0T",
    descricao: "O jogo digital de cartas desenvolvido para o OdisseIA.",
    href: acessivel ? OdisseIAConfig.gameUrl.trim() : null,
    pendente: !acessivel,
    aviso: acessivel,
    rotulo: acessivel ? "DISPONÍVEL" : "AGUARDANDO LIBERAÇÃO",
    detalhe: acessivel ? "Jogar X-B0T" : "Em breve"
  }));
}

function criarCardFinal(dados) {
  const item = document.createElement("li");
  item.className = "final final--" + dados.tipo
    + (dados.pendente ? " final--pendente" : "")
    + (dados.principal ? " final--principal" : "");

  const cartao = document.createElement(dados.href ? "a" : "div");
  cartao.className = "cartao";
  if (dados.href) {
    cartao.href = dados.href;
  }

  // Mesma anatomia dos cartões de estação. Sem link, o detalhe é um status, não uma ação.
  const id = "destino-" + dados.tipo;
  const corpo = document.createElement("div");
  corpo.className = "ficha cartao__corpo";
  const faixa = criarTexto("span", "cartao__faixa", "");
  faixa.setAttribute("aria-hidden", "true");
  corpo.appendChild(faixa);
  corpo.appendChild(criarTexto("h3", "final__titulo", dados.titulo, id + "-titulo"));
  corpo.appendChild(criarTexto("p", "cartao__descricao", dados.descricao, id + "-descricao"));

  // O X-B0T é o único destino com identidade própria: a engrenagem roxa do jogo.
  if (dados.tipo === "xbot") {
    const engrenagem = document.createElement("img");
    engrenagem.className = "final__engrenagem";
    engrenagem.alt = "";
    engrenagem.src = "assets/img/engrenagem-acesa.png";
    engrenagem.width = 64;
    engrenagem.height = 64;
    corpo.appendChild(engrenagem);
  }

  const meta = document.createElement("div");
  meta.className = "cartao__meta";
  meta.appendChild(criarTexto("p", "rotulo cartao__estado", dados.rotulo, id + "-estado"));
  corpo.appendChild(meta);

  // Aviso para jogar no celular: aparece antes do acesso, junto à ação.
  if (dados.aviso) {
    corpo.appendChild(criarAvisoGiro(id + "-aviso"));
  }

  const detalhe = criarTexto("span", dados.href ? "final__detalhe" : "final__detalhe final__detalhe--status", dados.detalhe, id + "-detalhe");
  if (dados.href) {
    detalhe.appendChild(criarSeta());
    cartao.setAttribute("aria-labelledby", [id + "-titulo", id + "-estado", id + "-detalhe"].join(" "));
    if (dados.aviso) {
      descreverComAviso(cartao, id);
    } else {
      cartao.setAttribute("aria-describedby", id + "-descricao");
    }
  }
  corpo.appendChild(detalhe);

  cartao.appendChild(corpo);
  item.appendChild(cartao);
  return item;
}

// O aviso só é exibido pelo CSS em tela pequena e na vertical; no desktop e com o aparelho deitado
// o parágrafo fica oculto (e fora da leitura de tela). Não força a rotação nem bloqueia o acesso.
const AVISO_GIRO = "Para jogar pelo celular, vire o aparelho na horizontal.";
const CONSULTA_AVISO_GIRO = "(max-width: 899px) and (orientation: portrait)";

// O aviso entra na descrição do link só enquanto ele é exibido (a mesma condição do CSS): um
// aria-describedby apontando para um parágrafo oculto seria lido também no desktop.
function descreverComAviso(link, id) {
  const consulta = typeof window.matchMedia === "function" ? window.matchMedia(CONSULTA_AVISO_GIRO) : null;
  function atualizar() {
    link.setAttribute("aria-describedby", id + "-descricao" + (consulta && consulta.matches ? " " + id + "-aviso" : ""));
  }
  atualizar();
  if (consulta) {
    if (consulta.addEventListener) {
      consulta.addEventListener("change", atualizar);
    } else if (consulta.addListener) {
      consulta.addListener(atualizar);
    }
  }
}

function criarAvisoGiro(id) {
  const ns = "http://www.w3.org/2000/svg";
  const aviso = document.createElement("p");
  aviso.className = "aviso-giro";
  if (id) {
    aviso.id = id;
  }

  const icone = document.createElementNS(ns, "svg");
  icone.setAttribute("class", "aviso-giro__icone");
  icone.setAttribute("viewBox", "0 0 28 28");
  icone.setAttribute("aria-hidden", "true");
  icone.setAttribute("focusable", "false");
  // Celular em pé (tracejado) girando para deitado (cheio).
  [
    { d: "M5 8H9V20H5Z", dash: "2 2" },
    { d: "M12 11H24V19H12ZM12 14V16", dash: null }
  ].forEach(function (forma) {
    const caminho = document.createElementNS(ns, "path");
    caminho.setAttribute("d", forma.d);
    caminho.setAttribute("fill", "none");
    caminho.setAttribute("stroke", "currentColor");
    caminho.setAttribute("stroke-width", "1.8");
    caminho.setAttribute("stroke-linejoin", "miter");
    if (forma.dash) {
      caminho.setAttribute("stroke-dasharray", forma.dash);
    }
    icone.appendChild(caminho);
  });
  aviso.appendChild(icone);
  aviso.appendChild(document.createTextNode(AVISO_GIRO));
  return aviso;
}

function criarSeta() {
  const seta = criarTexto("span", "seta", "");
  seta.setAttribute("aria-hidden", "true");
  return seta;
}

function doisDigitos(numero) {
  return (numero < 10 ? "0" : "") + numero;
}

// O zero de X-B0T leva uma barra nos títulos e botões (classe .zero em style.css).
// Tudo vai dentro de um único span: um pai flex com gap não pode separar o nome em pedaços.
function textoComZero(elemento, texto) {
  const envoltorio = document.createElement("span");
  texto.split("X-B0T").forEach(function (parte, indice) {
    if (indice > 0) {
      envoltorio.appendChild(document.createTextNode("X-B"));
      envoltorio.appendChild(criarTexto("span", "zero", "0"));
      envoltorio.appendChild(document.createTextNode("T"));
    }
    envoltorio.appendChild(document.createTextNode(parte));
  });
  elemento.appendChild(envoltorio);
}

function criarTexto(tag, classe, texto, id) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  if (texto.indexOf("X-B0T") !== -1) {
    textoComZero(elemento, texto);
  } else {
    elemento.textContent = texto;
  }
  if (id) {
    elemento.id = id;
  }
  return elemento;
}

function criarBotao(acao) {
  const botao = document.createElement("a");
  botao.className = "botao" + (acao.principal ? " botao--principal" : "");
  botao.href = acao.href;
  textoComZero(botao, acao.texto);
  return botao;
}

// Carta de acesso ao site do jogo (Estação 4). O destino vem só de OdisseIAConfig.gameUrl; sem uma URL
// válida a carta fica oculta, então nunca há acesso quebrado. Dois passos: virar a carta (descobrir o
// verso) e ativar o verso, que faz uma animação curta e abre o site na mesma aba. A frente é um
// <button> e o verso um <a>: funcionam com toque, mouse e teclado; a face escondida fica inert.
function movimentoReduzido() {
  return document.documentElement.getAttribute("data-movimento") === "reduzido";
}

function prepararCartaAcesso() {
  const acessivel = urlAcessivel(OdisseIAConfig.gameUrl);
  document.querySelectorAll("[data-carta-acesso]").forEach(function (secao) {
    if (!acessivel) {
      secao.hidden = true;
      return;
    }
    const carta = secao.querySelector(".carta");
    const frente = secao.querySelector("[data-virar]");
    const verso = secao.querySelector("[data-ativar]");
    const voltar = secao.querySelector("[data-desvirar]");
    const dica = secao.querySelector("[data-dica]");
    const destino = OdisseIAConfig.gameUrl.trim();
    verso.href = destino;
    verso.rel = "noopener";

    function mostrar(estado, focar) {
      const noVerso = estado === "verso";
      carta.setAttribute("data-estado", estado);
      frente.inert = noVerso;
      frente.setAttribute("aria-hidden", noVerso ? "true" : "false");
      frente.tabIndex = noVerso ? -1 : 0;
      verso.inert = !noVerso;
      verso.setAttribute("aria-hidden", noVerso ? "false" : "true");
      verso.tabIndex = noVerso ? 0 : -1;
      voltar.hidden = !noVerso;
      dica.textContent = noVerso
        ? "Selecione o verso da carta para conhecer o site do X-B0T."
        : "Vire a carta para descobrir o acesso ao site do jogo.";
      if (focar) {
        (noVerso ? verso : frente).focus({ preventScroll: true });
      }
    }

    frente.addEventListener("click", function () {
      mostrar("verso", true);
    });
    voltar.addEventListener("click", function () {
      mostrar("frente", true);
    });
    secao.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && carta.getAttribute("data-estado") === "verso") {
        mostrar("frente", true);
      }
    });
    verso.addEventListener("click", function (evento) {
      // Com Ctrl, Shift, Alt, Cmd ou botão do meio, o navegador faz o que a pessoa pediu.
      if (evento.defaultPrevented || evento.button !== 0 || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) {
        return;
      }
      evento.preventDefault();
      if (secao.hasAttribute("data-lancando")) {
        return;
      }
      if (movimentoReduzido()) {
        window.location.assign(destino);
        return;
      }
      secao.setAttribute("data-lancando", "");
      window.setTimeout(function () {
        window.location.assign(destino);
      }, 620);
    });
    // Voltando pelo histórico, a carta reaparece inteira (e virada para a frente).
    window.addEventListener("pageshow", function (evento) {
      if (evento.persisted) {
        secao.removeAttribute("data-lancando");
        mostrar("frente", false);
      }
    });
    mostrar("frente", false);
    secao.hidden = false;
  });
}

// Conclusão: resumo das quatro estações (cada uma leva à sua página) e acesso ao X-B0T.

function renderizarConclusao() {
  renderizarResumoEstacoes(OdisseIAConfig.totalEstacoes);
  renderizarAcessoXbot();
}

function renderizarResumoEstacoes(total) {
  const lista = document.getElementById("conclusao-estacoes");
  lista.textContent = "";

  for (let n = 1; n <= total; n++) {
    const item = document.createElement("li");
    item.className = "final-jornada__item";

    const marcador = document.createElement("img");
    marcador.className = "final-jornada__marcador";
    marcador.src = "assets/img/engrenagem-azul.png";
    marcador.alt = "";
    marcador.width = 32;
    marcador.height = 32;
    item.appendChild(marcador);

    const numero = criarTexto("span", "final-jornada__numero", doisDigitos(n));
    numero.setAttribute("aria-hidden", "true");
    item.appendChild(numero);

    // No resumo final, a Estação 4 usa o título editorial;
    // o nome no Hub continua "X-B0T".
    let nomeEstacao = ESTACOES_NOMES[n - 1];
    if (n === 4) {
      nomeEstacao = "Por trás do X-B0T";
    }

    const nome = document.createElement("span");
    nome.className = "final-jornada__nome";
    nome.appendChild(criarTexto("span", "visualmente-oculto", "Estação " + n + ": "));
    nome.appendChild(document.createTextNode(nomeEstacao));
    item.appendChild(nome);

    const abrir = document.createElement("a");
    abrir.className = "final-jornada__estado";
    abrir.href = "estacao-" + n + ".html";
    abrir.appendChild(document.createTextNode("ABRIR"));
    abrir.appendChild(criarTexto("span", "visualmente-oculto", " Estação " + n));
    item.appendChild(abrir);

    lista.appendChild(item);
  }
}

// O jogo pode estar publicado ou não: sem uma gameUrl válida o acesso fica marcado como pendente,
// sem botão.
function renderizarAcessoXbot() {
  const area = document.getElementById("xbot-acesso");
  area.textContent = "";

  if (urlAcessivel(OdisseIAConfig.gameUrl)) {
    area.appendChild(criarAvisoGiro());
    const jogar = criarBotao({ href: OdisseIAConfig.gameUrl.trim(), texto: "Jogar X-B0T", principal: true });
    jogar.classList.add("final-acoes__jogar");
    jogar.rel = "noopener";
    area.appendChild(jogar);
  } else {
    area.appendChild(criarStatusAcesso());
  }

  if (urlAcessivel(OdisseIAConfig.downloadUrl)) {
    const baixar = criarBotao({ href: OdisseIAConfig.downloadUrl.trim(), texto: "Baixar X-B0T", principal: false });
    baixar.rel = "noopener";
    area.appendChild(baixar);
  }
}

function criarStatusAcesso() {
  const painel = document.createElement("div");
  painel.className = "final-status";

  const item = document.createElement("p");
  item.className = "final-status__linha final-status__linha--pendente";
  item.appendChild(criarTexto("span", "final-status__rotulo", "ACESSO AO JOGO"));
  item.appendChild(criarTexto("span", "final-status__valor", "AGUARDANDO LIBERAÇÃO"));
  painel.appendChild(item);

  painel.appendChild(criarTexto("p", "final-status__nota", "O link para jogar ainda não foi publicado. Quando o jogo estiver disponível, o botão aparece aqui."));
  return painel;
}

document.addEventListener("DOMContentLoaded", function () {
  limparProgressoAntigo();

  if (document.getElementById("lista-estacoes")) {
    renderizarHub();
  }
  if (document.querySelector("[data-carta-acesso]")) {
    prepararCartaAcesso();
  }
  if (document.getElementById("conclusao-estacoes")) {
    renderizarConclusao();
  }
});
