'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClientById } from '../services/getClientById'
import { deleteClientById } from '../services/deleteClient'
import { updateClient } from '../services/updateClient'
import Loader from '@components/Loader'
import {
	Button,
	Card,
	Box,
	TextField,
	CardContent,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import {
	ModeEdit,
	DeleteForever,
	Save,
	ArrowBackIosNewOutlined,
} from '@mui/icons-material'
import IClient from '@interfaces/client/client.interface'
import IClientUpdate from '@interfaces/client/client.update.interface'

import './style.css'

export default function ClientDetailsPage({
	params,
}: {
	params: { clientId: number }
}) {
	const [client, setClient] = useState<IClient>()
	const [isLoading, setIsLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [updatedClient, setUpdatedClient] = useState<IClientUpdate>(
		{} as IClientUpdate
	)

	const router = useRouter()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	useEffect(() => {
		async function fetchClientDetails() {
			try {
				const fetchedClient = await getClientById(params.clientId)
				setClient(fetchedClient)
				setUpdatedClient(fetchedClient)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		fetchClientDetails()
	}, [params.clientId])

	const handleDeleteClick = async () => {
		try {
			await deleteClientById(params.clientId)
			router.back()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEditClick = () => {
		setUpdatedClient(client as IClient)
		setIsEditing(true)
	}

	const handleSaveClick = async () => {
		try {
			await updateClient(params.clientId, updatedClient)
			setClient(updatedClient as IClient)
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUpdatedClient((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const getInputValue = (fieldName: keyof IClientUpdate) => {
		if (isEditing && updatedClient) {
			return updatedClient[fieldName] || ''
		}
		return client?.[fieldName] || ''
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Card
						sx={{
							maxWidth: isMobile ? '95%' : 500,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
						}}
						variant="outlined"
					>
						<CardContent
							style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
						>
							<Typography variant="h6" gutterBottom>
								Cliente: {client?.nome}
							</Typography>
							<Typography variant="h6" gutterBottom>
								ID: {client?.id}
							</Typography>
						</CardContent>
						<Box
							component="form"
							sx={{
								'& .MuiTextField-root': {
									m: 1,
									width: isMobile ? '95%' : '25ch',
								},
							}}
						>
							<div>
								<TextField
									fullWidth
									size="small"
									label="Nome"
									disabled={!isEditing}
									name="nome"
									value={getInputValue('nome')}
									onChange={handleInputChange}
								/>
								<TextField
									fullWidth
									size="small"
									label="Rua"
									disabled={!isEditing}
									name="logradouro"
									value={
										isEditing ? updatedClient?.logradouro : client?.logradouro
									}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<TextField
									fullWidth
									size="small"
									label="Número"
									disabled={!isEditing}
									name="numero"
									value={isEditing ? updatedClient?.numero : client?.numero}
									onChange={handleInputChange}
								/>
								<TextField
									fullWidth
									size="small"
									label="Bairro"
									disabled={!isEditing}
									name="bairro"
									value={isEditing ? updatedClient?.bairro : client?.bairro}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<TextField
									fullWidth
									size="small"
									label="Cidade"
									disabled={!isEditing}
									name="cidade"
									value={isEditing ? updatedClient?.cidade : client?.cidade}
									onChange={handleInputChange}
								/>
								<TextField
									fullWidth
									size="small"
									label="Estado"
									disabled={!isEditing}
									name="uf"
									value={isEditing ? updatedClient?.uf : client?.uf}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<TextField
									disabled
									label="Número do Doc"
									id="outlined-size-small"
									defaultValue={client?.numeroDocumento}
									size="small"
								/>
								<TextField
									disabled
									label="Tipo do Doc"
									id="outlined-size-small"
									defaultValue={client?.tipoDocumento}
									size="small"
								/>
							</div>
						</Box>
						<div
							style={{
								display: 'flex',
								gap: isMobile ? '8px' : '15px',
								padding: '12px 0px',
								width: '95%',
							}}
						>
							<Button
								size={isMobile ? 'small' : 'medium'}
								onClick={() => router.back()}
								fullWidth
								variant="contained"
								startIcon={<ArrowBackIosNewOutlined />}
							>
								Voltar
							</Button>
							{isEditing ? (
								<Button
									onClick={handleSaveClick}
									fullWidth
									color="success"
									variant="contained"
									startIcon={<Save />}
								>
									Salvar
								</Button>
							) : (
								<Button
									onClick={handleEditClick}
									color="primary"
									fullWidth
									variant="contained"
									startIcon={<ModeEdit />}
								>
									Editar
								</Button>
							)}
							<Button
								onClick={handleDeleteClick}
								color="error"
								fullWidth
								variant="contained"
								startIcon={<DeleteForever />}
							>
								Excluir
							</Button>
						</div>
					</Card>
				</>
			)}
		</div>
	)
}
