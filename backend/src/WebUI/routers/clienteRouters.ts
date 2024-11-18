import express, { Router } from "express";
import { clienteControllerBuilder } from "../builders/clienteControllerBuilder";
const rotaBaseCliente: string = "/cliente";

const clienteRouters: Router = express.Router();
const clienteController = clienteControllerBuilder();

clienteRouters.post(
  rotaBaseCliente,
  clienteController.rotaCriarCliente.bind(clienteController)
);
clienteRouters.get(
  rotaBaseCliente,
  clienteController.rotaConsultarCliente.bind(clienteController)
);
clienteRouters.delete(
  rotaBaseCliente,
  clienteController.rotaRemoverCliente.bind(clienteController)
);
clienteRouters.put(
  rotaBaseCliente,
  clienteController.rotaAlterarCliente.bind(clienteController)
);
clienteRouters.post(
  `${rotaBaseCliente}/adicionarSaldo`,
  clienteController.rotaAdicionarSaldo.bind(clienteController)
);

export default clienteRouters;
