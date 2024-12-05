import { AdicionarSaldoCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/adicionarSaldoCliente";
import { AlterarCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/alterarCliente";
import { CriarCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/criarCliente";
import { RemoverCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/removerCliente";
import { ObterClientes } from "../../../src/core/aplicacao/casosDeUso/clientes/obterClientes";
import { ConsultarCliente } from "../../../src/core/aplicacao/casosDeUso/clientes/consultarCliente";
import { ClienteRepository } from "../../../src/infra/sql/implementacoes/clienteRepository";

jest.mock("../../../src/infra/sql/implementacoes/clienteRepository");

// describe("Testes de unidade adicionar cliente", () => {
//     it("Deve criar um cliente", async () => {
//         const criarCliente = new CriarCliente(jest.mocked(ClienteRepository, true));
//     });
// });
