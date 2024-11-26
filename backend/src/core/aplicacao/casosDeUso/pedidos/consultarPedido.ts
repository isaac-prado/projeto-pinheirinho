import PedidoORM from "../../../../infra/orm/entidades/PedidoORM";
import Pedido from "../../../dominio/entidades/pedido";
import { PedidoMapper } from "../../../utils/PedidoMapper";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { PedidoConsulta } from "../../models/pedidoConsulta";
import { IConsultarPedido } from "./interfaces/iConsultarPedido";

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

        const pedidosConsulta: PedidoConsulta[] = pedidos.map((pedidoORM: PedidoORM) => {
            const pedidoDomain = PedidoMapper.toDomain(pedidoORM);
            return {
                cliente: pedidoDomain.cliente.nome,
                data: pedidoDomain.data,
                valor: pedidoDomain.valor,
            };
        });


        return pedidosConsulta;
    }
}
