import "reflect-metadata";
import Endereco from "../../../dominio/objetosDeValor/endereco";
import { IClienteRepository } from "../../contratos/iClienteRepository";
import { ICriarCliente } from "./interfaces/iCriarCliente";

export class CriarCliente implements ICriarCliente {
  public constructor(private readonly clienteRepository: IClienteRepository) {}
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
      email,
      endereco
    );
  }
}
