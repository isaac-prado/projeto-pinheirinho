import { ClienteController } from "./../../../../WebUI/controllers/clienteController";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IPedidoRepository } from "../../contratos/iPedidoRepository";
import { IRemoverPedido } from "./interfaces/iRemoverPedido";

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

    const cliente = await this.clienteRepository.consultarCliente(
      pedido.cliente.cpf
    );
    if (cliente == null) {
      throw new Error("Cliente não encontrado");
    }

    cliente.adicionarSaldo(pedido.valor);
    await this.clienteRepository.alterarCliente(cliente);
  }
}
