import express from "express";
import { ICriarCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iCriarCliente";
import { IConsultarCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iConsultarCliente";
import { IRemoverCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iRemoverCliente";
import { IAlterarCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iAlterarCliente";
import { IAdicionarSaldoCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iAdicionarSaldoCliente";

export class ClienteController {
  constructor(
    private readonly criarCliente: ICriarCliente,
    private readonly consultarCliente: IConsultarCliente,
    private readonly removerCliente: IRemoverCliente,
    private readonly alterarCliente: IAlterarCliente,
    private readonly adicionarSaldo: IAdicionarSaldoCliente
  ) {}

  public rotaAdicionarSaldo = async (
    req: express.Request,
    res: express.Response
  ) => {
    var { cpf, valor } = req.body;
    await this.adicionarSaldo.executar(cpf, valor);
    res.send("Saldo adicionado com sucesso");
  };

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
  };

  public rotaAlterarCliente = async (
    req: express.Request,
    res: express.Response
  ) => {
    var { cpf, telefone, email, endereco } = req.body;
    await this.alterarCliente.executar(cpf, telefone, email, endereco);
    res.send("Cliente alterado com sucesso");
  };
}
