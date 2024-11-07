import Endereco from "../../../dominio/objetosDeValor/endereco";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IAlterarCliente } from "./interfaces/iAlterarCliente";

export class AlterarCliente implements IAlterarCliente {
  public constructor(private readonly clienteRepository: IClienteRepository) {}
  async executar(cpf: string, telefone: string, endereco: Endereco) {
    const cliente = await this.clienteRepository.consultarCliente(cpf);

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    cliente.telefone = telefone;
    cliente.endereco = endereco;

    await this.clienteRepository.alterarCliente(cliente);
  }
}
