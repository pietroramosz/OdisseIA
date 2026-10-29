// Desafio de Pathfinding: numa grade com obstáculos, o jogador traça um caminho do A ao B.
// Depois pode pedir ao algoritmo A* que resolva: as casas que ele examinou aparecem primeiro e,
// em seguida, o menor caminho. A dificuldade muda o tamanho da grade, a quantidade de obstáculos e
// o quanto o caminho precisa contornar. Grades sem solução são avisadas, nunca escondidas.

(function () {
  "use strict";

  const NIVEIS = {
    // desvioMin/desvioMax: passos acima da distância em linha reta (Manhattan) que o menor caminho precisa ter.
    facil: { colunas: 8, linhas: 10, densidade: 0.15, desvioMin: 0, desvioMax: 4 },
    medio: { colunas: 10, linhas: 12, densidade: 0.27, desvioMin: 4, desvioMax: 14 },
    dificil: { colunas: 12, linhas: 14, densidade: 0.34, desvioMin: 8, desvioMax: 40 }
  };

  const TENTATIVAS = 500;
  const VIZINHOS = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ];
  const DIRECOES = {
    cima: VIZINHOS[0],
    dir: VIZINHOS[1],
    baixo: VIZINHOS[2],
    esq: VIZINHOS[3]
  };

  function indice(grade, x, y) {
    return y * grade.colunas + x;
  }

  function livre(grade, x, y) {
    return x >= 0 && y >= 0 && x < grade.colunas && y < grade.linhas && !grade.paredes[indice(grade, x, y)];
  }

  // A* com vizinhança de 4 direções, custo 1 por passo e heurística de Manhattan.
  // Devolve as casas na ordem em que foram examinadas e o caminho (ou null, sem solução).
  function astar(grade) {
    const { colunas, linhas, inicio, fim } = grade;
    const n = colunas * linhas;
    const g = new Array(n).fill(Infinity);
    const pai = new Array(n).fill(-1);
    const fechado = new Array(n).fill(false);
    const aberto = [];
    const h = function (x, y) {
      return Math.abs(x - fim.x) + Math.abs(y - fim.y);
    };
    const i0 = indice(grade, inicio.x, inicio.y);
    g[i0] = 0;
    aberto.push({ i: i0, f: h(inicio.x, inicio.y), h: h(inicio.x, inicio.y) });
    const explorados = [];

    while (aberto.length) {
      // Menor f; no empate, a mais perto do objetivo.
      let melhor = 0;
      for (let k = 1; k < aberto.length; k += 1) {
        if (aberto[k].f < aberto[melhor].f || (aberto[k].f === aberto[melhor].f && aberto[k].h < aberto[melhor].h)) {
          melhor = k;
        }
      }
      const atual = aberto.splice(melhor, 1)[0];
      if (fechado[atual.i]) {
        continue;
      }
      fechado[atual.i] = true;
      const x = atual.i % colunas;
      const y = Math.floor(atual.i / colunas);
      explorados.push({ x: x, y: y });

      if (x === fim.x && y === fim.y) {
        const caminho = [];
        for (let i = atual.i; i !== -1; i = pai[i]) {
          caminho.push({ x: i % colunas, y: Math.floor(i / colunas) });
        }
        caminho.reverse();
        return { caminho: caminho, explorados: explorados };
      }

      VIZINHOS.forEach(function (v) {
        const nx = x + v.x;
        const ny = y + v.y;
        if (!livre(grade, nx, ny)) {
          return;
        }
        const ni = indice(grade, nx, ny);
        const custo = g[atual.i] + 1;
        if (custo < g[ni]) {
          g[ni] = custo;
          pai[ni] = atual.i;
          aberto.push({ i: ni, f: custo + h(nx, ny), h: h(nx, ny) });
        }
      });
    }
    return { caminho: null, explorados: explorados };
  }

  function sortear(max) {
    return Math.floor(Math.random() * max);
  }

  // Gera uma grade e procura uma que tenha solução com o desvio pedido. Se nenhuma servir, devolve a
  // melhor com solução e, em último caso, uma sem solução (a interface sabe avisar).
  function gerar(nivel) {
    let melhor = null;
    let semSolucao = null;
    for (let t = 0; t < TENTATIVAS; t += 1) {
      const grade = {
        colunas: nivel.colunas,
        linhas: nivel.linhas,
        paredes: new Uint8Array(nivel.colunas * nivel.linhas),
        inicio: { x: sortear(2), y: sortear(2) },
        fim: { x: nivel.colunas - 1 - sortear(2), y: nivel.linhas - 1 - sortear(2) }
      };
      for (let i = 0; i < grade.paredes.length; i += 1) {
        grade.paredes[i] = Math.random() < nivel.densidade ? 1 : 0;
      }
      grade.paredes[indice(grade, grade.inicio.x, grade.inicio.y)] = 0;
      grade.paredes[indice(grade, grade.fim.x, grade.fim.y)] = 0;
      // Espelha na horizontal em metade das vezes, para o A não ficar sempre no mesmo canto.
      if (Math.random() < 0.5) {
        espelhar(grade);
      }

      const resultado = astar(grade);
      if (!resultado.caminho) {
        semSolucao = semSolucao || grade;
        continue;
      }
      const reta = Math.abs(grade.fim.x - grade.inicio.x) + Math.abs(grade.fim.y - grade.inicio.y);
      const desvio = resultado.caminho.length - 1 - reta;
      grade.otimo = resultado.caminho.length - 1;
      if (desvio >= nivel.desvioMin && desvio <= nivel.desvioMax) {
        return grade;
      }
      if (!melhor || Math.abs(desvio - nivel.desvioMin) < Math.abs(melhor.desvio - nivel.desvioMin)) {
        melhor = { grade: grade, desvio: desvio };
      }
    }
    return melhor ? melhor.grade : semSolucao;
  }

  function espelhar(grade) {
    const { colunas, linhas, paredes } = grade;
    for (let y = 0; y < linhas; y += 1) {
      for (let x = 0; x < Math.floor(colunas / 2); x += 1) {
        const a = y * colunas + x;
        const b = y * colunas + (colunas - 1 - x);
        const t = paredes[a];
        paredes[a] = paredes[b];
        paredes[b] = t;
      }
    }
    grade.inicio.x = colunas - 1 - grade.inicio.x;
    grade.fim.x = colunas - 1 - grade.fim.x;
  }

  function criar(api) {
    let ctx = null;
    let nivel = NIVEIS.medio;
    let e = null;
    let celula = 32;
    let arrastando = false;
    let ultimaCasa = null;
    let quadro = 0;

    function pluralPassos(n) {
      return n + (n === 1 ? " passo" : " passos");
    }

    function cabeca() {
      return e.caminho[e.caminho.length - 1];
    }

    function mensagem(texto, tipo) {
      e.tipo = tipo || "";
      e.mensagem = texto;
      api.linhaEstado(texto, tipo);
      api.anunciar(texto);
    }

    function carregar(grade) {
      cancelAnimationFrame(quadro);
      arrastando = false;
      e = {
        grade: grade,
        caminho: [{ x: grade.inicio.x, y: grade.inicio.y }],
        concluido: false,
        otimo: null,
        busca: null,
        mostrarExplorados: 0,
        mostrarCaminho: 0,
        animando: false,
        mensagem: "",
        tipo: ""
      };
      atualizarHud();
      redimensionar();
      atualizarBotoes();
      const resultado = astar(grade);
      e.solucao = resultado;
      if (!resultado.caminho) {
        mensagem("Sem caminho possível: os obstáculos isolam o B. Gere outro desafio.", "aviso");
      } else {
        mensagem("Arraste do A até o B, desviando dos obstáculos.", "");
      }
    }

    function novo(dificuldade) {
      nivel = NIVEIS[dificuldade] || NIVEIS.medio;
      carregar(gerar(nivel));
    }

    function redimensionar() {
      const g = e.grade;
      const area = api.area(220);
      celula = Math.max(16, Math.floor(Math.min(area.largura / g.colunas, area.altura / g.linhas, 56)));
      ctx = api.dimensionar(g.colunas * celula, g.linhas * celula, { escalaMax: 1, alturaMin: 220 });
    }

    function atualizarHud() {
      api.hud("passos", e.caminho.length - 1);
      api.hud("minimo", e.otimo === null ? "—" : e.otimo);
    }

    function atualizarBotoes() {
      const semSolucao = !e.solucao || !e.solucao.caminho;
      api.botao("desfazer", { desabilitado: e.animando || e.caminho.length < 2 });
      api.botao("reiniciar", { desabilitado: e.animando });
      api.botao("astar", { desabilitado: e.animando, principal: !semSolucao });
      api.botao("novo", { principal: semSolucao });
    }

    // ----- Caminho do jogador -----

    function indiceNoCaminho(x, y) {
      for (let i = 0; i < e.caminho.length; i += 1) {
        if (e.caminho[i].x === x && e.caminho[i].y === y) {
          return i;
        }
      }
      return -1;
    }

    function limparBusca() {
      cancelAnimationFrame(quadro);
      e.busca = null;
      e.mostrarExplorados = 0;
      e.mostrarCaminho = 0;
      e.animando = false;
    }

    function aposMudanca() {
      e.concluido = cabeca().x === e.grade.fim.x && cabeca().y === e.grade.fim.y;
      e.otimo = e.concluido && e.solucao.caminho ? e.solucao.caminho.length - 1 : null;
      atualizarHud();
      atualizarBotoes();
      if (e.concluido) {
        const passos = e.caminho.length - 1;
        if (passos === e.otimo) {
          mensagem("Perfeito! Você achou o menor caminho: " + pluralPassos(passos) + ".", "ok");
        } else {
          mensagem(
            "Você chegou ao B em " + pluralPassos(passos) + ". O menor caminho tem " + pluralPassos(e.otimo) +
              ". Tente de novo ou veja como o A* faz.",
            "ok"
          );
        }
      }
    }

    // Avança uma casa. Voltar a uma casa que já está no caminho desfaz os passos até ela.
    function passarPara(x, y) {
      if (e.animando) {
        return false;
      }
      const i = indiceNoCaminho(x, y);
      if (i !== -1) {
        if (i === e.caminho.length - 1) {
          return false;
        }
        limparBusca();
        e.caminho.length = i + 1;
        aposMudanca();
        if (!e.concluido) {
          mensagem("Caminho com " + pluralPassos(e.caminho.length - 1) + ".", "");
        }
        return true;
      }
      const c = cabeca();
      if (Math.abs(c.x - x) + Math.abs(c.y - y) !== 1) {
        return false;
      }
      if (!livre(e.grade, x, y)) {
        mensagem("Há um obstáculo ali. Escolha outra casa.", "aviso");
        return false;
      }
      if (e.concluido) {
        return false;
      }
      limparBusca();
      e.caminho.push({ x: x, y: y });
      aposMudanca();
      if (!e.concluido) {
        mensagem("Caminho com " + pluralPassos(e.caminho.length - 1) + ".", "");
      }
      return true;
    }

    // Anda em direção a uma casa, uma casa por vez, para o arrasto não pular obstáculos.
    function andarAte(alvo) {
      for (let k = 0; k < e.grade.colunas + e.grade.linhas; k += 1) {
        const c = cabeca();
        const i = indiceNoCaminho(alvo.x, alvo.y);
        if (i !== -1) {
          passarPara(alvo.x, alvo.y);
          return;
        }
        const dx = alvo.x - c.x;
        const dy = alvo.y - c.y;
        if (dx === 0 && dy === 0) {
          return;
        }
        const eixos = Math.abs(dx) >= Math.abs(dy)
          ? [{ x: Math.sign(dx), y: 0 }, { x: 0, y: Math.sign(dy) }]
          : [{ x: 0, y: Math.sign(dy) }, { x: Math.sign(dx), y: 0 }];
        let andou = false;
        for (let j = 0; j < eixos.length; j += 1) {
          const v = eixos[j];
          if ((v.x !== 0 || v.y !== 0) && livre(e.grade, c.x + v.x, c.y + v.y) && indiceNoCaminho(c.x + v.x, c.y + v.y) === -1) {
            andou = passarPara(c.x + v.x, c.y + v.y);
            break;
          }
        }
        if (!andou) {
          // Parou num obstáculo: avisa, para o jogador saber por que o caminho não seguiu.
          const v = eixos[0];
          if ((v.x !== 0 || v.y !== 0) && !livre(e.grade, c.x + v.x, c.y + v.y) && indiceNoCaminho(c.x + v.x, c.y + v.y) === -1
            && c.x + v.x >= 0 && c.y + v.y >= 0 && c.x + v.x < e.grade.colunas && c.y + v.y < e.grade.linhas) {
            mensagem("Há um obstáculo ali. Contorne-o por outra casa.", "aviso");
          }
          return;
        }
      }
    }

    function casaDoPonteiro(ev) {
      const p = api.coordenadas(ev);
      const x = Math.floor(p.x / celula);
      const y = Math.floor(p.y / celula);
      if (x < 0 || y < 0 || x >= e.grade.colunas || y >= e.grade.linhas) {
        return null;
      }
      return { x: x, y: y };
    }

    api.canvas.addEventListener("pointerdown", function (ev) {
      if (e.animando) {
        return;
      }
      const casa = casaDoPonteiro(ev);
      if (!casa) {
        return;
      }
      ev.preventDefault();
      api.foco();
      arrastando = true;
      ultimaCasa = casa;
      try {
        api.canvas.setPointerCapture(ev.pointerId);
      } catch (erro) {
        // sem captura, o arrasto continua dentro do canvas
      }
      const c = cabeca();
      const ehVizinha = Math.abs(c.x - casa.x) + Math.abs(c.y - casa.y) === 1;
      if (indiceNoCaminho(casa.x, casa.y) !== -1 || ehVizinha) {
        passarPara(casa.x, casa.y);
      } else if (livre(e.grade, casa.x, casa.y)) {
        mensagem("Comece pela ponta do seu caminho e siga por casas vizinhas.", "");
      } else {
        mensagem("Há um obstáculo ali. Escolha outra casa.", "aviso");
      }
      desenhar();
    });
    api.canvas.addEventListener("pointermove", function (ev) {
      if (!arrastando) {
        return;
      }
      const casa = casaDoPonteiro(ev);
      if (!casa || (ultimaCasa && casa.x === ultimaCasa.x && casa.y === ultimaCasa.y)) {
        return;
      }
      ultimaCasa = casa;
      andarAte(casa);
      desenhar();
    });
    ["pointerup", "pointercancel"].forEach(function (nome) {
      api.canvas.addEventListener(nome, function () {
        arrastando = false;
      });
    });

    function acao(nome, baixo) {
      if (!baixo) {
        return;
      }
      if (nome === "desfazer") {
        desfazer();
        desenhar();
        return;
      }
      const v = DIRECOES[nome];
      if (!v) {
        return;
      }
      const c = cabeca();
      passarPara(c.x + v.x, c.y + v.y);
      desenhar();
    }

    function desfazer() {
      if (e.animando || e.caminho.length < 2) {
        return;
      }
      limparBusca();
      e.caminho.pop();
      aposMudanca();
      mensagem("Caminho com " + pluralPassos(e.caminho.length - 1) + ".", "");
    }

    // ----- Execução do A* -----

    function executarAstar() {
      if (e.animando) {
        return;
      }
      limparBusca();
      const r = e.solucao;
      e.busca = r;
      const total = r.explorados.length;
      const fim = function () {
        e.animando = false;
        atualizarBotoes();
        if (r.caminho) {
          const passos = r.caminho.length - 1;
          mensagem(
            "O A* examinou " + total + " casas e achou um caminho de " + pluralPassos(passos) + ", o menor possível.",
            "ok"
          );
          e.otimo = passos;
          atualizarHud();
        } else {
          mensagem(
            "Sem caminho possível: o A* examinou todas as " + total + " casas ao alcance do A e não chegou ao B. Gere outro desafio.",
            "aviso"
          );
        }
        desenhar();
      };

      if (api.reduzirMovimento()) {
        e.mostrarExplorados = total;
        e.mostrarCaminho = r.caminho ? r.caminho.length : 0;
        fim();
        return;
      }

      e.animando = true;
      atualizarBotoes();
      mensagem("O A* está examinando as casas mais promissoras primeiro…", "");
      const porQuadro = Math.max(1, Math.ceil(total / 70));
      const porQuadroCaminho = Math.max(1, Math.ceil((r.caminho ? r.caminho.length : 0) / 30));
      const andar = function () {
        if (e.mostrarExplorados < total) {
          e.mostrarExplorados = Math.min(total, e.mostrarExplorados + porQuadro);
        } else if (r.caminho && e.mostrarCaminho < r.caminho.length) {
          e.mostrarCaminho = Math.min(r.caminho.length, e.mostrarCaminho + porQuadroCaminho);
        } else {
          fim();
          return;
        }
        desenhar();
        quadro = requestAnimationFrame(andar);
      };
      quadro = requestAnimationFrame(andar);
    }

    function botao(id) {
      if (id === "astar") {
        executarAstar();
      } else if (id === "desfazer") {
        desfazer();
        desenhar();
      } else if (id === "reiniciar") {
        if (e.animando) {
          return;
        }
        limparBusca();
        e.caminho = [{ x: e.grade.inicio.x, y: e.grade.inicio.y }];
        aposMudanca();
        mensagem(e.solucao.caminho ? "Caminho limpo. Arraste do A até o B." : "Sem caminho possível: os obstáculos isolam o B. Gere outro desafio.", e.solucao.caminho ? "" : "aviso");
        desenhar();
      } else if (id === "novo") {
        novo(api.dificuldade());
        desenhar();
      }
    }

    // ----- Desenho -----

    function cor(c, alfa, desenho) {
      ctx.globalAlpha = alfa;
      desenho(c);
      ctx.globalAlpha = 1;
    }

    function desenhar() {
      if (!ctx) {
        return;
      }
      const c = api.cores();
      const g = e.grade;
      const L = g.colunas * celula;
      const A = g.linhas * celula;

      ctx.fillStyle = c.palco;
      ctx.fillRect(0, 0, L, A);

      // Linhas da grade.
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = c.apagado;
      for (let x = 0; x <= g.colunas; x += 1) {
        ctx.fillRect(Math.min(x * celula, L - 1), 0, 1, A);
      }
      for (let y = 0; y <= g.linhas; y += 1) {
        ctx.fillRect(0, Math.min(y * celula, A - 1), L, 1);
      }
      ctx.globalAlpha = 1;

      // Casas examinadas pelo A*.
      if (e.busca) {
        for (let i = 0; i < e.mostrarExplorados; i += 1) {
          const p = e.busca.explorados[i];
          cor(c, 0.34, function () {
            ctx.fillStyle = c.linha;
            ctx.fillRect(p.x * celula + 1, p.y * celula + 1, celula - 1, celula - 1);
          });
          ctx.fillStyle = c.linha;
          const ponto = Math.max(3, Math.round(celula * 0.14));
          ctx.fillRect(p.x * celula + celula / 2 - ponto / 2, p.y * celula + celula / 2 - ponto / 2, ponto, ponto);
        }
      }

      // Obstáculos: bloco com hachura.
      for (let y = 0; y < g.linhas; y += 1) {
        for (let x = 0; x < g.colunas; x += 1) {
          if (g.paredes[indice(g, x, y)]) {
            desenharParede(c, x * celula, y * celula);
          }
        }
      }

      // Caminho do A*: rota grossa, nós quadrados.
      if (e.busca && e.busca.caminho && e.mostrarCaminho > 0) {
        const trecho = e.busca.caminho.slice(0, e.mostrarCaminho);
        ctx.fillStyle = c.destaque;
        trecho.forEach(function (p, i) {
          const m = Math.max(2, Math.round(celula * 0.12));
          ctx.fillRect(p.x * celula + m, p.y * celula + m, celula - m * 2, celula - m * 2);
          if (i > 0) {
            ponte(trecho[i - 1], p, celula * 0.5);
          }
        });
      }

      // Caminho do jogador: linha fina clara com nós.
      if (e.caminho.length) {
        ctx.fillStyle = c.texto;
        e.caminho.forEach(function (p, i) {
          if (i > 0) {
            ponte(e.caminho[i - 1], p, Math.max(3, celula * 0.16));
          }
        });
        e.caminho.forEach(function (p, i) {
          const t = i === e.caminho.length - 1 ? celula * 0.46 : celula * 0.26;
          ctx.fillStyle = c.texto;
          ctx.fillRect(p.x * celula + (celula - t) / 2, p.y * celula + (celula - t) / 2, t, t);
        });
      }

      // Início e objetivo, por cima de tudo.
      marca(c, g.inicio, "A", c.texto, c.fundo, c.texto);
      marca(c, g.fim, "B", c.destaque, c.sobreDestaque, c.texto);

      // A cabeça do caminho, enquanto o desafio não foi resolvido.
      if (!e.concluido && e.caminho.length) {
        const h = cabeca();
        ctx.strokeStyle = c.destaque;
        ctx.lineWidth = 3;
        ctx.strokeRect(h.x * celula + 1.5, h.y * celula + 1.5, celula - 3, celula - 3);
      }

      // Moldura da grade.
      ctx.strokeStyle = c.linha;
      ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, L - 3, A - 3);
    }

    function ponte(a, b, espessura) {
      const cx = (celula - espessura) / 2;
      const x0 = Math.min(a.x, b.x) * celula + cx;
      const y0 = Math.min(a.y, b.y) * celula + cx;
      const largura = a.x === b.x ? espessura : celula + espessura;
      const altura = a.y === b.y ? espessura : celula + espessura;
      ctx.fillRect(x0, y0, largura, altura);
    }

    function desenharParede(c, px, py) {
      cor(c, 0.2, function () {
        ctx.fillStyle = c.texto;
        ctx.fillRect(px + 1, py + 1, celula - 1, celula - 1);
      });
      ctx.save();
      ctx.beginPath();
      ctx.rect(px + 1, py + 1, celula - 1, celula - 1);
      ctx.clip();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = c.texto;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let k = -celula; k < celula; k += 6) {
        ctx.moveTo(px + k, py + celula);
        ctx.lineTo(px + k + celula, py);
      }
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    function marca(c, p, letra, fundo, texto, contorno) {
      const m = Math.max(2, Math.round(celula * 0.08));
      ctx.fillStyle = fundo;
      ctx.fillRect(p.x * celula + m, p.y * celula + m, celula - m * 2, celula - m * 2);
      ctx.strokeStyle = contorno;
      ctx.lineWidth = 2;
      ctx.strokeRect(p.x * celula + m + 1, p.y * celula + m + 1, celula - m * 2 - 2, celula - m * 2 - 2);
      ctx.fillStyle = texto;
      ctx.font = '700 ' + Math.round(celula * 0.5) + 'px "Chakra Petch", system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(letra, p.x * celula + celula / 2, p.y * celula + celula / 2 + 1);
    }

    return {
      novo: novo,
      passo: function () {},
      desenhar: desenhar,
      acao: acao,
      botao: botao,
      redimensionar: redimensionar,
      _estado: function () {
        return e;
      },
      _carregar: function (grade) {
        carregar(grade);
        desenhar();
      },
      _astar: astar,
      _gerar: gerar,
      _niveis: NIVEIS
    };
  }

  MiniJogos.registrar({
    id: "pathfinding",
    nome: "Desafio de Pathfinding",
    tipo: "puzzle",
    descricaoCanvas: "Grade com o ponto A, o ponto B e obstáculos hachurados.",
    rotuloPalco: "Grade do desafio. Use as setas para andar do A ao B e Backspace para voltar uma casa.",
    objetivo: "Trace um caminho do A ao B sem passar pelos obstáculos. Depois veja como o algoritmo A* resolve o mesmo desafio.",
    dicaTeclado: "",
    dicaToque: "",
    controles: {
      teclado: ["[Setas] ou [W] [A] [S] [D]: andar uma casa", "[Backspace] ou [Z]: voltar uma casa"],
      toque: ["Arraste do A até o B, ou toque nas casas vizinhas ao fim do caminho"]
    },
    teclas: {
      cima: ["ArrowUp", "w"],
      baixo: ["ArrowDown", "s"],
      esq: ["ArrowLeft", "a"],
      dir: ["ArrowRight", "d"],
      desfazer: ["Backspace", "z"]
    },
    dificuldadePadrao: "facil",
    hud: [
      { id: "passos", rotulo: "Passos", valor: "0" },
      { id: "minimo", rotulo: "Mínimo", valor: "—" }
    ],
    linhaEstado: true,
    legenda: [
      { classe: "inicio", rotulo: "Início (A)" },
      { classe: "fim", rotulo: "Objetivo (B)" },
      { classe: "parede", rotulo: "Obstáculo" },
      { classe: "jogador", rotulo: "Seu caminho" },
      { classe: "explorada", rotulo: "Examinada pelo A*" },
      { classe: "astar", rotulo: "Caminho do A*" }
    ],
    botoes: [
      { id: "astar", rotulo: "Executar A*", principal: true },
      { id: "desfazer", rotulo: "Desfazer" },
      { id: "reiniciar", rotulo: "Reiniciar" },
      { id: "novo", rotulo: "Novo desafio" }
    ],
    criar: criar
  });
})();
