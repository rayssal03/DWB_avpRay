import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import livrosRoutes from "./src/routes/livrosRoutes.js";
import prisma from "./src/config/prisma.js";

const app = express();
const port = 3000;

app.use(express.json());


let proximoId = 9;

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

// LISTAR TODOS OS LIVROS
app.get("/livros", (req, res) => {
  res.json(livros);
});

// CONSULTAR LIVRO POR ID
app.get("/livros/:id", (req, res) => {
  const id = Number(req.params.id);

  const livro = livros.find((livro) => livro.id === id);

  if (!livro) {
    return res.status(404).json({
      mensagem: "Livro não encontrado"
    });
  }

  res.json(livro);
});

// CADASTRAR LIVRO
app.post("/livros", (req, res) => {
  const { nome, gênero } = req.body;

  if (!nome || !gênero) {
    return res.status(400).json({
      mensagem: "Nome e gênero são obrigatórios"
    });
  }

  const novoLivro = {
    id: proximoId++,
    nome,
    gênero
  };

  livros.push(novoLivro);

  res.status(201).json({
    mensagem: "Livro cadastrado com sucesso",
    livro: novoLivro
  });
});

// EDITAR LIVRO
app.put("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, gênero } = req.body;

  const livro = livros.find((livro) => livro.id === id);

  if (!livro) {
    return res.status(404).json({
      mensagem: "Livro não encontrado"
    });
  }

  if (nome) {
    livro.nome = nome;
  }

  if (gênero) {
    livro.gênero = gênero;
  }

  res.json({
    mensagem: "Livro atualizado com sucesso",
    livro
  });
});

// EXCLUIR LIVRO
app.delete("/livros/:id", (req, res) => {
  const id = Number(req.params.id);

  const livroIndex = livros.findIndex((livro) => livro.id === id);

  if (livroIndex === -1) {
    return res.status(404).json({
      mensagem: "Livro não encontrado"
    });
  }

  livros.splice(livroIndex, 1);

  res.json({
    mensagem: "Livro removido com sucesso"
  });
});

// INICIAR SERVIDOR
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Livros",
      version: "1.0.0",
      description: "API para gerenciamento de livros"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer SEU_TOKEN"
        }
      }
    }
  },
  apis: ["./server.js"]
};

try {
  await prisma.$connect();
  console.log("Conetado ao banco de dados.");

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
} catch (error) {
  console.error("Erro ao conectar ao banco de dados:", error.message);

  await prisma.$disconnect();
  process.exitCode = 1;
}

/**
* @swagger
* /alunos:
* get:
* summary: Lista todos os alunos
* description: Retorna a lista de alunos cadastrados no sistema.
* tags:
* - Alunos
* responses:
* 200:
* description: Lista de alunos retornada com sucesso
* content:
* application/json:
* example:
* - id: 1
* nome: Ana Souza
* turma: 2º TI
*/