import { IsArray, IsDate, IsNumber, ValidateNested } from "class-validator";
import Cliente from "./cliente";
import Produto from "./produto";

export default class Pedido {
    @IsDate()
    data: Date;

    @IsNumber()
    valor: number;

    @ValidateNested()
    cliente: Cliente;

    @IsArray()
    @ValidateNested({ each: true })
    produto: Produto[];

    constructor(data: Date, valor: number, cliente: Cliente, produto: Produto[]) {
        this.data = data;
        this.valor = valor;
        this.cliente = cliente;
        this.produto = produto;
    }
}