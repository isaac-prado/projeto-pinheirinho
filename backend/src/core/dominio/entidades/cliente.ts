import Pedido from "./pedido";
export default class Cliente {
    nome: string;
    cpf: string;
    endereco: string;
    telefone: string;
    saldo: number;
    email?: string;

    constructor(
        nome: string, 
        cpf: string, 
        endereco: string, 
        telefone: string, 
        saldo: number, 
        email?: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
        this.saldo = saldo;
        if(email) this.email = email;
    }

    public adicionarSaldo(valorAdicionado: number): void {
        if (valorAdicionado > 0)
            this.saldo += valorAdicionado;
    }

    public descontarSaldo(valorDoPedido: number): void {
        if (valorDoPedido > 0)
            this.saldo -= valorDoPedido;
    }

    public podeSerRemovido(): boolean {
        return this.saldo === 0;
    }
}