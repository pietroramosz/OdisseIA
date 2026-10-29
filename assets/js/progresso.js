// Responsável pelo controle do progresso do visitante entre as estações.
// O progresso é guardado no localStorage como um único número: a última
// estação desbloqueada. Tudo o que depende disso (estação X está
// desbloqueada? qual a próxima? a jornada terminou?) é calculado a partir
// desse número, nunca salvo separadamente.

const PROGRESSO_CHAVE = "odisseia:progresso";
const PROGRESSO_VERSAO = 1;

function progressoEstadoInicial() {
  return {
    versao: PROGRESSO_VERSAO,
    ultimaEstacaoDesbloqueada: 0
  };
}

function obterProgresso() {
  try {
    const bruto = localStorage.getItem(PROGRESSO_CHAVE);

    if (!bruto) {
      return progressoEstadoInicial();
    }

    const dado = JSON.parse(bruto);

    const valido =
      dado &&
      dado.versao === PROGRESSO_VERSAO &&
      Number.isInteger(dado.ultimaEstacaoDesbloqueada) &&
      dado.ultimaEstacaoDesbloqueada >= 0 &&
      dado.ultimaEstacaoDesbloqueada <= OdisseIAConfig.totalEstacoes;

    if (!valido) {
      return progressoEstadoInicial();
    }

    return dado;
  } catch (erro) {
    return progressoEstadoInicial();
  }
}

function salvarProgresso(progresso) {
  try {
    localStorage.setItem(PROGRESSO_CHAVE, JSON.stringify(progresso));
    return true;
  } catch (erro) {
    return false;
  }
}

function estacaoDesbloqueada(numeroEstacao) {
  const progresso = obterProgresso();
  return numeroEstacao <= progresso.ultimaEstacaoDesbloqueada;
}

function desbloquearProximaEstacao() {
  const progresso = obterProgresso();

  if (progresso.ultimaEstacaoDesbloqueada >= OdisseIAConfig.totalEstacoes) {
    return false;
  }

  progresso.ultimaEstacaoDesbloqueada += 1;
  return salvarProgresso(progresso);
}

function jornadaCompleta() {
  const progresso = obterProgresso();
  return progresso.ultimaEstacaoDesbloqueada === OdisseIAConfig.totalEstacoes;
}

function resetarProgresso() {
  const progresso = progressoEstadoInicial();
  salvarProgresso(progresso);
  return progresso;
}
