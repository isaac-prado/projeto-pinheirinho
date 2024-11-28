import PedidoORM from "../../../../infra/orm/entidades/PedidoORM";
import Pedido from "../../../dominio/entidades/pedido";
import { PedidoMapper } from "../../../utils/PedidoMapper";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { IAlterarPedido } from "./interfaces/iAlterarPedido";

export class AlterarPedido implements IAlterarPedido {
    constructor(private readonly pedidoRepository: IPedidoRepository) {}

    async executar(id: number, pedidoData: Partial<Pedido>): Promise<PedidoORM> {
        const pedido = await this.pedidoRepository.consultarPedidoPorId(id);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        Object.assign(pedido, pedidoData);

        return this.pedidoRepository.alterarPedido(PedidoMapper.toDomain(pedido));
    }
}