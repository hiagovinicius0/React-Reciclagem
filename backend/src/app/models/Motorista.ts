import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('motoristas')
export class Motorista {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	nome: string;

	@Column()
	telefone: string;
}
