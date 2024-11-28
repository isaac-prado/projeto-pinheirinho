import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import PedidoORM from "./PedidoORM";

@Entity('produtos')
export default class ProdutoORM {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    estoque: number;

    @Column('decimal', { precision: 10, scale: 2 })
    preco: number;

    @ManyToMany(() => PedidoORM)
    @JoinTable({
        name: 'produto_pedido',
        joinColumn: {
            name: 'produto_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'pedido_id',
            referencedColumnName: 'id'
        }
    })
    pedidos: PedidoORM[];
}
