import Pedido from "../../../../dominio/entidades/pedido";

export interface IAdicionarPedido {
    executar(cpf: string, pedido: Pedido): Promise<void>;
}
