import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createVehicle } from '@app/Vehicles/services/createVehicle'
import {
	Box,
	Button,
	Typography,
	Modal,
	TextField,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import IVehicleCreate from '@interfaces/vehicle/vehicle.create.interface'

import './style.css'

interface IVehicleModalProps {
	open: boolean
	onClose: () => void
}

const schema = yup.object().shape({
	placa: yup
		.string()
		.required('Placa é obrigatória')
		.min(7, 'Placa deve ter no mínimo 7 caracteres')
		.max(7, 'Placa deve ter no máximo 7 caracteres'),
	marcaModelo: yup
		.string()
		.required('Marca/Modelo são obrigatório')
		.min(3, 'Marca/Modelo deve ter no mínimo 3 caracteres')
		.max(15, 'Marca/Modelo deve ter no máximo 15 caracteres'),
	anoFabricacao: yup
		.number()
		.integer('O ano deve ser um número inteiro.')
		.required('Ano de fabricação é obrigatório'),

	kmAtual: yup
		.number()
		.integer('O km deve ser um número inteiro.')
		.required('Km atual é obrigatório'),
})

export default function ModalCreateVehicle(props: IVehicleModalProps) {
	const { open, onClose } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IVehicleCreate>({
		resolver: yupResolver(schema),
	})

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const onSubmit: SubmitHandler<IVehicleCreate> = (data) => {
		createVehicle(data)
		reset()
		onClose()
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Box className="modal-box" sx={{ maxWidth: isMobile ? '95%' : 500 }}>
				<Typography variant="h5" component="h2" align="center">
					Cadastrar Veículo
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
							{...register('placa')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Placa"
							variant="outlined"
							name="placa"
						/>
						{errors.placa && (
							<Typography variant="caption" color="error">
								{errors.placa.message}
							</Typography>
						)}
						<TextField
							{...register('marcaModelo')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Marca/Modelo"
							variant="outlined"
							name="marcaModelo"
						/>
						{errors.marcaModelo && (
							<Typography variant="caption" color="error">
								{errors.marcaModelo.message}
							</Typography>
						)}
						<TextField
							{...register('anoFabricacao')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Ano de fabricação"
							variant="outlined"
							name="anoFabricacao"
						/>
						{errors.anoFabricacao && (
							<Typography variant="caption" color="error">
								{errors.anoFabricacao.message}
							</Typography>
						)}
						<TextField
							{...register('kmAtual')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Km atual"
							variant="outlined"
							name="kmAtual"
						/>
						{errors.kmAtual && (
							<Typography variant="caption" color="error">
								{errors.kmAtual.message}
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
