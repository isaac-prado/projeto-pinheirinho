import Produto from "../../src/core/dominio/entidades/produto";
import pedidoMock from "../mocks/pedido.mock";

describe("Testes de unidade da entidade Produto", () => {
    it("Deve criar um produto", () => {
        const produto = new Produto(12, "Teste", 10, 10.0, [pedidoMock]);
        expect(produto.id).toBe(12);
        expect(produto.nome).toBe("Teste");
        expect(produto.estoque).toBe(10);
        expect(produto.preco).toBe(10.0);
        expect(produto.pedidos.length).toBeGreaterThan(0);
    });
})
