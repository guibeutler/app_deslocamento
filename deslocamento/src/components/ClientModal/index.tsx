import React from 'react'
import { createClient } from '@app/Clients/services/createClient'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
	Box,
	Button,
	Typography,
	Modal,
	TextField,
	Select,
	MenuItem,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import IClientCreate from '@interfaces/client/client.create.interface'
import UF from './mockUf.json'

import './style.css'

interface IModalCreateClientProps {
	open: boolean
	onClose: () => void
}

const schema = yup.object().shape({
	nome: yup
		.string()
		.required('Nome é obrigatório')
		.min(8, 'Nome deve ter no mínimo 8 caracteres')
		.max(50, 'Nome deve ter no máximo 50 caracteres'),
	logradouro: yup
		.string()
		.required('Logradouro é obrigatório')
		.min(10, 'Logradouro deve ter no mínimo 10 caracteres')
		.max(50, 'Logradouro deve ter no máximo 50 caracteres'),
	numero: yup
		.string()
		.required('Número é obrigatório')
		.min(1, 'Número deve ter no mínimo 1 caracter')
		.max(10, 'Número deve ter no máximo 10 caracteres'),
	bairro: yup
		.string()
		.required('Bairro é obrigatório')
		.min(6, 'Bairro deve ter no mínimo 6 caracteres')
		.max(50, 'Bairro deve ter no máximo 50 caracteres'),
	cidade: yup
		.string()
		.required('Cidade é obrigatório')
		.min(3, 'Cidade deve ter no mínimo 3 caracteres')
		.max(50, 'Cidade deve ter no máximo 50 caracteres'),
	uf: yup.string().required('Estado é obrigatório'),
	numeroDocumento: yup
		.string()
		.required('Nome é obrigatório')
		.min(5, 'Número do documento deve ter no mínimo 5 caracteres')
		.max(50, 'Número do documento deve ter no máximo 50 caracteres'),
	tipoDocumento: yup
		.string()
		.required('Tipo do documento é obrigatório')
		.min(2, 'Tipo do documento deve ter no mínimo 3 caracteres')
		.max(50, 'Tipo do documento deve ter no máximo 50 caracteres'),
})

export default function ModalCreateClient(props: IModalCreateClientProps) {
	const { open, onClose } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IClientCreate>({
		resolver: yupResolver(schema),
	})
	const onSubmit: SubmitHandler<IClientCreate> = (data) => {
		createClient(data)
		console.log('createCliente: cliquei')
		reset()
		onClose()
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Box className="modal-box">
				<Typography variant="h5" component="h2" align="center">
					Cadastrar Cliente
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
							{...register('logradouro')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Rua"
							variant="outlined"
							name="logradouro"
						/>
						{errors.logradouro && (
							<Typography variant="caption" color="error">
								{errors.logradouro.message}
							</Typography>
						)}
						<TextField
							{...register('numero')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Número"
							variant="outlined"
							name="numero"
						/>
						{errors.numero && (
							<Typography variant="caption" color="error">
								{errors.numero.message}
							</Typography>
						)}
						<TextField
							{...register('bairro')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Bairro"
							variant="outlined"
							name="bairro"
						/>
						{errors.bairro && (
							<Typography variant="caption" color="error">
								{errors.bairro.message}
							</Typography>
						)}
						<TextField
							{...register('cidade')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Cidade"
							variant="outlined"
							name="cidade"
						/>
						{errors.cidade && (
							<Typography variant="caption" color="error">
								{errors.cidade.message}
							</Typography>
						)}
						<Select
							{...register('uf')}
							fullWidth
							size="small"
							id="outlined-basic"
							label="Estado"
							variant="outlined"
							name="uf"
							error={!!errors.uf}
						>
							{UF.estadosDoBrasil.map((estado) => (
								<MenuItem key={estado} value={estado}>
									{estado}
								</MenuItem>
							))}
						</Select>
						<TextField
							{...register('numeroDocumento')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Número do documento"
							variant="outlined"
							name="numeroDocumento"
						/>
						{errors.numeroDocumento && (
							<Typography variant="caption" color="error">
								{errors.numeroDocumento.message}
							</Typography>
						)}
						<TextField
							{...register('tipoDocumento')}
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Tipo de documento"
							variant="outlined"
							name="tipoDocumento"
						/>
						{errors.tipoDocumento && (
							<Typography variant="caption" color="error">
								{errors.tipoDocumento.message}
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
