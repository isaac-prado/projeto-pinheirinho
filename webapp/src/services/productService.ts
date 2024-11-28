import axios, { AxiosInstance } from 'axios';
import Product from '../pages/product';

export default class ProductService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.apiClient.get('/api/produto');
      return response.data;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw error;
    }
  }

  async addProduct(product: { nome: string; estoque: number; preco: number }): Promise<void> {
    try {
      await this.apiClient.post('/api/produto', product);  
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      throw error;  
    }
  }

  async updateProduct(product: Product): Promise<void> {
    try {
      await this.apiClient.put('/api/produto', product);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new Error('No se pudo actualizar el producto');
    }
  }

  async removeProduct(productId: number): Promise<void> {
    try {
      await this.apiClient.delete(`/api/produto/${productId}`);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new Error('No se pudo eliminar el producto');
    }
  }
}
