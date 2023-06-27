import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getAllClients } from '@app/Clients/services/getAllClients'
import { getAllVehicle } from '@app/Vehicles/services/getAllVehicle'
import { getAllConductors } from '@app/Conductors/services/getAllConductors'
import { createDisplacement } from '@app/Displacements/services/createDisplacement'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
	Box,
	Button,
	Typography,
	Modal,
	TextField,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import IDisplacementCreate from '@interfaces/displacement/displacement.create.interface'
import IClient from '@interfaces/client/client.interface'
import IConductor from '@interfaces/conductor/conductor.interface'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

import './style.css'

interface IModalCreateDisplacementProps {
	open: boolean
	onClose: () => void
}

const schema = yup.object().shape({
	kmInicial: yup.number().required('Km Inicial é obrigatório'),
	inicioDeslocamento: yup.string().required('Data de início é obrigatório'),
	checkList: yup.string().required('Checklist é obrigatório'),
	motivo: yup.string().required('Motivo é obrigatório'),
	observacao: yup.string(),
	idCondutor: yup.number().required('Id do condutor é obrigatório'),
	idVeiculo: yup.number().required('Id do veículo é obrigatório'),
	idCliente: yup.number().required('Id do cliente é obrigatório'),
})

export default function ModalCreateDisplacement(
	props: IModalCreateDisplacementProps
) {
	const { open, onClose } = props
	const [allClients, setAllClients] = useState<IClient[]>([])
	const [allConductors, setAllConductors] = useState<IConductor[]>([])
	const [allVehicles, setAllVehicles] = useState<IVehicle[]>([])
	const [checkList, setCheckList] = useState([])
	const [reason, setReason] = useState([])

	const handleCheckList = (event: any) => {
		setCheckList(event.target.value)
	}

	const handleReason = (event: any) => {
		setReason(event.target.value)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<IDisplacementCreate>({
		resolver: yupResolver(schema),
	})

	useEffect(() => {
		async function fetchData() {
			try {
				const clients = await getAllClients()
				const conductors = await getAllConductors()
				const vehicles = await getAllVehicle()
				setAllClients(clients)
				setAllConductors(conductors)
				setAllVehicles(vehicles)
			} catch (error) {
				console.error('Failed to fetch data:', error)
			}
		}
		fetchData()
	}, [])

	const onSubmit: SubmitHandler<IDisplacementCreate> = (data) => {
		const formattedDate = dayjs(data.inicioDeslocamento).toISOString()
		const newData = {
			...data,
			inicioDeslocamento: formattedDate,
		}
		createDisplacement(newData)
		reset()
		onClose()
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Box className="modal-box">
				<Typography variant="h5" component="h2" align="center">
					Cadastrar Deslocamento
				</Typography>
				<Typography sx={{ mt: 2 }}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						style={{
							padding: '8px',
							display: 'flex',
							flexDirection: 'column',
							gap: '10px',
						}}
					>
						<FormControl fullWidth size="small">
							<InputLabel>Cliente</InputLabel>
							<Select
								{...register('idCliente')}
								label="Id Cliente"
								name="idCliente"
								error={!!errors.idCliente}
							>
								{allClients.map((client) => (
									<MenuItem key={client.id} value={client.id}>
										{client.nome}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth size="small">
							<InputLabel>Condutor</InputLabel>
							<Select
								{...register('idCondutor')}
								label="Id Condutor"
								name="idCondutor"
								error={!!errors.idCondutor}
							>
								{allConductors.map((conductor) => (
									<MenuItem key={conductor.id} value={conductor.id}>
										{conductor.nome}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth size="small">
							<InputLabel>Veículo</InputLabel>
							<Select
								{...register('idVeiculo')}
								label="Id Condutor"
								name="idVeiculo"
								error={!!errors.idVeiculo}
							>
								{allVehicles.map((vehicle) => (
									<MenuItem key={vehicle.id} value={vehicle.id}>
										{vehicle.placa}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							{...register('kmInicial')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Km Inicial"
							variant="outlined"
							name="kmInicial"
						/>
						{errors.kmInicial && (
							<Typography variant="caption" color="error">
								{errors.kmInicial.message}
							</Typography>
						)}

						<FormControl fullWidth size="small">
							<InputLabel>Checklist</InputLabel>
							<Select
								{...register('checkList')}
								label="Check List"
								name="checkList"
								error={!!errors.checkList}
								value={checkList}
								onChange={handleCheckList}
							>
								<MenuItem value={'Não Iniciado'}>Não Iniciado</MenuItem>
								<MenuItem value={'Em andamento'}>Em andamento</MenuItem>
								<MenuItem value={'Finalizado'}>Finalizado</MenuItem>
							</Select>
						</FormControl>

						<Controller
							name="inicioDeslocamento"
							control={control}
							render={({ field, ...props }) => {
								return (
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<FormControl fullWidth size="small">
											<DatePicker
												label="Inicio Deslocamento"
												value={field.value}
												onChange={(date) => {
													field.onChange(date)
												}}
												format="DD/MM/YYYY"
											/>
										</FormControl>
									</LocalizationProvider>
								)
							}}
						/>
						{errors.inicioDeslocamento && (
							<Typography variant="caption" color="error">
								{errors.inicioDeslocamento.message}
							</Typography>
						)}

						<FormControl fullWidth size="small">
							<InputLabel>Motivo</InputLabel>
							<Select
								{...register('motivo')}
								label="Check List"
								name="motivo"
								error={!!errors.motivo}
								value={reason}
								onChange={handleReason}
							>
								<MenuItem value={'Trabalho'}>Trabalho</MenuItem>
								<MenuItem value={'Lazer'}>Lazer</MenuItem>
								<MenuItem value={'Outros'}>Outros</MenuItem>
							</Select>
						</FormControl>

						<TextField
							{...register('observacao')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Observação"
							variant="outlined"
							name="observacao"
						/>
						{errors.observacao && (
							<Typography variant="caption" color="error">
								{errors.observacao.message}
							</Typography>
						)}

						<Button
							type="submit"
							color="primary"
							fullWidth
							variant="contained"
							startIcon={<FileUploadIcon />}
						>
							Enviar
						</Button>
					</form>
				</Typography>
			</Box>
		</Modal>
	)
}
