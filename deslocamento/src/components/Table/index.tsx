'use client'
import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link'
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

import './style.css'
import IClient from '@interfaces/client/client.interface'
import { createClient } from '@app/Clients/services/createClient'

const generateRandomColor = () => {
	const hue = Math.floor(Math.random() * 360)
	const saturation = 70
	const lightness = 50
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

interface ITableClientProps {
	data: IClient[]
	onEdit: () => void
	onCreate: () => void
}

export default function TableClients(props: ITableClientProps) {
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
		console.log('newPage', newPage)
	}

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
		console.log(event)
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
					<Typography variant="h6">NENHUM CLIENTE ENCONTRADO!</Typography>
					<Typography variant="h6">Deseja cadastrar?</Typography>
					<Button
						color="primary"
						variant="contained"
						onClick={() => onCreate()}
					>
						Adicionar Cliente
					</Button>
				</div>
			) : (
				<TableContainer
					component={Paper}
					style={{ maxWidth: '95vw', maxHeight: '95vh' }}
				>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell align="left" colSpan={isMobile ? 3 : 10}>
									<Typography variant="h6">Lista de Clientes</Typography>
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
								{!isMobile && <TableCell align="center">Rua</TableCell>}
								{!isMobile && <TableCell align="center">Número</TableCell>}
								{!isMobile && <TableCell align="center">Bairro</TableCell>}
								{!isMobile && <TableCell align="center">Cidade</TableCell>}
								{!isMobile && <TableCell align="center">Estado</TableCell>}
								{!isMobile && <TableCell align="center">Número Doc</TableCell>}
								{!isMobile && <TableCell align="center">Tipo Doc</TableCell>}
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
										<TableCell align="center">{item.logradouro}</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">{item.numero}</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">{item.bairro}</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">{item.cidade}</TableCell>
									)}
									{!isMobile && <TableCell align="center">{item.uf}</TableCell>}
									{!isMobile && (
										<TableCell align="center">{item.numeroDocumento}</TableCell>
									)}
									{!isMobile && (
										<TableCell align="center">{item.tipoDocumento}</TableCell>
									)}
									<TableCell align="center">
										<Link href={`/Clients/${item.id}`}>
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
						labelRowsPerPage="Itens por página"
						labelDisplayedRows={({ from, to, count }) =>
							`${from}-${to} de ${count !== -1 ? count : 'mais de ' + to}`
						}
					/>
				</TableContainer>
			)}
		</div>
	)
}
