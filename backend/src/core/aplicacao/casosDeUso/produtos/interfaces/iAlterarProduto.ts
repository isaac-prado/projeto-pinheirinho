import Produto from "../../../../dominio/entidades/produto";

export interface IAlterarProduto {
    execute(produto: Produto): Promise<Produto>;
  }