import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Fornecedor } from "../models/Fornecedor";

class FornecedorController {
	static listarFornecedor = async (req: Request, res: Response) => {
		const fornecedores = await createQueryBuilder(Fornecedor, "fornecedor")
			.orderBy("fornecedor.nome", "ASC")
			.getRawMany();

		res.send(fornecedores);
	};

	static buscarFornecedor = async (req: Request, res: Response) => {
		try {
			const fornecedor = await createQueryBuilder(Fornecedor, "fornecedor")
				.where("fornecedor.id = id", { id: req.params.id })
				.getRawOne();
			
			res.send(fornecedor);
		} catch (error) {
			res.status(404).send("Fornecedor não encontrado!");
		}
	};

	static novoFornecedor = async (req: Request, res: Response) => {
		let fornecedor = new Fornecedor();

		let { nome } = req.body;
		fornecedor.nome = nome;

		const pacienteRepository = getRepository(Fornecedor);
		try {
			await pacienteRepository.save(fornecedor);
		} catch (e) {
			res.status(409).send(e);
			return;
		}

		res.status(200).send("Fornecedor criado!");
	};

	static editarFornecedor = async (req: Request, res: Response) => {
		const pacienteRepository = getRepository(Fornecedor);
		let { nome, id } = req.body;
		try {
			let fornecedor = await pacienteRepository.findOneOrFail(id);
			fornecedor.nome = nome;
			await pacienteRepository.save(fornecedor);
		} catch (error) {
			res.status(404).send("Fornecedor não encontrado!");
			return;
		}

		res.status(200).send("Fornecedor editado!");
	};

	static excluirFornecedor = async (req: Request, res: Response) => {
		let {id } = req.body;
		const pacienteRepository = getRepository(Fornecedor);
		let fornecedor: Fornecedor;
		try {
			fornecedor = await pacienteRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Fornecedor não encontrado!");
			return;
		}

		pacienteRepository.delete(id);

		res.status(200).send("Fornecedor excluído!");
	};
}

export default FornecedorController;
