import Produto from "../../../dominio/entidades/produto";
import { IProdutoRepository } from "../../contratos/iProdutoRepository";
import { IEliminarProduto } from "./interfaces/iEliminarProduto";

export class EliminarProduto implements IEliminarProduto {
    constructor(private produtoRepository: IProdutoRepository) {}
  
    async execute(id: number): Promise<void> {
      await this.produtoRepository.eliminar(id);
    }
}