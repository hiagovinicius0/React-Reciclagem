import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('fornecedores')
export class Fornecedor {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	nome: string;
}
