import Pedido from "../../../dominio/entidades/pedido";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { IAdicionarPedido } from "./interfaces/iAdicionarPedido";

export class AdicionarPedido implements IAdicionarPedido {
    public constructor(
        private readonly pedidoRepository: IPedidoRepository,
        private readonly clienteRepository: IClienteRepository
    ) {}

    async executar(cpf: string, pedido: Pedido): Promise<void> {
        const cliente = await this.clienteRepository.consultarCliente(cpf);
        if (!cliente) {
            throw new Error("Cliente não encontrado.");
        }

        if (cliente.saldo < pedido.valor) {
            throw new Error("Saldo Insuficiente.");
        }

        cliente.saldo -= pedido.valor;
        pedido.data = new Date();

        cliente.pedidos.push(pedido);

        await this.pedidoRepository.adicionarPedido(pedido);
        await this.clienteRepository.alterarCliente(cliente);
    }
}
