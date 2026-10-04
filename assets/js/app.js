// Inicialização das páginas. Hoje só o Hub renderiza conteúdo; o Hub só lê o progresso.

const ESTACOES_NOMES = [
  "Evolução dos jogos até 1999",
  "Evolução dos jogos de 2001 até hoje",
  "Inteligência Artificial nos jogos",
  "Robot TCG"
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
  texto.textContent = "Progresso da jornada — ";
  texto.appendChild(criarTexto("span", "progresso__numero", ultima + "/" + total));

  const barra = document.getElementById("progresso-barra");
  barra.setAttribute("aria-valuenow", ultima);
  barra.textContent = "";

  for (let n = 1; n <= total; n++) {
    const segmento = document.createElement("span");
    segmento.className = n <= ultima
      ? "barra__segmento barra__segmento--cheio"
      : "barra__segmento";
    barra.appendChild(segmento);
  }
}

function renderizarEstacoes(ultima, total) {
  const lista = document.getElementById("lista-estacoes");
  lista.textContent = "";

  for (let n = 1; n <= total; n++) {
    let estado = "bloqueada";
    if (n <= ultima) {
      estado = "desbloqueada";
    } else if (n === ultima + 1) {
      estado = "proxima";
    }
    lista.appendChild(criarCardEstacao(n, estado));
  }
}

function criarCardEstacao(numero, estado) {
  const item = document.createElement("li");
  item.className = "estacao estacao--" + estado;

  const cartao = document.createElement("a");
  cartao.className = "cartao";
  cartao.href = "estacao-" + numero + ".html";

  const modelo = document.getElementById("modelo-marcador");
  cartao.appendChild(modelo.content.firstElementChild.cloneNode(true));

  const corpo = document.createElement("div");
  corpo.className = "cartao__corpo";

  corpo.appendChild(criarTexto("p", "rotulo", ESTACAO_ROTULOS[estado]));
  corpo.appendChild(criarTexto("h2", "estacao__titulo", "Estação " + numero));
  corpo.appendChild(criarTexto("p", "estacao__nome", ESTACOES_NOMES[numero - 1]));
  corpo.appendChild(criarTexto("span", "estacao__acao", ESTACAO_ACOES[estado]));

  cartao.appendChild(corpo);
  item.appendChild(cartao);
  return item;
}

function renderizarFinais(completa) {
  const lista = document.getElementById("lista-finais");
  lista.textContent = "";

  lista.appendChild(criarCardFinal({
    titulo: "Conclusão",
    href: completa ? "final.html" : null,
    bloqueado: !completa,
    rotulo: completa ? "DISPONÍVEL" : "BLOQUEADA",
    detalhe: completa ? "Ver conclusão" : "Disponível após a 4ª estação"
  }));

  lista.appendChild(criarCardFinal({
    titulo: "Robot TCG",
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
  item.className = "final" + (dados.bloqueado ? " final--bloqueado" : "");

  const cartao = document.createElement(dados.href ? "a" : "div");
  cartao.className = "cartao";
  if (dados.href) {
    cartao.href = dados.href;
  }

  const corpo = document.createElement("div");
  corpo.className = "cartao__corpo";
  corpo.appendChild(criarTexto("p", "rotulo", dados.rotulo));
  corpo.appendChild(criarTexto("h2", "final__titulo", dados.titulo));
  corpo.appendChild(criarTexto("span", "final__detalhe", dados.detalhe));

  cartao.appendChild(corpo);
  item.appendChild(cartao);
  return item;
}

function criarTexto(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("lista-estacoes")) {
    renderizarHub();
  }
});
