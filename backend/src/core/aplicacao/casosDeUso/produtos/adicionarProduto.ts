import Produto from "../../../dominio/entidades/produto";
import { IProdutoRepository } from "../../contratos/iProdutoRepository";
import { IAdicionarProduto } from "./interfaces/iAdicionarProduto";

export class AdicionarProduto implements IAdicionarProduto {
    constructor(private produtoRepository: IProdutoRepository) {}
  
    async execute(produto: Produto): Promise<Produto> {
      return this.produtoRepository.adicionar(produto);
    }
}