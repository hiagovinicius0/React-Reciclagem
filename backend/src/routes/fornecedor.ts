import { Router } from "express";
import FornecedorController from "../app/controllers/FornecedorController";

const router = Router();

router.get("/fornecedor/", FornecedorController.listarFornecedor);

router.get("/fornecedor/:id([0-9]+)", FornecedorController.buscarFornecedor);

router.post("/novo-fornecedor/", FornecedorController.novoFornecedor);

router.post("/editar-fornecedor/", FornecedorController.editarFornecedor);

router.delete("/excluir-fornecedor/", FornecedorController.excluirFornecedor);

export default router;
