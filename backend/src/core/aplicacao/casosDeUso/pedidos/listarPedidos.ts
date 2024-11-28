import PedidoORM from "../../../../infra/orm/entidades/PedidoORM";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { PedidoConsulta } from "../../models/pedidoConsulta";
import { IListarPedidos } from "./interfaces/iListarPedidos";
import Pedido from "../../../dominio/entidades/pedido";

export class ListarPedidos implements IListarPedidos {
    constructor(private readonly pedidoRepository: IPedidoRepository) {}

    async executar(): Promise<PedidoConsulta[]> {
        const pedidosOrm = await this.pedidoRepository.listarTodosPedidos();

        const pedidos = pedidosOrm.map(pedidoOrm => Pedido.fromORM(pedidoOrm));

        const pedidosConsulta: PedidoConsulta[] = pedidos.map(
            (pedido: PedidoORM) => ({
                cliente: pedido.cliente.nome,
                data: pedido.data,
                valor: pedido.valor,
            })
        );

        return pedidosConsulta;
    }
}
