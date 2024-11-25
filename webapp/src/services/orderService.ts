import axios, { AxiosInstance } from "axios";
import Order from "../domain/order";
import { customerMock } from "./customerService";


export const orderMock: Order[] = [
  { cod: "1", date: (new Date()).toUTCString(), name: "Isaac do Prado", totalAmount: 21.50 },
  { cod: "2", date: (new Date()).toUTCString(), name: "Isaac do Prado", totalAmount: 16.00 },
  { cod: "3", date: (new Date()).toUTCString(), name: "Isaac do Prado", totalAmount: 18.99 },
  { cod: "4", date: (new Date()).toUTCString(), name: "Isaac do Prado", totalAmount: 21.00 },
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