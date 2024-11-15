import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PedidoORM from "./pedidoORM";

@Entity("clientes")
export default class ClienteORM {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    cpf: string;

    @Column()
    endereco: object;

    @Column()
    telefone: string;

    @Column("decimal", { precision: 10, scale: 2 })
    saldo: number;

    @Column({ nullable: true })
    email?: string;

    @OneToMany(() => PedidoORM, pedido => pedido.cliente, { eager: true })
    pedidos: PedidoORM[];
}
