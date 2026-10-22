// Preferências globais de acessibilidade: tema, tamanho do texto, alto contraste e animações.
// Carregado no <head> de cada página para aplicar as escolhas antes da primeira pintura e evitar
// o clarão do tema escuro. O painel é montado depois, quando o documento está pronto.
// Chave própria no localStorage, independente do progresso: "odisseia:acessibilidade".
(function () {
  "use strict";

  const CHAVE = "odisseia:acessibilidade";
  const VERSAO = 1;
  const PADRAO = { tema: "escuro", texto: "padrao", contraste: false, movimento: false };
  const TEMAS = ["escuro", "claro", "sistema"];
  const TEXTOS = ["padrao", "grande", "extra"];

  const raiz = document.documentElement;
  const consultaClaro = criarConsulta("(prefers-color-scheme: light)");
  const consultaMovimento = criarConsulta("(prefers-reduced-motion: reduce)");

  let preferencias = lerPreferencias();
  aplicar(preferencias, false);

  if (consultaClaro) {
    ouvir(consultaClaro, function () {
      if (preferencias.tema === "sistema") {
        aplicar(preferencias, true);
      }
    });
  }
  if (consultaMovimento) {
    ouvir(consultaMovimento, function () {
      atualizarControles();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarPainel);
  } else {
    montarPainel();
  }

  function criarConsulta(texto) {
    return typeof window.matchMedia === "function" ? window.matchMedia(texto) : null;
  }

  // addEventListener nas consultas de mídia não existe nos Safari antigos (usam addListener).
  function ouvir(consulta, funcao) {
    if (consulta.addEventListener) {
      consulta.addEventListener("change", funcao);
    } else if (consulta.addListener) {
      consulta.addListener(funcao);
    }
  }

  // Cada campo é validado sozinho: um valor estranho volta ao padrão sem derrubar os outros.
  function sanear(dados) {
    const lidas = Object.assign({}, PADRAO);
    if (dados && typeof dados === "object" && !Array.isArray(dados)) {
      if (TEMAS.indexOf(dados.tema) !== -1) lidas.tema = dados.tema;
      if (TEXTOS.indexOf(dados.texto) !== -1) lidas.texto = dados.texto;
      if (dados.contraste === true) lidas.contraste = true;
      if (dados.movimento === true) lidas.movimento = true;
    }
    return lidas;
  }

  function lerPreferencias() {
    try {
      const bruto = window.localStorage.getItem(CHAVE);
      return sanear(bruto ? JSON.parse(bruto) : null);
    } catch (erro) {
      return sanear(null);
    }
  }

  // Devolve false se o navegador não deixou gravar; a escolha continua valendo nesta página.
  function gravarPreferencias(valores) {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify({
        versao: VERSAO,
        tema: valores.tema,
        texto: valores.texto,
        contraste: valores.contraste,
        movimento: valores.movimento
      }));
      return true;
    } catch (erro) {
      return false;
    }
  }

  function removerPreferencias() {
    try {
      window.localStorage.removeItem(CHAVE);
    } catch (erro) {
      // Sem armazenamento, não há o que apagar.
    }
  }

  function temaEfetivo(tema) {
    if (tema === "sistema") {
      return consultaClaro && consultaClaro.matches ? "claro" : "escuro";
    }
    return tema;
  }

  // Só escreve atributos no <html>: o CSS faz o resto. "animar" liga a troca suave de cores.
  function aplicar(valores, animar) {
    if (animar) {
      raiz.classList.add("a11y-transicao");
      window.setTimeout(function () {
        raiz.classList.remove("a11y-transicao");
      }, 300);
    }
    raiz.setAttribute("data-tema", temaEfetivo(valores.tema));
    definirAtributo("data-texto", valores.texto === "padrao" ? null : valores.texto);
    definirAtributo("data-contraste", valores.contraste ? "alto" : null);
    definirAtributo("data-movimento", valores.movimento ? "reduzido" : null);
  }

  function definirAtributo(nome, valor) {
    if (valor === null) {
      raiz.removeAttribute(nome);
    } else {
      raiz.setAttribute(nome, valor);
    }
  }

  // ---------- Painel ----------

  let botao = null;
  let painel = null;
  let status = null;
  let entradas = null;
  let nota = null;

  function elemento(tag, classe, texto) {
    const item = document.createElement(tag);
    if (classe) item.className = classe;
    if (texto) item.textContent = texto;
    return item;
  }

  function criarIcone() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "a11y__icone");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    // Círculo com metade cheia: o símbolo clássico de contraste e ajuste visual.
    const contorno = document.createElementNS(ns, "circle");
    contorno.setAttribute("cx", "10");
    contorno.setAttribute("cy", "10");
    contorno.setAttribute("r", "7.5");
    contorno.setAttribute("fill", "none");
    contorno.setAttribute("stroke", "currentColor");
    contorno.setAttribute("stroke-width", "1.6");
    svg.appendChild(contorno);
    const metade = document.createElementNS(ns, "path");
    metade.setAttribute("d", "M10 2.5A7.5 7.5 0 0 1 10 17.5Z");
    metade.setAttribute("fill", "currentColor");
    svg.appendChild(metade);
    return svg;
  }

  function grupoDeOpcoes(nome, legenda, opcoes, atual) {
    const conjunto = elemento("fieldset", "a11y__opcoes");
    conjunto.appendChild(elemento("legend", "", legenda));
    const lista = elemento("div", "a11y__lista");
    opcoes.forEach(function (opcao) {
      const rotulo = elemento("label", "a11y__opcao");
      const entrada = elemento("input");
      entrada.type = "radio";
      entrada.name = "a11y-" + nome;
      entrada.value = opcao.valor;
      entrada.checked = opcao.valor === atual;
      rotulo.appendChild(entrada);

      const corpo = elemento("span", "ficha a11y__opcao-corpo");
      const marca = elemento("span", "a11y__marca");
      marca.setAttribute("aria-hidden", "true");
      corpo.appendChild(marca);
      corpo.appendChild(elemento("span", "", opcao.texto));
      if (opcao.detalhe) {
        corpo.appendChild(elemento("small", "", opcao.detalhe));
      }
      rotulo.appendChild(corpo);
      lista.appendChild(rotulo);

      entrada.addEventListener("change", function () {
        mudar(nome, opcao.valor);
      });
    });
    conjunto.appendChild(lista);
    return conjunto;
  }

  function criarChave(nome, texto, id) {
    const rotulo = elemento("label", "a11y__chave");
    const entrada = elemento("input");
    entrada.type = "checkbox";
    entrada.setAttribute("role", "switch");
    entrada.id = id;
    rotulo.appendChild(entrada);

    const descricao = elemento("span", "a11y__chave-texto", texto);
    rotulo.appendChild(descricao);

    // O texto Ativado/Desativado é só visual: o papel "switch" já anuncia o estado.
    const estado = elemento("span", "a11y__chave-estado");
    estado.setAttribute("aria-hidden", "true");
    estado.appendChild(elemento("span", "a11y__chave-valor", "Desativado"));
    estado.appendChild(elemento("span", "a11y__trilho"));
    rotulo.appendChild(estado);

    entrada.addEventListener("change", function () {
      mudar(nome, entrada.checked);
    });
    return { rotulo: rotulo, entrada: entrada, descricao: descricao };
  }

  function criarGrupo(id, nome, filhos) {
    const bloco = elemento("div", "a11y__grupo");
    bloco.setAttribute("role", "group");
    bloco.setAttribute("aria-labelledby", id);
    const titulo = elemento("p", "a11y__grupo-nome", nome);
    titulo.id = id;
    bloco.appendChild(titulo);
    filhos.forEach(function (filho) {
      bloco.appendChild(filho);
    });
    return bloco;
  }

  function montarPainel() {
    if (!document.body || document.getElementById("a11y")) return;

    const caixa = elemento("div", "a11y");
    caixa.id = "a11y";

    botao = elemento("button", "ficha a11y__abrir");
    botao.type = "button";
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", "a11y-painel");
    botao.appendChild(criarIcone());
    botao.appendChild(elemento("span", "a11y__rotulo", "Acessibilidade"));
    caixa.appendChild(botao);

    painel = elemento("div", "ficha a11y__painel");
    painel.id = "a11y-painel";
    painel.setAttribute("role", "dialog");
    painel.setAttribute("aria-labelledby", "a11y-titulo");
    painel.hidden = true;

    const topo = elemento("div", "a11y__topo");
    const titulo = elemento("p", "a11y__titulo", "Acessibilidade");
    titulo.id = "a11y-titulo";
    topo.appendChild(titulo);
    const fechar = elemento("button", "botao a11y__fechar", "Fechar");
    fechar.type = "button";
    fechar.setAttribute("aria-label", "Fechar painel de acessibilidade");
    fechar.addEventListener("click", function () {
      fecharPainel(true);
    });
    topo.appendChild(fechar);
    painel.appendChild(topo);

    const temas = grupoDeOpcoes("tema", "Tema", [
      { valor: "escuro", texto: "Escuro" },
      { valor: "claro", texto: "Claro" },
      { valor: "sistema", texto: "Sistema" }
    ], preferencias.tema);
    const textos = grupoDeOpcoes("texto", "Tamanho do texto", [
      { valor: "padrao", texto: "Padrão", detalhe: "100%" },
      { valor: "grande", texto: "Grande", detalhe: "115%" },
      { valor: "extra", texto: "Extra grande", detalhe: "130%" }
    ], preferencias.texto);
    painel.appendChild(criarGrupo("a11y-g-aparencia", "Aparência", [temas, textos]));

    const contraste = criarChave("contraste", "Alto contraste", "a11y-contraste");
    painel.appendChild(criarGrupo("a11y-g-percepcao", "Percepção", [contraste.rotulo]));

    const movimento = criarChave("movimento", "Reduzir animações", "a11y-movimento");
    nota = elemento("span", "a11y__nota");
    nota.id = "a11y-nota-movimento";
    movimento.descricao.appendChild(nota);
    movimento.entrada.setAttribute("aria-describedby", "a11y-nota-movimento");
    painel.appendChild(criarGrupo("a11y-g-conforto", "Conforto", [movimento.rotulo]));

    const rodape = elemento("div", "a11y__rodape");
    const restaurar = elemento("button", "botao a11y__restaurar", "Restaurar padrão");
    restaurar.type = "button";
    restaurar.addEventListener("click", restaurarPadrao);
    rodape.appendChild(restaurar);
    status = elemento("p", "a11y__status");
    status.setAttribute("role", "status");
    rodape.appendChild(status);
    painel.appendChild(rodape);

    caixa.appendChild(painel);

    // Logo depois do link "Pular para o conteúdo", que continua sendo o primeiro item do foco.
    const pular = document.querySelector(".pular");
    if (pular && pular.parentNode === document.body) {
      document.body.insertBefore(caixa, pular.nextSibling);
    } else {
      document.body.insertBefore(caixa, document.body.firstChild);
    }

    entradas = {
      tema: painel.querySelectorAll("input[name='a11y-tema']"),
      texto: painel.querySelectorAll("input[name='a11y-texto']"),
      contraste: contraste.entrada,
      movimento: movimento.entrada
    };
    atualizarControles();

    botao.addEventListener("click", function () {
      if (painel.hidden) {
        abrirPainel();
      } else {
        fecharPainel(true);
      }
    });
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && !painel.hidden) {
        evento.preventDefault();
        fecharPainel(true);
      }
    });
    // Clique fora ou foco que sai do painel: fecha, para ele não ficar por cima do conteúdo.
    document.addEventListener("pointerdown", function (evento) {
      if (!painel.hidden && !caixa.contains(evento.target)) {
        fecharPainel(false);
      }
    });
    caixa.addEventListener("focusout", function (evento) {
      const destino = evento.relatedTarget;
      if (!painel.hidden && destino && !caixa.contains(destino)) {
        fecharPainel(false);
      }
    });

    configurarLinkDeSalto();
  }

  function abrirPainel() {
    painel.hidden = false;
    botao.setAttribute("aria-expanded", "true");
    const primeira = painel.querySelector("input:checked") || painel.querySelector("button");
    if (primeira) primeira.focus();
  }

  function fecharPainel(devolverFoco) {
    painel.hidden = true;
    botao.setAttribute("aria-expanded", "false");
    status.textContent = "";
    if (devolverFoco) botao.focus();
  }

  function mudar(campo, valor) {
    preferencias[campo] = valor;
    const gravou = gravarPreferencias(preferencias);
    aplicar(preferencias, campo === "tema" || campo === "contraste");
    atualizarControles();
    status.textContent = gravou ? "" : "Não foi possível salvar. A escolha vale só nesta página.";
  }

  function restaurarPadrao() {
    preferencias = Object.assign({}, PADRAO);
    removerPreferencias();
    aplicar(preferencias, true);
    atualizarControles();
    status.textContent = "Preferências restauradas ao padrão.";
  }

  // Reflete o estado atual nos controles. Se o sistema já pede menos movimento, a opção aparece
  // ativada e travada: a preferência do sistema nunca é desfeita pelo site.
  function atualizarControles() {
    if (!entradas) return;
    marcarGrupo(entradas.tema, preferencias.tema);
    marcarGrupo(entradas.texto, preferencias.texto);
    entradas.contraste.checked = preferencias.contraste;
    const doSistema = Boolean(consultaMovimento && consultaMovimento.matches);
    entradas.movimento.checked = preferencias.movimento || doSistema;
    entradas.movimento.disabled = doSistema;
    nota.textContent = doSistema ? "Ativado pela preferência do sistema" : "";
    [entradas.contraste, entradas.movimento].forEach(function (entrada) {
      const valor = entrada.parentNode.querySelector(".a11y__chave-valor");
      valor.textContent = entrada.checked ? "Ativado" : "Desativado";
    });
  }

  function marcarGrupo(lista, valor) {
    Array.prototype.forEach.call(lista, function (entrada) {
      entrada.checked = entrada.value === valor;
    });
  }

  // O link já aponta para o <main>; o script garante que o foco vá junto, mesmo onde o
  // navegador só rola a página (Safari) ou onde o endereço #... não dispara o foco.
  function configurarLinkDeSalto() {
    const link = document.querySelector(".pular");
    if (!link) return;
    link.addEventListener("click", function (evento) {
      const alvo = document.getElementById((link.getAttribute("href") || "").slice(1));
      if (!alvo) return;
      evento.preventDefault();
      alvo.focus();
      alvo.scrollIntoView();
    });
  }
})();
