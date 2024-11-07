import Endereco from "../../../../dominio/objetosDeValor/endereco";

export interface IAlterarCliente {
  executar(cpf: string, telefone: string, endereco: Endereco): Promise<void>;
}
