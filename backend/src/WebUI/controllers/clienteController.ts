import express from "express";
import { ICriarCliente } from "../../core/aplicacao/casosDeUso/interfaces/iCriarCliente";
import { IConsultarCliente } from "../../core/aplicacao/casosDeUso/interfaces/iConsultarCliente";
import { Service, Inject } from "typedi";

@Service()
export class ClienteController {
  constructor(
    @Inject() private readonly criarCliente: ICriarCliente,
    @Inject() private readonly consultarCliente: IConsultarCliente
  ) {}

  public rotaCriarCliente = async (
    req: express.Request,
    res: express.Response
  ) => {
    var { nome, cpf, endereco, telefone, saldo, email } = req.body;
    await this.criarCliente.executar(
      nome,
      cpf,
      endereco,
      telefone,
      saldo,
      email
    );
    res.send("Cliente criado com sucesso");
  };

  public rotaConsultarCliente = async (
    req: express.Request,
    res: express.Response
  ) => {
    var { cpf, nome } = req.body;
    const cliente = await this.consultarCliente.executar(cpf, nome);
    res.send(cliente);
  };
}
