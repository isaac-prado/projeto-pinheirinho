import axios, { AxiosInstance } from "axios";
import Customer from "../domain/customer";


export const customerMock: Customer[] = [
  { cpf: '123.456.789-00', phone: '35 999111111', name: 'John', credit: 100.50, isActive: true },
  { cpf: '987.654.321-00', phone: '35 999222222', name: 'Ellen', credit: 100.50, isActive: true },
  ];

export default class CustomerService {
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