import { AdicionarSaldoCliente } from '../../core/aplicacao/casosDeUso/clientes/adicionarSaldoCliente';
import { AlterarCliente } from '../../core/aplicacao/casosDeUso/clientes/alterarCliente';
import { ConsultarCliente } from '../../core/aplicacao/casosDeUso/clientes/consultarCliente';
import { CriarCliente } from '../../core/aplicacao/casosDeUso/clientes/criarCliente';
import { RemoverCliente } from '../../core/aplicacao/casosDeUso/clientes/removerCliente';
import { ClienteController } from '../controllers/clienteController';
import { ClienteRepository } from './../../infra/sql/implementacoes/clienteRepository';
const clienteRepository = new ClienteRepository();

const criarCliente = new CriarCliente(clienteRepository);
const consultarCliente = new ConsultarCliente(clienteRepository);
const removerCliente = new RemoverCliente(clienteRepository);
const alterarCliente = new AlterarCliente(clienteRepository);
const adicionarSaldo = new AdicionarSaldoCliente(clienteRepository);


export function clienteControllerBuilder() {
    return new ClienteController(criarCliente, consultarCliente, removerCliente, alterarCliente, adicionarSaldo);
}