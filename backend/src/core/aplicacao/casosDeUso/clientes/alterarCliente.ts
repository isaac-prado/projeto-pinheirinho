import Pedido from "../../../dominio/entidades/pedido";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IAlterarCliente } from "./interfaces/iAlterarCliente";

export class AlterarCliente implements IAlterarCliente {
    public constructor(
        private readonly clienteRepository: IClienteRepository
    ) {}
    async executar(
        cpf: string,
        telefone?: string,
        email?: string,
        endereco?: string,
        saldo?: number,
        pedidos?: Pedido[]
    ) {
        const cliente = await this.clienteRepository.consultarCliente(cpf);

        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        if (telefone) cliente.telefone = telefone;
        if (endereco) cliente.endereco = endereco;
        if (email) cliente.email = email;
        if (saldo !== undefined) cliente.saldo = saldo;

        await this.clienteRepository.alterarCliente(cliente);
    }
}
