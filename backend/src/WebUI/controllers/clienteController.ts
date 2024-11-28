import express from "express";
import { ICriarCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iCriarCliente";
import { IConsultarCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iConsultarCliente";
import { IRemoverCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iRemoverCliente";
import { IAlterarCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iAlterarCliente";
import { IAdicionarSaldoCliente } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iAdicionarSaldoCliente";
import { IObterClientes } from "../../core/aplicacao/casosDeUso/clientes/interfaces/iObterClientes";

export class ClienteController {
    constructor(
        private readonly criarCliente: ICriarCliente,
        private readonly consultarCliente: IConsultarCliente,
        private readonly removerCliente: IRemoverCliente,
        private readonly alterarCliente: IAlterarCliente,
        private readonly adicionarSaldo: IAdicionarSaldoCliente,
        private readonly obterClientes: IObterClientes
    ) {}

    public rotaAdicionarSaldo = async (
        req: express.Request,
        res: express.Response
    ) => {
        const { cpf, valor } = req.body;
        await this.adicionarSaldo.executar(cpf, valor);
        res.send("Saldo adicionado com sucesso");
    };

    public rotaCriarCliente = async (req: express.Request, res: express.Response) => {
        try {
            const { nome, cpf, endereco, telefone, saldo, email } = req.body;
    
            console.log("Dados recebidos:", { nome, cpf, endereco, telefone, saldo, email });
    
            await this.criarCliente.executar(
                nome,
                cpf,
                endereco,
                telefone,
                saldo,
                email,
            );
    
            res.status(201).send("Cliente criado com sucesso");
        } catch (error) {
            
            console.error("Error al crear cliente:", error);
            res.status(500).send("Erro ao criar cliente");
        }
    };

    public rotaConsultarCliente = async (
        req: express.Request,
        res: express.Response
    ) => {
        var { cpf, nome } = req.body;
        const cliente = await this.consultarCliente.executar(cpf, nome);
        res.send(cliente);
    };

    public rotaRemoverCliente = async (req: express.Request, res: express.Response) => {
        try {
            const { cpf } = req.body;

            if (!cpf) {
                res.status(400).send("O CPF é obrigatório.");
                return;
            }

            await this.removerCliente.executar(cpf);
            res.send("Cliente removido com sucesso");
        } catch (error) {
            console.error("Erro ao remover cliente:", error);
            res.status(500).send("Erro ao remover cliente");
        }
    };

    public rotaAlterarCliente = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const { cpf, telefone, email, endereco, saldo } = req.body;
    
            if (!cpf) {
                res.status(400).send("O CPF é obligatorio para atualizar o cliente.");
                return;
            }
    
            await this.alterarCliente.executar(cpf, telefone, email, endereco, saldo);
    
            res.send("Cliente alterado com sucesso");
        } catch (error) {
            console.error("Erro ao alterar cliente:", error);
            res.status(500).send("Erro ao alterar cliente");
        }
    };

    public rotaObterClientes = async (
        req: express.Request,
        res: express.Response
    ) => {
        const clientes = await this.obterClientes.executar();
        res.send(clientes);
    };
}
