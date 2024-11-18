import Pedido from "../../../dominio/entidades/pedido";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { IConsultarPedido, PedidoConsulta } from "./interfaces/iConsultarPedido";

export class ConsultarPedido implements IConsultarPedido {
    constructor(private readonly pedidoRepository: IPedidoRepository) {}

    async executar(clienteCpf?: string): Promise<PedidoConsulta[]> {
        if (!clienteCpf) {
            throw new Error("É necessário fornecer o CPF ou o Nome do Cliente para consulta.");
        }

        const pedidos = await this.pedidoRepository.consultarPedidosPorCliente(clienteCpf);
        if(!pedidos || pedidos.length === 0) {
            throw new Error("Nenhum pedido encontrado para o cliente informado")
        }

        const pedidosConsulta: PedidoConsulta[] = pedidos.map((pedido: Pedido) => ({
            cliente: pedido.cliente.nome,
            data: pedido.data,
            produtos: pedido.produto.map(produto => produto.nome),
            valor: pedido.valor,
        }));
        return pedidosConsulta;
    }
}
