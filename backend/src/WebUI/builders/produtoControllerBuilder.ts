import { ProdutoRepository } from "../../infra/sql/implementacoes/produtoRepository";
import { AdicionarProduto } from "../../core/aplicacao/casosDeUso/produtos/adicionarProduto";
import { AlterarProduto } from "../../core/aplicacao/casosDeUso/produtos/alterarProduto";
import { ObterTodosProdutos } from "../../core/aplicacao/casosDeUso/produtos/obterTodosProdutos";
import { EliminarProduto } from "../../core/aplicacao/casosDeUso/produtos/eliminarProduto";
import { ProdutoController } from "../controllers/produtoController";

export const ProdutoControllerBuilder = () => {
    const repository = new ProdutoRepository();
    const adicionarProduto = new AdicionarProduto(repository);
    const alterarProduto = new AlterarProduto(repository);
    const obterTodosProdutos = new ObterTodosProdutos(repository);
    const eliminarProduto = new EliminarProduto(repository);
  
    return new ProdutoController(
      adicionarProduto,
      alterarProduto,
      obterTodosProdutos,
      eliminarProduto
    );
};