import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import ClienteORM from "./ClienteORM";
import ProdutoORM from "./ProdutoORM";

@Entity("pedido")
export default class PedidoORM {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    data!: Date;

    @Column("decimal", { precision: 10, scale: 2 })
    valor!: number;

    @ManyToOne(() => ClienteORM, cliente => cliente.pedidos, { eager: true })
    cliente!: ClienteORM;

    @ManyToMany(() => ProdutoORM, produto => produto.pedidos, { eager: true })
    @JoinTable({
        name: "pedido_produto",
        joinColumn: { name: "pedido_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "produto_id", referencedColumnName: "id" },
    })
    produtos: ProdutoORM[];
}
