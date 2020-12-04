import { Router } from "express";
import MotoristaController from "../app/controllers/MotoristaController";

const router = Router();

router.get("/motoristas", MotoristaController.listarMotoristas);

router.get("/motorista/:id([0-9]+)", MotoristaController.buscarMotorista);

router.post("/novo-motorista/", MotoristaController.novoMotorista);

router.post("/editar-motorista/", MotoristaController.editarMotorista);

router.delete("/excluir-motorista", MotoristaController.excluirMotorista);

export default router;
