import Cliente from "../../dominio/entidades/cliente";
import Endereco from "../../dominio/objetosDeValor/endereco";

export interface IClienteRepository {
    consultarCliente(cpf?: string | null, nome?: string): Promise<Cliente>;
    criarCliente(nome: string, cpf: string, endereco: Endereco, telefone: string, saldo: number, email?: string): Promise<void>;
    removerCliente(cpf: string): Promise<void>;
    alterarCliente(cliente: Cliente): Promise<void>;
}