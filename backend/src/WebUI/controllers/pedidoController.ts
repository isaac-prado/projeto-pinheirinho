import express from "express";
import { Service, Inject } from "typedi";
import { IAdicionarPedido } from "../../core/aplicacao/casosDeUso/pedidos/interfaces/iAdicionarPedido";

@Service()
export class PedidoController {
  constructor(
    @Inject() private readonly criarPedido: IAdicionarPedido
  ) {}

  public rotaAdicionarPedido = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { cpf, pedido } = req.body;

      // Validação básica
      if (!cpf || !pedido) {
        return res.status(400).send("CPF e os dados do pedido são obrigatorios.");
      }

      await this.criarPedido.executar(cpf, pedido);
      res.status(200).send("Pedido criado com sucesso.");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
}
