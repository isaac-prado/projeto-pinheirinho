import { PedidoConsulta } from "../../../models/pedidoConsulta";

export interface IListarPedidos {
    executar(): Promise<PedidoConsulta[]>;
}