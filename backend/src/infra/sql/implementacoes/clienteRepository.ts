import { Service } from "typedi";
import { IClienteRepository } from "../../../core/aplicacao/contratos/iClienteRepository";
import Cliente from "../../../core/dominio/entidades/cliente";
import Endereco from "../../../core/dominio/objetosDeValor/endereco";

@Service()
export class ClienteRepository implements IClienteRepository {
  async consultarCliente(cpf: string | null, nome: string | null): Promise<Cliente> {
    console.log("Consultando cliente...");

    return new Cliente("Adriano", "123.456.789-00", new Endereco(), "123456789", 1000, []);
  }

  async criarCliente(
    nome: string,
    cpf: string,
    telefone: string,
    saldo: number,
    email: string
  ): Promise<void> {
    console.log("Criando cliente...");
  }
}
