import { Router } from "express";
import AgendamentoController from "../app/controllers/AgendamentoController";

const router = Router();

router.get("/agendamentos/", AgendamentoController.listarAgendamentos);

router.get("/agendamento/:id", AgendamentoController.buscarAgendamento);

router.post("/novo-agendamento/", AgendamentoController.novoAgendamento);

router.post("/editar-agendamento/", AgendamentoController.editarAgendamento);

router.delete("/excluir-agendamento/", AgendamentoController.excluirAgendamento);

export default router;
