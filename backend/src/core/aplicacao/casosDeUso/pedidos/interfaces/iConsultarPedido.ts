import { PedidoConsulta } from "../../../models/pedidoConsulta";

export interface IConsultarPedido {
    executar(clienteCpf?: string, clienteNome?: string): Promise<PedidoConsulta[]>;
}
