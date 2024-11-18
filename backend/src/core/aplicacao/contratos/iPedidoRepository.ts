import Pedido from "../../dominio/entidades/pedido";

export interface IPedidoRepository {
    adicionarPedido(pedido: Pedido): Promise<void>;
    consultarPedidosPorCliente(clienteCpf: string): Promise<Pedido[]>;
    consultarPedidoPorId(pedidoId: string): Promise<Pedido | null>;
    removerPedido(pedidoId: string): Promise<void>;
}
