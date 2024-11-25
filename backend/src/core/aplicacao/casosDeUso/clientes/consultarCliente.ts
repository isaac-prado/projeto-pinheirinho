import Cliente from "../../../dominio/entidades/cliente";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IConsultarCliente } from "./interfaces/iConsultarCliente";

export class ConsultarCliente implements IConsultarCliente {
    public constructor(
        private readonly clienteRepository: IClienteRepository
    ) {}

    async executar(cpf?: string, nome?: string): Promise<Cliente> {
        const clienteOrm = await this.clienteRepository.consultarCliente(cpf, nome);
    
        if (!clienteOrm) {
            throw new Error("Cliente não encontrado.");
        }
    
        return new Cliente(
            clienteOrm.nome,
            clienteOrm.cpf,
            clienteOrm.endereco,
            clienteOrm.telefone,
            Number(clienteOrm.saldo),
            clienteOrm.email
        );
    }
    
}
