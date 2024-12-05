import Pedido from "../../src/core/dominio/entidades/pedido";
import clienteMock from "../mocks/cliente.mock";
import produtoMock from "../mocks/produto.mock";

describe("Testes de unidade da entidade Pedido", () => {
    let testedDate: Date;

    beforeEach(() => {
        testedDate = new Date(Date.now());
    });
    it("Deve criar um pedido", () => {
        const pedido = new Pedido(123456, testedDate, 100.0, clienteMock, [
            produtoMock,
        ]);
        expect(pedido.id).toBe(123456);
        expect(pedido.data).toBe(testedDate);
        expect(pedido.valor).toBe(100.0);
        expect(pedido.cliente).toBeDefined();
        expect(pedido.produtos.length).toBeGreaterThan(0);
    });
});
