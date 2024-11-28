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
    try {
      const pedido = await this.pedidoRepository.consultarPedidoPorId(pedidoId);
      if (pedido == null) {
        throw new Error("Pedido não encontrado");
      }

      const clienteOrm = await this.clienteRepository.consultarCliente(pedido.cliente.cpf);
      if (!clienteOrm) {
        throw new Error("Cliente não encontrado");
      }

      const cliente = ClienteMapper.toDomain(clienteOrm);
      
      const valorEstorno = Number(pedido.valor);

      if(isNaN(valorEstorno)) {
        throw new Error("Valor do pedido inválido!");
      }

      cliente.adicionarSaldo(valorEstorno);

      const clienteOrmAtualizado = ClienteMapper.toPersistence(cliente);
      await this.clienteRepository.alterarCliente(clienteOrmAtualizado);
      console.log(`Saldo do Cliente ${cliente.nome} atualizado com sucesso!`);

      await this.pedidoRepository.removerPedido(pedidoId);
      console.log(`Pedido ${pedidoId} removido com sucesso!`);
    } catch (error) {
      console.error("Erro ao remover pedido:", error);
      throw new Error("Erro ao remover pedido.")
    }
  }
}
