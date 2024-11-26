import axios, { AxiosInstance } from "axios";
import Order from "../domain/order";
import { customerMock } from "./customerService";


export const orderMock: Order[] = [
  { cod: "1", status: "Concluído", lista: "Talheres", pref: "Carne mal passada", date: (new Date()).toUTCString(), name: "Isaac do Prado", totalAmount: 21.50 },
  { cod: "2", status: "Concluído", lista: "Refrigerante", pref: "Nenhuma", date: (new Date()).toUTCString(), name: "Isaac do Prado", totalAmount: 18.50 },
  { cod: "3", status: "Concluído", lista: "Suco del valle", pref: "Nenhuma", date: (new Date()).toUTCString(), name: "Isaac do Prado", totalAmount: 16.00 },
  { cod: "4", status: "Em andamento", lista: "Talheres", pref: "Sem salada", date: (new Date()).toUTCString(), name: "Gabriel Amaral", totalAmount: 20.00 },
  { cod: "5", status: "Em andamento", lista: "Fritas", pref: "Carne ao ponto", date: (new Date()).toUTCString(), name: "Gustavo Custódio", totalAmount: 17.50 },
  ];

export default class OrderService {
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
          baseURL: '...',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    }


    

}