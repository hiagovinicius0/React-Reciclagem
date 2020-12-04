import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField, Typography } from "@material-ui/core";
import { ColDef, DataGrid, ValueFormatterParams } from "@material-ui/data-grid";
import { Cancel, Schedule, Send, Delete, Edit } from "@material-ui/icons";
import moment from "moment";

export default function PaginaPrincipal() {
	const colunas: ColDef[] = [
		{ field: "id", headerName: "Código", width: 80 },
		{ field: "agendamento_dataHorario", headerName: "Data e Hora", width: 150 },
		{ field: "fornecedor_nome", headerName: "Fornecedor", width: 260 },
		{ field: "motorista_nome", headerName: "Motorista", width: 270 },
		{ field: "motorista_comprador", headerName: "Comprador", width: 270 },
		{
			field: "",
			headerName: "",
			renderCell: (params: ValueFormatterParams) => (
				<IconButton onClick={() => editarAgendamento(params.data)} color="default" title="Editar agendamento">
					<Edit />
				</IconButton>
			),
		},
		{
			field: "",
			headerName: "",
			renderCell: (params: ValueFormatterParams) => (
				<IconButton onClick={() => excluirAgendamento(params.data.id)} color="secondary" title="Excluir agendamento">
					<Delete />
				</IconButton>
			),
		},
	];

	const [dialogNovoAgendamento, setDialogNovoAgendamento] = useState(false);

	const abrirDialogNovoAgendamento = () => {
		setDialogNovoAgendamento(true);
	};

	const fecharDialogNovoAgendamento = () => {
		setDialogNovoAgendamento(false);
	};

	const [labelDialog, setLabelDialog] = useState("");

	const [agendamentos, setAgendamentos] = useState([]);

	const [idAgendamento, setIdAgendamento] = useState("");

	const [listaPacientes, setListaPacientes] = useState([]);

	const [fornecedor, setPaciente] = useState("");

	const mudarPaciente = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPaciente(event.target.value);
	};

	const [listaMedicos, setListaMedicos] = useState([]);

	const [motorista, setMedico] = useState("");

	const mudarMedico = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMedico(event.target.value);
	};

	const [dataHorario, setDataHorario] = useState("");

	const mudarDataHorario = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDataHorario(event.target.value);
	};

	const buscarDados = () => {
		Axios.get("http://localhost:3333/agendamento-consultas/agendamentos").then((response) => {
			setAgendamentos(response.data);
		});

		Axios.get("http://localhost:3333/agendamento-consultas/fornecedor").then((response) => {
			setListaPacientes(response.data);
		});

		Axios.get("http://localhost:3333/agendamento-consultas/motoristas").then((response) => {
			setListaMedicos(response.data);
		});
	};

	const salvarAgendamento = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (idAgendamento === "") {
			Axios.post("http://localhost:3333/agendamento-consultas/novo-agendamento", {
				dataHorario: moment(dataHorario).format("DD/MM/YYYY HH:mm"),
				idPaciente: fornecedor,
				idMedico: motorista,
			})
				.then((response) => {
					buscarDados();
					fecharDialogNovoAgendamento();
				})
				.catch((erro) => {
					console.log(erro);
				});
		} else {
			Axios.post(`http://localhost:3333/agendamento-consultas/editar-agendamento/${idAgendamento}`, {
				dataHorario: moment(dataHorario).format("DD/MM/YYYY HH:mm"),
				idPaciente: fornecedor,
				idMedico: motorista,
			})
				.then((response) => {
					buscarDados();
					fecharDialogNovoAgendamento();
				})
				.catch((erro) => {
					console.log(erro);
				});
		}
	};

	const novoAgendamento = () => {
		setIdAgendamento("");
		setPaciente("");
		setMedico("");
		setDataHorario("");

		setLabelDialog("Novo agendamento");
		abrirDialogNovoAgendamento();
	};

	const editarAgendamento = (agendamento: any) => {
		setIdAgendamento(agendamento.id);
		setPaciente(agendamento.fornecedor);
		setMedico(agendamento.motorista_id);
		setDataHorario(moment(agendamento.agendamento_dataHorario, "DD/MM/YYYY HH:mm").format("YYYY-MM-DDTHH:mm"));

		setLabelDialog("Editar agendamento");
		abrirDialogNovoAgendamento();
	};

	const excluirAgendamento = (id: any) => {
		Axios.delete(`http://localhost:3333/agendamento-consultas/excluir-agendamento/${id}`)
			.then((response) => {
				buscarDados();
			})
			.catch((erro) => {
				console.log(erro);
			});
	};

	useEffect(() => {
		buscarDados();
	}, []);

	return (
		<Box>
			<Container>
				<Typography variant="h4" align="center" color="primary" style={{ marginBottom: 5 }}>
				Entrega de Reciclagem
				</Typography>
				<Button onClick={novoAgendamento} variant="contained" color="primary" startIcon={<Schedule />} style={{ marginBottom: 10 }}>
				Entregar de Reciclagem
				</Button>
				<DataGrid rows={agendamentos} columns={colunas} pageSize={10} autoHeight />
			</Container>
			<Dialog open={dialogNovoAgendamento} onClose={fecharDialogNovoAgendamento} maxWidth={"md"} fullWidth>
				<DialogTitle>{labelDialog}</DialogTitle>
				<form onSubmit={salvarAgendamento}>
					<DialogContent>
						<input type="hidden" value={idAgendamento} />
						<TextField select label="fornecedor" value={fornecedor} required onChange={mudarPaciente} InputLabelProps={{ shrink: true }} margin="dense" fullWidth variant="outlined">
							{listaPacientes.map((opcao: any) => (
								<MenuItem key={opcao.fornecedor_id} value={opcao.fornecedor_id}>
									{opcao.fornecedor_nome}
								</MenuItem>
							))}
						</TextField>
						<TextField select label="Motorista" value={motorista} required onChange={mudarMedico} InputLabelProps={{ shrink: true }} margin="dense" fullWidth variant="outlined">
							{listaMedicos.map((opcao: any) => (
								<MenuItem key={opcao.motorista_id} value={opcao.motorista_id}>
									{opcao.motorista_comprador} | {opcao.motorista_nome}
								</MenuItem>
							))}
						</TextField>
						<TextField value={dataHorario} onChange={mudarDataHorario} required label="Data e Hora" type="datetime-local" InputLabelProps={{ shrink: true }} margin="dense" fullWidth variant="outlined" />
					</DialogContent>
					<DialogActions>
						<Button onClick={fecharDialogNovoAgendamento} color="default" endIcon={<Cancel />} variant="contained">
							Cancelar
						</Button>
						<Button type="submit" color="primary" endIcon={<Send />} variant="contained">
							Salvar
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Box>
	);
}
