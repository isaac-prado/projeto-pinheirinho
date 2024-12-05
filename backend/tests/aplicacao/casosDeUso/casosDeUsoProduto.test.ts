import { ObterTodosProdutos } from './../../../src/core/aplicacao/casosDeUso/produtos/obterTodosProdutos';
import { AdicionarProduto } from "../../../src/core/aplicacao/casosDeUso/produtos/adicionarProduto";
import { AlterarProduto } from "../../../src/core/aplicacao/casosDeUso/produtos/alterarProduto";
import { EliminarProduto } from "../../../src/core/aplicacao/casosDeUso/produtos/eliminarProduto";
import clienteOrmMock from '../../mocks/clienteOrm.mock';
import produtoMock from '../../mocks/produto.mock';

const produtoPrecoAlterado = {
    ...produtoMock,
    preco: 200.00
}

const produtoRepositoryMock = {
    adicionar: jest.fn().mockReturnValue(produtoMock),
    alterar: jest.fn().mockReturnValue(produtoPrecoAlterado),
    eliminar: jest.fn(),
    obterTodos: jest.fn().mockReturnValue([produtoMock])
}

const mockedClienteRepository = {
    alterarCliente: jest.fn(),
    removerCliente: jest.fn(),
    consultarCliente: jest.fn().mockReturnValue({...clienteOrmMock}),
    criarCliente: jest.fn(),
    obterClientes: jest.fn().mockReturnValue([clienteOrmMock]),
}

describe("Testes de unidade adicionar produto", () => {
    it("Deve adicionar um produto", async () => {
        const adicionarProduto = new AdicionarProduto(produtoRepositoryMock);

        const produtoAdicionado = await adicionarProduto.execute(
            produtoMock
        )

        expect(produtoRepositoryMock.adicionar).toHaveBeenCalled()
        expect(produtoAdicionado).toMatchObject(produtoMock)
    });
})

describe("Testes de unidade alterar produto", () => {
    it("Deve alterar um produto", async () => {
        const alterarProduto = new AlterarProduto(produtoRepositoryMock);

        const produtoAlterado = await alterarProduto.execute(
            produtoPrecoAlterado
        )

        expect(produtoRepositoryMock.alterar).toHaveBeenCalled()
        expect(produtoAlterado).toMatchObject(produtoPrecoAlterado)
        expect(produtoMock.preco).not.toBe(produtoPrecoAlterado.preco)
    })
})

describe("Testes de unidade eliminar produto", () => {
    it("Deve eliminar um produto", async () => {
        const eliminarProduto = new EliminarProduto(produtoRepositoryMock);

        await eliminarProduto.execute(
            produtoMock.id
        )

        expect(produtoRepositoryMock.eliminar).toHaveBeenCalled()
    })
})

describe("Testes de unidade obter todos produtos", () => {
    it("Deve obter todos os produtos", async () => {
        const obterTodosProdutos = new ObterTodosProdutos(produtoRepositoryMock);

        const produtos = await obterTodosProdutos.execute()

        expect(produtoRepositoryMock.obterTodos).toHaveBeenCalled()
        expect(produtos).toHaveLength(1)
    })
})