import axios, { AxiosInstance } from "axios";
import Order from "../domain/order";

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