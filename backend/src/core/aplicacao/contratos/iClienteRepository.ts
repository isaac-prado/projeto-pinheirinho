import ClienteORM from "../../../infra/orm/entidades/ClienteORM";

export interface IClienteRepository {
    alterarCliente(cliente: ClienteORM): Promise<void>;
    removerCliente(cpf: string): Promise<void>;
    consultarCliente(cpf?: string, nome?: string): Promise<ClienteORM | null>;
    criarCliente(
        nome: string,
        cpf: string,
        telefone: string,
        saldo: number,
        email: string,
        endereco: string
    ): Promise<void>;
    obterClientes(): Promise<ClienteORM[]>;
}

