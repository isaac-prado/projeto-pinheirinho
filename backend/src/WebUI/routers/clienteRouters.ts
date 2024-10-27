import express, { Router } from "express";
import Container, { Token } from "typedi";
import { ClienteController } from "../controllers/clienteController";
const rotaBaseCliente: string = "/cliente";

const clienteRouters: Router = express.Router();
const clienteController = Container.get(ClienteController);

clienteRouters.post(
  rotaBaseCliente,
  clienteController.rotaCriarCliente.bind(clienteController)
);
clienteRouters.get(
  rotaBaseCliente,
  clienteController.rotaConsultarCliente.bind(clienteController)
);

export default clienteRouters;
