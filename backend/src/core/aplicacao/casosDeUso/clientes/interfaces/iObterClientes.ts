import Cliente from "../../../../dominio/entidades/cliente";

export interface IObterClientes {
    executar(): Promise<Cliente[]>;
  }
  