import Produto from "../../../../dominio/entidades/produto";

export interface IObterTodosProdutos {
    execute(): Promise<Produto[]>;
}