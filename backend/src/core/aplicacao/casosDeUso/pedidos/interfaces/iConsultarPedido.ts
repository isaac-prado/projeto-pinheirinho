export interface PedidoConsulta {
    cliente: string;
    data: Date;
    produtos: string[];
    valor: number;
}

export interface IConsultarPedido {
    executar(clienteCpf?: string, clienteNome?: string): Promise<PedidoConsulta[]>;
}
