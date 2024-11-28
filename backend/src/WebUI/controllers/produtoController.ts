import { Request, Response } from "express";
import Produto from "../../core/dominio/entidades/produto";
import { IAdicionarProduto } from "../../core/aplicacao/casosDeUso/produtos/interfaces/iAdicionarProduto";
import { IAlterarProduto } from "../../core/aplicacao/casosDeUso/produtos/interfaces/iAlterarProduto";
import { IObterTodosProdutos } from "../../core/aplicacao/casosDeUso/produtos/interfaces/iObterTodosProdutos";
import { IEliminarProduto } from "../../core/aplicacao/casosDeUso/produtos/interfaces/iEliminarProduto";

export class ProdutoController {
    constructor(
      private adicionarProduto: IAdicionarProduto,
      private alterarProduto: IAlterarProduto,
      private obterTodosProdutos: IObterTodosProdutos,
      private eliminarProduto: IEliminarProduto
    ) {}
  
    async adicionar(req: Request, res: Response): Promise<Response> {
      try {
        const { nome, estoque, preco, pedidos } = req.body;
        const produto = new Produto(0, nome, estoque, preco, pedidos);
        const novoProduto = await this.adicionarProduto.execute(produto);
        return res.status(201).json(novoProduto);
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        return res.status(500).json({ message: "Erro ao adicionar produto", error});
      }
    }
  
    async alterar(req: Request, res: Response): Promise<Response> {
      try {
        const { id, nome, estoque, preco, pedidos } = req.body;
        const produto = new Produto(id, nome, estoque, preco, pedidos);
        const produtoAlterado = await this.alterarProduto.execute(produto);
        return res.json(produtoAlterado);
      } catch (error) {
        console.error("Erro ao alterar produto:", error);
        return res.status(500).json({ message: "Erro ao alterar produto", error});
      }
    }
  
    async obterTodos(req: Request, res: Response): Promise<Response> {
      try {
        const produtos = await this.obterTodosProdutos.execute();
        return res.json(produtos);
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
        return res.status(500).json({ message: "Erro ao obter produtos", error });
      }
    }
  
    async eliminar(req: Request, res: Response): Promise<Response> {
      try {
        const { id } = req.params;
        await this.eliminarProduto.execute(Number(id));
        return res.status(204).send();
      } catch (error) {
        console.error("Erro ao eliminar produto:", error);
        return res.status(500).json({ message: "Erro ao eliminar produto", error});
      }
    }
}
