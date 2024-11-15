import express, { Router } from "express";
import Container from "typedi";
import { PedidoController } from "../controllers/pedidoController";

const rotaBasePedido: string = "/pedido";

const pedidoRouters: Router = express.Router();
const pedidoController = Container.get(PedidoController);

pedidoRouters.post(
  rotaBasePedido,
  pedidoController.rotaAdicionarPedido.bind(pedidoController)
);

pedidoRouters.get(
  `${rotaBasePedido}/consulta`,
  pedidoController.rotaConsultarPedido.bind(pedidoController)
);

export default pedidoRouters;
