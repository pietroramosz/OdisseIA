// Mini Jogos: núcleo compartilhado pelos quatro jogos (minijogo-*.js).
// Monta o painel de cada jogo (dificuldade, indicadores, palco, controles táteis, estados), cuida
// do teclado sem atrapalhar campos e botões, pausa quando a aba perde o foco e lê as cores do tema.
// Os jogos são independentes das estações e não gravam nada no navegador.
//
// Cada jogo se registra com MiniJogos.registrar({...}) e devolve, em criar(api), um objeto com:
//   novo(dificuldade)  prepara uma partida nova e desenha o primeiro quadro
//   passo(dt)          avança a simulação (dt em segundos); só é chamado com a partida em andamento
//   desenhar()         pinta o quadro atual
//   acao(nome, baixo)  opcional: evento de uma ação (tecla ou botão tátil)
//   redimensionar()    opcional: o palco mudou de tamanho
//   botao(id)          opcional: botões próprios do jogo (def.botoes)

(function () {
  "use strict";

  const raiz = document.documentElement;
  const jogos = {};
  const paineis = {};
  let atual = null;
  let cores = lerCores();

  const DIFICULDADES = [
    { id: "facil", nome: "Fácil" },
    { id: "medio", nome: "Média" },
    { id: "dificil", nome: "Difícil" }
  ];

  // Tempo mínimo entre mostrar um aviso e aceitar o botão dele: quem segura Espaço ou Enter no
  // fim da partida não reinicia sem querer.
  const ATRASO_SOBRE = 700;

  function el(tag, classe, texto) {
    const no = document.createElement(tag);
    if (classe) {
      no.className = classe;
    }
    if (texto !== undefined) {
      no.textContent = texto;
    }
    return no;
  }

  function limpar(no) {
    while (no.firstChild) {
      no.removeChild(no.firstChild);
    }
  }

  function lerCores() {
    const estilo = getComputedStyle(raiz);
    const pegar = function (nome) {
      return estilo.getPropertyValue(nome).trim();
    };
    return {
      fundo: pegar("--cor-fundo"),
      palco: pegar("--cor-superficie-escura"),
      superficie: pegar("--cor-superficie"),
      alta: pegar("--cor-superficie-alta"),
      texto: pegar("--cor-texto"),
      secundario: pegar("--cor-texto-secundario"),
      atenuado: pegar("--cor-texto-atenuado"),
      apagado: pegar("--cor-apagado"),
      filete: pegar("--cor-filete"),
      azul: pegar("--cor-azul"),
      linha: pegar("--cor-azul-linha"),
      destaque: pegar("--cor-destaque"),
      sobreDestaque: pegar("--cor-sobre-destaque"),
      claro: pegar("--cor-azul-claro"),
      fonte: pegar("--fonte-titulo") || "system-ui, sans-serif"
    };
  }

  function reduzirMovimento() {
    return raiz.getAttribute("data-movimento") === "reduzido";
  }

  function toqueDisponivel() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }

  function telaLarga() {
    return window.matchMedia("(min-width: 900px)").matches;
  }

  // "[W] [S] ou [Setas]" vira texto com <kbd> nas teclas.
  function textoComTeclas(destino, texto) {
    texto.split(/(\[[^\]]+\])/).forEach(function (parte) {
      if (/^\[[^\]]+\]$/.test(parte)) {
        destino.appendChild(el("kbd", "mj-tecla", parte.slice(1, -1)));
      } else if (parte) {
        destino.appendChild(document.createTextNode(parte));
      }
    });
  }

  // ---------- Montagem do painel de um jogo ----------

  function construirPainel(def) {
    const id = def.id;
    const P = {
      def: def,
      id: id,
      dificuldade: def.dificuldadePadrao || "medio",
      estado: "pronto",
      ativas: new Set(),
      frame: 0,
      ultimo: 0,
      sobreAte: 0,
      hud: {},
      botoes: {},
      jogo: null,
      largura: 0,
      altura: 0
    };

    const secao = el("section", "mj-jogo mj-jogo--" + id);
    secao.id = "jogo-" + id;
    secao.hidden = true;
    secao.setAttribute("aria-labelledby", "mj-titulo-" + id);

    // Topo: volta ao menu e título.
    const topo = el("header", "mj-jogo__topo");
    const voltar = el("a", "mj-voltar");
    voltar.href = "#jogos";
    voltar.appendChild(el("span", "seta seta--voltar"));
    voltar.lastChild.setAttribute("aria-hidden", "true");
    voltar.appendChild(document.createTextNode(" Todos os jogos"));
    const titulo = el("h1", "mj-jogo__titulo", def.nome);
    titulo.id = "mj-titulo-" + id;
    titulo.tabIndex = -1;
    topo.appendChild(voltar);
    topo.appendChild(titulo);
    secao.appendChild(topo);

    // Dificuldade.
    const dif = el("div", "mj-dif");
    dif.setAttribute("role", "group");
    dif.setAttribute("aria-label", "Dificuldade");
    dif.appendChild(el("span", "mj-dif__rotulo", "DIFICULDADE"));
    const grupo = el("div", "mj-dif__opcoes");
    DIFICULDADES.forEach(function (d) {
      const b = el("button", "mj-dif__botao", d.nome);
      b.type = "button";
      b.dataset.dificuldade = d.id;
      b.setAttribute("aria-pressed", String(d.id === P.dificuldade));
      b.addEventListener("click", function () {
        escolherDificuldade(P, d.id);
      });
      grupo.appendChild(b);
    });
    dif.appendChild(grupo);
    P.grupoDif = grupo;
    secao.appendChild(dif);

    // Indicadores (placar, pontos, vidas...).
    const hud = el("dl", "mj-hud");
    const itens = [{ id: "_dif", rotulo: "Nível", valor: "" }].concat(def.hud || []);
    itens.forEach(function (item) {
      const bloco = el("div", "mj-hud__item");
      bloco.appendChild(el("dt", "mj-hud__rotulo", item.rotulo));
      const valor = el("dd", "mj-hud__valor", item.valor || "");
      bloco.appendChild(valor);
      hud.appendChild(bloco);
      P.hud[item.id] = valor;
    });
    secao.appendChild(hud);

    // Palco: canvas e avisos.
    const palco = el("div", "mj-palco ficha");
    if (def.tipo === "puzzle") {
      // Nos desafios o teclado anda pela grade, então o palco recebe foco na ordem normal.
      palco.tabIndex = 0;
      palco.setAttribute("role", "group");
      palco.setAttribute("aria-label", def.rotuloPalco);
    } else {
      palco.tabIndex = -1;
    }
    const canvas = el("canvas", "mj-canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", def.descricaoCanvas || def.nome);
    palco.appendChild(canvas);
    const sobre = el("div", "mj-sobre");
    sobre.hidden = true;
    palco.appendChild(sobre);
    secao.appendChild(palco);
    P.palco = palco;
    P.canvas = canvas;
    P.sobre = sobre;

    // Status falado (leitores de tela).
    const status = el("p", "visualmente-oculto");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    secao.appendChild(status);
    P.statusEl = status;

    // Legenda e linha de estado visível (jogos que precisam: pathfinding).
    if (def.linhaEstado) {
      const linha = el("p", "mj-estado");
      linha.setAttribute("aria-hidden", "true");
      secao.appendChild(linha);
      P.linhaEstado = linha;
    }

    if (def.legenda) {
      const legenda = el("ul", "mj-legenda");
      def.legenda.forEach(function (item) {
        const li = el("li", "mj-legenda__item");
        const amostra = el("span", "mj-legenda__amostra mj-legenda__amostra--" + item.classe);
        amostra.setAttribute("aria-hidden", "true");
        li.appendChild(amostra);
        li.appendChild(document.createTextNode(item.rotulo));
        legenda.appendChild(li);
      });
      secao.appendChild(legenda);
    }

    // Controles táteis.
    if (def.toque) {
      secao.appendChild(construirToque(P, def.toque));
    }

    // Botões de ação.
    const acoes = el("div", "mj-acoes");
    const botoes = def.botoes || [
      { id: "_pausar", rotulo: "Pausar" },
      { id: "_reiniciar", rotulo: "Reiniciar" }
    ];
    botoes.forEach(function (info) {
      const b = el("button", "botao mj-botao" + (info.principal ? " botao--principal" : ""), info.rotulo);
      b.type = "button";
      b.dataset.acao = info.id;
      b.addEventListener("click", function () {
        aoBotao(P, info.id);
      });
      acoes.appendChild(b);
      P.botoes[info.id] = b;
    });
    secao.appendChild(acoes);

    // Ajuda: objetivo e controles.
    const ajuda = el("div", "mj-ajuda");
    ajuda.appendChild(el("h2", "mj-ajuda__titulo", "Como jogar"));
    ajuda.appendChild(el("p", "mj-ajuda__objetivo", def.objetivo));
    const lista = el("ul", "mj-ajuda__lista");
    (def.controles.teclado || []).forEach(function (t) {
      const li = el("li", "mj-ajuda__item mj-ajuda__item--teclado");
      textoComTeclas(li, t);
      lista.appendChild(li);
    });
    (def.controles.toque || []).forEach(function (t) {
      const li = el("li", "mj-ajuda__item mj-ajuda__item--toque");
      textoComTeclas(li, t);
      lista.appendChild(li);
    });
    ajuda.appendChild(lista);
    secao.appendChild(ajuda);

    P.secao = secao;
    document.getElementById("mj-jogos").appendChild(secao);

    P.api = criarApi(P);
    paineis[id] = P;
    return P;
  }

  function construirToque(P, config) {
    const caixa = el("div", "mj-toque mj-toque--" + config.layout);
    caixa.setAttribute("role", "group");
    caixa.setAttribute("aria-label", "Controles na tela");
    config.botoes.forEach(function (info) {
      const b = el("button", "mj-toque__botao mj-toque__botao--" + info.acao);
      b.type = "button";
      b.dataset.toque = info.acao;
      b.setAttribute("aria-label", info.rotulo);
      if (info.seta) {
        const seta = el("span", "seta mj-seta mj-seta--" + info.seta);
        seta.setAttribute("aria-hidden", "true");
        b.appendChild(seta);
      }
      if (info.texto) {
        b.appendChild(el("span", "mj-toque__texto", info.texto));
      }

      // Toque ou mouse: a ação vale enquanto o dedo estiver sobre o botão.
      b.addEventListener("pointerdown", function (e) {
        if (e.button !== undefined && e.button > 0) {
          return;
        }
        e.preventDefault();
        try {
          b.setPointerCapture(e.pointerId);
        } catch (erro) {
          // sem captura, o pointerleave abaixo solta a ação
        }
        b.classList.add("mj-toque__botao--ativo");
        entrada(P, info.acao, true);
      });
      const soltar = function () {
        b.classList.remove("mj-toque__botao--ativo");
        entrada(P, info.acao, false);
      };
      b.addEventListener("pointerup", soltar);
      b.addEventListener("pointercancel", soltar);
      b.addEventListener("lostpointercapture", soltar);
      b.addEventListener("contextmenu", function (e) {
        e.preventDefault();
      });
      // Teclado (Enter ou Espaço no botão focado): um toque curto.
      b.addEventListener("click", function (e) {
        if (e.detail !== 0) {
          return;
        }
        entrada(P, info.acao, true);
        window.setTimeout(function () {
          entrada(P, info.acao, false);
        }, 140);
      });
      caixa.appendChild(b);
    });
    return caixa;
  }

  // ---------- API entregue a cada jogo ----------

  function criarApi(P) {
    return {
      canvas: P.canvas,
      palco: P.palco,
      cores: function () {
        return cores;
      },
      dificuldade: function () {
        return P.dificuldade;
      },
      hud: function (id, valor) {
        if (P.hud[id]) {
          P.hud[id].textContent = String(valor);
        }
      },
      anunciar: function (texto) {
        P.statusEl.textContent = "";
        // Troca em outro quadro para o leitor de tela repetir mensagens iguais.
        window.setTimeout(function () {
          P.statusEl.textContent = texto;
        }, 30);
      },
      linhaEstado: function (texto, tipo) {
        if (P.linhaEstado) {
          P.linhaEstado.textContent = texto;
          P.linhaEstado.dataset.tipo = tipo || "";
        }
      },
      terminar: function (resultado) {
        terminar(P, resultado);
      },
      ativa: function (acao) {
        return P.ativas.has(acao);
      },
      estado: function () {
        return P.estado;
      },
      botao: function (id, opcoes) {
        const b = P.botoes[id];
        if (!b) {
          return;
        }
        if (opcoes.rotulo !== undefined) {
          b.textContent = opcoes.rotulo;
        }
        if (opcoes.desabilitado !== undefined) {
          b.disabled = !!opcoes.desabilitado;
        }
        if (opcoes.principal !== undefined) {
          b.classList.toggle("botao--principal", !!opcoes.principal);
        }
      },
      reduzirMovimento: reduzirMovimento,
      toque: toqueDisponivel,
      foco: function () {
        P.palco.focus({ preventScroll: true });
      },
      // Espaço que o palco pode ocupar sem passar da altura útil da tela. A largura é a do miolo do
      // palco (sem o padding), senão o canvas nasce mais largo que o espaço e o CSS o espreme.
      area: function (alturaMin) {
        const reserva = telaLarga() ? 150 : 330;
        const estilo = window.getComputedStyle(P.palco);
        const miolo = P.palco.clientWidth - (parseFloat(estilo.paddingLeft) || 0) - (parseFloat(estilo.paddingRight) || 0);
        return {
          largura: Math.max(120, miolo),
          altura: Math.max(alturaMin || 240, window.innerHeight - reserva)
        };
      },
      // Ajusta o canvas a uma área lógica (largura x altura) e devolve o contexto já em escala.
      dimensionar: function (largura, altura, opcoes) {
        opcoes = opcoes || {};
        const area = this.area(opcoes.alturaMin);
        const escala = Math.min(area.largura / largura, area.altura / altura, opcoes.escalaMax || 2);
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const w = Math.max(1, Math.floor(largura * escala));
        const h = Math.max(1, Math.floor(altura * escala));
        P.canvas.width = Math.round(w * dpr);
        P.canvas.height = Math.round(h * dpr);
        P.canvas.style.width = w + "px";
        P.canvas.style.height = h + "px";
        const ctx = P.canvas.getContext("2d");
        const fator = (w / largura) * dpr;
        ctx.setTransform(fator, 0, 0, fator, 0, 0);
        P.largura = largura;
        P.altura = altura;
        return ctx;
      },
      // Posição do ponteiro em coordenadas lógicas do canvas.
      coordenadas: function (e) {
        const r = P.canvas.getBoundingClientRect();
        return {
          x: ((e.clientX - r.left) / r.width) * P.largura,
          y: ((e.clientY - r.top) / r.height) * P.altura
        };
      }
    };
  }

  // ---------- Estados da partida ----------

  // Com a partida rolando, o nível fica travado. Na pausa dá para trocar: a partida é abandonada.
  function partidaEmAndamento(P) {
    return P.def.tipo !== "puzzle" && P.estado === "jogando";
  }

  function escolherDificuldade(P, id) {
    if (partidaEmAndamento(P)) {
      return;
    }
    P.dificuldade = id;
    P.jogo.novo(id);
    P.jogo.desenhar();
    if (P.estado === "fim" || P.estado === "pausado") {
      P.estado = "pronto";
      mostrarSobre(P, "pronto");
    }
    marcarDificuldade(P);
    atualizarBotoes(P);
    ajustarSobre(P);
    if (P.def.tipo === "puzzle") {
      P.api.anunciar("Novo desafio, dificuldade " + nomeDificuldade(id) + ".");
    }
  }

  function nomeDificuldade(id) {
    return DIFICULDADES.filter(function (d) {
      return d.id === id;
    })[0].nome;
  }

  function marcarDificuldade(P) {
    const emJogo = partidaEmAndamento(P);
    Array.prototype.forEach.call(P.grupoDif.children, function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.dificuldade === P.dificuldade));
      b.disabled = emJogo;
    });
    P.hud._dif.textContent = nomeDificuldade(P.dificuldade);
  }

  function atualizarBotoes(P) {
    if (P.def.tipo === "puzzle") {
      return;
    }
    const pausar = P.botoes._pausar;
    const emJogo = P.estado === "jogando" || P.estado === "pausado";
    pausar.disabled = !emJogo;
    pausar.textContent = P.estado === "pausado" ? "Continuar" : "Pausar";
    marcarDificuldade(P);
  }

  // Palco baixo (mapa pequeno no celular): se o aviso não cabe, o texto encolhe para o botão aparecer.
  function ajustarSobre(P) {
    const s = P.sobre;
    s.classList.remove("mj-sobre--compacto");
    if (!s.hidden && s.scrollHeight > s.clientHeight) {
      s.classList.add("mj-sobre--compacto");
    }
  }

  function mostrarSobre(P, modo, dados) {
    dados = dados || {};
    const s = P.sobre;
    limpar(s);
    s.dataset.modo = modo;
    const caixa = el("div", "mj-sobre__caixa");
    let rotuloBotao = "Jogar";
    let selo = null;
    let titulo = null;
    let texto = "";

    if (modo === "pronto") {
      titulo = "Pronto?";
      texto = P.def.objetivo;
    } else if (modo === "pausado") {
      titulo = "Pausado";
      texto = "A partida está parada. Continue de onde parou.";
      rotuloBotao = "Continuar";
    } else {
      selo = dados.rotulo || (dados.venceu ? "VITÓRIA" : "DERROTA");
      texto = dados.texto || "";
      rotuloBotao = "Jogar de novo";
    }

    if (selo) {
      const carimbo = el("p", "mj-selo " + (dados.venceu ? "mj-selo--vitoria" : "mj-selo--derrota"), selo);
      caixa.appendChild(carimbo);
    }
    if (titulo) {
      caixa.appendChild(el("p", "mj-sobre__titulo", titulo));
    }
    if (texto) {
      caixa.appendChild(el("p", "mj-sobre__texto", texto));
    }
    if (modo === "pronto") {
      const dica = el("p", "mj-sobre__controles");
      textoComTeclas(dica, toqueDisponivel() ? P.def.dicaToque : P.def.dicaTeclado);
      caixa.appendChild(dica);
    }
    const botao = el("button", "botao botao--principal mj-sobre__acao", rotuloBotao);
    botao.type = "button";
    botao.addEventListener("click", function () {
      if (performance.now() < P.sobreAte) {
        return;
      }
      if (modo === "pausado") {
        continuar(P);
      } else {
        comecar(P);
      }
    });
    caixa.appendChild(botao);
    s.appendChild(caixa);
    s.hidden = false;
    ajustarSobre(P);
    P.sobreAte = performance.now() + (modo === "fim" ? ATRASO_SOBRE : 0);

    // O foco vai ao botão para o teclado seguir do ponto certo (só se o foco já estava no jogo).
    if (P.secao.contains(document.activeElement) || modo !== "pronto") {
      botao.focus({ preventScroll: true });
    }
    P.botaoSobre = botao;
  }

  function comecar(P) {
    cancelAnimationFrame(P.frame);
    P.ativas.clear();
    P.jogo.novo(P.dificuldade);
    P.estado = "jogando";
    P.sobre.hidden = true;
    P.ultimo = 0;
    atualizarBotoes(P);
    P.jogo.desenhar();
    P.api.foco();
    P.frame = requestAnimationFrame(function (t) {
      ciclo(P, t);
    });
  }

  function ciclo(P, t) {
    if (P.estado !== "jogando") {
      return;
    }
    const dt = P.ultimo ? Math.min(0.05, (t - P.ultimo) / 1000) : 0;
    P.ultimo = t;
    if (dt > 0) {
      P.jogo.passo(dt);
    }
    if (P.estado === "jogando") {
      P.jogo.desenhar();
      P.frame = requestAnimationFrame(function (proximo) {
        ciclo(P, proximo);
      });
    }
  }

  function pausar(P) {
    if (P.estado !== "jogando") {
      return;
    }
    cancelAnimationFrame(P.frame);
    soltarTudo(P);
    P.estado = "pausado";
    atualizarBotoes(P);
    P.jogo.desenhar();
    mostrarSobre(P, "pausado");
  }

  function continuar(P) {
    if (P.estado !== "pausado") {
      return;
    }
    P.estado = "jogando";
    P.sobre.hidden = true;
    P.ultimo = 0;
    atualizarBotoes(P);
    P.api.foco();
    P.frame = requestAnimationFrame(function (t) {
      ciclo(P, t);
    });
  }

  function terminar(P, resultado) {
    if (P.estado !== "jogando") {
      return;
    }
    cancelAnimationFrame(P.frame);
    soltarTudo(P);
    P.estado = "fim";
    atualizarBotoes(P);
    P.jogo.desenhar();
    P.api.anunciar((resultado.venceu ? "Vitória. " : "Derrota. ") + (resultado.texto || ""));
    mostrarSobre(P, "fim", resultado);
  }

  function soltarTudo(P) {
    const soltas = Array.from(P.ativas);
    P.ativas.clear();
    soltas.forEach(function (acao) {
      if (P.jogo.acao) {
        P.jogo.acao(acao, false);
      }
    });
    P.secao.querySelectorAll(".mj-toque__botao--ativo").forEach(function (b) {
      b.classList.remove("mj-toque__botao--ativo");
    });
  }

  function aoBotao(P, id) {
    if (id === "_pausar") {
      if (P.estado === "jogando") {
        pausar(P);
      } else if (P.estado === "pausado") {
        continuar(P);
      }
    } else if (id === "_reiniciar") {
      comecar(P);
    } else if (P.jogo.botao) {
      P.jogo.botao(id);
    }
  }

  // ---------- Entrada: teclado e botões táteis chegam ao jogo pelo mesmo caminho ----------

  function entrada(P, acao, baixo) {
    if (P.def.tipo === "puzzle") {
      if (baixo && P.jogo.acao) {
        P.jogo.acao(acao, true);
      }
      return;
    }
    if (P.estado !== "jogando") {
      return;
    }
    if (baixo) {
      if (!P.ativas.has(acao)) {
        P.ativas.add(acao);
        if (P.jogo.acao) {
          P.jogo.acao(acao, true);
        }
      }
    } else if (P.ativas.has(acao)) {
      P.ativas.delete(acao);
      if (P.jogo.acao) {
        P.jogo.acao(acao, false);
      }
    }
  }

  // Teclas fora de campos e botões: o jogo só toma as teclas dele enquanto a partida está em
  // andamento (ou, nos desafios, com o foco no palco). Em qualquer outro momento a página se
  // comporta normalmente: setas rolam, Espaço e Enter ativam o botão focado.
  function mapaTeclas(def) {
    const mapa = {};
    Object.keys(def.teclas).forEach(function (acao) {
      def.teclas[acao].forEach(function (tecla) {
        mapa[tecla.toLowerCase()] = acao;
      });
    });
    return mapa;
  }

  function teclaEvento(e) {
    return e.key === " " || e.key === "Spacebar" ? " " : e.key.toLowerCase();
  }

  function alvoLivre(e) {
    const alvo = e.target;
    if (!(alvo instanceof Element)) {
      return false;
    }
    return !alvo.closest("input, textarea, select, [contenteditable], dialog, .a11y");
  }

  function aoTeclaBaixo(e) {
    const P = atual;
    if (!P || e.ctrlKey || e.metaKey || e.altKey || !alvoLivre(e)) {
      return;
    }
    const tecla = teclaEvento(e);
    if (tecla === "p" && (P.estado === "jogando" || P.estado === "pausado") && P.def.tipo !== "puzzle") {
      e.preventDefault();
      aoBotao(P, "_pausar");
      return;
    }
    const acao = P.mapa[tecla];
    if (!acao) {
      return;
    }
    const emBotao = e.target.closest("button, a, summary");
    if (P.def.tipo === "puzzle") {
      // Desafios: o teclado vale com o foco no palco; botões e links mantêm o comportamento deles.
      if (emBotao || !P.palco.contains(e.target)) {
        return;
      }
    } else if (P.estado !== "jogando") {
      return;
    }
    if (emBotao && (tecla === " " || tecla === "enter")) {
      return;
    }
    e.preventDefault();
    if (!e.repeat) {
      entrada(P, acao, true);
    }
  }

  function aoTeclaCima(e) {
    const P = atual;
    if (!P || P.def.tipo === "puzzle") {
      return;
    }
    const acao = P.mapa[teclaEvento(e)];
    if (acao) {
      entrada(P, acao, false);
    }
  }

  // ---------- Navegação entre o menu e os jogos ----------

  function rotear(primeira) {
    const alvo = decodeURIComponent(location.hash.replace(/^#/, ""));
    const P = paineis[alvo] || null;
    const menu = document.getElementById("mj-menu");

    if (atual && atual !== P) {
      cancelAnimationFrame(atual.frame);
      soltarTudo(atual);
      atual.estado = "pronto";
      atual.secao.hidden = true;
      atual = null;
    }

    if (!P) {
      menu.hidden = false;
      document.title = "OdisseIA — Mini Jogos";
      if (!primeira) {
        window.scrollTo(0, 0);
        const titulo = document.getElementById("mj-titulo");
        titulo.focus({ preventScroll: true });
      }
      return;
    }

    menu.hidden = true;
    P.secao.hidden = false;
    document.title = "OdisseIA — " + P.def.nome;
    if (atual !== P) {
      atual = P;
      P.estado = "pronto";
      if (!P.jogo) {
        P.jogo = P.def.criar(P.api);
      }
      marcarDificuldade(P);
      atualizarBotoes(P);
      P.jogo.novo(P.dificuldade);
      P.jogo.desenhar();
      if (P.def.tipo === "puzzle") {
        P.estado = "jogando";
      } else {
        mostrarSobre(P, "pronto");
      }
      observarPalco(P);
    }
    window.scrollTo(0, 0);
    if (!primeira) {
      P.secao.querySelector(".mj-jogo__titulo").focus({ preventScroll: true });
    }
  }

  function observarPalco(P) {
    if (P.observador || typeof ResizeObserver !== "function") {
      return;
    }
    let ultimaLargura = 0;
    P.observador = new ResizeObserver(function () {
      const largura = P.palco.clientWidth;
      if (!largura || largura === ultimaLargura) {
        return;
      }
      ultimaLargura = largura;
      if (P.jogo && P.jogo.redimensionar) {
        P.jogo.redimensionar();
        P.jogo.desenhar();
      }
      ajustarSobre(P);
    });
    P.observador.observe(P.palco);
  }

  function aoMudarTema() {
    cores = lerCores();
    if (atual && atual.jogo) {
      atual.jogo.desenhar();
    }
  }

  function aoPerderFoco() {
    if (atual && atual.estado === "jogando" && atual.def.tipo !== "puzzle") {
      pausar(atual);
    }
  }

  // ---------- Início ----------

  function registrar(def) {
    jogos[def.id] = def;
  }

  function iniciar() {
    const ordem = ["pong", "snake", "invaders", "pathfinding"];
    ordem.forEach(function (id) {
      const def = jogos[id];
      if (def) {
        def.dicaTeclado = def.dicaTeclado || "";
        def.dicaToque = def.dicaToque || "";
        const P = construirPainel(def);
        P.mapa = mapaTeclas(def);
      }
    });

    document.addEventListener("keydown", aoTeclaBaixo);
    document.addEventListener("keyup", aoTeclaCima);
    window.addEventListener("blur", aoPerderFoco);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        aoPerderFoco();
      }
    });
    window.addEventListener("hashchange", function () {
      rotear(false);
    });
    new MutationObserver(aoMudarTema).observe(raiz, {
      attributes: true,
      attributeFilter: ["data-tema", "data-contraste", "data-texto"]
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (atual && atual.jogo) {
          atual.jogo.desenhar();
        }
      });
    }
    rotear(true);
  }

  window.MiniJogos = {
    registrar: registrar,
    // Gancho para testes automatizados: expõe o painel aberto sem alterar o comportamento.
    _painel: function (id) {
      return paineis[id] || null;
    },
    _atual: function () {
      return atual;
    }
  };

  document.addEventListener("DOMContentLoaded", iniciar);
})();
