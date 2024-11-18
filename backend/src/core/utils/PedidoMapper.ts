import Pedido from "../dominio/entidades/pedido";
import PedidoORM from "../../infra/orm/entidades/PedidoORM";
import { ProdutoMapper } from "./ProdutoMapper"
import { ClienteMapper } from "./ClienteMapper";

export class PedidoMapper {
    static toDomain(pedidoORM: PedidoORM): Pedido {
        return new Pedido(
            pedidoORM.id,
            pedidoORM.data,
            pedidoORM.valor,
            pedidoORM.produtos.map(produtoOrm => ProdutoMapper.toDomain(produtoOrm)),
            ClienteMapper.toDomain(pedidoORM.cliente)
        );
    }

    static toPersistence(pedido: Pedido): PedidoORM {
        const pedidoORM = new PedidoORM();
        pedidoORM.id = pedido.id;
        pedidoORM.data = pedido.data;
        pedidoORM.valor = pedido.valor;
        pedidoORM.produtos = pedido.produtos.map(produto => ProdutoMapper.toPersistence(produto));
        pedidoORM.cliente = ClienteMapper.toPersistence(pedido.cliente);
        return pedidoORM;
    }
}
