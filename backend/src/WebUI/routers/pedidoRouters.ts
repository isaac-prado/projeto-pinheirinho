import express, { Router } from "express";
import { pedidoControllerBuilder } from "../builders/pedidoControllerBuilder";

const rotaBasePedido: string = "/pedido";

const pedidoRouters: Router = express.Router();
const pedidoController = pedidoControllerBuilder();

pedidoRouters.post(
    rotaBasePedido,
    pedidoController.rotaAdicionarPedido.bind(pedidoController)
);

pedidoRouters.get(
    `${rotaBasePedido}/:id`,
    pedidoController.rotaConsultarPedido.bind(pedidoController)
);

pedidoRouters.delete(
    `${rotaBasePedido}/:id`,
    pedidoController.rotaRemoverPedido.bind(pedidoController)
);

pedidoRouters.get(
    rotaBasePedido,
    pedidoController.rotaListarPedidos.bind(pedidoController)
);

export default pedidoRouters;
