export interface PedidoConsulta {
    cliente: string;
    data: Date;
    valor: number;
}

export interface IConsultarPedido {
    executar(clienteCpf?: string, clienteNome?: string): Promise<PedidoConsulta[]>;
}
