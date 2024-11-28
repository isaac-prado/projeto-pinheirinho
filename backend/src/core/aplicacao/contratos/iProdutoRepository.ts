import Produto from "../../dominio/entidades/produto";

export interface IProdutoRepository {
    adicionar(produto: Produto): Promise<Produto>;
    alterar(produto: Produto): Promise<Produto>;
    obterTodos(): Promise<Produto[]>;
    eliminar(id: number): Promise<void>;
}