'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClientById } from '../services/getClientById'
import { deleteClientById } from '../services/deleteClient'
import { Button, Card, CircularProgress, Box, TextField } from '@mui/material'
import { ModeEdit, DeleteForever, Save } from '@mui/icons-material'
import IClient from '@interfaces/client/client.interface'

import './style.css'
import IClientUpdate from '@interfaces/client/client.update.interface'
import { updateClient } from '../services/updateClient'

export default function ClientDetailsPage({
	params,
}: {
	params: { clientId: number }
}) {
	const [client, setClient] = useState<IClient>()
	const [isLoading, setIsLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [updatedClient, setUpdatedClient] = useState<IClientUpdate>()
	const router = useRouter()

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
		setUpdatedClient(client)
		setIsEditing(true)
	}

	const handleSaveClick = async () => {
		try {
			await updateClient(params.clientId, updatedClient)
			setClient(updatedClient)
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
		<div className="card-container">
			{isLoading ? (
				<CircularProgress disableShrink />
			) : (
				<Card>
					<div className="header-card">
						<h2>
							Cliente: {client?.nome} | Id: {client?.id}
						</h2>
						<div>
							{isEditing ? (
								<Button onClick={handleSaveClick}>
									<Save fontSize="small" />
								</Button>
							) : (
								<Button onClick={handleEditClick}>
									<ModeEdit fontSize="small" />
								</Button>
							)}
							<Button onClick={handleDeleteClick} color="error">
								<DeleteForever fontSize="small" />
							</Button>
						</div>
					</div>

					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
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
				</Card>
			)}
		</div>
	)
}
