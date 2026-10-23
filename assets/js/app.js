// Inicialização das páginas. Hub e estações só leem o progresso; só a validação grava.

const ESTACOES_NOMES = [
  "Evolução dos jogos até 1999",
  "Evolução dos jogos de 2001 até hoje",
  "Inteligência Artificial nos jogos",
  "X-B0T"
];

// Descrição curta de cada cartão: o título do briefing da própria estação.
const ESTACOES_DESCRICOES = [
  "Do laboratório ao videogame",
  "A era dos jogos conectados",
  "Das regras à inteligência artificial",
  "Um jogo de cartas feito para o OdisseIA"
];

const ESTACAO_ROTULOS = {
  desbloqueada: "VALIDADA",
  proxima: "PRÓXIMA ESTAÇÃO",
  bloqueada: "BLOQUEADA"
};

// O link de uma estação sem conteúdo liberado abre a tela de bloqueio, não a estação.
const ESTACAO_ACOES = {
  desbloqueada: "Ver conteúdo",
  proxima: "Ver como desbloquear",
  bloqueada: "Ver o que falta"
};

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

// Tamanho da engrenagem no trilho: a próxima é a maior, a bloqueada a menor.
const ESTACAO_MARCADOR_TAMANHO = {
  desbloqueada: 44,
  proxima: 56,
  bloqueada: 36
};

function renderizarHub() {
  const ultima = obterProgresso().ultimaEstacaoDesbloqueada;
  const total = OdisseIAConfig.totalEstacoes;
  const completa = jornadaCompleta();

  renderizarProgresso(ultima, total);
  renderizarAcessoScanner(ultima, total);
  renderizarEstacoes(ultima, total);
  renderizarFinais(completa);
}

// Botão que abre o scanner (scanner.js escuta qualquer elemento com data-escanear).
function criarBotaoScanner(texto, classe) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "botao " + (classe || "");
  botao.setAttribute("data-escanear", "");
  botao.appendChild(criarTexto("span", "", texto));
  return botao;
}

// Ponto de acesso do Hub: diz qual é o próximo QR Code, de onde ele vem e como a validação funciona.
// Só apresenta o fluxo; quem valida é o scanner, com as regras de qr.js.
function renderizarAcessoScanner(ultima, total) {
  const area = document.getElementById("hub-scan");
  area.textContent = "";
  area.classList.toggle("scan-acesso--completa", ultima >= total);

  const texto = document.createElement("div");
  texto.className = "scan-acesso__texto";

  if (ultima >= total) {
    texto.appendChild(criarTexto("h2", "scan-acesso__titulo", "Jornada concluída", "hub-scan-titulo"));
    texto.appendChild(criarTexto("p", "scan-acesso__descricao", "As quatro estações foram validadas. Não há mais QR Codes para escanear: siga para a Conclusão."));
    const ir = document.createElement("a");
    ir.className = "botao botao--principal scan-acesso__acao";
    ir.href = "final.html";
    ir.appendChild(criarTexto("span", "", "Ver a Conclusão"));
    texto.appendChild(ir);
    area.appendChild(texto);
    return;
  }

  const proxima = doisDigitos(ultima + 1);
  texto.appendChild(criarTexto("h2", "scan-acesso__titulo", "Próximo QR Code: Estação " + proxima, "hub-scan-titulo"));
  texto.appendChild(criarTexto("p", "scan-acesso__descricao", "Termine a visita à Estação " + proxima + " na feira. O orientador entrega o QR Code dela: escaneie para liberar o conteúdo digital."));
  texto.appendChild(criarBotaoScanner("Escanear QR da Estação " + proxima, "botao--principal scan-acesso__acao"));
  area.appendChild(texto);

  const regras = document.createElement("ul");
  regras.className = "scan-acesso__regras";
  [
    "Escanear o QR Code é o que valida a sua passagem pela estação.",
    "Cada código libera só a estação física correspondente, e as estações abrem em ordem.",
    "Abrir uma página pelo Hub não libera nada."
  ].forEach(function (linha) {
    regras.appendChild(criarTexto("li", "", linha));
  });
  area.appendChild(regras);
}

function renderizarProgresso(ultima, total) {
  const texto = document.getElementById("progresso-texto");
  texto.textContent = "";
  texto.appendChild(criarTexto("span", "progresso__rotulo", "PROGRESSO DA JORNADA"));
  texto.appendChild(criarTexto("span", "progresso__numero", ultima + "/" + total));

  const barra = document.getElementById("progresso-barra");
  marcarProgresso(barra, ultima, total);
  barra.textContent = "";

  for (let n = 1; n <= total; n++) {
    const cheia = n <= ultima;

    const celula = document.createElement("span");
    celula.className = cheia
      ? "barra__celula barra__celula--cheia"
      : "barra__celula";

    const segmento = document.createElement("span");
    segmento.className = cheia
      ? "barra__segmento barra__segmento--cheio"
      : "barra__segmento";
    celula.appendChild(segmento);
    celula.appendChild(criarTexto("span", "barra__numero", doisDigitos(n)));

    barra.appendChild(celula);
  }
}

function renderizarEstacoes(ultima, total) {
  const lista = document.getElementById("lista-estacoes");
  lista.textContent = "";

  const estados = [];
  for (let n = 1; n <= total; n++) {
    let estado = "bloqueada";
    if (n <= ultima) {
      estado = "desbloqueada";
    } else if (n === ultima + 1) {
      estado = "proxima";
    }
    estados.push(estado);
  }

  // O trecho do trilho que sai de uma estação tem o estilo da estação seguinte.
  for (let n = 1; n <= total; n++) {
    lista.appendChild(criarCardEstacao(n, estados[n - 1], estados[n] || null));
  }
}

function criarCardEstacao(numero, estado, estadoSeguinte) {
  const item = document.createElement("li");
  item.className = "estacao estacao--" + estado;
  if (estadoSeguinte) {
    item.classList.add("estacao--liga-" + estadoSeguinte);
  }

  const cartao = document.createElement("a");
  cartao.className = "cartao";
  cartao.href = "estacao-" + numero + ".html";

  // Nó do trilho: engrenagem + número da estação física.
  const no = document.createElement("span");
  no.className = "estacao__no";

  const marcador = document.createElement("img");
  marcador.className = "marcador";
  marcador.alt = "";
  // Engrenagem clara = validada, cinza = ainda não. A roxa é só do X-B0T.
  marcador.src = estado === "desbloqueada"
    ? "assets/img/engrenagem-azul.png"
    : "assets/img/engrenagem-apagada.png";
  marcador.width = ESTACAO_MARCADOR_TAMANHO[estado];
  marcador.height = ESTACAO_MARCADOR_TAMANHO[estado];
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
  corpo.appendChild(criarTexto("h2", "estacao__titulo", ESTACOES_NOMES[numero - 1], id + "-titulo"));
  corpo.appendChild(criarTexto("p", "cartao__descricao", ESTACOES_DESCRICOES[numero - 1], id + "-descricao"));

  const meta = document.createElement("div");
  meta.className = "cartao__meta";
  meta.appendChild(criarTexto("p", "rotulo cartao__estado", ESTACAO_ROTULOS[estado], id + "-estado"));
  const ficha = criarTexto("span", "cartao__ficha", "EST. " + doisDigitos(numero) + " / " + doisDigitos(OdisseIAConfig.totalEstacoes));
  ficha.setAttribute("aria-hidden", "true");
  meta.appendChild(ficha);
  corpo.appendChild(meta);

  const acao = criarTexto("span", "estacao__acao", ESTACAO_ACOES[estado], id + "-acao");
  acao.appendChild(criarSeta());
  corpo.appendChild(acao);
  cartao.appendChild(corpo);

  // Nome acessível curto: título, estado e ação. A descrição vem como complemento.
  cartao.setAttribute("aria-labelledby", [id + "-titulo", id + "-estado", id + "-acao"].join(" "));
  cartao.setAttribute("aria-describedby", id + "-descricao");
  item.appendChild(cartao);

  // Os passos de desbloqueio ficam no painel do QR (logo acima da rota) e na tela de bloqueio da
  // estação; repeti-los sob o cartão só abria um vazio na linha e duplicava a orientação.
  return item;
}

function passosDesbloqueio(numero) {
  return [
    "Visite a Estação " + doisDigitos(numero) + " na feira.",
    "Acompanhe a apresentação.",
    "Escaneie o QR Code que o orientador entregar."
  ];
}

function criarListaPassos(classe, numero) {
  const passos = document.createElement("ol");
  passos.className = classe;
  passosDesbloqueio(numero).forEach(function (texto) {
    passos.appendChild(criarTexto("li", classe + "-item", texto));
  });
  return passos;
}

function renderizarFinais(completa) {
  const lista = document.getElementById("lista-finais");
  lista.textContent = "";
  lista.classList.toggle("finais--completa", completa);

  lista.appendChild(criarCardFinal({
    tipo: "conclusao",
    titulo: "Conclusão",
    descricao: "A etapa que fecha a jornada depois das quatro estações validadas.",
    href: completa ? "final.html" : null,
    bloqueado: !completa,
    principal: completa,
    rotulo: completa ? "DISPONÍVEL" : "BLOQUEADA",
    detalhe: completa ? "Ver conclusão" : "Disponível após a 4ª estação"
  }));

  // Concluir a jornada desbloqueia o X-B0T; só uma URL válida de OdisseIAConfig.gameUrl o torna um
  // link (na mesma aba). Antes da conclusão, ou sem URL, o cartão é só status: nunca há link quebrado.
  const acessivel = completa && urlAcessivel(OdisseIAConfig.gameUrl);
  lista.appendChild(criarCardFinal({
    tipo: "xbot",
    titulo: "X-B0T",
    descricao: "O jogo digital de cartas desenvolvido para o OdisseIA.",
    href: acessivel ? OdisseIAConfig.gameUrl.trim() : null,
    bloqueado: !completa,
    pendente: completa && !acessivel,
    aviso: acessivel,
    rotulo: !completa ? "BLOQUEADO" : (acessivel ? "DESBLOQUEADO" : "AGUARDANDO LIBERAÇÃO"),
    detalhe: !completa
      ? "Disponível após a conclusão"
      : (acessivel ? "Jogar X-B0T" : "Em breve")
  }));
}

function criarCardFinal(dados) {
  const item = document.createElement("li");
  item.className = "final final--" + dados.tipo
    + (dados.bloqueado ? " final--bloqueado" : "")
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
    engrenagem.src = dados.bloqueado ? "assets/img/engrenagem-apagada.png" : "assets/img/engrenagem-acesa.png";
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

// Barra de progresso falada: "2 de 4 estações validadas".
function marcarProgresso(barra, ultima, total) {
  barra.setAttribute("aria-valuemax", total);
  barra.setAttribute("aria-valuenow", ultima);
  barra.setAttribute("aria-valuetext", ultima + " de " + total + " estações validadas");
}

function renderizarValidacao() {
  const { resultado, estacao } = validarQrCode();
  const total = OdisseIAConfig.totalEstacoes;
  const area = document.getElementById("resultado-qr");

  let rotulo = "";
  let titulo = "";
  const textos = [];
  const acoes = [];

  if (resultado === "sucesso") {
    rotulo = "SUCESSO";
    titulo = "Estação " + estacao + " desbloqueada";
    textos.push(estacao < total
      ? "Próxima estação física: Estação " + (estacao + 1) + "."
      : "Jornada concluída.");
    acoes.push({ href: "hub.html", texto: "Voltar ao Hub", principal: false });
    acoes.push({ href: "estacao-" + estacao + ".html", texto: "Ver conteúdo desbloqueado", principal: true });
    if (estacao === total) {
      acoes.push({ href: "final.html", texto: "Ver conclusão", principal: false });
    }
  } else if (resultado === "repetido") {
    rotulo = "JÁ VALIDADA";
    titulo = "Estação " + estacao + " já validada";
    textos.push("Esta estação já foi validada neste navegador.");
    acoes.push({ href: "hub.html", texto: "Voltar ao Hub", principal: false });
    acoes.push({ href: "estacao-" + estacao + ".html", texto: "Ver conteúdo", principal: true });
  } else if (resultado === "fora-de-ordem") {
    const faltando = obterProgresso().ultimaEstacaoDesbloqueada + 1;
    rotulo = "FORA DE ORDEM";
    titulo = "Estação bloqueada";
    textos.push("Ainda falta validar a Estação " + faltando + " antes desta.");
    textos.push("Se você já visitou as estações anteriores e o progresso não aparece, abra este link no mesmo navegador em que abriu o Hub.");
    acoes.push({ href: "hub.html", texto: "Voltar ao Hub", principal: true });
  } else if (resultado === "invalido") {
    rotulo = "INVÁLIDO";
    titulo = "QR Code inválido.";
    acoes.push({ href: "hub.html", texto: "Voltar ao Hub", principal: true });
  } else {
    rotulo = "ERRO";
    titulo = "Progresso não salvo";
    textos.push("Não foi possível salvar o progresso neste navegador. Abra o link no navegador principal, o mesmo usado para abrir o Hub.");
    acoes.push({ href: "hub.html", texto: "Voltar ao Hub", principal: true });
  }

  area.textContent = "";
  area.className = "resultado resultado--" + resultado;
  area.appendChild(criarTexto("h2", "resultado__titulo", titulo));
  area.appendChild(criarTexto("p", "rotulo", rotulo));

  textos.forEach(function (texto, indice) {
    const classe = indice === 0 ? "resultado__texto" : "resultado__secundario";
    area.appendChild(criarTexto("p", classe, texto));
  });

  const grupo = document.createElement("div");
  grupo.className = "acoes";
  // A ação principal vem primeiro, no alcance do polegar.
  acoes.filter(function (acao) { return acao.principal; })
    .concat(acoes.filter(function (acao) { return !acao.principal; }))
    .forEach(function (acao) {
      grupo.appendChild(criarBotao(acao));
    });
  area.appendChild(grupo);
}

function criarBotao(acao) {
  const botao = document.createElement("a");
  botao.className = "botao" + (acao.principal ? " botao--principal" : "");
  botao.href = acao.href;
  textoComZero(botao, acao.texto);
  return botao;
}

// Páginas das estações: mostram o conteúdo ou a mensagem de bloqueio.
// Só leem o progresso, nunca gravam. Quem grava é validar.html.
// A regra repete a do Hub de propósito, para não acoplar as duas telas.

function calcularEstadoEstacao(numero, ultima) {
  if (numero <= ultima) {
    return "desbloqueada";
  }
  if (numero === ultima + 1) {
    return "proxima";
  }
  return "futura";
}

function renderizarPaginaEstacao() {
  const numero = Number(document.body.dataset.estacao);
  const total = OdisseIAConfig.totalEstacoes;
  if (!Number.isInteger(numero) || numero < 1 || numero > total) {
    return;
  }

  const ultima = obterProgresso().ultimaEstacaoDesbloqueada;
  const estado = calcularEstadoEstacao(numero, ultima);
  document.body.classList.add("pagina-estacao--" + estado);

  if (estado === "desbloqueada") {
    document.getElementById("conteudo-estacao").hidden = false;
    prepararCartaAcesso();
    prepararProximoPasso();
    return;
  }

  renderizarBloqueio(numero, estado, ultima + 1, total);
  document.getElementById("estado-bloqueado").hidden = false;
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

function renderizarBloqueio(numero, estado, proximaValida, total) {
  const painel = document.getElementById("bloqueio-painel");
  painel.textContent = "";
  painel.className = "bloqueio bloqueio--" + estado;

  if (estado === "proxima") {
    painel.appendChild(criarTexto("h2", "bloqueio__titulo", "Esta é a sua próxima estação"));
    painel.appendChild(criarTexto("p", "bloqueio__estado", "PRÓXIMA ESTAÇÃO"));
    painel.appendChild(criarTexto("p", "bloqueio__texto", "O conteúdo é liberado depois da visita presencial:"));

    painel.appendChild(criarListaPassos("bloqueio__passos", numero));
    painel.appendChild(criarAcaoEscanear(proximaValida, "Quando o orientador entregar o QR Code da Estação " + doisDigitos(proximaValida) + ", escaneie para liberar o conteúdo digital dela."));
    painel.appendChild(criarProgressoBloqueio(proximaValida - 1, total));
    return;
  }

  painel.appendChild(criarTexto("h2", "bloqueio__titulo", "Estação ainda bloqueada"));
  painel.appendChild(criarTexto("p", "bloqueio__estado", "BLOQUEADA"));
  painel.appendChild(criarTexto("p", "bloqueio__texto", "Antes dela, faltam etapas anteriores da jornada. A próxima estação válida é:"));

  const destino = document.createElement("a");
  destino.className = "bloqueio__destino";
  destino.href = "estacao-" + proximaValida + ".html";
  destino.appendChild(criarTexto("span", "bloqueio__destino-rotulo",
    "ESTAÇÃO " + doisDigitos(proximaValida) + " / " + doisDigitos(total)));
  destino.appendChild(criarTexto("span", "bloqueio__destino-nome", ESTACOES_NOMES[proximaValida - 1]));
  destino.appendChild(criarSeta());
  painel.appendChild(destino);
  painel.appendChild(criarAcaoEscanear(proximaValida, "Para liberar esta estação, termine as anteriores na feira, em ordem. O próximo QR Code a escanear é o da Estação " + doisDigitos(proximaValida) + "."));
  painel.appendChild(criarProgressoBloqueio(proximaValida - 1, total));
}

// Texto de orientação + botão do scanner, nas telas de bloqueio.
function criarAcaoEscanear(estacaoEsperada, orientacao) {
  const bloco = document.createElement("div");
  bloco.className = "bloqueio__scan";
  bloco.appendChild(criarTexto("p", "bloqueio__scan-texto", orientacao));
  bloco.appendChild(criarBotaoScanner("Escanear QR da Estação " + doisDigitos(estacaoEsperada), "botao--principal"));
  return bloco;
}

// Fim do conteúdo de uma estação liberada: orienta a continuar a jornada física. Não manda
// escanear o QR da próxima estação: ele só existe depois da visita física a ela.
function prepararProximoPasso() {
  const numero = Number(document.body.dataset.estacao);
  const ultima = obterProgresso().ultimaEstacaoDesbloqueada;
  document.querySelectorAll("[data-proximo-passo]").forEach(function (bloco) {
    bloco.textContent = "";
    if (ultima !== numero || numero >= OdisseIAConfig.totalEstacoes) {
      bloco.hidden = true;
      return;
    }
    const proxima = doisDigitos(numero + 1);
    bloco.appendChild(criarTexto("p", "conexao__proximo-texto", "Próximo passo na feira: visite a Estação " + proxima + ". Quando o orientador entregar o QR Code dela, volte ao Hub ou escaneie por aqui."));
    bloco.appendChild(criarBotaoScanner("Já recebi o QR Code da Estação " + proxima, "conexao__escanear"));
    bloco.hidden = false;
  });
}

// Mostra onde o visitante está na jornada; só lê o progresso já calculado.
function criarProgressoBloqueio(ultima, total) {
  const bloco = document.createElement("div");
  bloco.className = "bloqueio__progresso";

  const linha = document.createElement("p");
  linha.className = "bloqueio__progresso-linha";
  linha.appendChild(criarTexto("span", "bloqueio__progresso-rotulo", "SEU PROGRESSO"));
  linha.appendChild(criarTexto("span", "bloqueio__progresso-numero", ultima + " / " + total));
  bloco.appendChild(linha);

  const barra = document.createElement("div");
  barra.className = "bloqueio__barra";
  barra.setAttribute("role", "progressbar");
  barra.setAttribute("aria-label", "Progresso da jornada");
  barra.setAttribute("aria-valuemin", "0");
  marcarProgresso(barra, ultima, total);

  for (let n = 1; n <= total; n++) {
    const celula = document.createElement("span");
    celula.className = n <= ultima
      ? "bloqueio__celula bloqueio__celula--cheia"
      : "bloqueio__celula";
    celula.appendChild(criarTexto("span", "bloqueio__segmento", ""));
    celula.appendChild(criarTexto("span", "bloqueio__numero", doisDigitos(n)));
    barra.appendChild(celula);
  }

  bloco.appendChild(barra);
  return bloco;
}

// Conclusão: recompensa com 4/4 ou aviso de jornada incompleta.
// Só lê o progresso, nunca grava; não redireciona.

function renderizarConclusao() {
  const ultima = obterProgresso().ultimaEstacaoDesbloqueada;
  const total = OdisseIAConfig.totalEstacoes;

  if (jornadaCompleta()) {
    preencherPlacarFinal("conclusao", ultima, total);
    renderizarEstacoesValidadas(total);
    renderizarAcessoXbot();
    document.body.classList.add("pagina-final--completa");
    document.getElementById("conclusao").hidden = false;
    return;
  }

  preencherPlacarFinal("incompleto", ultima, total);
  document.getElementById("estado-incompleto").hidden = false;
}

function preencherPlacarFinal(prefixo, ultima, total) {
  document.getElementById(prefixo + "-validadas").textContent = ultima;
  document.getElementById(prefixo + "-total").textContent = total;

  const barra = document.getElementById(prefixo + "-barra");
  marcarProgresso(barra, ultima, total);
  barra.textContent = "";

  for (let n = 1; n <= total; n++) {
    const celula = document.createElement("span");
    celula.className = n <= ultima
      ? "final-barra__celula final-barra__celula--cheia"
      : "final-barra__celula";
    celula.appendChild(criarTexto("span", "final-barra__segmento", ""));
    celula.appendChild(criarTexto("span", "final-barra__numero", doisDigitos(n)));
    barra.appendChild(celula);
  }
}

function renderizarEstacoesValidadas(total) {
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

    item.appendChild(criarTexto("span", "final-jornada__estado", "VALIDADA"));
    lista.appendChild(item);
  }
}

// Jornada concluída e jogo acessível são coisas diferentes: sem uma gameUrl válida o X-B0T
// continua desbloqueado como recompensa, mas o acesso fica marcado como pendente, sem botão.
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
    area.appendChild(criarStatusAcesso(document.getElementById("conclusao-total").textContent));
  }

  if (urlAcessivel(OdisseIAConfig.downloadUrl)) {
    const baixar = criarBotao({ href: OdisseIAConfig.downloadUrl.trim(), texto: "Baixar X-B0T", principal: false });
    baixar.rel = "noopener";
    area.appendChild(baixar);
  }
}

function criarStatusAcesso(total) {
  const painel = document.createElement("div");
  painel.className = "final-status";

  [
    { rotulo: "JORNADA", valor: "CONCLUÍDA · " + total + "/" + total, pendente: false },
    { rotulo: "ACESSO AO JOGO", valor: "AGUARDANDO LIBERAÇÃO", pendente: true }
  ].forEach(function (linha) {
    const item = document.createElement("p");
    item.className = "final-status__linha" + (linha.pendente ? " final-status__linha--pendente" : "");
    item.appendChild(criarTexto("span", "final-status__rotulo", linha.rotulo));
    item.appendChild(criarTexto("span", "final-status__valor", linha.valor));
    painel.appendChild(item);
  });

  painel.appendChild(criarTexto("p", "final-status__nota", "O link para jogar ainda não foi publicado. Quando o jogo estiver disponível, o botão aparece aqui."));
  return painel;
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("lista-estacoes")) {
    renderizarHub();
  }
  if (document.getElementById("resultado-qr")) {
    renderizarValidacao();
  }
  if (document.getElementById("conteudo-estacao")) {
    renderizarPaginaEstacao();
  }
  if (document.getElementById("conclusao")) {
    renderizarConclusao();
  }
});
