// Inicialização das páginas. Hub e estações só leem o progresso; só a validação grava.

const ESTACOES_NOMES = [
  "Evolução dos jogos até 1999",
  "Evolução dos jogos de 2001 até hoje",
  "Inteligência Artificial nos jogos",
  "X-BOT"
];

const ESTACAO_ROTULOS = {
  desbloqueada: "CONTEÚDO DESBLOQUEADO",
  proxima: "PRÓXIMA ESTAÇÃO",
  bloqueada: "BLOQUEADA"
};

const ESTACAO_ACOES = {
  desbloqueada: "Ver conteúdo",
  proxima: "Abrir estação",
  bloqueada: "Abrir estação"
};

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
  renderizarEstacoes(ultima, total);
  renderizarFinais(completa);
}

function renderizarProgresso(ultima, total) {
  const texto = document.getElementById("progresso-texto");
  texto.textContent = "";
  texto.appendChild(criarTexto("span", "progresso__rotulo", "PROGRESSO DA JORNADA"));
  texto.appendChild(criarTexto("span", "progresso__numero", ultima + "/" + total));

  const barra = document.getElementById("progresso-barra");
  barra.setAttribute("aria-valuenow", ultima);
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
  if (numero === OdisseIAConfig.totalEstacoes && estado === "desbloqueada") {
    item.classList.add("estacao--final");
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
  marcador.src = estado === "desbloqueada"
    ? "assets/img/engrenagem-acesa.png"
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

  const corpo = document.createElement("div");
  corpo.className = "cartao__corpo";

  corpo.appendChild(criarTexto("p", "rotulo", ESTACAO_ROTULOS[estado]));
  corpo.appendChild(criarTexto("h2", "estacao__titulo", ESTACOES_NOMES[numero - 1]));

  const acao = criarTexto("span", "estacao__acao", ESTACAO_ACOES[estado]);
  acao.appendChild(criarSeta());
  corpo.appendChild(acao);

  cartao.appendChild(corpo);
  item.appendChild(cartao);
  return item;
}

function renderizarFinais(completa) {
  const lista = document.getElementById("lista-finais");
  lista.textContent = "";
  lista.classList.toggle("finais--completa", completa);

  lista.appendChild(criarCardFinal({
    titulo: "Conclusão",
    href: completa ? "final.html" : null,
    bloqueado: !completa,
    principal: completa,
    rotulo: completa ? "DISPONÍVEL" : "BLOQUEADA",
    detalhe: completa ? "Ver conclusão" : "Disponível após a 4ª estação"
  }));

  lista.appendChild(criarCardFinal({
    titulo: "X-BOT",
    href: null,
    bloqueado: !completa,
    rotulo: completa ? "DESBLOQUEADO" : "BLOQUEADO",
    detalhe: completa
      ? (OdisseIAConfig.gameUrl === null ? "Em breve" : "Disponível")
      : "Disponível após a conclusão"
  }));
}

function criarCardFinal(dados) {
  const item = document.createElement("li");
  item.className = "final"
    + (dados.bloqueado ? " final--bloqueado" : "")
    + (dados.principal ? " final--principal" : "");

  const cartao = document.createElement(dados.href ? "a" : "div");
  cartao.className = "cartao";
  if (dados.href) {
    cartao.href = dados.href;
  }

  const corpo = document.createElement("div");
  corpo.className = "cartao__corpo";
  corpo.appendChild(criarTexto("p", "rotulo", dados.rotulo));
  corpo.appendChild(criarTexto("h3", "final__titulo", dados.titulo));

  const detalhe = criarTexto("span", "final__detalhe", dados.detalhe);
  if (dados.href) {
    detalhe.appendChild(criarSeta());
  }
  corpo.appendChild(detalhe);

  cartao.appendChild(corpo);
  item.appendChild(cartao);
  return item;
}

function criarSeta() {
  const seta = criarTexto("span", "seta", "→");
  seta.setAttribute("aria-hidden", "true");
  return seta;
}

function doisDigitos(numero) {
  return (numero < 10 ? "0" : "") + numero;
}

function criarTexto(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
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
  area.appendChild(criarTexto("p", "rotulo", rotulo));
  area.appendChild(criarTexto("h2", "resultado__titulo", titulo));

  textos.forEach(function (texto, indice) {
    const classe = indice === 0 ? "resultado__texto" : "resultado__secundario";
    area.appendChild(criarTexto("p", classe, texto));
  });

  const grupo = document.createElement("div");
  grupo.className = "acoes";
  acoes.forEach(function (acao) {
    grupo.appendChild(criarBotao(acao));
  });
  area.appendChild(grupo);
}

function criarBotao(acao) {
  const botao = document.createElement("a");
  botao.className = "botao" + (acao.principal ? " botao--principal" : "");
  botao.href = acao.href;
  botao.textContent = acao.texto;
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
    return;
  }

  renderizarBloqueio(numero, estado, ultima + 1, total);
  document.getElementById("estado-bloqueado").hidden = false;
}

function renderizarBloqueio(numero, estado, proximaValida, total) {
  const painel = document.getElementById("bloqueio-painel");
  painel.textContent = "";
  painel.className = "bloqueio bloqueio--" + estado;

  if (estado === "proxima") {
    painel.appendChild(criarTexto("p", "bloqueio__estado", "PRÓXIMA ESTAÇÃO"));
    painel.appendChild(criarTexto("h2", "bloqueio__titulo", "Esta é a sua próxima estação"));
    painel.appendChild(criarTexto("p", "bloqueio__texto", "O conteúdo é liberado depois da visita presencial:"));

    const passos = document.createElement("ol");
    passos.className = "bloqueio__passos";
    [
      "Visite a Estação " + doisDigitos(numero) + " na feira.",
      "Acompanhe a apresentação.",
      "Valide o QR Code da estação."
    ].forEach(function (texto) {
      passos.appendChild(criarTexto("li", "bloqueio__passo", texto));
    });
    painel.appendChild(passos);
    return;
  }

  painel.appendChild(criarTexto("p", "bloqueio__estado", "BLOQUEADA"));
  painel.appendChild(criarTexto("h2", "bloqueio__titulo", "Estação ainda bloqueada"));
  painel.appendChild(criarTexto("p", "bloqueio__texto", "Antes dela, faltam etapas anteriores da jornada. A próxima estação válida é:"));

  const destino = document.createElement("a");
  destino.className = "bloqueio__destino";
  destino.href = "estacao-" + proximaValida + ".html";
  destino.appendChild(criarTexto("span", "bloqueio__destino-rotulo",
    "ESTAÇÃO " + doisDigitos(proximaValida) + " / " + doisDigitos(total)));
  destino.appendChild(criarTexto("span", "bloqueio__destino-nome", ESTACOES_NOMES[proximaValida - 1]));
  destino.appendChild(criarSeta());
  painel.appendChild(destino);
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
  barra.setAttribute("aria-valuemax", total);
  barra.setAttribute("aria-valuenow", ultima);
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
    marcador.src = "assets/img/engrenagem-acesa.png";
    marcador.alt = "";
    marcador.width = 32;
    marcador.height = 32;
    item.appendChild(marcador);

    const numero = criarTexto("span", "final-jornada__numero", doisDigitos(n));
    numero.setAttribute("aria-hidden", "true");
    item.appendChild(numero);

    const nome = document.createElement("span");
    nome.className = "final-jornada__nome";
    nome.appendChild(criarTexto("span", "visualmente-oculto", "Estação " + n + ": "));
    nome.appendChild(document.createTextNode(ESTACOES_NOMES[n - 1]));
    item.appendChild(nome);

    item.appendChild(criarTexto("span", "final-jornada__estado", "VALIDADA"));
    lista.appendChild(item);
  }
}

// Sem gameUrl o X-BOT continua desbloqueado, mas sem link: só o aviso de "em breve".
function renderizarAcessoXbot() {
  const area = document.getElementById("xbot-acesso");
  area.textContent = "";

  if (OdisseIAConfig.gameUrl !== null) {
    const jogar = criarBotao({ href: OdisseIAConfig.gameUrl, texto: "Jogar X-BOT", principal: true });
    jogar.classList.add("final-acoes__jogar");
    area.appendChild(jogar);
  } else {
    const aviso = document.createElement("p");
    aviso.className = "final-aviso";
    aviso.appendChild(criarTexto("span", "final-aviso__rotulo", "ACESSO AO JOGO"));
    aviso.appendChild(criarTexto("span", "final-aviso__texto", "Disponível em breve. Quando o jogo for liberado, o botão para jogar aparece aqui."));
    area.appendChild(aviso);
  }

  if (OdisseIAConfig.downloadUrl !== null) {
    area.appendChild(criarBotao({ href: OdisseIAConfig.downloadUrl, texto: "Baixar X-BOT", principal: false }));
  }
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
