import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });

class Aluno {
  constructor(matricula, nome) {
    this.matricula = matricula;
    this.nome = nome;
    this.p1 = undefined;
    this.p2 = undefined;
  }
}

class Turma {
  constructor() {
    this.alunos = [];
  }

  inserirAluno(matricula, nome) {
    const alunoExistente = this.alunos.find((aluno)=> aluno.matricula === matricula)
    if (alunoExistente !== undefined) {
      console.log('Já existe um aluno com essa matrícula.');
      return;
    }
  
    const novoAluno = new Aluno(matricula, nome);
    this.alunos.push(novoAluno);
    console.log(`Aluno ${novoAluno.nome} inserido na turma.`);
  }

  removerAluno(matricula) {
    const index = this.alunos.findIndex((aluno) => aluno.matricula === matricula);
    if (index === -1) {
      console.log('Não existe nenhum aluno com essa matrícula.');
      return;
    }

    const alunoRemovido = this.alunos.splice(index, 1)[0];
    console.log(`Aluno ${alunoRemovido.nome} removido da turma.`);
  }

  lancarNota(matricula, prova, nota) {
    const aluno = this.alunos.find((aluno) => aluno.matricula === matricula);
    if (!aluno) {
      console.log('Não existe nenhum aluno com essa matrícula.');
      return;
    }

    if (prova.toUpperCase() === 'P1') {
      aluno.p1 = nota;
    } else if (prova.toUpperCase() === 'P2') {
      aluno.p2 = nota;
    } else {
      console.log('Prova inválida. Use "P1" ou "P2".');
      return;
    }

    console.log(`Nota ${prova} lançada para o aluno ${aluno.nome}.`);
  }

  imprimirAlunos() {
    const alunosOrdenados = this.alunos.sort((a, b) => a.nome.localeCompare(b.nome));

    console.log('Alunos da Turma:');
    for (const aluno of alunosOrdenados) {
      const notaFinal = this.calcularNotaFinal(aluno);
      console.log(`${aluno.matricula} - ${aluno.nome}: NF = ${notaFinal}`);
    }
  }

  calcularNotaFinal(aluno) {
    if (aluno.p1 !== undefined && aluno.p2 !== undefined) {
      return ((aluno.p1 + aluno.p2) / 2).toFixed(1);
    } else if (aluno.p1 !== undefined) {
      return (aluno.p1 / 2).toFixed(1);
    } else if (aluno.p2 !== undefined) {
      return (aluno.p2 / 2).toFixed(1);
    } else {
      return ' - ';
    }
  }
}

const turma = new Turma();

let opcao = 0

do {
  console.log('1 - Inserir aluno');
  console.log('2 - Remover aluno');
  console.log('3 - Lançar nota');
  console.log('4 - Imprimir alunos');
  console.log('5 - Sair');
  opcao = prompt('Digite a opção desejada: ');

  switch (opcao) {
    case '1':
      const matricula = prompt('Digite a matrícula do aluno: ');
      const nome = prompt('Digite o nome do aluno: ');
      turma.inserirAluno(matricula, nome);
      break;
    
    case '2':
      const matriculaRemover = prompt('Digite a matrícula do aluno: ');
      turma.removerAluno(matriculaRemover);
      break;

    case '3':
      const matriculaNota = prompt('Digite a matrícula do aluno: ');
      const prova = prompt('Digite a prova (P1 ou P2): ');
      const nota = parseFloat(prompt('Digite a nota: ').replace(',', '.'));
      turma.lancarNota(matriculaNota, prova, nota);
      break;

    case '4':
      turma.imprimirAlunos();
      break;
    
    case '5':
      console.log('Saindo...');
      break;
  } 
}
while (opcao !== '5');