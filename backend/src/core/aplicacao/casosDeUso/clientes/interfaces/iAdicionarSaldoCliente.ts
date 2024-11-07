export interface IAdicionarSaldoCliente {
    executar(cpf: string, valor: number): Promise<void>;
}