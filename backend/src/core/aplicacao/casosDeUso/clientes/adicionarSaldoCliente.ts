import { IClienteRepository } from "./../../contratos/iClienteRepository";
import { IAdicionarSaldoCliente } from "./interfaces/iAdicionarSaldoCliente";

export class AdicionarSaldoCliente implements IAdicionarSaldoCliente {
    public constructor(
        private readonly clienteRepository: IClienteRepository
    ) {}
    async executar(cpf: string, valor: number): Promise<void> {
        const cliente = await this.clienteRepository.consultarCliente(cpf);

        if (!cliente) {
            throw new Error("Cliente não encontrado.");
        }

        cliente.saldo += valor;

        await this.clienteRepository.alterarCliente(cliente);
    }
}
