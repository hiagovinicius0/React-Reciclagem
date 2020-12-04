import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Agendamento } from "../models/Agendamento";
import { Motorista } from "../models/Motorista";
import { Fornecedor } from "../models/Fornecedor";
import { Comprador } from "../models/Comprador";

class AgendamentoController {
	static listarAgendamentos = async (req: Request, res: Response) => {
		const agendamentos = await createQueryBuilder(Agendamento, "agendamento")
			.leftJoinAndSelect(Fornecedor, "fornecedor", "agendamento.idfornecedor = fornecedor.id")
			.leftJoinAndSelect(Motorista, "motorista", "agendamento.idmotorista = motorista.id")
			.leftJoinAndSelect(Comprador, "comprador", "agendamento.idcomprador = comprador.id")
			.orderBy("agendamento.id", "DESC")
			.select(["agendamento.id as id", "agendamento.datahorario","agendamento.idcomprador","comprador.nome", "fornecedor.id", "fornecedor.nome", "motorista.id", "motorista.nome"])
			.getRawMany();

		res.send(agendamentos);
	};

	static buscarAgendamento = async (req: Request, res: Response) => {
		try {
			const agendamento = await createQueryBuilder(Agendamento, "agendamento")
				.leftJoinAndSelect(Fornecedor, "fornecedor", "agendamento.idfornecedor = fornecedor.id")
				.leftJoinAndSelect(Motorista, "motorista", "agendamento.idmotorista = motorista.id")
				.where("agendamento.id = :id", { id: req.params.id })
				.getRawOne();

			res.send(agendamento);
		} catch (error) {
			res.status(404).send("Agendamento não encontrado!");
		}
	};

	static novoAgendamento = async (req: Request, res: Response) => {
		let agendamento = new Agendamento();

		let { idfornecedor, idmotorista, datahorario, idcomprador } = req.body;
		agendamento.idfornecedor = idfornecedor;
		agendamento.idmotorista = idmotorista;
		agendamento.datahorario = datahorario;
		agendamento.idcomprador = idcomprador;

		const agendamentoRepository = getRepository(Agendamento);
		try {
			await agendamentoRepository.save(agendamento);
		} catch (e) {
			res.status(409).send(e);
			return;
		}

		res.status(200).send("Agendamento criado!");
	};

	static editarAgendamento = async (req: Request, res: Response) => {
		const agendamentoRepository = getRepository(Agendamento);
		let { idfornecedor, idmotorista, datahorario, id, idcomprador} = req.body;
		try {
			let agendamento = await agendamentoRepository.findOneOrFail(id);
			agendamento.idfornecedor = idfornecedor;
			agendamento.idmotorista = idmotorista;
			agendamento.datahorario = datahorario;
			agendamento.idcomprador = idcomprador;
			await agendamentoRepository.save(agendamento);
		} catch (error) {
			res.status(404).send("Agendamento não encontrado!");
			return;
		}

		res.status(200).send("Agendamento editado!");
	};

	static excluirAgendamento = async (req: Request, res: Response) => {
		const agendamentoRepository = getRepository(Agendamento);
		let { id } = req.body;
		let agendamento: Agendamento;
		try {
			agendamento = await agendamentoRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Agendamento não encontrado!");
			return;
		}

		agendamentoRepository.delete(req.params.id);

		res.status(200).send("Agendamento excluído!");
	};
}

export default AgendamentoController;
