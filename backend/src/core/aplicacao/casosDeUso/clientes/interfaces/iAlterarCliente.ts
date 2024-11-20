import Pedido from "../../../../dominio/entidades/pedido";

export interface IAlterarCliente {
  executar(cpf: string, telefone: string, email: string, endereco: string, pedidos: Pedido[]): Promise<void>;
}
