import express from "express";
import { IAdicionarPedido } from "../../core/aplicacao/casosDeUso/pedidos/interfaces/iAdicionarPedido";
import { IConsultarPedido } from "../../core/aplicacao/casosDeUso/pedidos/interfaces/iConsultarPedido";
import { IRemoverPedido } from "../../core/aplicacao/casosDeUso/pedidos/interfaces/iRemoverPedido";
import { IListarPedidos } from "../../core/aplicacao/casosDeUso/pedidos/interfaces/iListarPedidos";

export class PedidoController {
    constructor(
        private readonly criarPedido: IAdicionarPedido,
        private readonly consultarPedido: IConsultarPedido,
        private readonly removerPedido: IRemoverPedido,
        private readonly listarPedidos: IListarPedidos
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

    public rotaRemoverPedido = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send("Id do pedido é obrigatório.");
            }

            await this.removerPedido.executar(parseInt(id));
            res.status(200).send("Pedido removido com sucesso.");

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };

    public rotaListarPedidos = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const pedidos = await this.listarPedidos.executar();
            return res.status(200).json(pedidos);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    }
}
