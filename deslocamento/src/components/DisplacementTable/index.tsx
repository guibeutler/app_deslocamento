'use client'
import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	useTheme,
	useMediaQuery,
	TablePagination,
	Typography,
	Button,
	Chip,
	Tooltip,
} from '@mui/material'
import { Edit, Add } from '@mui/icons-material'
import IDisplacement from '@interfaces/displacement/displacement.interface'

import './style.css'

interface IDisplacementTableProps {
	data: IDisplacement[]
	onEdit: () => void
	onCreate: () => void
}

export default function TableDisplacement(props: IDisplacementTableProps) {
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
					<Typography variant="h6">NENHUM DESLOCAMENTO ENCONTRADO!</Typography>
					<Typography variant="h6">Deseja cadastrar?</Typography>
					<Button
						color="primary"
						variant="contained"
						onClick={() => onCreate()}
					>
						Adicionar Deslocamento
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
									<TableCell align="left" colSpan={isMobile ? 3 : 11}>
										<Typography variant="h6">Lista de Deslocamentos</Typography>
									</TableCell>
									<TableCell align="right">
										<IconButton onClick={() => onCreate()} color="success">
											<Add />
										</IconButton>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center">ID</TableCell>
									{!isMobile && (
										<TableCell align="center">Id Cliente</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">Id Condutor</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">Id Veículo</TableCell>
									)}
									{!isMobile && <TableCell align="center">Checklist</TableCell>}
									{!isMobile && <TableCell align="center">Motivo</TableCell>}
									{!isMobile && (
										<TableCell align="center">Km Inicial</TableCell>
									)}
									{!isMobile && <TableCell align="center">Km Final</TableCell>}
									<TableCell align="center">Data Início</TableCell>
									<TableCell align="center">Data Fim</TableCell>
									{!isMobile && (
										<TableCell align="center">Observações</TableCell>
									)}
									<TableCell align="center">Editar</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{slicedData.map((item) => (
									<TableRow key={item.id}>
										<TableCell align="center">{item.id}</TableCell>
										{!isMobile && (
											<TableCell align="center">{item.idCliente}</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">{item.idCondutor}</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">{item.idVeiculo}</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">
												<Chip
													size="small"
													color={
														item.checkList === 'Finalizado'
															? 'success'
															: item.checkList === 'Em andamento'
															? 'warning'
															: 'info'
													}
													label={item.checkList}
												/>
											</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">{item.motivo}</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">{item.kmInicial}</TableCell>
										)}
										{!isMobile && (
											<TableCell align="center">{item.kmFinal}</TableCell>
										)}
										<TableCell align="center">
											{dayjs(item.inicioDeslocamento).format('DD/MM/YYYY')}
										</TableCell>
										<TableCell align="center">
											{item && item.fimDeslocamento
												? dayjs(item.fimDeslocamento).format('DD/MM/YYYY')
												: '-'}
										</TableCell>
										{!isMobile && (
											<TableCell align="center">
												<Tooltip title={item.observacao}>
													<span>
														{item.observacao && item.observacao.length > 0
															? `${item.observacao.split(' ')[0]}...`
															: '-'}
													</span>
												</Tooltip>
											</TableCell>
										)}
										<TableCell align="center">
											<Link href={`/Displacements/${item.id}`}>
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
