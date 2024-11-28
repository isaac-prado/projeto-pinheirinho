import { IProdutoRepository } from "../../../core/aplicacao/contratos/iProdutoRepository";
import Produto from "../../../core/dominio/entidades/produto";
import ProdutoORM from "../../orm/entidades/ProdutoORM";
import { ProdutoMapper } from "../../../core/utils/ProdutoMapper";
import AppDataSource from "../../orm/config";

export class ProdutoRepository implements IProdutoRepository {
    private ormRepository = AppDataSource.getRepository(ProdutoORM);
  
    async adicionar(produto: Produto): Promise<Produto> {
      const produtoORM = ProdutoMapper.toPersistence(produto);
      const savedProduto = await this.ormRepository.save(produtoORM);
      return ProdutoMapper.toDomain(savedProduto);
    }
  
    async alterar(produto: Produto): Promise<Produto> {
      const produtoORM = ProdutoMapper.toPersistence(produto);
      const updatedProduto = await this.ormRepository.save(produtoORM);
      return ProdutoMapper.toDomain(updatedProduto);
    }
  
    async obterTodos(): Promise<Produto[]> {
      const produtosORM = await this.ormRepository.find({ relations: ["pedidos"] });
      return produtosORM.map(ProdutoMapper.toDomain);
    }
  
    async eliminar(id: number): Promise<void> {
      await this.ormRepository.delete(id);
    }
  }