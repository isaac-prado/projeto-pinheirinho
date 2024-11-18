export interface IRemoverPedido {
    executar(cpf: string, pedidoId: number): Promise<void>;
}
