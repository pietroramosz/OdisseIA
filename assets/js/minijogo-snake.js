// Snake: a cobrinha clássica. A dificuldade muda o tamanho do mapa (maior no Fácil, menor no
// Difícil) e o ritmo. A célula tem o mesmo tamanho nas três, então o mapa menor também é menor na tela.
// No celular, além dos botões, dá para deslizar o dedo sobre o mapa para virar a cobra.

(function () {
  "use strict";

  const COLUNAS_BASE = 18;
  const PONTOS_POR_ITEM = 10;
  // Distância (em px da tela) que o dedo precisa percorrer para valer como um comando de direção.
  const LIMIAR_DESLIZE = 24;

  // intervalo: segundos por passo; cada item o encurta em 1,2%, até a fração mínima (piso).
  const NIVEIS = {
    facil: { lado: 18, intervalo: 0.15, piso: 0.7 },
    medio: { lado: 15, intervalo: 0.12, piso: 0.68 },
    dificil: { lado: 12, intervalo: 0.1, piso: 0.66 }
  };

  const VETORES = {
    cima: { x: 0, y: -1 },
    baixo: { x: 0, y: 1 },
    esq: { x: -1, y: 0 },
    dir: { x: 1, y: 0 }
  };

  function criar(api) {
    let ctx = null;
    let nivel = NIVEIS.medio;
    let e = null;
    let celula = 20;

    function aleatorioLivre() {
      const ocupadas = new Set(e.corpo.map(function (s) {
        return s.y * nivel.lado + s.x;
      }));
      const livres = [];
      for (let i = 0; i < nivel.lado * nivel.lado; i += 1) {
        if (!ocupadas.has(i)) {
          livres.push(i);
        }
      }
      if (livres.length === 0) {
        return null;
      }
      const i = livres[Math.floor(Math.random() * livres.length)];
      return { x: i % nivel.lado, y: Math.floor(i / nivel.lado) };
    }

    function novo(dificuldade) {
      nivel = NIVEIS[dificuldade] || NIVEIS.medio;
      const meio = Math.floor(nivel.lado / 2);
      e = {
        corpo: [
          { x: meio, y: meio },
          { x: meio - 1, y: meio },
          { x: meio - 2, y: meio }
        ],
        dir: VETORES.dir,
        fila: [],
        comida: null,
        itens: 0,
        acumulado: 0,
        intervalo: nivel.intervalo,
        morta: false
      };
      e.comida = aleatorioLivre();
      api.hud("pontos", 0);
      api.hud("tamanho", e.corpo.length);
      redimensionar();
    }

    function redimensionar() {
      const area = api.area(240);
      celula = Math.max(12, Math.floor(Math.min(area.largura, area.altura, 560) / COLUNAS_BASE));
      const lado = nivel.lado * celula;
      ctx = api.dimensionar(lado, lado, { escalaMax: 1, alturaMin: 240 });
    }

    function acao(nome, baixo) {
      if (!baixo || !VETORES[nome]) {
        return;
      }
      const v = VETORES[nome];
      const ultimo = e.fila.length ? e.fila[e.fila.length - 1] : e.dir;
      // Não vira para trás nem repete a direção; guarda até duas viradas para curvas rápidas.
      if (v.x === -ultimo.x && v.y === -ultimo.y) {
        return;
      }
      if (v.x === ultimo.x && v.y === ultimo.y) {
        return;
      }
      if (e.fila.length < 2) {
        e.fila.push(v);
      }
    }

    function passoLogico() {
      if (e.fila.length) {
        e.dir = e.fila.shift();
      }
      const cabeca = e.corpo[0];
      const nx = cabeca.x + e.dir.x;
      const ny = cabeca.y + e.dir.y;
      const comeu = e.comida && nx === e.comida.x && ny === e.comida.y;

      if (nx < 0 || ny < 0 || nx >= nivel.lado || ny >= nivel.lado) {
        return fim("Você bateu na parede.");
      }
      // A ponta do rabo sai do lugar neste passo, então só conta como corpo se a cobra crescer.
      const limite = comeu ? e.corpo.length : e.corpo.length - 1;
      for (let i = 0; i < limite; i += 1) {
        if (e.corpo[i].x === nx && e.corpo[i].y === ny) {
          return fim("Você bateu no próprio corpo.");
        }
      }

      e.corpo.unshift({ x: nx, y: ny });
      if (comeu) {
        e.itens += 1;
        e.intervalo = Math.max(nivel.intervalo * nivel.piso, e.intervalo - nivel.intervalo * 0.012);
        api.hud("pontos", e.itens * PONTOS_POR_ITEM);
        api.hud("tamanho", e.corpo.length);
        e.comida = aleatorioLivre();
        if (!e.comida) {
          e.morta = true;
          api.terminar({
            venceu: true,
            texto: "Você preencheu o mapa inteiro com " + e.itens * PONTOS_POR_ITEM + " pontos."
          });
        }
      } else {
        e.corpo.pop();
      }
    }

    function fim(motivo) {
      e.morta = true;
      api.terminar({
        venceu: false,
        rotulo: "FIM DE JOGO",
        texto: motivo + " Você fez " + e.itens * PONTOS_POR_ITEM + " pontos."
      });
    }

    function passo(dt) {
      e.acumulado += dt;
      while (e.acumulado >= e.intervalo && !e.morta) {
        e.acumulado -= e.intervalo;
        passoLogico();
      }
    }

    function desenhar() {
      if (!ctx) {
        return;
      }
      const c = api.cores();
      const lado = nivel.lado * celula;
      ctx.fillStyle = c.palco;
      ctx.fillRect(0, 0, lado, lado);

      // Retícula: um ponto no centro de cada célula.
      ctx.fillStyle = c.apagado;
      const ponto = Math.max(2, Math.round(celula / 9));
      for (let y = 0; y < nivel.lado; y += 1) {
        for (let x = 0; x < nivel.lado; x += 1) {
          ctx.fillRect(x * celula + celula / 2 - ponto / 2, y * celula + celula / 2 - ponto / 2, ponto, ponto);
        }
      }

      // Item.
      if (e.comida) {
        const cx = e.comida.x * celula + celula / 2;
        const cy = e.comida.y * celula + celula / 2;
        const pulso = api.reduzirMovimento() ? 0 : Math.sin(performance.now() / 160) * 0.07;
        const r = celula * (0.36 + pulso);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = c.texto;
        ctx.fillRect(-r, -r, r * 2, r * 2);
        ctx.fillStyle = c.destaque;
        ctx.fillRect(-r * 0.4, -r * 0.4, r * 0.8, r * 0.8);
        ctx.restore();
      }

      // Cobra: o corpo esmaece levemente até o rabo.
      const folga = Math.max(1, Math.round(celula / 12));
      for (let i = e.corpo.length - 1; i >= 0; i -= 1) {
        const s = e.corpo[i];
        ctx.fillStyle = i === 0 ? c.claro : c.destaque;
        ctx.fillRect(s.x * celula + folga, s.y * celula + folga, celula - folga * 2, celula - folga * 2);
      }
      // Olhos.
      const h = e.corpo[0];
      const olho = Math.max(2, Math.round(celula / 6));
      const hx = h.x * celula;
      const hy = h.y * celula;
      ctx.fillStyle = c.fundo;
      if (e.dir.x !== 0) {
        const ox = e.dir.x > 0 ? celula - olho - folga - 2 : folga + 2;
        ctx.fillRect(hx + ox, hy + celula * 0.25, olho, olho);
        ctx.fillRect(hx + ox, hy + celula * 0.75 - olho, olho, olho);
      } else {
        const oy = e.dir.y > 0 ? celula - olho - folga - 2 : folga + 2;
        ctx.fillRect(hx + celula * 0.25, hy + oy, olho, olho);
        ctx.fillRect(hx + celula * 0.75 - olho, hy + oy, olho, olho);
      }

      // Moldura do mapa.
      ctx.strokeStyle = c.linha;
      ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, lado - 3, lado - 3);
    }

    // Deslizar: cada trecho de pelo menos LIMIAR_DESLIZE px vira um comando, e o ponto de partida
    // passa a ser onde o dedo está, então uma curva em L dá dois comandos e um traço reto dá um só
    // (repetir a direção é ignorado por acao). A página não rola sobre o mapa: ver touch-action
    // em minijogos.css. Só toque e caneta; o mouse segue pelo teclado e pelos botões.
    function ligarDeslize() {
      const canvas = api.canvas;
      let dedo = null;

      function soltar(evento) {
        if (dedo && evento.pointerId === dedo.id) {
          dedo = null;
        }
      }

      canvas.addEventListener("pointerdown", function (evento) {
        if (evento.pointerType === "mouse" || !evento.isPrimary) {
          return;
        }
        dedo = { id: evento.pointerId, x: evento.clientX, y: evento.clientY };
        try {
          canvas.setPointerCapture(evento.pointerId);
        } catch (erro) {
          // sem captura, o gesto só vale enquanto o dedo estiver sobre o mapa
        }
      });
      canvas.addEventListener("pointermove", function (evento) {
        if (!dedo || evento.pointerId !== dedo.id) {
          return;
        }
        const dx = evento.clientX - dedo.x;
        const dy = evento.clientY - dedo.y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < LIMIAR_DESLIZE) {
          return;
        }
        dedo.x = evento.clientX;
        dedo.y = evento.clientY;
        if (api.estado() !== "jogando") {
          return;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
          acao(dx > 0 ? "dir" : "esq", true);
        } else {
          acao(dy > 0 ? "baixo" : "cima", true);
        }
      });
      canvas.addEventListener("pointerup", soltar);
      canvas.addEventListener("pointercancel", soltar);
      canvas.addEventListener("lostpointercapture", soltar);
      // Segurar o dedo no mapa não deve abrir o menu de contexto do navegador.
      canvas.addEventListener("contextmenu", function (evento) {
        evento.preventDefault();
      });
    }

    ligarDeslize();

    return {
      novo: novo,
      passo: passo,
      desenhar: desenhar,
      acao: acao,
      redimensionar: redimensionar,
      _estado: function () {
        return e;
      },
      _nivel: function () {
        return nivel;
      },
      _passoLogico: passoLogico
    };
  }

  MiniJogos.registrar({
    id: "snake",
    nome: "Snake",
    descricaoCanvas: "Mapa quadriculado com a cobrinha e o item a coletar.",
    objetivo: "Coma os itens para crescer e somar pontos, sem bater nas paredes nem no próprio corpo.",
    dicaTeclado: "Guie a cobra com [Setas] ou [W] [A] [S] [D].",
    dicaToque: "Deslize sobre o mapa ou use os botões abaixo.",
    controles: {
      teclado: ["[Setas] ou [W] [A] [S] [D]: mudar de direção", "[P]: pausar"],
      toque: ["Deslize o dedo sobre o mapa para mudar de direção", "Ou use os botões direcionais abaixo do mapa"]
    },
    teclas: {
      cima: ["ArrowUp", "w"],
      baixo: ["ArrowDown", "s"],
      esq: ["ArrowLeft", "a"],
      dir: ["ArrowRight", "d"]
    },
    dificuldadePadrao: "medio",
    hud: [
      { id: "pontos", rotulo: "Pontos", valor: "0" },
      { id: "tamanho", rotulo: "Tamanho", valor: "3" }
    ],
    toque: {
      layout: "cruz",
      botoes: [
        { acao: "cima", rotulo: "Para cima", seta: "cima" },
        { acao: "esq", rotulo: "Para a esquerda", seta: "esq" },
        { acao: "dir", rotulo: "Para a direita", seta: "dir" },
        { acao: "baixo", rotulo: "Para baixo", seta: "baixo" }
      ]
    },
    criar: criar
  });
})();
