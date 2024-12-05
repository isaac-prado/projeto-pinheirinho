import Pedido from "../../src/core/dominio/entidades/pedido";
import clienteMock from "./cliente.mock";
import produtoMock from "./produto.mock";

const pedidoMock = new Pedido(123456, new Date(Date.now()), 100.0, clienteMock, [produtoMock]);

export default pedidoMock;