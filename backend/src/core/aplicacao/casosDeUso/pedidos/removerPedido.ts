import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { IRemoverPedido } from "./interfaces/iRemoverPedido";
import { ClienteMapper } from "../../../utils/ClienteMapper";

export class RemoverPedido implements IRemoverPedido {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly clienteRepository: IClienteRepository
  ) {}

  async executar(pedidoId: number): Promise<void> {
    const pedido = await this.pedidoRepository.consultarPedidoPorId(pedidoId);
    if (pedido == null) {
      throw new Error("Pedido não encontrado");
    }

    const clienteOrm = await this.clienteRepository.consultarCliente(pedido.cliente.cpf);
    if (clienteOrm == null) {
      throw new Error("Cliente não encontrado");
    }

    const cliente = ClienteMapper.toDomain(clienteOrm);

    cliente.adicionarSaldo(pedido.valor);

    const clienteOrmAtualizado = ClienteMapper.toPersistence(cliente);

    await this.clienteRepository.alterarCliente(clienteOrmAtualizado);
  }
}
