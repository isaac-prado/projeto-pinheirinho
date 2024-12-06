import axios, { AxiosInstance } from "axios";
import Customer from "../domain/customer";


export const customerMock: Customer[] = [
  { cpf: '123.456.789-00', phone: '35 999111111', name: 'John', credit: 100.50, isActive: true },
  { cpf: '987.654.321-00', phone: '35 999222222', name: 'Ellen', credit: 100.50, isActive: true },
  ];

export default class CustomerService {
    public apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
          baseURL: 'http://localhost:8080/api/cliente',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    }

  public async create(customer: Customer): Promise<void> {
    var dto = {
      nome: customer.name,
      cpf: customer.cpf,
      endereco: "",
      telefone: customer.phone,
      saldo: "0"
    }

    var result = await this.apiClient.post("/", dto);

    if(result.status !== 201) 
      throw new Error("Error while creating customer.")

    return;
  }

  public async getAll(): Promise<Customer[]> {
    let result = await this.apiClient.get("/obterClientes");

    if(result.status !== 200)
      throw new Error("Error while getting customers.");
    
    let data = Array.isArray(result.data) ? result.data : []
    let customers: Customer[] = data.map(obj => ({
      cpf: obj.cpf, 
      name: obj.nome, 
      credit: obj.saldo ?? 0,
      phone: obj.telefone, 
      email: obj.email, 
      isActive: true, 
    }))

    return customers;
  }

    

}