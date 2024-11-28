import { Repository } from "typeorm";
import ClienteORM from "../../orm/entidades/ClienteORM";
import { IClienteRepository } from "../../../core/aplicacao/contratos/iClienteRepository";
import AppDataSource from "../../orm/config";

export class ClienteRepository implements IClienteRepository {
  private clienteRepository: Repository<ClienteORM>;

  constructor() {
    this.clienteRepository = AppDataSource.getRepository(ClienteORM);
  }

  async alterarCliente(cliente: ClienteORM): Promise<void> {
    const clienteExistente = await this.clienteRepository.findOneBy({ id: cliente.id });

    if (!clienteExistente) {
      throw new Error(`Cliente com ID ${cliente.id} não encontrado`);
    }

    if(typeof cliente.saldo === 'string') {
      cliente.saldo = parseFloat(cliente.saldo)
    }

    cliente.saldo = Number(cliente.saldo.toFixed(2));

    clienteExistente.nome = cliente.nome;
    clienteExistente.cpf = cliente.cpf;
    clienteExistente.telefone = cliente.telefone;
    clienteExistente.email = cliente.email;
    clienteExistente.saldo = cliente.saldo; 
    clienteExistente.endereco = cliente.endereco;

    
    await this.clienteRepository.save(clienteExistente);
  }

  async removerCliente(cpf: string): Promise<void> {
    console.log("Removendo cliente...");
    const cliente = await this.clienteRepository.findOneBy({ cpf });
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    await this.clienteRepository.remove(cliente);
  }

  async consultarCliente(cpf?: string, nome?: string): Promise<ClienteORM | null> {
    console.log("Consultando cliente...");

    if (cpf) {
      return this.clienteRepository.findOneBy({ cpf });  
    }

    if (nome) {
      return this.clienteRepository.findOneBy({ nome });  
    }

    return null;  
  }

  async criarCliente(
    nome: string,
    cpf: string,
    telefone: string,
    saldo: number,
    email: string,
    endereco: string,
  ): Promise<void> {
    console.log("Criando cliente...");
    const cliente = new ClienteORM();
    cliente.nome = nome;
    cliente.cpf = cpf;
    cliente.telefone = telefone;
    cliente.saldo = saldo;
    cliente.email = email;
    cliente.endereco = endereco;
    try {
      await this.clienteRepository.save(cliente); 
      console.log("Cliente guardado com sucesso:", cliente);
    } catch (error) {
      console.error("Erro ao guardar o cliente:", error);
      throw new Error("Não foi possivel guardar o cliente");
    }
  }

  async obterClientes(): Promise<ClienteORM[]> {
    console.log("Listando clientes...");
    return this.clienteRepository.find(); 
  }
}
