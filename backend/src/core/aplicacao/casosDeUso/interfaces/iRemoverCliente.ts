export interface IRemoverCliente {
    executar(cpf: string): Promise<void>;
}