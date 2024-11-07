import { Service, Inject } from "typedi";
import Cliente from "../../../dominio/entidades/cliente";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { IConsultarCliente } from "../interfaces/iConsultarCliente";
@Service()
export class ConsultarCliente implements IConsultarCliente {
  public constructor(
    @Inject() private readonly clienteRepository: IClienteRepository
  ) {}

  async executar(cpf?: string, nome?: string): Promise<Cliente> {
    return await this.clienteRepository.consultarCliente(cpf, nome);
  }
}
