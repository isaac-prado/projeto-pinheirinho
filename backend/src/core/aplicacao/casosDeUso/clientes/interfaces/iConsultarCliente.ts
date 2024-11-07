import Cliente from "../../../../dominio/entidades/cliente";

export interface IConsultarCliente {
  executar(cpf?: string, nome?: string): Promise<Cliente>;
}
