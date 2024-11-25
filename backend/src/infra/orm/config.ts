import { DataSource } from "typeorm";
import ClienteORM from "./entidades/ClienteORM";
import PedidoORM from "./entidades/PedidoORM";
import ProdutoORM from "./entidades/ProdutoORM";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.HOST;
const username = process.env.DB_USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

if (!password) {
    throw new Error("La variable de entorno PASSWORD no está definida.");
  }

const AppDataSource = new DataSource({
    type: "postgres",
    host: host,
    port: 5432,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [ClienteORM, PedidoORM, ProdutoORM]
});

export default AppDataSource;

