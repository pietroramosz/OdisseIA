// Leitura de QR Codes pela câmera do celular (DEC-024).
//
// O scanner NÃO tem regra própria de progresso: ele só descobre qual estação o QR representa e
// entrega o número a resultadoParaEstacao(), de qr.js, a mesma função que validar.html usa.
// Só o QR da próxima estação na ordem avança o progresso; os demais não alteram nada.
//
// Compatibilidade: a decodificação usa a API nativa BarcodeDetector (Chrome e Samsung Internet no
// Android, ChromeOS, macOS). Ela não existe no Safari do iOS nem no Firefox. Nesses navegadores o
// scanner não liga a câmera: explica que o QR Code, que é um link para validar.html, abre pelo app
// Câmera do celular e cai no mesmo fluxo de validação. Para ler dentro do site também no iOS seria
// preciso uma biblioteca de decodificação (ver DEC-024); o ponto de troca é criarDecodificador().
//
// Privacidade: a câmera só é pedida depois de um toque em "Abrir câmera"; os quadros são lidos na
// memória, nunca gravados nem enviados; todas as trilhas são paradas ao fechar, ler, trocar de aba
// ou sair da página.
(function () {
  "use strict";

  const INTERVALO_LEITURA = 180;
  let dialogo = null;
  let corpo = null;
  let titulo = null;
  let video = null;
  let fluxo = null;
  let decodificador = null;
  let temporizador = 0;
  let leituraAtiva = false;
  // Cada parada da câmera abre uma nova "sessão": uma resposta atrasada de getUserMedia ou de play()
  // que pertença a uma sessão anterior (cancelou, fechou, reabriu, saiu da aba) é descartada e a
  // trilha que ela trouxe é parada na hora, sem tocar na tela.
  let sessao = 0;
  let houveValidacao = false;
  let navegando = false;

  // ---------- Decodificação ----------

  // Devolve { detectar(video) -> Promise<string|null> } ou null se o navegador não sabe ler QR.
  function criarDecodificador() {
    if (typeof window.BarcodeDetector !== "function") {
      return Promise.resolve(null);
    }
    const formatos = typeof window.BarcodeDetector.getSupportedFormats === "function"
      ? window.BarcodeDetector.getSupportedFormats()
      : Promise.resolve(["qr_code"]);
    return formatos.then(function (lista) {
      if (lista.indexOf("qr_code") === -1) {
        return null;
      }
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      return {
        detectar: function (elemento) {
          return detector.detect(elemento).then(function (codigos) {
            return codigos.length ? String(codigos[0].rawValue) : null;
          });
        }
      };
    }).catch(function () {
      return null;
    });
  }

  // Só QR Codes no formato oficial valem: um link para validar.html com o único parâmetro
  // "estacao" entre 1 e o total de estações. O endereço do site pode mudar (o QR impresso aponta
  // para a hospedagem final), então o domínio não é comparado, mas nada é aberto: o texto lido
  // serve só para extrair o número da estação. Qualquer outra coisa é "inválido".
  function interpretarQr(texto) {
    if (typeof texto !== "string" || texto.length === 0 || texto.length > 300) {
      return null;
    }
    let url;
    try {
      // Sem endereço-base: só valem links completos, como os QR Codes impressos.
      url = new URL(texto.trim());
    } catch (erro) {
      return null;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }
    if (url.username !== "" || url.password !== "") {
      return null;
    }
    if (!/\/validar\.html$/.test(url.pathname)) {
      return null;
    }
    const chaves = Array.from(url.searchParams.keys());
    if (chaves.length !== 1 || chaves[0] !== QR_PARAMETRO) {
      return null;
    }
    const valor = url.searchParams.get(QR_PARAMETRO);
    if (!/^\d+$/.test(valor)) {
      return null;
    }
    const numero = Number(valor);
    return numero >= 1 && numero <= OdisseIAConfig.totalEstacoes ? numero : null;
  }

  // ---------- Câmera ----------

  function pararCamera() {
    sessao += 1;
    leituraAtiva = false;
    window.clearTimeout(temporizador);
    if (fluxo) {
      fluxo.getTracks().forEach(function (trilha) {
        trilha.stop();
      });
      fluxo = null;
    }
    if (video) {
      video.pause();
      video.srcObject = null;
    }
  }

  function classificarErro(erro) {
    const nome = erro && erro.name ? erro.name : "";
    if (nome === "NotAllowedError" || nome === "SecurityError" || nome === "PermissionDeniedError") {
      return "negada";
    }
    if (nome === "NotFoundError" || nome === "OverconstrainedError" || nome === "DevicesNotFoundError") {
      return "indisponivel";
    }
    if (nome === "NotReadableError" || nome === "AbortError" || nome === "TrackStartError") {
      return "ocupada";
    }
    return "generico";
  }

  function abrirCamera() {
    if (decodificador === null) {
      mostrarSemSuporte();
      return;
    }
    if (!window.isSecureContext || !navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== "function") {
      mostrarErro("insegura");
      return;
    }
    mostrarLendo();
    const minha = sessao;
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }
    }).then(function (stream) {
      if (minha !== sessao || !dialogo || !dialogo.open || document.hidden) {
        stream.getTracks().forEach(function (trilha) { trilha.stop(); });
        if (minha === sessao && dialogo && dialogo.open) {
          mostrarPausada();
        }
        return;
      }
      fluxo = stream;
      video.srcObject = stream;
      return video.play().then(function () {
        if (minha === sessao) {
          iniciarLeitura(minha);
        }
      });
    }).catch(function (erro) {
      if (minha !== sessao) {
        return;
      }
      pararCamera();
      mostrarErro(classificarErro(erro));
    });
  }

  function iniciarLeitura(minha) {
    leituraAtiva = true;
    (function ciclo() {
      if (!leituraAtiva || minha !== sessao || !video) {
        return;
      }
      if (video.readyState < 2) {
        temporizador = window.setTimeout(ciclo, INTERVALO_LEITURA);
        return;
      }
      decodificador.detectar(video).then(function (texto) {
        if (!leituraAtiva || minha !== sessao) {
          return;
        }
        if (texto === null) {
          temporizador = window.setTimeout(ciclo, INTERVALO_LEITURA);
          return;
        }
        concluirLeitura(texto);
      }).catch(function () {
        if (leituraAtiva && minha === sessao) {
          temporizador = window.setTimeout(ciclo, INTERVALO_LEITURA * 2);
        }
      });
    })();
  }

  function concluirLeitura(texto) {
    pararCamera();
    const numero = interpretarQr(texto);
    if (numero === null) {
      mostrarResultado("invalido", null);
      return;
    }
    const resultado = resultadoParaEstacao(numero);
    if (resultado === "sucesso") {
      houveValidacao = true;
    }
    mostrarResultado(resultado, numero);
  }

  // ---------- Interface ----------

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  function botao(texto, classe, aoClicar) {
    const b = el("button", "botao " + (classe || ""), texto);
    b.type = "button";
    b.addEventListener("click", aoClicar);
    return b;
  }

  function link(texto, href, classe) {
    const a = el("a", "botao " + (classe || ""), texto);
    a.href = href;
    a.addEventListener("click", function () {
      navegando = true;
    });
    return a;
  }

  function doisDigitos(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function proximaEsperada() {
    const ultima = obterProgresso().ultimaEstacaoDesbloqueada;
    return ultima >= OdisseIAConfig.totalEstacoes ? null : ultima + 1;
  }

  function montarDialogo() {
    if (dialogo) {
      return;
    }
    dialogo = document.createElement("dialog");
    dialogo.className = "scanner";
    dialogo.setAttribute("aria-labelledby", "scanner-titulo");

    const topo = el("div", "scanner__topo");
    titulo = el("h2", "scanner__titulo", "Escanear QR Code");
    titulo.id = "scanner-titulo";
    titulo.tabIndex = -1;
    topo.appendChild(titulo);
    topo.appendChild(botao("Fechar", "scanner__fechar", fechar));
    dialogo.appendChild(topo);

    corpo = el("div", "scanner__corpo");
    dialogo.appendChild(corpo);

    // Esc fecha o <dialog> sozinho; este evento garante que a câmera pare em qualquer saída.
    dialogo.addEventListener("close", aoFechar);
    dialogo.addEventListener("cancel", function () {
      pararCamera();
    });
    document.body.appendChild(dialogo);
  }

  function limpar(estado) {
    pararCamera();
    corpo.textContent = "";
    corpo.setAttribute("data-estado", estado);
    video = null;
  }

  function focarTitulo(texto) {
    titulo.textContent = texto;
    titulo.focus();
  }

  function mostrarIntro() {
    limpar("intro");
    focarTitulo("Escanear QR Code");
    const esperada = proximaEsperada();
    if (esperada === null) {
      corpo.appendChild(el("p", "scanner__texto", "Todas as estações já foram liberadas neste navegador. Não há mais QR Codes para escanear."));
      const acoes = el("div", "scanner__acoes");
      acoes.appendChild(link("Ver a Conclusão", "final.html", "botao--principal"));
      acoes.appendChild(botao("Fechar", "", fechar));
      corpo.appendChild(acoes);
      return;
    }
    corpo.appendChild(el("p", "scanner__texto", "Use a câmera para ler o QR Code que o orientador entrega quando você termina uma estação na feira. Cada QR Code libera o conteúdo digital da estação física correspondente."));
    const esperado = el("p", "scanner__esperado");
    esperado.appendChild(el("span", "scanner__esperado-rotulo", "QR esperado agora"));
    esperado.appendChild(el("strong", "", "Estação " + doisDigitos(esperada)));
    corpo.appendChild(esperado);
    corpo.appendChild(el("p", "scanner__nota", "A câmera é usada só para ler o código: nenhuma imagem é gravada nem enviada. O navegador vai pedir sua permissão."));
    const acoes = el("div", "scanner__acoes");
    acoes.appendChild(botao("Abrir câmera", "botao--principal", abrirCamera));
    acoes.appendChild(botao("Cancelar", "", fechar));
    corpo.appendChild(acoes);
  }

  function mostrarSemSuporte() {
    limpar("sem-suporte");
    focarTitulo("Este navegador não lê QR Code aqui");
    corpo.appendChild(el("p", "scanner__texto", "A leitura dentro do site funciona no Chrome e no Samsung Internet do Android. Neste navegador (por exemplo o Safari do iPhone) use o app Câmera do celular:"));
    const passos = el("ol", "scanner__passos");
    ["Abra o app Câmera e aponte para o QR Code entregue pelo orientador.", "Toque no aviso que aparece com o link do OdisseIA.", "A página abre e libera a estação, no mesmo navegador em que você abriu o Hub."].forEach(function (t) {
      passos.appendChild(el("li", "", t));
    });
    corpo.appendChild(passos);
    corpo.appendChild(el("p", "scanner__nota", "Nenhuma câmera foi ligada por esta tela."));
    const acoes = el("div", "scanner__acoes");
    acoes.appendChild(botao("Entendi", "botao--principal", fechar));
    corpo.appendChild(acoes);
  }

  function mostrarLendo() {
    limpar("lendo");
    focarTitulo("Aponte para o QR Code");
    const palco = el("div", "scanner__palco");
    video = document.createElement("video");
    video.className = "scanner__video";
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("aria-hidden", "true");
    palco.appendChild(video);
    const moldura = el("div", "scanner__moldura");
    moldura.setAttribute("aria-hidden", "true");
    palco.appendChild(moldura);
    corpo.appendChild(palco);
    const esperada = proximaEsperada();
    const estado = el("p", "scanner__texto", esperada === null
      ? "Aponte a câmera para o QR Code entregue pelo orientador."
      : "Aponte a câmera para o QR Code entregue pelo orientador (esperado: Estação " + doisDigitos(esperada) + "). A leitura é automática.");
    estado.setAttribute("role", "status");
    corpo.appendChild(estado);
    const acoes = el("div", "scanner__acoes");
    acoes.appendChild(botao("Cancelar", "", fechar));
    corpo.appendChild(acoes);
  }

  const MENSAGENS_ERRO = {
    negada: ["Permissão da câmera negada", "Sem a câmera não dá para ler o código aqui. Libere a câmera para este site nas configurações do navegador e tente de novo. Se preferir, use o app Câmera do celular: o QR Code abre o link do OdisseIA."],
    indisponivel: ["Nenhuma câmera encontrada", "Este aparelho não tem uma câmera disponível para o navegador. Use o app Câmera de outro aparelho ou peça ajuda a um orientador."],
    ocupada: ["A câmera está em uso", "Outro aplicativo ou aba está usando a câmera. Feche-o e tente de novo."],
    insegura: ["A câmera exige uma página segura", "O navegador só libera a câmera em páginas HTTPS. Abra o OdisseIA pelo endereço publicado, ou use o app Câmera do celular."],
    generico: ["Não foi possível abrir a câmera", "Algo impediu o acesso à câmera. Tente de novo ou use o app Câmera do celular."]
  };

  function mostrarErro(tipo) {
    limpar("erro");
    const dados = MENSAGENS_ERRO[tipo] || MENSAGENS_ERRO.generico;
    focarTitulo(dados[0]);
    corpo.appendChild(el("p", "scanner__texto", dados[1]));
    const acoes = el("div", "scanner__acoes");
    if (tipo !== "insegura" && tipo !== "indisponivel") {
      acoes.appendChild(botao("Tentar novamente", "botao--principal", abrirCamera));
    }
    acoes.appendChild(botao("Fechar", "", fechar));
    corpo.appendChild(acoes);
  }

  // Câmera desligada porque a pessoa saiu da tela: a leitura precisa ser pedida de novo.
  function mostrarPausada() {
    mostrarErro("generico");
    focarTitulo("Câmera desligada");
    corpo.querySelector(".scanner__texto").textContent = "A câmera foi desligada porque você saiu desta tela. Toque em tentar novamente para continuar.";
  }

  function mostrarResultado(resultado, numero) {
    limpar("resultado-" + resultado);
    const acoes = el("div", "scanner__acoes");
    const ultima = obterProgresso().ultimaEstacaoDesbloqueada;
    const total = OdisseIAConfig.totalEstacoes;
    const nome = numero === null ? "" : "Estação " + doisDigitos(numero);

    if (resultado === "sucesso" || resultado === "repetido") {
      focarTitulo(resultado === "sucesso" ? nome + " liberada" : nome + " já estava liberada");
      let texto;
      if (resultado === "repetido") {
        texto = "O conteúdo digital da " + nome + " já está disponível neste navegador. Nada mudou no seu progresso.";
      } else if (numero < total) {
        texto = "O conteúdo digital da " + nome + " está disponível. Para liberar a próxima, termine a Estação " + doisDigitos(numero + 1) + " na feira e receba o QR Code com o orientador.";
      } else {
        texto = "Jornada concluída: as quatro estações foram liberadas e o X-B0T está desbloqueado na Conclusão.";
      }
      corpo.appendChild(el("p", "scanner__texto", texto));
      corpo.appendChild(el("p", "scanner__progresso", "Progresso: " + ultima + "/" + total));
      acoes.appendChild(link("Ver conteúdo da " + nome, "estacao-" + numero + ".html", "botao--principal"));
      if (numero === total && ultima === total) {
        acoes.appendChild(link("Ver a Conclusão", "final.html", ""));
      }
      acoes.appendChild(link("Voltar ao Hub", "hub.html", ""));
    } else if (resultado === "fora-de-ordem") {
      const faltando = ultima + 1;
      focarTitulo("QR Code fora de ordem");
      corpo.appendChild(el("p", "scanner__texto", "Este é o QR Code da " + nome + ", mas a próxima estação a liberar é a " + doisDigitos(faltando) + ". Termine a Estação " + doisDigitos(faltando) + " na feira e use o QR Code que o orientador entregar. Nada mudou no seu progresso."));
      corpo.appendChild(el("p", "scanner__nota", "Já liberou estações antes e o progresso não aparece? Abra o site no mesmo navegador em que abriu o Hub."));
      acoes.appendChild(botao("Escanear outro QR Code", "botao--principal", mostrarIntro));
      acoes.appendChild(botao("Fechar", "", fechar));
    } else if (resultado === "erro-armazenamento") {
      focarTitulo("Progresso não salvo");
      corpo.appendChild(el("p", "scanner__texto", "Não foi possível salvar o progresso neste navegador. Abra o site no navegador principal do aparelho e tente de novo."));
      acoes.appendChild(botao("Tentar novamente", "botao--principal", mostrarIntro));
      acoes.appendChild(botao("Fechar", "", fechar));
    } else {
      focarTitulo("QR Code inválido");
      corpo.appendChild(el("p", "scanner__texto", "Este não é um QR Code de estação do OdisseIA, então nada foi aberto nem alterado. Use o código entregue pelo orientador."));
      acoes.appendChild(botao("Tentar novamente", "botao--principal", mostrarIntro));
      acoes.appendChild(botao("Fechar", "", fechar));
    }
    corpo.appendChild(acoes);
    corpo.setAttribute("data-resultado", resultado);
  }

  // ---------- Abrir e fechar ----------

  function abrir() {
    montarDialogo();
    houveValidacao = false;
    navegando = false;
    if (!dialogo.open) {
      if (typeof dialogo.showModal === "function") {
        dialogo.showModal();
      } else {
        dialogo.setAttribute("open", "");
      }
    }
    limpar("verificando");
    titulo.textContent = "Escanear QR Code";
    // Decide antes de mostrar qualquer botão se há como ler QR aqui. A câmera continua desligada.
    criarDecodificador().then(function (d) {
      decodificador = d;
      if (!dialogo.open) {
        return;
      }
      if (d === null && proximaEsperada() !== null) {
        mostrarSemSuporte();
      } else {
        mostrarIntro();
      }
    });
  }

  function fechar() {
    pararCamera();
    if (dialogo && dialogo.open) {
      if (typeof dialogo.close === "function") {
        dialogo.close();
      } else {
        dialogo.removeAttribute("open");
        aoFechar();
      }
    }
  }

  function aoFechar() {
    pararCamera();
    // Depois de liberar uma estação, a página que estava aberta (Hub, estação) é atualizada.
    if (houveValidacao && !navegando) {
      houveValidacao = false;
      window.location.reload();
    }
  }

  document.addEventListener("click", function (evento) {
    const gatilho = evento.target.closest ? evento.target.closest("[data-escanear]") : null;
    if (gatilho) {
      evento.preventDefault();
      abrir();
    }
  });

  // A câmera nunca fica ligada fora da tela do scanner.
  window.addEventListener("pagehide", pararCamera);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && fluxo) {
      pararCamera();
      if (dialogo && dialogo.open) {
        mostrarPausada();
      }
    }
  });

  // Voltando pelo histórico (bfcache) o diálogo não pode reaparecer com uma câmera morta.
  window.addEventListener("pageshow", function (evento) {
    if (evento.persisted && dialogo && dialogo.open) {
      pararCamera();
      mostrarIntro();
    }
  });

  window.OdisseIAScanner = {
    abrir: abrir,
    fechar: fechar,
    interpretarQr: interpretarQr,
    // Só para testes: substitui o decodificador (por exemplo em navegadores sem BarcodeDetector).
    _definirDecodificador: function (d) {
      criarDecodificador = function () { return Promise.resolve(d); };
    }
  };
})();
