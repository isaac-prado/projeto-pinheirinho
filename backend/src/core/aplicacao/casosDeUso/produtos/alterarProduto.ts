import Produto from "../../../dominio/entidades/produto";
import { IProdutoRepository } from "../../contratos/iProdutoRepository";
import { IAlterarProduto } from "./interfaces/iAlterarProduto";

export class AlterarProduto implements IAlterarProduto {
    constructor(private produtoRepository: IProdutoRepository) {}
  
    async execute(produto: Produto): Promise<Produto> {
      return this.produtoRepository.alterar(produto);
    }
}