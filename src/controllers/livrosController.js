import * as livrosModel from "../models/livrosModel.js";

export async function listarLivros(req, res) {
    const livros = await livrosModel.listarTodos();
    res.json(livros);
}


export async function buscarLivro(req, res) {
    const id = Number(req.params.id);

    const livro = livros.find (livro => livro.id === id);

    if (!livro) {
        return res.status(404).json({ 
            message: "Livro não encontrado" });
    }
}


export async function cadastrarLivro(req, res) {
    const { nome, gênero } = req.body;

    const aluno = await alunosModel.criarLivro( {nome, gênero});

    res.status(201).json({
        message: "Livro cadastrado com sucesso",
        livro: novoLivro
    });
}
   
export function editarLivro(req, res) {
    const id = Number(req.params.id);
    const { nome, gênero } = req.body;

    const livro = livros.find((livro) => livro.id === id);
}

    //CONFERIR O CODIGO E COMPLETAR 
