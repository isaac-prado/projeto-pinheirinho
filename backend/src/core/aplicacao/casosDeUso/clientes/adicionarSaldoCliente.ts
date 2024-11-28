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

        var saldoParaNumber = Number(cliente.saldo)
        const valorParaNumber = Number(valor);

        if (valorParaNumber < 0 || isNaN(valorParaNumber)) {
            throw new Error("Saldo deve ser positivo.")
        }

        saldoParaNumber += valorParaNumber
        cliente.saldo = saldoParaNumber;

        await this.clienteRepository.alterarCliente(cliente);
    }
}
