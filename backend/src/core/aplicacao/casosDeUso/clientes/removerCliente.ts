import { Inject } from "typedi";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IRemoverCliente } from "../interfaces/iRemoverCliente";

export class RemoverCliente implements IRemoverCliente {
    public constructor(
        @Inject() private readonly clienteRepository: IClienteRepository
    ) {}

    async executar(cpf: string): Promise<void> {
        var cliente = await this.clienteRepository.consultarCliente(cpf);
        
        if (cliente.podeSerRemovido()) {
            throw new Error("Cliente não pode ser removido pois possui saldo");
        }

        await this.clienteRepository.removerCliente(cpf);
    }
}