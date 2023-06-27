'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { getConductorById } from '../services/getConductorById'
import { deleteConductorById } from '../services/deleteConductor'
import { updateConductor } from '../services/updateConductor'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
	Button,
	Card,
	CircularProgress,
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
import IConductor from '@interfaces/conductor/conductor.interface'
import IConductorUpdate from '@interfaces/conductor/conduct.update.interface'

import './style.css'

export default function ConductorDetailsPage({
	params,
}: {
	params: { conductorId: number }
}) {
	const [conductor, setConductor] = useState<IConductor>()
	const [isLoading, setIsLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [selectedDate, setSelectedDate] = useState(null)
	const [updatedConductor, setUpdatedConductor] = useState<IConductorUpdate>(
		{} as IConductorUpdate
	)

	const router = useRouter()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	useEffect(() => {
		async function fetchConductorDetails() {
			try {
				const fetchedConductor = await getConductorById(params.conductorId)
				setConductor(fetchedConductor)
				setUpdatedConductor(fetchedConductor)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		fetchConductorDetails()
	}, [params.conductorId])

	const handleDeleteClick = async () => {
		try {
			await deleteConductorById(params.conductorId)
			router.back()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEditClick = () => {
		setUpdatedConductor(conductor as IConductor)
		setIsEditing(true)
	}

	const handleSaveClick = async () => {
		try {
			await updateConductor(params.conductorId, updatedConductor)
			setConductor(updatedConductor as IConductor)
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUpdatedConductor((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleDateChange = (date: any) => {
		const formattedDate = date.toISOString()
		setUpdatedConductor((prevState) => ({
			...prevState,
			vencimentoHabilitacao: formattedDate,
		}))
		setSelectedDate(date)
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<CircularProgress disableShrink />
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
								Condutor: {conductor?.nome}
							</Typography>
							<Typography variant="h6" gutterBottom>
								ID: {conductor?.id}
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
									disabled
									defaultValue={conductor?.nome}
								/>
								<TextField
									fullWidth
									size="small"
									label="Número Habilitação"
									disabled
									defaultValue={conductor?.numeroHabilitacao}
								/>
							</div>
							<div>
								<TextField
									fullWidth
									size="small"
									label="Categoria Habilitação"
									disabled={!isEditing}
									name="categoriaHabilitacao"
									value={
										isEditing
											? updatedConductor?.categoriaHabilitacao
											: conductor?.categoriaHabilitacao
									}
									onChange={handleInputChange}
								/>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										slotProps={{ textField: { size: 'small' } }}
										disabled={!isEditing}
										label="Vencimento"
										value={
											isEditing
												? dayjs(updatedConductor?.vencimentoHabilitacao)
												: selectedDate
										}
										onChange={handleDateChange}
										format="DD/MM/YYYY"
									/>
								</LocalizationProvider>
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
