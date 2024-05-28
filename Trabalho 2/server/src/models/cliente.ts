import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome_cliente: string

    @Column()
    email: string

    @Column({ type: 'date' })
    data_nascimento: string
}