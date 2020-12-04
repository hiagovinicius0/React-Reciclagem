import { Router } from "express";
import CompradoresController from "../app/controllers/CompradoresController";

const router = Router();

router.get("/compradores/", CompradoresController.listarCompradores);

router.get("/comprador/:id([0-9]+)", CompradoresController.buscarComprador);

router.post("/novo-comprador/", CompradoresController.novoComprador);

router.post("/editar-comprador/", CompradoresController.editarComprador);

router.delete("/excluir-comprador/", CompradoresController.excluirComprador);

export default router;