import Cliente from "../../src/core/dominio/entidades/cliente";
import clienteMock from "../mocks/cliente.mock";

describe('Testes de unidade da entidade Cliente', () => {
    it('Deve criar um cliente', () => {
        const cliente = new Cliente('Fulano da Silva', '123.456.789-00', 'Rua da Paz, 123', '11 99999-9999', 100.00);
        expect(cliente.nome).toBe('Fulano da Silva');
        expect(cliente.cpf).toBe('123.456.789-00');
        expect(cliente.endereco).toBe('Rua da Paz, 123');
        expect(cliente.telefone).toBe('11 99999-9999');
        expect(cliente.saldo).toBe(100.00);
    })
    it('Deve adicionar saldo ao cliente', () => {
        const cliente = new Cliente('Fulano da Silva', '123.456.789-00', 'Rua da Paz, 123', '11 99999-9999', 100.00);
        cliente.adicionarSaldo(50.00);
        expect(cliente.saldo).toBe(150.00);
    });
    it('Deve descontar saldo do cliente', () => {
        const cliente = new Cliente('Fulano da Silva', '123.456.789-00', 'Rua da Paz, 123', '11 99999-9999', 100.00);
        cliente.descontarSaldo(50.00);
        expect(cliente.saldo).toBe(50.00);
    });
    it('Deve verificar se o cliente pode ser removido', () => {
        const cliente = new Cliente('Fulano da Silva', '123.456.789-00', 'Rua da Paz, 123', '11 99999-9999', 100.00);
        expect(cliente.podeSerRemovido()).toBe(false);
        cliente.descontarSaldo(100.00);
        expect(cliente.podeSerRemovido()).toBe(true);
    });
});
