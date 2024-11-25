import { IObterClientes } from "./interfaces/iObterClientes";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import Cliente from "../../../dominio/entidades/cliente";

export class ObterClientes implements IObterClientes {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async executar(): Promise<Cliente[]> {
    const clientesOrm = await this.clienteRepository.obterClientes();

    const clientes = clientesOrm.map(clienteOrm => 
      new Cliente(
        clienteOrm.nome,
        clienteOrm.cpf,
        clienteOrm.endereco,
        clienteOrm.telefone,
        Number(clienteOrm.saldo),
        clienteOrm.email
      )
    );

    return clientes;
  }
}
