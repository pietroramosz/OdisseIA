// Space Invaders simplificado: uma fase, uma nave, uma frota que anda e desce. A dificuldade muda
// a quantidade de invasores, a velocidade da frota, a frequência e a velocidade dos tiros deles e
// o número de vidas.

(function () {
  "use strict";

  const LARGURA = 360;
  const ALTURA = 480;
  const PIXEL = 2;
  const NAVE_L = 11 * PIXEL;
  const NAVE_A = 6 * PIXEL;
  const NAVE_Y = 440;
  const NAVE_VEL = 190;
  const LINHA_DEFESA = 424;
  const TIRO_VEL = 400;
  const TIRO_ESPERA = 0.34;
  const INVASOR_A = 8 * PIXEL;
  const ESPACO_Y = 28;
  const PONTOS = [30, 20, 20, 10, 10];

  const NIVEIS = {
    facil: { linhas: 4, colunas: 6, espacoX: 38, vel: 24, descida: 10, tiroEspera: 1.5, tiroVel: 140, tirosMax: 3, vidas: 5 },
    medio: { linhas: 5, colunas: 7, espacoX: 35, vel: 32, descida: 11, tiroEspera: 1.05, tiroVel: 180, tirosMax: 4, vidas: 3 },
    dificil: { linhas: 5, colunas: 9, espacoX: 31, vel: 38, descida: 10, tiroEspera: 0.75, tiroVel: 220, tirosMax: 5, vidas: 3 }
  };

  // Desenhos em bitmap (# = pixel aceso). Dois quadros por invasor.
  const SPRITES = {
    lula: [
      ["...##...", "..####..", ".######.", "##.##.##", "########", "..#..#..", ".#.##.#.", "#.#..#.#"],
      ["...##...", "..####..", ".######.", "##.##.##", "########", ".#.##.#.", "#......#", ".#....#."]
    ],
    caranguejo: [
      ["..#.....#..", "...#...#...", "..#######..", ".##.###.##.", "###########", "#.#######.#", "#.#.....#.#", "...##.##..."],
      ["..#.....#..", "#..#...#..#", "#.#######.#", "###.###.###", "###########", ".#########.", "..#.....#..", ".#.......#."]
    ],
    polvo: [
      ["....####....", ".##########.", "############", "###..##..###", "############", "...##..##...", "..##.##.##..", "##........##"],
      ["....####....", ".##########.", "############", "###..##..###", "############", "..###..###..", ".##..##..##.", "..##....##.."]
    ],
    nave: [["....#....", "...###...", "...###...", ".#######.", "#########", "#########"]]
  };

  const TIPO_DA_LINHA = ["lula", "caranguejo", "caranguejo", "polvo", "polvo"];

  function criar(api) {
    let ctx = null;
    let nivel = NIVEIS.medio;
    let e = null;
    // Estrelas fixas: posições sempre iguais, para o fundo não "tremer" entre partidas.
    const estrelas = [];
    for (let i = 0; i < 46; i += 1) {
      estrelas.push({ x: (i * 97 + 31) % LARGURA, y: (i * 61 + 17) % (LINHA_DEFESA - 20) });
    }

    function novo(dificuldade) {
      nivel = NIVEIS[dificuldade] || NIVEIS.medio;
      const invasores = [];
      for (let l = 0; l < nivel.linhas; l += 1) {
        for (let c = 0; c < nivel.colunas; c += 1) {
          invasores.push({ l: l, c: c, vivo: true });
        }
      }
      e = {
        invasores: invasores,
        total: invasores.length,
        vivos: invasores.length,
        fx: 18,
        fy: 54,
        dir: 1,
        quadro: 0,
        andado: 0,
        nave: { x: (LARGURA - NAVE_L) / 2 },
        vidas: nivel.vidas,
        imune: 0,
        pontos: 0,
        espera: 0,
        tirosNave: [],
        tirosInv: [],
        proximoTiro: nivel.tiroEspera * 1.2,
        fim: false
      };
      api.hud("pontos", 0);
      api.hud("vidas", e.vidas);
      redimensionar();
    }

    function redimensionar() {
      ctx = api.dimensionar(LARGURA, ALTURA, { alturaMin: 340, escalaMax: 1.6 });
    }

    function posicao(inv) {
      return { x: e.fx + inv.c * nivel.espacoX, y: e.fy + inv.l * ESPACO_Y };
    }

    function larguraInvasor(inv) {
      return (inv.l === 0 ? 8 : inv.l <= 2 ? 11 : 12) * PIXEL;
    }

    function colidem(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    function atirarNave() {
      e.tirosNave.push({ x: e.nave.x + NAVE_L / 2 - 1, y: NAVE_Y - 8, w: 2, h: 9 });
      e.espera = TIRO_ESPERA;
    }

    function atirarInvasor() {
      if (e.tirosInv.length >= nivel.tirosMax) {
        return;
      }
      // Cada coluna atira com o invasor mais baixo que ainda existe nela.
      const frente = {};
      e.invasores.forEach(function (inv) {
        if (inv.vivo && (!frente[inv.c] || inv.l > frente[inv.c].l)) {
          frente[inv.c] = inv;
        }
      });
      const colunas = Object.keys(frente);
      if (!colunas.length) {
        return;
      }
      // Metade das vezes mira na coluna da nave, para o ataque exigir desvio.
      let escolhido = frente[colunas[Math.floor(Math.random() * colunas.length)]];
      if (Math.random() < 0.5) {
        const alvoX = e.nave.x + NAVE_L / 2;
        escolhido = colunas
          .map(function (c) {
            return frente[c];
          })
          .sort(function (a, b) {
            return Math.abs(posicao(a).x - alvoX) - Math.abs(posicao(b).x - alvoX);
          })[0];
      }
      const p = posicao(escolhido);
      e.tirosInv.push({ x: p.x + larguraInvasor(escolhido) / 2 - 1.5, y: p.y + INVASOR_A, w: 3, h: 9 });
    }

    function perderVida() {
      e.vidas -= 1;
      api.hud("vidas", e.vidas);
      e.tirosInv = [];
      if (e.vidas <= 0) {
        e.fim = true;
        api.terminar({ venceu: false, texto: "Sua nave foi destruída. Você fez " + e.pontos + " pontos." });
        return;
      }
      e.imune = 1.5;
      api.anunciar("Nave atingida. Vidas restantes: " + e.vidas + ".");
    }

    function moverFrota(dt) {
      const fracao = e.vivos / e.total;
      const vel = nivel.vel * (1 + 2.4 * (1 - fracao));
      const dx = vel * dt * e.dir;
      e.fx += dx;
      e.andado += Math.abs(dx);
      if (e.andado >= 8) {
        e.andado = 0;
        e.quadro = 1 - e.quadro;
      }
      let min = Infinity;
      let max = -Infinity;
      e.invasores.forEach(function (inv) {
        if (inv.vivo) {
          const p = posicao(inv);
          min = Math.min(min, p.x);
          max = Math.max(max, p.x + larguraInvasor(inv));
        }
      });
      if ((e.dir > 0 && max >= LARGURA - 8) || (e.dir < 0 && min <= 8)) {
        e.dir = -e.dir;
        e.fy += nivel.descida;
        e.fx += e.dir * 2;
      }
    }

    function passo(dt) {
      // Nave.
      let dir = 0;
      if (api.ativa("esq")) {
        dir -= 1;
      }
      if (api.ativa("dir")) {
        dir += 1;
      }
      e.nave.x = Math.max(8, Math.min(LARGURA - NAVE_L - 8, e.nave.x + dir * NAVE_VEL * dt));
      e.espera = Math.max(0, e.espera - dt);
      e.imune = Math.max(0, e.imune - dt);
      if (api.ativa("atirar") && e.espera <= 0) {
        atirarNave();
      }

      // Frota e tiros dos invasores.
      moverFrota(dt);
      e.proximoTiro -= dt;
      if (e.proximoTiro <= 0) {
        atirarInvasor();
        e.proximoTiro = nivel.tiroEspera * (0.6 + Math.random() * 0.8);
      }

      // Tiros da nave contra a frota.
      e.tirosNave.forEach(function (t) {
        t.y -= TIRO_VEL * dt;
      });
      e.tirosNave = e.tirosNave.filter(function (t) {
        if (t.y + t.h < 0) {
          return false;
        }
        for (let i = 0; i < e.invasores.length; i += 1) {
          const inv = e.invasores[i];
          if (!inv.vivo) {
            continue;
          }
          const p = posicao(inv);
          if (colidem(t, { x: p.x, y: p.y, w: larguraInvasor(inv), h: INVASOR_A })) {
            inv.vivo = false;
            e.vivos -= 1;
            e.pontos += PONTOS[inv.l] || 10;
            api.hud("pontos", e.pontos);
            return false;
          }
        }
        return true;
      });

      if (e.vivos === 0) {
        e.fim = true;
        api.terminar({ venceu: true, texto: "Você eliminou todos os invasores com " + e.pontos + " pontos." });
        return;
      }

      // Tiros dos invasores contra a nave.
      const caixaNave = { x: e.nave.x, y: NAVE_Y, w: NAVE_L, h: NAVE_A };
      e.tirosInv.forEach(function (t) {
        t.y += nivel.tiroVel * dt;
      });
      let atingida = false;
      e.tirosInv = e.tirosInv.filter(function (t) {
        if (t.y > ALTURA) {
          return false;
        }
        if (e.imune <= 0 && colidem(t, caixaNave)) {
          atingida = true;
          return false;
        }
        return true;
      });
      if (atingida) {
        perderVida();
        if (e.fim) {
          return;
        }
      }

      // Invasão: algum invasor passou da linha de defesa ou tocou a nave.
      for (let i = 0; i < e.invasores.length; i += 1) {
        const inv = e.invasores[i];
        if (inv.vivo) {
          const p = posicao(inv);
          if (p.y + INVASOR_A >= LINHA_DEFESA) {
            e.fim = true;
            api.terminar({ venceu: false, texto: "Os invasores alcançaram a linha de defesa." });
            return;
          }
        }
      }
    }

    function acao() {
      // Movimento e tiro leem api.ativa() a cada quadro.
    }

    function sprite(nome, quadro, x, y, cor) {
      const mapa = SPRITES[nome][quadro % SPRITES[nome].length];
      ctx.fillStyle = cor;
      for (let r = 0; r < mapa.length; r += 1) {
        for (let c = 0; c < mapa[r].length; c += 1) {
          if (mapa[r][c] === "#") {
            ctx.fillRect(Math.round(x + c * PIXEL), Math.round(y + r * PIXEL), PIXEL, PIXEL);
          }
        }
      }
    }

    function desenhar() {
      if (!ctx) {
        return;
      }
      const c = api.cores();
      ctx.fillStyle = c.palco;
      ctx.fillRect(0, 0, LARGURA, ALTURA);

      ctx.fillStyle = c.apagado;
      estrelas.forEach(function (s, i) {
        ctx.fillRect(s.x, s.y, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
      });

      // Linha de defesa tracejada.
      ctx.fillStyle = c.linha;
      for (let x = 0; x < LARGURA; x += 14) {
        ctx.fillRect(x, LINHA_DEFESA, 8, 2);
      }

      // Frota.
      const cores = { lula: c.claro, caranguejo: c.destaque, polvo: c.secundario };
      e.invasores.forEach(function (inv) {
        if (inv.vivo) {
          const p = posicao(inv);
          const tipo = TIPO_DA_LINHA[inv.l];
          sprite(tipo, e.quadro, p.x, p.y, cores[tipo]);
        }
      });

      // Tiros.
      ctx.fillStyle = c.texto;
      e.tirosNave.forEach(function (t) {
        ctx.fillRect(t.x, t.y, t.w, t.h);
      });
      ctx.fillStyle = c.claro;
      e.tirosInv.forEach(function (t) {
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.fillRect(t.x - 1, t.y + 3, t.w + 2, 2);
      });

      // Nave (pisca quando está imune).
      const piscar = e.imune > 0 && Math.floor(e.imune * 10) % 2 === 0;
      if (!piscar) {
        sprite("nave", 0, e.nave.x, NAVE_Y, c.texto);
      }

      // Vidas no canto, como pequenas naves.
      for (let i = 0; i < e.vidas; i += 1) {
        const x = LARGURA - 10 - (i + 1) * (NAVE_L * 0.7 + 4);
        ctx.save();
        ctx.translate(x, 10);
        ctx.scale(0.7, 0.7);
        sprite("nave", 0, 0, 0, c.destaque);
        ctx.restore();
      }
    }

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
      _posicao: posicao
    };
  }

  MiniJogos.registrar({
    id: "invaders",
    nome: "Space Invaders",
    descricaoCanvas: "Campo de batalha: a frota de invasores no alto e a sua nave embaixo.",
    objetivo: "Destrua toda a frota antes que ela alcance a linha tracejada ou acabem suas vidas.",
    dicaTeclado: "Mova com [Setas] ou [A] [D] e atire com [Espaço].",
    dicaToque: "Use os botões de mover e o botão de atirar.",
    controles: {
      teclado: ["[A] [D] ou [Seta esquerda] [Seta direita]: mover a nave", "[Espaço], [W] ou [Seta acima]: atirar", "[P]: pausar"],
      toque: ["Segure os botões de mover e toque em Atirar"]
    },
    teclas: {
      esq: ["ArrowLeft", "a"],
      dir: ["ArrowRight", "d"],
      atirar: [" ", "ArrowUp", "w"]
    },
    dificuldadePadrao: "medio",
    hud: [
      { id: "pontos", rotulo: "Pontos", valor: "0" },
      { id: "vidas", rotulo: "Vidas", valor: "3" }
    ],
    toque: {
      layout: "invaders",
      botoes: [
        { acao: "esq", rotulo: "Mover para a esquerda", seta: "esq" },
        { acao: "dir", rotulo: "Mover para a direita", seta: "dir" },
        { acao: "atirar", rotulo: "Atirar", texto: "Atirar" }
      ]
    },
    criar: criar
  });
})();
