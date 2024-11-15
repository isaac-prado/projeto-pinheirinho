import { IsNumber, IsPositive, IsString, IsArray, ValidateNested } from "class-validator";
import Pedido from "./pedido";

export default class Produto {
    @IsString()
    nome: string;

    @IsPositive()
    @IsNumber()
    estoque: number;

    @IsPositive()
    @IsNumber()
    preco: number;

    @IsArray()
    @ValidateNested({ each: true })
    pedido: Pedido[];

    constructor(nome: string, estoque: number, preco: number, pedido: Pedido[]) {
        this.nome = nome;
        this.estoque = estoque;
        this.preco = preco;
        this.pedido = pedido;
    }
}