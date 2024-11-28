import PedidoORM from "../../../infra/orm/entidades/PedidoORM";
import Pedido from "../../dominio/entidades/pedido";

export interface IPedidoRepository {
    adicionarPedido(cpf: string, pedido: Pedido): Promise<void>;
    consultarPedidosPorCliente(clienteCpf: string): Promise<PedidoORM[]>;
    consultarPedidoPorId(pedidoId: number): Promise<PedidoORM>;
    removerPedido(pedidoId: number): Promise<void>;
    listarTodosPedidos(): Promise<PedidoORM[]>;
    alterarPedido(pedido: Pedido): Promise<PedidoORM>;
}
