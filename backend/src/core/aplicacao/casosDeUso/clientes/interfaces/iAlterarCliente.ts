import Pedido from "../../../../dominio/entidades/pedido";
import Endereco from "../../../../dominio/objetosDeValor/endereco";

export interface IAlterarCliente {
  executar(cpf: string, telefone: string, email: string, endereco: Endereco, pedidos: Pedido[]): Promise<void>;
}
