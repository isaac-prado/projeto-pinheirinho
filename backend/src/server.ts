import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import clienteRouters from "./WebUI/routers/clienteRouters";
import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", clienteRouters);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000")
    });
  })
  .catch(e => {
    console.error(`Erro ao conectar no banco: ${e}`);
  });
