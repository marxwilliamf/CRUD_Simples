import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;


    
}
