export default class Endereco {
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;

  constructor(
    logradouro: string,
    numero: number,
    complemento: string | undefined,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string
  ) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
  }
}
