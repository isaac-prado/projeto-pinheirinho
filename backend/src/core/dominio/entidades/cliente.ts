import Pedido from "./pedido";
import ClienteORM from "../../../infra/orm/entidades/ClienteORM";

export default class Cliente {
    id: number;
    nome: string;
    cpf: string;
    endereco: string;
    telefone: string;
    saldo: number;
    pedidos?: Pedido[];
    email?: string;

    constructor(
        nome: string, 
        cpf: string, 
        endereco: string, 
        telefone: string, 
        saldo: number, 
        pedidos?: Pedido[],
        email?: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
        this.saldo = saldo;
        this.pedidos = pedidos || [];
        if(email) this.email = email;
    }

    public adicionarSaldo(valorAdicionado: number): void {
        if (valorAdicionado > 0)
            Number(this.saldo);
            this.saldo += valorAdicionado;
    }

    public descontarSaldo(valorDoPedido: number): void {
        if (valorDoPedido > 0)
            this.saldo -= valorDoPedido;
    }

    public podeSerRemovido(): boolean {
        return this.saldo === 0;
    }

    static fromORM(clienteOrm: ClienteORM, pedidos: Pedido[] = []): Cliente {
        return new Cliente(
            clienteOrm.nome,
            clienteOrm.cpf,
            clienteOrm.endereco,
            clienteOrm.telefone,
            Number(clienteOrm.saldo),
            pedidos,
            clienteOrm.email
        );
    }
}