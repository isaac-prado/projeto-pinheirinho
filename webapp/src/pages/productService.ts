import axios from 'axios';
import Product from '../domain/product';

class ProductService {
  async getProducts(): Promise<Product[]> {
    const response = await axios.get('/api/products');
    return response.data;
  }

  async addProduct(product: Product): Promise<void> {
    await axios.post('/api/products', product);
  }

  async updateProduct(product: Product): Promise<void> {
    await axios.put(`/api/products/${product.id}`, product);
  }

  async removeProduct(productId: string): Promise<void> {
    await axios.delete(`/api/products/${productId}`);
  }
}

export default ProductService;