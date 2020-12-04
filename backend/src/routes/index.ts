import { Router } from "express";
import agendamento from "./agendamento";
import fornecedor from "./fornecedor";
import motorista from "./motorista";
import comprador from "./comprador";

const routes = Router();

routes.use("/agendamentos", [agendamento]);
routes.use("/motoristas", motorista);
routes.use("/fornecedores", fornecedor);
routes.use("/compradores", comprador);

export default routes;
