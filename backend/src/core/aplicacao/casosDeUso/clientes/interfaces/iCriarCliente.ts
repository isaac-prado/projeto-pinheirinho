export interface ICriarCliente {
  executar(
    nome: string,
    cpf: string,
    endereco: string,
    telefone: string,
    saldo: number,
    email: string,
  ): Promise<void>;
}
