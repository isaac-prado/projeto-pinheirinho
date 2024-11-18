import Pedido from "../../../dominio/entidades/pedido";
import Endereco from "../../../dominio/objetosDeValor/endereco";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IAlterarCliente } from "./interfaces/iAlterarCliente";

export class AlterarCliente implements IAlterarCliente {
  public constructor(private readonly clienteRepository: IClienteRepository) {}
  async executar(
    cpf: string, 
    telefone?: string, 
    email?: string, 
    endereco?: Endereco,
    pedidos?: Pedido[]
  ) {
    const cliente = await this.clienteRepository.consultarCliente(cpf);

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    if (telefone) cliente.telefone = telefone;
    if (endereco) cliente.endereco = endereco;
    if (email) cliente.email = email;
    if (pedidos) cliente.pedidos = pedidos;

    await this.clienteRepository.alterarCliente(cliente);
  }
}
