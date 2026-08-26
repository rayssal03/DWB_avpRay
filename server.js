import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const livros = [
  { id: 1, nome: "O Senhor dos Anéis ", gênero: "Fantasia" },
  { id: 2, nome: "Um Conto de Duas Cidades", gênero: "Romance" },
  { id: 3, nome: "O Pequeno Príncipe", gênero: "Literatura Infantil" },
  { id: 4, nome: "E Não Sobrou Nenhum", gênero: "Suspense" },
  { id: 5, nome: "O Diário de Anne Frank", gênero: "Biografia" },
  { id: 6, nome: "A Divina Comédia", gênero: "Poesia" },
  { id: 7, nome: "Duna", gênero: "Ficção Científica" },
  { id: 8, nome: "Admirável Mundo Novo ", gênero: "Distopia" }
];

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

app.get("/livros", (req, res) => {
  res.json(livros);
});

app.get("/livros/:id", (req, res) => {
  const id = Number(req.params.id);

  const livro = livros.find((livro) => livro.id === id);

  if (!livro) {
    return res.status(404).json({
      message: "Livro não encontrado"
    });
  }

  res.json(livro );
});

app.post("/livros", (req, res) => {
  const novoLivro = {
    id: livros.length + 1,
    nome: req.body.nome,
    gênero: req.body.gênero
  };

  livros.push(novoLivro);

  res.status(201).json({
    mensagem: "Livro cadastrado com sucesso",
    livro: novoLivro
  });
});


app.patch("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, gênero } = req.body;

  const livro = livros.find((livro) => livro.id === id);

  if (!livro) {
    return res.status(404).json({
      message: "Livro não encontrado"
    });
  }

  if (nome) {
    livro.nome = nome;
  }

  if (gênero) {
    livro.gênero = gênero;
  }


  res.json(livro );
});

app.delete("/livros/:id", (req, res) => {
  const id = Number(req.params.id);

  const livroIndex = livros.findIndex((livro) => livro.id === id);

  if (livroIndex === -1) {
    return res.status(404).json({
      message: "Livro não encontrado"
    });
  }

  livros.splice(livroIndex, 1);

  res.json({
    message: "Livro removido com sucesso"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
