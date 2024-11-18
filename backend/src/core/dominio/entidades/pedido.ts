import Produto from "./produto";
import Cliente from "./cliente";

export default class Pedido {
    id: number;
    data: Date;
    valor: number;
    produtos: Produto[];
    cliente: Cliente;

    constructor(id: number, data: Date, valor: number, produtos: Produto[], cliente: Cliente) {
        this.id = id;
        this.data = data;
        this.valor = valor;
        this.produtos = produtos;
        this.cliente = cliente;
    }
}
