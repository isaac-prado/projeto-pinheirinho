import axios, { AxiosInstance } from "axios";
import Customer from "../domain/customer";


export const customerMock: Customer[] = [
  { cpf: '123.456.789-00', telefone: '35 999111111', nome: 'John', saldo: 100.50, endereco: "Avenida BPS"},
  { cpf: '987.654.321-00', telefone: '35 999222222', nome: 'Ellen', saldo: 100.50, endereco: "Avenida BPS"},
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

  // Obter clientes
  async getCustomers(): Promise<Customer[]> {
    const response = await this.apiClient.get("/api/cliente/obterClientes");
    console.log(response.data);
    return response.data;
  }

  //Alterar Cliente
  async updateCustomer(customer: Customer): Promise<void> {
    try {
      await this.apiClient.put("/api/cliente", customer);
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      throw new Error("No se pudo actualizar el cliente");
    }
  }
}