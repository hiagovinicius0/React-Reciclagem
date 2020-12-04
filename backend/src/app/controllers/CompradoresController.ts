import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Comprador } from "../models/Comprador";

class CompradoresController {
	static listarCompradores = async (req: Request, res: Response) => {
		const comprador = await createQueryBuilder(Comprador, "comprador")
			.orderBy("comprador.nome", "ASC")
			.getRawMany();

		res.send(comprador);
	};

	static buscarComprador = async (req: Request, res: Response) => {
		try {
			const comprador = await createQueryBuilder(Comprador, "comprador")
				.where("comprador.id = id", { id: req.params.id })
				.getRawOne();
			
			res.send(comprador);
		} catch (error) {
			res.status(404).send("Comprador não encontrado!");
		}
	};

	static novoComprador = async (req: Request, res: Response) => {
		let comprador = new Comprador();

		let { nome } = req.body;
		comprador.nome = nome;

		const pacienteRepository = getRepository(Comprador);
		try {
			await pacienteRepository.save(comprador);
		} catch (e) {
			res.status(409).send(e);
			return;
		}

		res.status(200).send("Comprador criado!");
	};

	static editarComprador = async (req: Request, res: Response) => {
		const compradorRepository = getRepository(Comprador);
		let { nome, id } = req.body;
		try {
			let comprador = await compradorRepository.findOneOrFail(id);
			comprador.nome = nome;
			await compradorRepository.save(comprador);
		} catch (error) {
			res.status(404).send("Comprador não encontrado!");
			return;
		}

		res.status(200).send("Comprador editado!");
	};

	static excluirComprador = async (req: Request, res: Response) => {
		let {id } = req.body;
		const pacienteRepository = getRepository(Comprador);
		let fornecedor: Comprador;
		try {
			fornecedor = await pacienteRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Comprador não encontrado!");
			return;
		}

		pacienteRepository.delete(id);

		res.status(200).send("Comprador excluído!");
	};
}

export default CompradoresController;
