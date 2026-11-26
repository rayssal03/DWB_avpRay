import prisma from "../config/prisma.js";

export function criarAluno({ nome, turma }) {
  return prisma.aluno.create({
    data: {
      nome,
      turma
    }
  });
}

export function listarTodos() {
  return prisma.aluno.findMany({
    orderBy: {
      id: "asc"
    }
  });
}

export function listarAlunoPorId() {}

export function editarAluno() {}

export function excluirAluno() {}
