import ClienteORM from "../../infra/orm/entidades/clienteORM";
import Cliente from "../dominio/entidades/cliente";
import { EnderecoMapper } from "./EnderecoMapper";
import { PedidoMapper } from "./PedidoMapper";

export class ClienteMapper {
    static toDomain(clienteORM: ClienteORM): Cliente {
        return new Cliente(
        clienteORM.nome,
        clienteORM.cpf,
        EnderecoMapper.toDomain(clienteORM.endereco),
        clienteORM.telefone,
        clienteORM.saldo,
        clienteORM.pedidos.map(pedidoORM => PedidoMapper.toDomain(pedidoORM)),
        clienteORM.email
    )}

    static toPersistence(cliente: Cliente): ClienteORM {
        const clienteORM = new ClienteORM();
        clienteORM.nome = cliente.nome;
        clienteORM.cpf = cliente.cpf;
        clienteORM.telefone = cliente.telefone;
        clienteORM.saldo = cliente.saldo;
        clienteORM.email = cliente.email;
        clienteORM.pedidos = cliente.pedidos.map(pedido => PedidoMapper.toPersistence(pedido));
        clienteORM.endereco = EnderecoMapper.toPersistence(cliente.endereco);
        return clienteORM;
    }
}