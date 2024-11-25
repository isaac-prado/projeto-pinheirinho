import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import PedidoORM from "./PedidoORM";

@Entity("cliente")
export default class ClienteORM {
    @PrimaryGeneratedColumn() 
    id!: number;

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

    @OneToMany(() => PedidoORM, pedido => pedido.cliente)
    pedidos!: PedidoORM[];
}
