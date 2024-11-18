import express from "express";
import { IAdicionarPedido } from "../../core/aplicacao/casosDeUso/pedidos/interfaces/iAdicionarPedido";
import { IConsultarPedido } from "../../core/aplicacao/casosDeUso/pedidos/interfaces/iConsultarPedido";

export class PedidoController {
  constructor(
    private readonly criarPedido: IAdicionarPedido,
    private readonly consultarPedido: IConsultarPedido
  ) {}

  public rotaAdicionarPedido = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { cpf, pedido } = req.body;

      if (!cpf || !pedido) {
        return res
          .status(400)
          .send("CPF e os dados do pedido são obrigatorios.");
      }

      await this.criarPedido.executar(cpf, pedido);
      res.status(200).send("Pedido criado com sucesso.");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  public rotaConsultarPedido = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { cpf, nome } = req.query;

      const pedidos = await this.consultarPedido.executar(
        cpf as string,
        nome as string
      );
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  };
}
