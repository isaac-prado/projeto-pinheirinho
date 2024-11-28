import Produto from "../../../dominio/entidades/produto";
import { IProdutoRepository } from "../../contratos/iProdutoRepository";
import { IObterTodosProdutos } from "./interfaces/iObterTodosProdutos";

export class ObterTodosProdutos implements IObterTodosProdutos {
    constructor(private produtoRepository: IProdutoRepository) {}
  
    async execute(): Promise<Produto[]> {
      return this.produtoRepository.obterTodos();
    }
}