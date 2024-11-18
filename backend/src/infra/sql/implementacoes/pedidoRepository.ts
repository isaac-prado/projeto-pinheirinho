import { Repository } from "typeorm";
import Pedido from "../../../core/dominio/entidades/pedido";
import { IPedidoRepository } from "../../../core/aplicacao/contratos/iPedidoRepository";

export class PedidoRepository implements IPedidoRepository {
    adicionarPedido(pedido: Pedido): Promise<void> {
        throw new Error("Method not implemented.");
    }
    consultarPedidosPorCliente(clienteCpf: string): Promise<Pedido[]> {
        throw new Error("Method not implemented.");
    }
    consultarPedidoPorId(pedidoId: number): Promise<Pedido | null> {
        throw new Error("Method not implemented.");
    }
    removerPedido(pedidoId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    // private ormRepository: Repository<Pedido>;

    // constructor(ormRepository: Repository<Pedido>) {
    //     this.ormRepository = ormRepository;
    // }

    // async adicionarPedido(pedido: Pedido): Promise<void> {
    //     await this.ormRepository.save(pedido);
    // }

    // async consultarPedidosPorCliente(clienteCpf: string): Promise<Pedido[]> {
    //     return this.ormRepository.find({
    //         where: { cliente: { cpf: clienteCpf } },
    //         relations: ["cliente", "produtos"],
    //     });
    // }

    // async consultarPedidoPorId(pedidoId: string): Promise<Pedido | null> {
    //     return this.ormRepository.findOne({
    //         where: { id: pedidoId },
    //         relations: ["cliente", "produtos"],
    //     });
    // }

    // async removerPedido(pedidoId: string): Promise<void> {
    //     await this.ormRepository.delete(pedidoId);
    // }
}
