'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getVehicleById } from '../services/getVehicleById'
import { deleteVehicleById } from '../services/deleteVehicle'
import { updateVehicle } from '../services/updateVehicle'
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
import IVehicle from '@interfaces/vehicle/vehicle.interface'
import IVehicleUpdate from '@interfaces/vehicle/vehicle.update.interface'

import './style.css'

export default function VehicleDetailsPage({
	params,
}: {
	params: { vehicleId: number }
}) {
	const [vehicle, setVehicle] = useState<IVehicle>()
	const [isLoading, setIsLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [updatedVehicle, setUpdateVehicle] = useState<IVehicleUpdate>(
		{} as IVehicleUpdate
	)

	const router = useRouter()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	useEffect(() => {
		async function fetchVehicleDetails() {
			try {
				const fetchedVehicle = await getVehicleById(params.vehicleId)
				setVehicle(fetchedVehicle)
				setUpdateVehicle(fetchedVehicle)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		fetchVehicleDetails()
	}, [params.vehicleId])

	const handleDeleteClick = async () => {
		try {
			await deleteVehicleById(params.vehicleId)
			router.back()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEditClick = () => {
		setUpdateVehicle(vehicle as IVehicle)
		setIsEditing(true)
	}

	const handleSaveClick = async () => {
		try {
			await updateVehicle(params.vehicleId, updatedVehicle)
			setVehicle(updatedVehicle as IVehicle)
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUpdateVehicle((prevState) => ({
			...prevState,
			[name]: value,
		}))
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
							boxShadow: 'rgba(0, 0, 0, 0.2) 15px 28px 25px -18px',
						}}
						variant="outlined"
					>
						<CardContent
							style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
						>
							<Typography variant="h6" gutterBottom>
								Placa: {vehicle?.placa}
							</Typography>
							<Typography variant="h6" gutterBottom>
								ID: {vehicle?.id}
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
									label="Placa"
									disabled
									defaultValue={vehicle?.placa}
								/>
								<TextField
									fullWidth
									size="small"
									label="Marca Modelo"
									disabled={!isEditing}
									name="marcaModelo"
									value={
										isEditing
											? updatedVehicle?.marcaModelo
											: vehicle?.marcaModelo
									}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<TextField
									fullWidth
									size="small"
									label="Ano Fabricação"
									disabled={!isEditing}
									name="anoFabricacao"
									value={
										isEditing
											? updatedVehicle?.anoFabricacao
											: vehicle?.anoFabricacao
									}
									onChange={handleInputChange}
								/>
								<TextField
									fullWidth
									size="small"
									label="Km Atual"
									disabled={!isEditing}
									name="kmAtual"
									value={isEditing ? updatedVehicle?.kmAtual : vehicle?.kmAtual}
									onChange={handleInputChange}
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
