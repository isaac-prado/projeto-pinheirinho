import Produto from "../dominio/entidades/produto";
import ProdutoORM from "../../infra/orm/entidades/ProdutoORM";
import { PedidoMapper } from "./PedidoMapper";

export class ProdutoMapper {
    static toDomain(produtoORM: ProdutoORM): Produto {
        return new Produto(
            produtoORM.id,
            produtoORM.nome,
            produtoORM.estoque,
            produtoORM.preco,
            produtoORM.pedidos.map(pedidoORM => PedidoMapper.toDomain(pedidoORM))
        );
    }

    static toPersistence(produto: Produto): ProdutoORM {
        const produtoORM = new ProdutoORM();
        produtoORM.id = produto.id;
        produtoORM.nome = produto.nome;
        produtoORM.estoque = produto.estoque;
        produtoORM.preco = produto.preco;
        produtoORM.pedidos = produto.pedidos.map(pedido => PedidoMapper.toPersistence(pedido));
        return produtoORM;
    }
}
