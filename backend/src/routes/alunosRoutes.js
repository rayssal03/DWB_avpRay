import express from "express";
import autenticar from "../middlewares/autenticar.js";
import {
  buscarAluno,
  cadastrarAluno,
  editarAluno,
  listarAlunos,
  removerAluno
} from "../controllers/alunosController.js";

const router = express.Router();

/**
 * @swagger
 * /alunos:
 *  get:
 *    summary: Lista todos os alunos
 *    description: Retorna a lista completa de alunos cadastrados no sistema. Rota pública, não precisa de token.
 *    tags:
 *      - Alunos
 *    responses:
 *      200:
 *        description: Lista de alunos retornada com sucesso
 *        content:
 *          application/json:
 *            example:
 *              - id: 1
 *                nome: Augusto
 *                turma: 2TIB
 *              - id: 2
 *                nome: Gustavo
 *                turma: 2TIB
 */

router.get("/", listarAlunos);

/**
 * @swagger
 * /alunos/{id}:
 *  get:
 *    summary: Busca um aluno pelo ID
 *    description: Retorna os dados de um único aluno, de acordo com o ID informado na URL. Rota pública, não precisa de token.
 *    tags:
 *      - Alunos
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: ID do aluno que será buscado
 *    responses:
 *      200:
 *        description: Aluno encontrado com sucesso
 *        content:
 *          application/json:
 *            example:
 *              id: 1
 *              nome: Augusto
 *              turma: 2TIB
 *      404:
 *        description: Aluno não encontrado
 *        content:
 *          application/json:
 *            example:
 *              message: Aluno não encontrado
 */

router.get("/:id", buscarAluno);

/**
 * @swagger
 * /alunos:
 *  post:
 *    summary: Cadastra um novo aluno
 *    description: Cria um novo aluno no sistema. É preciso enviar o token de autenticação no header Authorization.
 *    tags:
 *      - Alunos
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            nome: Ana Souza
 *            turma: 2TIB
 *    responses:
 *      201:
 *        description: Aluno cadastrado com sucesso
 *        content:
 *          application/json:
 *            example:
 *              mensagem: Aluno cadastrado com sucesso
 *              aluno:
 *                id: 9
 *                nome: Ana Souza
 *                turma: 2TIB
 *      401:
 *        description: Token ausente ou inválido
 *        content:
 *          application/json:
 *            example:
 *              erro: Acesso não autorizado. Token ausente ou inválido
 */

router.post("/", autenticar, cadastrarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *  patch:
 *    summary: Atualiza parcialmente um aluno
 *    description: Atualiza um ou mais campos de um aluno já existente. É preciso enviar o token de autenticação no header Authorization.
 *    tags:
 *      - Alunos
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: ID do aluno que será atualizado
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            turma: 2TIA
 *    responses:
 *      200:
 *        description: Aluno atualizado com sucesso
 *        content:
 *          application/json:
 *            example:
 *              id: 1
 *              nome: Augusto
 *              turma: 2TIA
 *      401:
 *        description: Token ausente ou inválido
 *        content:
 *          application/json:
 *            example:
 *              erro: Acesso não autorizado. Token ausente ou inválido
 *      404:
 *        description: Aluno não encontrado
 *        content:
 *          application/json:
 *            example:
 *              message: Aluno não encontrado
 */

router.patch("/:id", autenticar, editarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *  delete:
 *    summary: Remove um aluno
 *    description: Exclui um aluno do sistema a partir do ID informado. É preciso enviar o token de autenticação no header Authorization.
 *    tags:
 *      - Alunos
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: ID do aluno que será removido
 *    responses:
 *      200:
 *        description: Aluno removido com sucesso
 *        content:
 *          application/json:
 *            example:
 *              message: Aluno removido com sucesso
 *      401:
 *        description: Token ausente ou inválido
 *        content:
 *          application/json:
 *            example:
 *              erro: Acesso não autorizado. Token ausente ou inválido
 *      404:
 *        description: Aluno não encontrado
 *        content:
 *          application/json:
 *            example:
 *              message: Aluno não encontrado
 */

router.delete("/:id", autenticar, removerAluno);

export default router;
