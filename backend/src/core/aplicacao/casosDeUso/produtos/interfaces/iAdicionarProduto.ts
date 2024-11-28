import Produto from "../../../../dominio/entidades/produto";

export interface IAdicionarProduto {
    execute(produto: Produto): Promise<Produto>;
}