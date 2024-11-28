import { Router } from "express";
import { ProdutoControllerBuilder } from "../builders/produtoControllerBuilder";
const rotaBaseCliente: string = "/produto";

const produtoRouter = Router();
const produtoController = ProdutoControllerBuilder();

produtoRouter.post(rotaBaseCliente, (req, res) => produtoController.adicionar(req, res));
produtoRouter.put(rotaBaseCliente, (req, res) => produtoController.alterar(req, res));
produtoRouter.get(rotaBaseCliente, (req, res) => produtoController.obterTodos(req, res));
produtoRouter.delete(`${rotaBaseCliente}/:id`, (req, res) => produtoController.eliminar(req, res));

export default produtoRouter