import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });

function validarCliente() {
  // Entrada de dados
  var nome = prompt("Digite o nome do cliente (pelo menos 5 caracteres):");
  var cpf = prompt("Digite o CPF do cliente (exatamente 11 dígitos):");
  var dataNascimento = prompt("Digite a data de nascimento do cliente (no formato DD/MM/AAAA):");
  var rendaMensal = prompt("Digite a renda mensal do cliente:");
  var estadoCivil = prompt("Digite o estado civil do cliente (C, S, V ou D):");
  var dependentes = prompt("Digite o número de dependentes do cliente (0 a 10):");

  // Validação dos campos
  if (nome.length < 5) {
    console.log("Erro: O nome deve ter pelo menos 5 caracteres.");
    validarCliente()
    return;
  }

  if (cpf.length !== 11 || isNaN(cpf)) {
    console.log("Erro: O CPF deve ter exatamente 11 dígitos numéricos.");
    validarCliente()
    return;
  }

  var dataNascimentoParts = dataNascimento.split("/");
  var dia = parseInt(dataNascimentoParts[0]);
  var mes = parseInt(dataNascimentoParts[1]) - 1; 
  var ano = parseInt(dataNascimentoParts[2]);
  var dataNascimentoObj = new Date(ano, mes, dia);
  var dataAtual = new Date();

  if (isNaN(dataNascimentoObj) || dataNascimentoObj >= dataAtual) {
    console.log("Erro: A data de nascimento deve estar no formato DD/MM/AAAA e ser anterior à data atual.");
    validarCliente()
    return;
  }

  var idade = calcularIdade(dataNascimentoObj, dataAtual);
  if (idade < 18) {
    console.log("Erro: O cliente deve ter pelo menos 18 anos.");
    validarCliente()
    return;
  }

  var renda = parseFloat(rendaMensal.replace(",", "."));
  if (isNaN(renda) || renda < 0) {
    console.log("Erro: A renda mensal deve ser um valor numérico maior ou igual a zero.");
    validarCliente()
    return;
  }

  if (!/^C$|^S$|^V$|^D$/i.test(estadoCivil)) {
    console.log("Erro: O estado civil deve ser C, S, V ou D.");
    validarCliente()
    return;
  }

  var numDependentes = parseInt(dependentes);
  if (isNaN(numDependentes) || numDependentes < 0 || numDependentes > 10) {
    console.log("Erro: O número de dependentes deve ser um valor numérico entre 0 e 10.");
    validarCliente()
    return;
  }

  var cpfFormatado = formatarCPF(cpf);
  var dataNascimentoFormatada = formatarData(dataNascimentoObj);

  console.log("Dados do cliente:");
  console.log("Nome: " + nome);
  console.log("CPF: " + cpfFormatado);
  console.log("Data de Nascimento: " + dataNascimentoFormatada);
  console.log("Renda Mensal: " + renda.toFixed(2));
  console.log("Estado Civil: " + estadoCivil.toUpperCase());
  console.log("Dependentes: " + numDependentes);
}

function calcularIdade(dataNascimento, dataAtual) {
  var diffAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
  var diffMeses = dataAtual.getMonth() - dataNascimento.getMonth();
  var diffDias = dataAtual.getDate() - dataNascimento.getDate();

  if (diffMeses < 0 || (diffMeses === 0 && diffDias < 0)) {
    diffAnos--;
  }

  return diffAnos;
}

function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarData(data) {
  var dia = adicionarZeroEsquerda(data.getDate());
  var mes = adicionarZeroEsquerda(data.getMonth() + 1);
  var ano = data.getFullYear();
  return dia + "/" + mes + "/" + ano;
}

function adicionarZeroEsquerda(valor) {
  return valor < 10 ? "0" + valor : valor;
}

// Executar a função para validar o cliente
validarCliente();
