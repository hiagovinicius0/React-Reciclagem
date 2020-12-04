import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Motorista } from "../models/Motorista";

class MotoristaController {
	static listarMotoristas = async (req: Request, res: Response) => {
		const motoristas = await createQueryBuilder(Motorista, "motoristas")
			.orderBy("motoristas.nome", "ASC")
			.getRawMany();

		res.send(motoristas);
	};

	static buscarMotorista = async (req: Request, res: Response) => {
		try {
			const motorista = await createQueryBuilder(Motorista, "motorista")
				.where("motorista.id = id", { id: req.params.id })
				.getRawOne();
			
			res.send(motorista);
		} catch (error) {
			res.status(404).send("Motorista não encontrado!");
		}
	};

	static novoMotorista = async (req: Request, res: Response) => {
		let motorista = new Motorista();

		let { nome, telefone } = req.body;
		motorista.nome = nome;
		motorista.telefone = telefone;

		const motoristaRepository = getRepository(Motorista);
		try {
			await motoristaRepository.save(motorista);
		} catch (e) {
			res.status(409).send(e);
			return;
		}

		res.status(200).send("Motorista criado!");
	};

	static editarMotorista = async (req: Request, res: Response) => {
		const motoristaRepository = getRepository(Motorista);
		let { nome, telefone, id } = req.body;
		try {
			let motorista = await motoristaRepository.findOneOrFail(id);
			motorista.nome = nome;
			motorista.telefone = telefone;
			await motoristaRepository.save(motorista);
		} catch (error) {
			res.status(404).send("Motorista não encontrado!");
			return;
		}

		res.status(200).send("Motorista editado!");
	};

	static excluirMotorista = async (req: Request, res: Response) => {
		let { id } = req.body;
		const motoristaRepository = getRepository(Motorista);
		let motorista: Motorista;
		try {
			motorista = await motoristaRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Motorista não encontrado!");
			return;
		}

		motoristaRepository.delete(id);

		res.status(200).send("Motorista excluído!");
	};
}

export default MotoristaController;
