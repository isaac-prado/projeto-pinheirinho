import express from "express";
import { ICriarCliente } from "../../core/aplicacao/casosDeUso/interfaces/iCriarCliente";
import { IConsultarCliente } from "../../core/aplicacao/casosDeUso/interfaces/iConsultarCliente";
import { Service, Inject } from "typedi";
import { IRemoverCliente } from "../../core/aplicacao/casosDeUso/interfaces/iRemoverCliente";
import { IAlterarCliente } from "../../core/aplicacao/casosDeUso/interfaces/iAlterarCliente";

@Service()
export class ClienteController {
  constructor(
    @Inject() private readonly criarCliente: ICriarCliente,
    @Inject() private readonly consultarCliente: IConsultarCliente,
    @Inject() private readonly removerCliente: IRemoverCliente,
    @Inject() private readonly alterarCliente: IAlterarCliente
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

  public rotaRemoverCliente = async (
    req: express.Request,
    res: express.Response
  ) => {
    var { cpf } = req.body;
    await this.removerCliente.executar(cpf);
    res.send("Cliente removido com sucesso");
  }

  public rotaAlterarCliente = async (
    req: express.Request,
    res: express.Response
  ) => {
    var { cpf, telefone, endereco } = req.body;
    await this.alterarCliente.executar(cpf, telefone, endereco);
    res.send("Cliente alterado com sucesso");
  }
}
