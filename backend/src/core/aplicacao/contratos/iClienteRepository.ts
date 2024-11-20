import Cliente from "../../dominio/entidades/cliente";

export interface IClienteRepository {
  consultarCliente(cpf?: string | null, nome?: string): Promise<Cliente>;
  criarCliente(
    nome: string,
    cpf: string,
    telefone: string,
    saldo: number,
    email: string,
    endereco: string
  ): Promise<void>;
  removerCliente(cpf: string): Promise<void>;
  alterarCliente(cliente: Cliente): Promise<void>;
}
