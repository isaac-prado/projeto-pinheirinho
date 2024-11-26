import { Repository } from "typeorm";
import Pedido from "../../../core/dominio/entidades/pedido";
import { IPedidoRepository } from "../../../core/aplicacao/contratos/iPedidoRepository";
import PedidoORM from "../../orm/entidades/PedidoORM";
import AppDataSource from "../../orm/config";
import ClienteORM from "../../orm/entidades/ClienteORM";
import ProdutoORM from "../../orm/entidades/ProdutoORM";

export class PedidoRepository implements IPedidoRepository {
    private pedidoRepository: Repository<PedidoORM>;
    private clienteRepository: Repository<ClienteORM>

    constructor() {
        this.pedidoRepository = AppDataSource.getRepository(PedidoORM);
        this.clienteRepository = AppDataSource.getRepository(ClienteORM);
    }

    async adicionarPedido(cpf: string, pedido: Pedido): Promise<void> {
        console.log("Adicionando pedido...");
        
        const cliente = await this.clienteRepository.findOne({ where: { cpf }});

        if(!cliente) {
            throw new Error("Cliente não encontrado.")
        }

        const pedidoORM = new PedidoORM();
        pedidoORM.data = pedido.data;
        pedidoORM.valor = pedido.valor;
        pedidoORM.cliente = cliente
        pedidoORM.produtos = []

        try {
            const savedPedido = await this.pedidoRepository.save(pedidoORM);
            console.log(`Pedido salvo no Banco: ${savedPedido}`);

            for (const produto of pedido.produtos) {
                const produtoORM = new ProdutoORM();
                produtoORM.pedidos = [savedPedido];
                produtoORM.estoque = produto.estoque;
                savedPedido.produtos.push(produtoORM);
            }

            await this.pedidoRepository.save(savedPedido);

        } catch (error) {
            console.error(`Erro ao salvar Pedido: ${error}`);
            throw new Error("Não foi possível salvar Pedido");
        }
    }


    listarTodosPedidos(): Promise<Pedido[]> {
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
