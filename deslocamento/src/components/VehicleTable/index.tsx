'use client'
import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { generateRandomColor } from '@constants/colors'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Avatar,
	useTheme,
	useMediaQuery,
	TablePagination,
	Typography,
	Button,
} from '@mui/material'
import { Edit, Add } from '@mui/icons-material'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

import './style.css'

interface IVehicleTableProps {
	data: IVehicle[]
	onEdit: () => void
	onCreate: () => void
}

export default function VehicleTable(props: IVehicleTableProps) {
	const { data, onEdit, onCreate } = props

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 3 : 5)

	const handleEditClick = () => {
		onEdit()
	}

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const startIndex = page * rowsPerPage
	const endIndex = startIndex + rowsPerPage
	const slicedData = data.slice(startIndex, endIndex)

	return (
		<div className="main-container">
			{!data.length ? (
				<div
					style={{
						marginTop: '15px',
						boxShadow: 'rgba(0, 0, 0, 0.2) 15px 28px 25px -18px',
						borderRadius: '5px',
						width: isMobile ? 350 : 400,
						height: 200,
						backgroundColor: '#ffff',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '10px',
					}}
				>
					<Typography variant="h6">NENHUM VEÍCULO ENCONTRADO!</Typography>
					<Typography variant="h6">Deseja cadastrar?</Typography>
					<Button
						color="primary"
						variant="contained"
						onClick={() => onCreate()}
					>
						Adicionar Veículo
					</Button>
				</div>
			) : (
				<Paper>
					<TableContainer
						component={Paper}
						style={{
							maxWidth: '90vw',
							maxHeight: '75vh',
							boxShadow: 'rgba(0, 0, 0, 0.2) 15px 28px 25px -18px',
						}}
					>
						<Table size="small" stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left" colSpan={isMobile ? 3 : 6}>
										<Typography variant="h6">Lista de Veículos</Typography>
									</TableCell>
									<TableCell align="right">
										<IconButton onClick={() => onCreate()} color="success">
											<Add />
										</IconButton>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="left"></TableCell>
									<TableCell align="center">ID</TableCell>
									<TableCell align="center">Placa</TableCell>
									{!isMobile && <TableCell align="center">Modelo</TableCell>}
									{!isMobile && <TableCell align="center">Ano Fab.</TableCell>}
									{!isMobile && <TableCell align="center">Km Atual</TableCell>}
									<TableCell align="center">Editar</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{slicedData.map((item) => (
									<TableRow key={item.id}>
										<TableCell align="center">
											<Avatar
												style={{
													backgroundColor: generateRandomColor(),
												}}
											>
												{item.placa.charAt(0)}
											</Avatar>
										</TableCell>
										<TableCell align="center">{item.id}</TableCell>
										<TableCell align="center">{item.placa}</TableCell>
										{!isMobile && (
											<TableCell align="center">{item.marcaModelo}</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">{item.anoFabricacao}</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">{item.kmAtual}</TableCell>
										)}
										<TableCell align="center">
											<Link href={`/Vehicles/${item.id}`}>
												<IconButton
													onClick={() => handleEditClick()}
													color="primary"
												>
													<Edit />
												</IconButton>
											</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						<TablePagination
							rowsPerPageOptions={isMobile ? [3, 5] : [5, 10, 15]}
							component="div"
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							labelRowsPerPage="Qtd."
							labelDisplayedRows={({ from, to, count }) =>
								`${from}-${to} de ${count !== -1 ? count : 'mais de ' + to}`
							}
						/>
					</TableContainer>
				</Paper>
			)}
		</div>
	)
}
