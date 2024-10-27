import "reflect-metadata";
import { Inject, Service } from "typedi";
import Endereco from "../../../dominio/objetosDeValor/endereco";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { ICriarCliente } from "../interfaces/iCriarCliente";

@Service()
export class CriarCliente implements ICriarCliente {
  public constructor(
    @Inject() private readonly clienteRepository: IClienteRepository
  ) {}
  async executar(
    nome: string,
    cpf: string,
    endereco: Endereco,
    telefone: string,
    saldo: number,
    email: string
  ): Promise<void> {
    const clienteMesmoNome = await this.clienteRepository.consultarCliente(
      cpf,
      nome
    );

    await this.clienteRepository.criarCliente(
      nome,
      cpf,
      telefone,
      saldo,
      email
    );
  }
}
