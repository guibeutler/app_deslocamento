'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { getDisplacementById } from '../services/getDisplacementById'
import { deleteDisplacementById } from '../services/deleteDisplacement'
import { updateDisplacement } from '../services/updateDisplacement'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
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
import IDisplacement from '@interfaces/displacement/displacement.interface'
import IDisplacementUpdate from '@interfaces/displacement/displacement.update.interface'

import './style.css'

export default function DisplacementDetailsPage({
	params,
}: {
	params: { displacementId: number }
}) {
	const [displacement, setDisplacement] = useState<IDisplacement>()
	const [isLoading, setIsLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [selectedDate, setSelectedDate] = useState(null)
	const [updatedDisplacement, setUpdatedDisplacement] =
		useState<IDisplacementUpdate>({} as IDisplacementUpdate)

	const router = useRouter()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	useEffect(() => {
		async function fetchDisplacementDetails() {
			try {
				const fetchedDisplacement = await getDisplacementById(
					params.displacementId
				)
				setDisplacement(fetchedDisplacement)
				setUpdatedDisplacement(fetchedDisplacement)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		fetchDisplacementDetails()
	}, [params.displacementId])

	const handleDeleteClick = async () => {
		try {
			await deleteDisplacementById(params.displacementId)
			router.back()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEditClick = () => {
		setUpdatedDisplacement(displacement as IDisplacement)
		setIsEditing(true)
	}

	const handleSaveClick = async () => {
		try {
			await updateDisplacement(params.displacementId, updatedDisplacement)
			setDisplacement(updatedDisplacement as IDisplacement)
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUpdatedDisplacement((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleDateChange = (date: any) => {
		const formattedDate = date.toISOString()
		setUpdatedDisplacement((prevState) => ({
			...prevState,
			fimDeslocamento: formattedDate,
		}))
		setSelectedDate(date)
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
								Editar Deslocamento
							</Typography>
							<Typography variant="h6" gutterBottom>
								ID: {displacement?.id}
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
									label="Id"
									disabled
									defaultValue={displacement?.id}
								/>
								<TextField
									fullWidth
									size="small"
									label="Km Final"
									disabled={!isEditing}
									name="kmFinal"
									value={
										isEditing
											? updatedDisplacement?.kmFinal
											: displacement?.kmFinal
									}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										slotProps={{ textField: { size: 'small' } }}
										disabled={!isEditing}
										label="Data fim"
										value={
											isEditing
												? dayjs(updatedDisplacement?.fimDeslocamento)
												: selectedDate
										}
										onChange={handleDateChange}
										format="DD/MM/YYYY"
									/>
								</LocalizationProvider>
								<TextField
									fullWidth
									size="small"
									label="Observação"
									disabled={!isEditing}
									name="observacao"
									value={
										isEditing
											? updatedDisplacement?.observacao
											: displacement?.observacao
									}
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
