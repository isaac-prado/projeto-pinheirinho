import axios, { AxiosInstance } from "axios";
import Customer from "../domain/customer";


export const customerMock: Customer[] = [
  { cpf: '123.456.789-00', phone: '35 999111111', name: 'John', credit: 100.50, address: "Avenida BPS", isActive: true },
  { cpf: '987.654.321-00', phone: '35 999222222', name: 'Ellen', credit: 100.50, address: "Avenida BPS", isActive: true },
  ];

export default class CustomerService {
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
          baseURL: 'http://localhost:8080',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    }

    // Adicionar um novo cliente
  async addCustomer(customer: Customer): Promise<void> {
    await this.apiClient.post("/api/cliente", customer);
  }

  // Remover um cliente
  async removeCustomer(cpf: string): Promise<void> {
    await this.apiClient.delete("/api/cliente", { data: { cpf } });
  }
}