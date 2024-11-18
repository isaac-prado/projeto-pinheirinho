import Cliente from "../../../dominio/entidades/cliente";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IConsultarCliente } from "./interfaces/iConsultarCliente";

export class ConsultarCliente implements IConsultarCliente {
  public constructor(private readonly clienteRepository: IClienteRepository) {}

  async executar(cpf?: string, nome?: string): Promise<Cliente> {
    return await this.clienteRepository.consultarCliente(cpf, nome);
  }
}
