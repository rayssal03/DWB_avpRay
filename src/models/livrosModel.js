import prisma from "../config/prisma.js";

export function criarLivro(nome, gênero) {
  return prisma.livro.create({
    data: {
      nome,
      gênero
    }
  });
}

export function listarLivros() {
  return prisma.livro.findMany({
    orderBy: {
      id: "asc"
    }
  });
}
  
export function listarLivroPorId(id) {
  return prisma.livro.findUnique({
    where: {
      id
    }
  });
}