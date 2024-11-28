import axios, { AxiosInstance } from "axios";
import Order from "../domain/order";

export const orderMock: Order[] = [
  {
      id: 1,
      data: new Date('2024-11-01'),
      valor: 200.50,
      produtos: [
          {
              id: 'p1',
              nome: 'Produto A',
              estoque: 2,
              preco: 50.25
          },
          {
              id: 'p2',
              nome: 'Produto B',
              estoque: 3,
              preco: 33.00
          }
      ],
      totalAmount: 200.50
  },
  {
      id: 2,
      data: new Date('2024-11-05'),
      valor: 150.75,
      produtos: [
          {
              id: 'p3',
              nome: 'Produto C',
              estoque: 1,
              preco: 150.75
          }
      ],
      totalAmount: 150.75
  },
  {
      id: 3,
      data: new Date('2024-11-10'),
      valor: 120.00,
      produtos: [
          {
              id: 'p1',
              nome: 'Produto A',
              estoque: 1,
              preco: 50.25
          },
          {
              id: 'p4',
              nome: 'Produto D',
              estoque: 2,
              preco: 35.00
          }
      ],
      totalAmount: 120.00
  }
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