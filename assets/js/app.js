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
  renderizarEstacoes(ultima, total);
  renderizarFinais(completa);
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
  // Engrenagens azuis: a identidade do OdisseIA. As roxas são do X-B0T.
  marcador.src = estado === "desbloqueada"
    ? "assets/img/engrenagem-azul-acesa.png"
    : "assets/img/engrenagem-azul-apagada.png";
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

  // Os passos ficam fora do link para não alongar o nome acessível do cartão.
  if (estado === "proxima") {
    item.appendChild(criarListaPassos("estacao__passos", numero));
  }
  return item;
}

function passosDesbloqueio(numero) {
  return [
    "Visite a Estação " + doisDigitos(numero) + " na feira.",
    "Acompanhe a apresentação.",
    "Valide o QR Code da estação."
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

  // Concluir a jornada desbloqueia o X-B0T; só uma URL válida o torna acessível.
  const acessivel = completa && urlAcessivel(OdisseIAConfig.gameUrl);
  lista.appendChild(criarCardFinal({
    tipo: "xbot",
    titulo: "X-B0T",
    descricao: "O jogo digital de cartas desenvolvido para o OdisseIA.",
    href: null,
    bloqueado: !completa,
    pendente: completa && !acessivel,
    rotulo: !completa ? "BLOQUEADO" : (acessivel ? "DESBLOQUEADO" : "AGUARDANDO LIBERAÇÃO"),
    detalhe: !completa
      ? "Disponível após a conclusão"
      : (acessivel ? "Disponível na Conclusão" : "Em breve")
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

  const detalhe = criarTexto("span", dados.href ? "final__detalhe" : "final__detalhe final__detalhe--status", dados.detalhe, id + "-detalhe");
  if (dados.href) {
    detalhe.appendChild(criarSeta());
    cartao.setAttribute("aria-labelledby", [id + "-titulo", id + "-estado", id + "-detalhe"].join(" "));
    cartao.setAttribute("aria-describedby", id + "-descricao");
  }
  corpo.appendChild(detalhe);

  cartao.appendChild(corpo);
  item.appendChild(cartao);
  return item;
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
function textoComZero(elemento, texto) {
  const partes = texto.split("X-B0T");
  partes.forEach(function (parte, indice) {
    if (indice > 0) {
      elemento.appendChild(document.createTextNode("X-B"));
      elemento.appendChild(criarTexto("span", "zero", "0"));
      elemento.appendChild(document.createTextNode("T"));
    }
    elemento.appendChild(document.createTextNode(parte));
  });
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
  const rotulo = document.createElement("span");
  textoComZero(rotulo, acao.texto);
  botao.appendChild(rotulo);
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
    painel.appendChild(criarTexto("h2", "bloqueio__titulo", "Esta é a sua próxima estação"));
    painel.appendChild(criarTexto("p", "bloqueio__estado", "PRÓXIMA ESTAÇÃO"));
    painel.appendChild(criarTexto("p", "bloqueio__texto", "O conteúdo é liberado depois da visita presencial:"));

    painel.appendChild(criarListaPassos("bloqueio__passos", numero));
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
  painel.appendChild(criarProgressoBloqueio(proximaValida - 1, total));
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
    marcador.src = "assets/img/engrenagem-azul-acesa.png";
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
