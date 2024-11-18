import { Repository } from "typeorm";
import Pedido from "../../../core/dominio/entidades/pedido";
import { IPedidoRepository } from "../../../core/aplicacao/contratos/iPedidoRepository";

export class PedidoRepository implements IPedidoRepository {
    private ormRepository: Repository<Pedido>;

    constructor(ormRepository: Repository<Pedido>) {
        this.ormRepository = ormRepository;
    }

    async adicionarPedido(pedido: Pedido): Promise<void> {
        await this.ormRepository.save(pedido);
    }

    async consultarPedidosPorCliente(clienteCpf: string): Promise<Pedido[]> {
        return this.ormRepository.find({
            where: { cliente: { cpf: clienteCpf } },
            relations: ["cliente", "produtos"],
        });
    }

    async consultarPedidoPorId(pedidoId: number): Promise<Pedido | null> {
        return this.ormRepository.findOne({
            where: { id: pedidoId },
            relations: ["cliente", "produtos"],
        });
    }

    async removerPedido(pedidoId: string): Promise<void> {
        await this.ormRepository.delete(pedidoId);
    }
}
