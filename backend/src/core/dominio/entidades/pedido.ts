import Produto from "./produto";
import Cliente from "./cliente";

export default class Pedido {
    id: number;
    data: Date;
    valor: number;
    produtos: Produto[];
    cliente: Cliente;

    constructor(id: number, data: Date, valor: number, cliente: Cliente, produtos: Produto[]) {
        this.id = id;
        this.data = data;
        this.valor = valor;
        this.cliente = cliente;
        this.produtos = produtos;
    }
}
