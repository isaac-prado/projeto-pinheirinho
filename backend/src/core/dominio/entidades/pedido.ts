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

    static fromORM(pedidoOrm: any): Pedido {
        const cliente = pedidoOrm.cliente ? new Cliente(
            pedidoOrm.cliente.nome,
            pedidoOrm.cliente.cpf,
            pedidoOrm.cliente.endereco,
            pedidoOrm.cliente.telefone,
            Number(pedidoOrm.cliente.saldo),
            pedidoOrm.cliente.email
        ) : new Cliente('', '', '', '', 0, []); 

        const produtos = pedidoOrm.produtos ? pedidoOrm.produtos.map((produtoOrm: any) => Produto.fromORM(produtoOrm)) : [];

        return new Pedido(
            pedidoOrm.id,
            pedidoOrm.data,
            pedidoOrm.valor,
            cliente,
            produtos
        );
    }
}
