import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IRemoverCliente } from "./interfaces/iRemoverCliente";
import Cliente from "../../../dominio/entidades/cliente";

export class RemoverCliente implements IRemoverCliente {
    public constructor(
        private readonly clienteRepository: IClienteRepository
    ) {}

    async executar(cpf: string): Promise<void> {
        const clienteOrm = await this.clienteRepository.consultarCliente(cpf);

        if (!clienteOrm) {
            throw new Error("Cliente não encontrado.");
        }

        const cliente = Cliente.fromORM(clienteOrm);

        if (!cliente.podeSerRemovido()) {
            throw new Error("Cliente não pode ser removido pois possui saldo");
        }

        await this.clienteRepository.removerCliente(cpf);
    }
}
