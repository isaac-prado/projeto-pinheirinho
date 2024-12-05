import { AdicionarSaldoCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/adicionarSaldoCliente";
import { AlterarCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/alterarCliente";
import { CriarCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/criarCliente";
import { RemoverCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/removerCliente";
import { ObterClientes } from "../../../src/core/aplicacao/casosDeUso/clientes/obterClientes";
import { ConsultarCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/consultarCliente";
import { ClienteRepository } from "../../../src/infra/sql/implementacoes/clienteRepository";
import clienteMock from "../../mocks/cliente.mock";
import { hasUncaughtExceptionCaptureCallback } from "process";
import clienteOrmMock from "../../mocks/clienteOrm.mock";

const mockedClienteRepository = {
    alterarCliente: jest.fn(),
    removerCliente: jest.fn(),
    consultarCliente: jest.fn().mockReturnValue({...clienteOrmMock}),
    criarCliente: jest.fn(),
    obterClientes: jest.fn().mockReturnValue([clienteOrmMock]),
}


describe("Testes de unidade adicionar cliente", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("Deve criar um cliente", async () => {
        const criarCliente = new CriarCliente(mockedClienteRepository);

        await criarCliente.executar(
            "Fulano da Silva",
            "123.456.789-00",
            "Rua da Paz, 123",
            "11 99999-9999",
            100.00,
            "A@GMAIL.COM"
        )

        expect(mockedClienteRepository.criarCliente).toHaveBeenCalled()
    });
});


describe("Testes de unidade alterar cliente", () => {
    it("Deve alterar um cliente", async () => {
        const alterarCliente = new AlterarCliente(mockedClienteRepository);
        const novoTelefone = "35 99999-9999"

        await alterarCliente.executar(
            clienteMock.cpf,
            novoTelefone,
        )

        expect(mockedClienteRepository.alterarCliente).toHaveBeenCalled()
    })
})

describe("Testes de unidade remover cliente", () => {
    it("Não deixa remover um cliente pois possui saldo", async () => {
        const removerCliente = new RemoverCliente(mockedClienteRepository);

        await expect(removerCliente.executar(clienteMock.cpf)).rejects.toThrow()
    })

    it("Deve remover um cliente", async () => {
        const clienteSemSaldo = { ...clienteMock, saldo: 0 }
        mockedClienteRepository.consultarCliente.mockReturnValue(clienteSemSaldo)

        const removerCliente = new RemoverCliente(mockedClienteRepository);

        await removerCliente.executar(clienteMock.cpf)

        expect(mockedClienteRepository.removerCliente).toHaveBeenCalled()
    })
})

describe("Testes de unidade consultar cliente", () => {
    it("Deve consultar um cliente", async () => {
        const consultarCliente = new ConsultarCliente(mockedClienteRepository);

        const clienteConsultado = await consultarCliente.executar(
            clienteMock.cpf
        )

        expect(mockedClienteRepository.consultarCliente).toHaveBeenCalled()
        expect(clienteConsultado.cpf).toEqual(clienteMock.cpf)
        expect(clienteConsultado.nome).toEqual(clienteMock.nome)
    })
})

describe("Testes de unidade obter clientes", () => {
    it("Deve obter clientes", async () => {
        const obterClientes = new ObterClientes(mockedClienteRepository);

        const clientes = await obterClientes.executar()

        expect(mockedClienteRepository.obterClientes).toHaveBeenCalled()
        expect(clientes.length).toBeGreaterThan(0)
    })
})

describe("Testes de unidade adicionar saldo cliente", () => {
    it("Deve adicionar saldo ao cliente", async () => {
        const adicionarSaldoCliente = new AdicionarSaldoCliente(mockedClienteRepository);

        await adicionarSaldoCliente.executar(
            clienteMock.cpf,
            50.00
        )

        expect(mockedClienteRepository.alterarCliente).toHaveBeenCalled()
    })
} )

