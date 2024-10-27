import "reflect-metadata";
import express, { Express, Router } from "express";
import cors from "cors";
import clienteRouters from "./routers/clienteRouters";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/api", clienteRouters);

app.listen(8080, () => {
  console.log("Servidor Ouvindo");
});
