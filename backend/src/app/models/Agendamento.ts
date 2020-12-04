import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Fornecedor } from "./Fornecedor";
import { Motorista } from "./Motorista";
import { Comprador } from "./Comprador";

@Entity('agendamentos')
export class Agendamento {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	idfornecedor: string;

	@ManyToOne(() => Fornecedor)
	@JoinColumn({name: 'idfornecedor'})
	fornecedor: Fornecedor;

	@Column()
	idmotorista: string;

	@ManyToOne(() => Motorista)
	@JoinColumn({name: 'idmotorista'})
	motorista: Motorista;

	@Column()
	idcomprador: string;

	@ManyToOne(() => Comprador)
	@JoinColumn({name: 'idcomprador'})
	comprador: Comprador;

	@Column()
	datahorario: Date;
}
