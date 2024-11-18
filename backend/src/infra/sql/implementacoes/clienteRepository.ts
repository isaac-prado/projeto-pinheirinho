import { IClienteRepository } from "../../../core/aplicacao/contratos/iClienteRepository";
import Cliente from "../../../core/dominio/entidades/cliente";
import Endereco from "../../../core/dominio/objetosDeValor/endereco";

export class ClienteRepository implements IClienteRepository {
  alterarCliente(cliente: Cliente): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removerCliente(cpf: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async consultarCliente(cpf?: string, nome?: string): Promise<Cliente> {
    console.log("Consultando cliente...");

    return new Cliente(
      "Adriano",
      "123.456.789-00",
      new Endereco(),
      "123456789",
      1000,
      []
    );
  }

  async criarCliente(
    nome: string,
    cpf: string,
    telefone: string,
    saldo: number,
    email: string,
    endereco: Endereco
  ): Promise<void> {
    console.log("Criando cliente...");
  }
}
