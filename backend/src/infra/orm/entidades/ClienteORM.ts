import { Entity, Column, OneToMany } from "typeorm";
import PedidoORM from "./PedidoORM";

@Entity("cliente")
export default class ClienteORM {
    @Column()
    nome!: string;

    @Column({ unique: true })
    cpf!: string;

    @Column()
    endereco!: string;

    @Column()
    telefone!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    saldo!: number;

    @Column({ nullable: true })
    email?: string;

    @OneToMany(() => PedidoORM, pedido => pedido.cliente, { eager: true })
    pedidos!: PedidoORM[];
}
