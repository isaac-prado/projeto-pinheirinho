import Pedido from "./pedido";

export default class Produto {
    id: number;
    nome: string;
    estoque: number;
    preco: number;
    pedidos: Pedido[];

    constructor(
        id: number,
        nome: string,
        estoque: number,
        preco: number,
        pedidos: Pedido[]
    ){
        this.id = id;
        this.nome = nome;
        this.estoque = estoque;
        this.preco = preco;
        this.pedidos = pedidos;
    }
};
