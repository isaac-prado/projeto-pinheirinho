import { RemoverPedido } from './../../../src/core/aplicacao/casosDeUso/pedidos/removerPedido';
import { AdicionarPedido } from "../../../src/core/aplicacao/casosDeUso/pedidos/adicionarPedido";
import { AlterarPedido } from "../../../src/core/aplicacao/casosDeUso/pedidos/alterarPedido";
import { ListarPedidos } from '../../../src/core/aplicacao/casosDeUso/pedidos/listarPedidos';
import { ConsultarPedido } from '../../../src/core/aplicacao/casosDeUso/pedidos/consultarPedido';
import clienteOrmMock from '../../mocks/clienteOrm.mock';
import pedidoMock from '../../mocks/pedido.mock';
import clienteMock from '../../mocks/cliente.mock';
import pedidoConsultaMock from '../../mocks/pedidoConsulta.mock';

const mockedClienteRepository = {
    alterarCliente: jest.fn(),
    removerCliente: jest.fn(),
    consultarCliente: jest.fn().mockReturnValue({...clienteOrmMock}),
    criarCliente: jest.fn(),
    obterClientes: jest.fn().mockReturnValue([clienteOrmMock]),
}

const mockedPedidosRepository = {
    adicionarPedido: jest.fn(),
    consultarPedidosPorCliente: jest.fn().mockReturnValue([pedidoConsultaMock]),
    consultarPedidoPorId: jest.fn().mockReturnValue(pedidoMock),
    removerPedido: jest.fn(),
    listarTodosPedidos: jest.fn().mockReturnValue([pedidoMock]),
    alterarPedido: jest.fn()
}

describe("Testes de unidade adicionar pedido", () => {
    it("Não faz pedido por falta de saldo do cliente", async () => {
        const adicionarPedido = new AdicionarPedido(mockedPedidosRepository, mockedClienteRepository);

        await expect(adicionarPedido.executar(
            "123.456.789-00",
            pedidoMock
        )).rejects.toThrow()
    });

    it("Faz um pedido", async () => {
        const adicionarPedido = new AdicionarPedido(mockedPedidosRepository, mockedClienteRepository);

        const pedidoBarato = {...pedidoMock, valor: 50.00}

        await adicionarPedido.executar(
            "123.456.789-00",
            pedidoBarato
        )

        expect(mockedPedidosRepository.adicionarPedido).toHaveBeenCalled()
    });
})

describe("Testes de unidade alterar pedido", () => {
    it("Deve alterar um pedido", async () => {
        const alterarPedido = new AlterarPedido(mockedPedidosRepository);

        await alterarPedido.executar(
            pedidoMock.id,
            pedidoMock
        )

        expect(mockedPedidosRepository.alterarPedido).toHaveBeenCalled()
    })
})

describe("Testes de unidade remover pedido", () => {
    it("Deve remover um pedido", async () => {
        const removerPedido = new RemoverPedido(mockedPedidosRepository, mockedClienteRepository);

        await removerPedido.executar(
            pedidoMock.id
        )

        expect(mockedPedidosRepository.removerPedido).toHaveBeenCalled()
    })
})

describe("Testes de unidade listar pedidos", () => {
    it("Deve listar todos os pedidos", async () => {
        const listarPedidos = new ListarPedidos(mockedPedidosRepository);

        const pedidos = await listarPedidos.executar()

        expect(mockedPedidosRepository.listarTodosPedidos).toHaveBeenCalled()
        expect(pedidos.length).toBeGreaterThan(0)
    })
})

describe("Testes de unidade consultar pedido", () => {
    it("Deve consultar um pedido", async () => {
        const consultarPedido = new ConsultarPedido(mockedPedidosRepository);

        const pedidosConsultados = await consultarPedido.executar(
            clienteMock.cpf
        )

        expect(mockedPedidosRepository.consultarPedidosPorCliente).toHaveBeenCalled()
        expect(pedidosConsultados.length).toBeGreaterThan(0)
    })
})