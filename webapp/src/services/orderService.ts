import axios, { AxiosInstance } from "axios";
import Order from "../domain/order";
import { customerMock } from "./customerService";


export const orderMock: Order[] = [
  { cod: "1", date: (new Date()).toUTCString(), customer: customerMock[0], totalAmount: 21.50 },
  { cod: "2", date: (new Date()).toUTCString(), customer: customerMock[1], totalAmount: 16.00 },
  { cod: "3", date: (new Date()).toUTCString(), customer: customerMock[0], totalAmount: 18.99 },
  { cod: "4", date: (new Date()).toUTCString(), customer: customerMock[1], totalAmount: 21.00 },
  ];

export default class OrderService {
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
          baseURL: 'http://localhost:8080/api/pedido',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    }

    public async create(order: Order) {
      var dto = {
        cpf: order.customer.cpf,
        pedido: {
          valor: order.totalAmount,
          produtos: [],
        }
      }

      try {
        var result = await this.apiClient.post("/", dto);

        if(result.status !==200)
          throw new Error("Error while trying create a order.")
      
        return;
      }catch(ex) {
        console.error(ex)
        alert("Ocorreu um erro. Verifique o saldo.")
      }
    }
    public async getAll(): Promise<Order[]> {
      try {
        const response = await this.apiClient.get("/");
        const orders = response.data.map((item: any) => ({
          date: new Date(item.data).toUTCString(),
          customer: { name: item.cliente, cpf: "" },
          totalAmount: parseFloat(item.valor),
        }));
  
        return orders.reverse();
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        throw new Error("Não foi possível carregar os pedidos.");
      }
  
    }

    

}