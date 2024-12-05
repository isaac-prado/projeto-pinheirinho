import ClienteORM from "../../src/infra/orm/entidades/ClienteORM";
const clienteOrmMock = new ClienteORM();
clienteOrmMock.nome = "Fulano da Silva";
clienteOrmMock.cpf = "123.456.789-00";
clienteOrmMock.endereco = "Rua da Paz, 123";
clienteOrmMock.telefone = "11 99999-9999";
clienteOrmMock.saldo = 50.0;
clienteOrmMock.email = "a@gmail.com";

export default clienteOrmMock;
