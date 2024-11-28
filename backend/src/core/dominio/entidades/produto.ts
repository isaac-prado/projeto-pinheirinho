import PedidoORM from "../../../infra/orm/entidades/PedidoORM";

export default class Produto {
    id: number;
    nome: string;
    estoque: number;
    preco: number;
    pedidos: PedidoORM[] = [];

    constructor(
        id: number,
        nome: string,
        estoque: number,
        preco: number,
        pedidos: PedidoORM[] = []
    ){
        this.id = id;
        this.nome = nome;
        this.estoque = estoque;
        this.preco = preco;
        this.pedidos = pedidos;
    }
};
