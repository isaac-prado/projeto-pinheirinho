import Cliente from "./cliente";

export default class Pedido {
    id: number;
    data: Date;
    valor: number;
    cliente: Cliente;

    constructor(id: number, data: Date, valor: number, cliente: Cliente) {
        this.id = id;
        this.data = data;
        this.valor = valor;
        this.cliente = cliente;
    }
}
