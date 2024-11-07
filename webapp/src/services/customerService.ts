import axios, { AxiosInstance } from "axios";


export const customerMock = [
  { cpf: '123.456.789-00', name: 'John', credit: 100.50, isActive: true },
  { cpf: '987.654.321-00', name: 'Ellen', credit: 100.50, isActive: true },
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