import { IObterClientes } from "./interfaces/iObterClientes";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import Cliente from "../../../dominio/entidades/cliente";
import Pedido from "../../../dominio/entidades/pedido";

export class ObterClientes implements IObterClientes {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async executar(): Promise<Cliente[]> {
    const clientesOrm = await this.clienteRepository.obterClientes();

    const clientes = clientesOrm.map(clienteOrm => {
      const cliente = Cliente.fromORM(clienteOrm);

      const pedidos = Array.isArray(clienteOrm.pedidos) ? clienteOrm.pedidos.map(pedidoOrm => {
        return new Pedido(
          pedidoOrm.id,              
          pedidoOrm.data,            
          pedidoOrm.valor,           
          cliente,                   
          []                         
        );
      }) : [];

      cliente.pedidos = pedidos;

      return cliente;
    });

    return clientes;
  }
}
