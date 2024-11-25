import Cliente from "./cliente";
import ProdutoORM from "../../../infra/orm/entidades/ProdutoORM";

export default class Pedido {
    id: number;
    data: Date;
    valor: number;
    produtos: ProdutoORM[];
    cliente: Cliente;

    constructor(id: number, data: Date, valor: number, cliente: Cliente, produtos: ProdutoORM[]) {
        this.id = id;
        this.data = data;
        this.valor = valor;
        this.cliente = cliente;
        this.produtos = produtos;
    }
}
