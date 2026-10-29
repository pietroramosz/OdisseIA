// Validação dos QR Codes. Cada QR abre validar.html?estacao=N.
// Só esta página, ao receber um QR válido na ordem certa, aumenta o progresso.

const QR_PARAMETRO = "estacao";

function lerNumeroEstacaoDaUrl() {
  const valor = new URLSearchParams(window.location.search).get(QR_PARAMETRO);

  if (valor === null || !/^\d+$/.test(valor)) {
    return null;
  }

  const numero = Number(valor);

  if (numero < 1 || numero > OdisseIAConfig.totalEstacoes) {
    return null;
  }

  return numero;
}

function resultadoParaEstacao(numero) {
  const ultima = obterProgresso().ultimaEstacaoDesbloqueada;

  if (numero === ultima + 1) {
    return desbloquearProximaEstacao() ? "sucesso" : "erro-armazenamento";
  }

  if (numero <= ultima) {
    return "repetido";
  }

  return "fora-de-ordem";
}

function validarQrCode() {
  const numero = lerNumeroEstacaoDaUrl();

  if (numero === null) {
    return { resultado: "invalido", estacao: null };
  }

  return { resultado: resultadoParaEstacao(numero), estacao: numero };
}
