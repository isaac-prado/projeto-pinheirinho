import Cliente from "../../dominio/entidades/cliente";

export interface IClienteRepository {
    consultarCliente(cpf: string | null, nome: string | null): Promise<Cliente>;
    criarCliente(nome: string, cpf: string, telefone: string, saldo: number, email: string): Promise<void>;
}