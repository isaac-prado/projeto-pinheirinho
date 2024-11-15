import { DataSource } from "typeorm";
import ClienteORM from "./entidades/clienteORM";
import PedidoORM from "./entidades/pedidoORM";
import ProdutoORM from "./entidades/ProdutoORM";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "app_db",
    synchronize: true,
    logging: false,
    entities: [ClienteORM, PedidoORM, ProdutoORM]
});

export default AppDataSource;
