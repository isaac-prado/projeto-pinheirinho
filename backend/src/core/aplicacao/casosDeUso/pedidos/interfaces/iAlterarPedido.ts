import PedidoORM from "../../../../../infra/orm/entidades/PedidoORM";
import Pedido from "../../../../dominio/entidades/pedido";

export interface IAlterarPedido {
    executar(id: number, pedidoData: Partial<Pedido>): Promise<PedidoORM>;
}