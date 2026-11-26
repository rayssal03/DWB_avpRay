import * as alunosModel from "../models/alunosModel.js";

export async function listarAlunos(req, res) {
  const alunos = await alunosModel.listarTodos();

  res.json(alunos);
}

export function buscarAluno(req, res) {
  const id = Number(req.params.id);

  const aluno = alunos.find((aluno) => aluno.id === id);

  if (!aluno) {
    return res.status(404).json({
      message: "Aluno não encontrado"
    });
  }

  res.json(aluno);
}

export async function cadastrarAluno(req, res) {
  const { nome, turma } = req.body;

  const aluno = await alunosModel.criar({
    nome,
    turma
  });

  res.status(201).json({
    mensagem: "Aluno cadastrado com sucesso",
    aluno
  });
}

export function editarAluno(req, res) {
  const id = Number(req.params.id);
  const { nome, turma } = req.body;

  const aluno = alunos.find((aluno) => aluno.id === id);

  if (!aluno) {
    return res.status(404).json({
      message: "Aluno não encontrado"
    });
  }

  if (nome) {
    aluno.nome = nome;
  }

  if (turma) {
    aluno.turma = turma;
  }

  res.json(aluno);
}

export function removerAluno(req, res) {
  const id = Number(req.params.id);

  const alunoIndex = alunos.findIndex((aluno) => aluno.id === id);

  if (alunoIndex === -1) {
    return res.status(404).json({
      message: "Aluno não encontrado"
    });
  }

  alunos.splice(alunoIndex, 1);

  res.json({
    message: "Aluno removido com sucesso"
  });
}
