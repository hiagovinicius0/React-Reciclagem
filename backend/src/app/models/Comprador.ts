import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('compradores')
export class Comprador {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	nome: string;

}