import 'reflect-metadata';
import { DataSource } from 'typeorm';
import ClienteORM from './infra/orm/entidades/ClienteORM';
import PedidoORM from './infra/orm/entidades/PedidoORM';
import ProdutoORM from './infra/orm/entidades/ProdutoORM';
    
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "pinheiro",
    password: "123",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [ClienteORM, PedidoORM, ProdutoORM],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/*.ts"]
});