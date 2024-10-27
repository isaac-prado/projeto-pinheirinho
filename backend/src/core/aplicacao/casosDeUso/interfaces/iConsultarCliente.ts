import Cliente from "../../../dominio/entidades/cliente";

export interface IConsultarCliente {
    executar(cpf: string | null, nome: string | null): Promise<Cliente>;
}