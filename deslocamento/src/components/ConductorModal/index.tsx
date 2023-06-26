import React from 'react'
import { createConductor } from '@app/Conductors/services/createConductor'
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
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import IConductorCreate from '@interfaces/conductor/conductor.create.interface'

import './style.css'
import dayjs from 'dayjs'

interface IModalCreateConductorProps {
	open: boolean
	onClose: () => void
}

const schema = yup.object().shape({
	nome: yup
		.string()
		.required('Nome é obrigatório')
		.min(8, 'Nome deve ter no mínimo 8 caracteres')
		.max(50, 'Nome deve ter no máximo 50 caracteres'),
	numeroHabilitacao: yup
		.string()
		.required('Número da Habilitação é obrigatório')
		.min(5, 'Número da habilitação deve ter no mínimo 5 caracteres')
		.max(10, 'Número da habilitação deve ter no máximo 10 caracteres'),
	categoriaHabilitacao: yup
		.string()
		.required('Categoria da habilitação é obrigatório')
		.min(1, 'Categoria da habilitação deve ter no mínimo 1 caracter')
		.max(10, 'Categoria da habilitação deve ter no máximo 5 caracteres'),
	vencimentoHabilitacao: yup
		.string()
		.required('Vencimento da habilitação é obrigatório'),
})

export default function ModalCreateConductor(
	props: IModalCreateConductorProps
) {
	const { open, onClose } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<IConductorCreate>({
		resolver: yupResolver(schema),
	})
	const onSubmit: SubmitHandler<IConductorCreate> = (data) => {
		const formattedDate = dayjs(data.vencimentoHabilitacao).toISOString()
		const newData = {
			...data,
			vencimentoHabilitacao: formattedDate,
		}
		createConductor(newData)
		reset()
		onClose()
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Box className="modal-box">
				<Typography variant="h5" component="h2" align="center">
					Cadastrar Condutor
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
						<TextField
							{...register('nome')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Nome"
							variant="outlined"
							name="nome"
						/>
						{errors.nome && (
							<Typography variant="caption" color="error">
								{errors.nome.message}
							</Typography>
						)}
						<TextField
							{...register('numeroHabilitacao')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Número Habilitação"
							variant="outlined"
							name="numeroHabilitacao"
						/>
						{errors.numeroHabilitacao && (
							<Typography variant="caption" color="error">
								{errors.numeroHabilitacao.message}
							</Typography>
						)}
						<TextField
							{...register('categoriaHabilitacao')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Categoria Habilitação"
							variant="outlined"
							name="categoriaHabilitacao"
						/>
						{errors.categoriaHabilitacao && (
							<Typography variant="caption" color="error">
								{errors.categoriaHabilitacao.message}
							</Typography>
						)}
						<Controller
							name="vencimentoHabilitacao"
							control={control}
							render={({ field, ...props }) => {
								return (
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<FormControl size="small">
											<DatePicker
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
						{errors.vencimentoHabilitacao && (
							<Typography variant="caption" color="error">
								{errors.vencimentoHabilitacao.message}
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
