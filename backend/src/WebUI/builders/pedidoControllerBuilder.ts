import { AdicionarPedido } from "../../core/aplicacao/casosDeUso/pedidos/adicionarPedido";
import { ConsultarPedido } from "../../core/aplicacao/casosDeUso/pedidos/consultarPedido";
import { RemoverPedido } from "../../core/aplicacao/casosDeUso/pedidos/removerPedido";
import { ClienteRepository } from "../../infra/sql/implementacoes/clienteRepository";
import { PedidoRepository } from "../../infra/sql/implementacoes/pedidoRepository";
import { PedidoController } from "../controllers/pedidoController";

const pedidoRepository = new PedidoRepository();
const clienteRepository = new ClienteRepository();

const adicionarPedido = new AdicionarPedido(
    pedidoRepository,
    clienteRepository
);
const consultarPedido = new ConsultarPedido(pedidoRepository);
const removerPedido = new RemoverPedido(pedidoRepository, clienteRepository);

export function pedidoControllerBuilder() {
    return new PedidoController(adicionarPedido, consultarPedido, removerPedido);
}
