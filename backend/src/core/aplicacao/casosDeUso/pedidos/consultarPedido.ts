import Pedido from "../../../dominio/entidades/pedido";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IConsultarPedido, PedidoConsulta } from "./interfaces/iConsultarPedido";

export class ConsultarPedido implements IConsultarPedido {
    constructor(private readonly clienteRepository: IClienteRepository) {}

    async executar(clienteCpf?: string, clienteNome?: string): Promise<PedidoConsulta[]> {
        if (!clienteCpf && !clienteNome) {
            throw new Error("É necessário fornecer o CPF ou o Nome do Cliente para consulta.");
        }

        const cliente = await this.clienteRepository.consultarCliente(clienteCpf, clienteNome);
        if (!cliente) {
            throw new Error("Cliente não encontrado.");
        }

        const pedidosConsulta: PedidoConsulta[] = cliente.pedidos.map((pedido: Pedido) => ({
            cliente: cliente.nome,
            data: pedido.data,
            produtos: pedido.produto.map(produto => produto.nome),
            valor: pedido.valor,
        }));

        return pedidosConsulta;
    }
}
