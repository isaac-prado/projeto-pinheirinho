import ClienteORM from "../../infra/orm/entidades/ClienteORM";
import Cliente from "../dominio/entidades/cliente";
import { PedidoMapper } from "./PedidoMapper";

export class ClienteMapper {
    static toDomain(clienteORM: ClienteORM): Cliente {
        const cliente = new Cliente(
            clienteORM.nome,
            clienteORM.cpf,
            clienteORM.endereco,
            clienteORM.telefone,
            Number(clienteORM.saldo),
            clienteORM.pedidos?.map(pedidoORM => PedidoMapper.toDomain(pedidoORM)) || [], // Use um array vazio por padrão
            clienteORM.email,
        );
        return cliente;
    }

    static toPersistence(cliente: Cliente): ClienteORM {
        const clienteORM = new ClienteORM();
        clienteORM.nome = cliente.nome;
        clienteORM.cpf = cliente.cpf;
        clienteORM.endereco = cliente.endereco;
        clienteORM.telefone = cliente.telefone;
        clienteORM.saldo = cliente.saldo;
        clienteORM.pedidos = cliente.pedidos?.map(pedido => PedidoMapper.toPersistence(pedido)); 
        clienteORM.email = cliente.email;
        return clienteORM;
    }
}