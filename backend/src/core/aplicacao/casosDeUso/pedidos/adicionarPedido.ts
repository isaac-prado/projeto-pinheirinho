import Pedido from "../../../dominio/entidades/pedido";

import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { IAdicionarPedido } from "./interfaces/iAdicionarPedido";
import { ClienteMapper } from "../../../utils/ClienteMapper";

export class AdicionarPedido implements IAdicionarPedido {
    public constructor(
        private readonly pedidoRepository: IPedidoRepository,
        private readonly clienteRepository: IClienteRepository
    ) {}

    async executar(cpf: string, pedido: Pedido): Promise<void> {
        const clienteOrm = await this.clienteRepository.consultarCliente(cpf);
        if (!clienteOrm) {
            throw new Error("Cliente não encontrado.");
        }

        const cliente = ClienteMapper.toDomain(clienteOrm); 

        if (cliente.saldo < pedido.valor) {
            throw new Error("Saldo Insuficiente.");
        }

        cliente.descontarSaldo(pedido.valor);
        pedido.data = new Date();

        pedido.cliente = cliente; 

        await this.pedidoRepository.adicionarPedido(cpf, pedido);

        clienteOrm.saldo = cliente.saldo;
        await this.clienteRepository.alterarCliente(clienteOrm);
    }
}
