import { IObterClientes } from "./interfaces/iObterClientes";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import Cliente from "../../../dominio/entidades/cliente";
import { PedidoMapper } from "../../../utils/PedidoMapper";

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
        clienteOrm.pedidos?.map(pedidoOrm => PedidoMapper.toDomain(pedidoOrm)),
        clienteOrm.email,
      )
    );

    return clientes;
  }
}
