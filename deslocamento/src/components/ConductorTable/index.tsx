'use client'
import React, { ChangeEvent, useState } from 'react'
import dayjs from 'dayjs'
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
import IConductor from '@interfaces/conductor/conductor.interface'

import './style.css'

interface ITableConductorProps {
	data: IConductor[]
	onEdit: () => void
	onCreate: () => void
}

export default function TableConductors(props: ITableConductorProps) {
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
					className="empty-container"
					style={{
						width: isMobile ? 350 : 400,
						height: 200,
					}}
				>
					<Typography variant="h6">NENHUM CONDUTOR ENCONTRADO!</Typography>
					<Typography variant="h6">Deseja cadastrar?</Typography>
					<Button
						color="primary"
						variant="contained"
						onClick={() => onCreate()}
					>
						Adicionar Condutor
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
										<Typography variant="h6">Lista de Condutores</Typography>
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
									<TableCell align="center">Nome</TableCell>
									{!isMobile && (
										<TableCell align="center">Núm. Habilitação</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">Categ. Habilitação</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">Venc. Habilitação</TableCell>
									)}
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
												{item.nome.charAt(0)}
											</Avatar>
										</TableCell>
										<TableCell align="center">{item.id}</TableCell>
										<TableCell align="center">{item.nome}</TableCell>
										{!isMobile && (
											<TableCell align="center">
												{item.numeroHabilitacao}
											</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">
												{item.catergoriaHabilitacao.toUpperCase()}
											</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">
												{dayjs(item.vencimentoHabilitacao).format('DD/MM/YYYY')}
											</TableCell>
										)}
										<TableCell align="center">
											<Link href={`/Conductors/${item.id}`}>
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
