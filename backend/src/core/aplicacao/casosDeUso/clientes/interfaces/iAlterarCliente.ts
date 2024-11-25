import Pedido from "../../../../dominio/entidades/pedido";

export interface IAlterarCliente {
  executar(cpf: string, telefone?: string, email?: string, endereco?: string, saldo?:number, pedidos?: Pedido[]): Promise<void>;
}
