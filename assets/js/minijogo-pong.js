// Pong: partida contra o computador, até 5 pontos. A dificuldade muda o adversário (velocidade da
// raquete, tempo de reação, precisão e se ele prevê o rebote) e a velocidade da bola.

(function () {
  "use strict";

  const LARGURA = 600;
  const ALTURA = 400;
  const RAQ_L = 10;
  const RAQ_A = 80;
  const BOLA = 10;
  const MARGEM = 24;
  const PONTOS_VITORIA = 5;
  const VEL_JOGADOR = 400;
  const VEL_PONTEIRO = 760;
  const ANGULO_MAX = (52 * Math.PI) / 180;
  const ESPERA_SAQUE = 0.9;

  // ia.vel: velocidade da raquete; reacao: de quanto em quanto tempo ela reavalia o alvo; erro: o quanto o
  // alvo pode errar (meia raquete é 45); preve: se calcula o rebote; metade: só reage na metade dela.
  const NIVEIS = {
    facil: { bola: 290, limite: 480, ia: { vel: 200, reacao: 0.4, erro: 62, preve: false, metade: true } },
    medio: { bola: 340, limite: 600, ia: { vel: 300, reacao: 0.18, erro: 52, preve: true, metade: false } },
    dificil: { bola: 400, limite: 710, ia: { vel: 450, reacao: 0.06, erro: 49, preve: true, metade: false } }
  };

  function limitar(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function criar(api) {
    let ctx = null;
    let nivel = NIVEIS.medio;
    let e = null;
    let alvoPonteiro = null;

    function novoEstado() {
      return {
        jogador: { x: MARGEM, y: ALTURA / 2, pontos: 0 },
        cpu: { x: LARGURA - MARGEM - RAQ_L, y: ALTURA / 2, pontos: 0 },
        bola: { x: LARGURA / 2, y: ALTURA / 2, vx: 0, vy: 0, vel: nivel.bola },
        espera: ESPERA_SAQUE,
        saqueParaCpu: Math.random() < 0.5,
        ia: { tempo: 0, alvo: ALTURA / 2, vindo: false, erroTiro: 0 },
        rebates: 0
      };
    }

    function sacar() {
      const b = e.bola;
      b.vel = nivel.bola;
      const ang = (Math.random() * 2 - 1) * ((24 * Math.PI) / 180);
      const sentido = e.saqueParaCpu ? 1 : -1;
      b.vx = Math.cos(ang) * b.vel * sentido;
      b.vy = Math.sin(ang) * b.vel;
    }

    function recentrar() {
      e.bola.x = LARGURA / 2;
      e.bola.y = ALTURA / 2;
      e.bola.vx = 0;
      e.bola.vy = 0;
      e.espera = ESPERA_SAQUE;
    }

    function novo(dificuldade) {
      nivel = NIVEIS[dificuldade] || NIVEIS.medio;
      e = novoEstado();
      alvoPonteiro = null;
      api.hud("voce", 0);
      api.hud("cpu", 0);
      redimensionar();
    }

    function redimensionar() {
      ctx = api.dimensionar(LARGURA, ALTURA, { alturaMin: 180 });
    }

    // Y em que a bola chega à raquete do computador, dobrando nos rebotes das paredes.
    function preverY() {
      const b = e.bola;
      const alcance = e.cpu.x - BOLA / 2 - b.x;
      if (b.vx <= 0 || alcance <= 0) {
        return b.y;
      }
      const t = alcance / b.vx;
      const min = BOLA / 2;
      const h = ALTURA - BOLA;
      const m = (((b.y + b.vy * t - min) % (2 * h)) + 2 * h) % (2 * h);
      return min + (m > h ? 2 * h - m : m);
    }

    function moverIA(dt) {
      const ia = nivel.ia;
      const b = e.bola;
      // O erro de pontaria é sorteado uma vez por bola que vem na direção dele: sorteá-lo a cada
      // reavaliação o faria se anular e a CPU nunca erraria.
      if (b.vx > 0 && !e.ia.vindo) {
        e.ia.erroTiro = (Math.random() * 2 - 1) * ia.erro;
      }
      e.ia.vindo = b.vx > 0;
      e.ia.tempo -= dt;
      if (e.ia.tempo <= 0) {
        e.ia.tempo = ia.reacao;
        let alvo;
        const vindo = b.vx > 0 && (!ia.metade || b.x > LARGURA * 0.45);
        if (vindo) {
          alvo = (ia.preve ? preverY() : b.y) + e.ia.erroTiro;
        } else {
          alvo = ALTURA / 2 + (b.y - ALTURA / 2) * 0.15;
        }
        e.ia.alvo = alvo;
      }
      const dif = e.ia.alvo - e.cpu.y;
      const passo = ia.vel * dt;
      if (Math.abs(dif) > 3) {
        e.cpu.y += limitar(dif, -passo, passo);
      }
      e.cpu.y = limitar(e.cpu.y, RAQ_A / 2, ALTURA - RAQ_A / 2);
    }

    function moverJogador(dt) {
      let dir = 0;
      if (api.ativa("cima")) {
        dir -= 1;
      }
      if (api.ativa("baixo")) {
        dir += 1;
      }
      if (dir !== 0) {
        alvoPonteiro = null;
        e.jogador.y += dir * VEL_JOGADOR * dt;
      } else if (alvoPonteiro !== null) {
        const dif = alvoPonteiro - e.jogador.y;
        const passo = VEL_PONTEIRO * dt;
        e.jogador.y += limitar(dif, -passo, passo);
      }
      e.jogador.y = limitar(e.jogador.y, RAQ_A / 2, ALTURA - RAQ_A / 2);
    }

    function rebater(raq, sentido) {
      const b = e.bola;
      const rel = limitar((b.y - raq.y) / (RAQ_A / 2 + BOLA / 2), -1, 1);
      // Um desvio mínimo e aleatório evita rebatidas retas e infinitas entre raquetes bem alinhadas.
      const ang = rel * ANGULO_MAX + (Math.random() * 2 - 1) * ((3 * Math.PI) / 180);
      b.vel = Math.min(nivel.limite, b.vel * 1.06);
      b.vx = Math.cos(ang) * b.vel * sentido;
      b.vy = Math.sin(ang) * b.vel;
      b.x = raq.x + RAQ_L / 2 + sentido * (RAQ_L / 2 + BOLA / 2 + 0.5);
      e.rebates += 1;
    }

    function marcar(quem) {
      const alvo = quem === "jogador" ? e.jogador : e.cpu;
      alvo.pontos += 1;
      api.hud("voce", e.jogador.pontos);
      api.hud("cpu", e.cpu.pontos);
      api.anunciar("Placar: você " + e.jogador.pontos + ", computador " + e.cpu.pontos + ".");
      if (alvo.pontos >= PONTOS_VITORIA) {
        const venceu = quem === "jogador";
        api.terminar({
          venceu: venceu,
          texto: (venceu ? "Você venceu por " : "O computador venceu por ") +
            Math.max(e.jogador.pontos, e.cpu.pontos) + " a " + Math.min(e.jogador.pontos, e.cpu.pontos) + "."
        });
        return;
      }
      e.saqueParaCpu = quem === "jogador";
      recentrar();
    }

    function moverBola(dt) {
      const b = e.bola;
      const distancia = Math.hypot(b.vx, b.vy) * dt;
      const partes = Math.max(1, Math.ceil(distancia / 4));
      const sub = dt / partes;
      for (let i = 0; i < partes; i += 1) {
        b.x += b.vx * sub;
        b.y += b.vy * sub;
        if (b.y < BOLA / 2) {
          b.y = BOLA / 2;
          b.vy = Math.abs(b.vy);
        } else if (b.y > ALTURA - BOLA / 2) {
          b.y = ALTURA - BOLA / 2;
          b.vy = -Math.abs(b.vy);
        }
        const j = e.jogador;
        const c = e.cpu;
        if (b.vx < 0 && Math.abs(b.x - (j.x + RAQ_L / 2)) < (RAQ_L + BOLA) / 2 && Math.abs(b.y - j.y) < (RAQ_A + BOLA) / 2) {
          rebater(j, 1);
        } else if (b.vx > 0 && Math.abs(b.x - (c.x + RAQ_L / 2)) < (RAQ_L + BOLA) / 2 && Math.abs(b.y - c.y) < (RAQ_A + BOLA) / 2) {
          rebater(c, -1);
        }
        if (b.x < -BOLA) {
          marcar("cpu");
          return;
        }
        if (b.x > LARGURA + BOLA) {
          marcar("jogador");
          return;
        }
      }
    }

    function passo(dt) {
      moverJogador(dt);
      moverIA(dt);
      if (e.espera > 0) {
        e.espera -= dt;
        if (e.espera <= 0) {
          sacar();
        }
        return;
      }
      moverBola(dt);
    }

    function acao() {
      // As raquetes leem api.ativa() a cada quadro; nada a fazer por evento.
    }

    function desenhar() {
      if (!ctx) {
        return;
      }
      const c = api.cores();
      ctx.fillStyle = c.palco;
      ctx.fillRect(0, 0, LARGURA, ALTURA);

      // Numerais vazados do placar, no fundo, como no resto do site.
      ctx.font = '700 150px "Chakra Petch", system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.lineWidth = 2;
      ctx.lineJoin = "miter";
      ctx.strokeStyle = c.linha;
      ctx.strokeText(String(e.jogador.pontos), LARGURA * 0.25, ALTURA / 2 + 54);
      ctx.strokeStyle = c.apagado;
      ctx.strokeText(String(e.cpu.pontos), LARGURA * 0.75, ALTURA / 2 + 54);

      // Rede central.
      ctx.fillStyle = c.apagado;
      for (let y = 6; y < ALTURA; y += 24) {
        ctx.fillRect(LARGURA / 2 - 1.5, y, 3, 12);
      }

      // Raquetes e bola.
      ctx.fillStyle = c.destaque;
      ctx.fillRect(e.jogador.x, e.jogador.y - RAQ_A / 2, RAQ_L, RAQ_A);
      ctx.fillStyle = c.texto;
      ctx.fillRect(e.cpu.x, e.cpu.y - RAQ_A / 2, RAQ_L, RAQ_A);

      const piscar = e.espera > 0 && Math.floor(e.espera * 6) % 2 === 0;
      if (!piscar) {
        ctx.fillStyle = c.texto;
        ctx.fillRect(e.bola.x - BOLA / 2, e.bola.y - BOLA / 2, BOLA, BOLA);
      }
    }

    // Arrastar o dedo (ou o mouse) sobre a quadra move a raquete.
    function seguir(ev) {
      if (api.estado() !== "jogando") {
        return;
      }
      alvoPonteiro = api.coordenadas(ev).y;
    }
    api.canvas.addEventListener("pointerdown", function (ev) {
      if (api.estado() !== "jogando") {
        return;
      }
      ev.preventDefault();
      try {
        api.canvas.setPointerCapture(ev.pointerId);
      } catch (erro) {
        // o arrasto ainda funciona dentro do canvas
      }
      seguir(ev);
    });
    api.canvas.addEventListener("pointermove", function (ev) {
      if (alvoPonteiro !== null) {
        seguir(ev);
      }
    });
    ["pointerup", "pointercancel"].forEach(function (nome) {
      api.canvas.addEventListener(nome, function () {
        alvoPonteiro = null;
      });
    });

    return {
      novo: novo,
      passo: passo,
      desenhar: desenhar,
      acao: acao,
      redimensionar: redimensionar,
      _estado: function () {
        return e;
      }
    };
  }

  MiniJogos.registrar({
    id: "pong",
    nome: "Pong",
    descricaoCanvas: "Quadra de Pong: sua raquete à esquerda, a do computador à direita.",
    objetivo: "Rebata a bola e marque 5 pontos antes do computador.",
    dicaTeclado: "Mova a raquete com [W] [S] ou [Setas].",
    dicaToque: "Arraste na quadra ou use os botões abaixo.",
    controles: {
      teclado: ["[W] [S] ou [Seta acima] [Seta abaixo]: mover a raquete", "[P]: pausar"],
      toque: ["Arraste o dedo na quadra, ou segure um dos botões da tela"]
    },
    teclas: { cima: ["ArrowUp", "w"], baixo: ["ArrowDown", "s"] },
    dificuldadePadrao: "medio",
    hud: [
      { id: "voce", rotulo: "Você", valor: "0" },
      { id: "cpu", rotulo: "CPU", valor: "0" }
    ],
    toque: {
      layout: "vertical",
      botoes: [
        { acao: "cima", rotulo: "Subir a raquete", seta: "cima", texto: "Subir" },
        { acao: "baixo", rotulo: "Descer a raquete", seta: "baixo", texto: "Descer" }
      ]
    },
    criar: criar
  });
})();
