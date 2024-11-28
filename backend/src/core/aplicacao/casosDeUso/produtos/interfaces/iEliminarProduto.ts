import Produto from "../../../../dominio/entidades/produto";

export interface IEliminarProduto {
    execute(id: number): Promise<void>;
}