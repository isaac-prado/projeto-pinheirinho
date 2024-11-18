export interface IRemoverPedido {
    executar(pedidoId: number): Promise<void>;
}
