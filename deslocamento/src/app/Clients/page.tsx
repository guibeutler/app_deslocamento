'use client'
import React, { useState, useEffect } from 'react'
import { getClients } from './services/getClients'
import IClient from '@/interfaces/client/client.interface'
import Link from 'next/link'
import {
	Avatar,
	Button,
	Card,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Pagination,
} from '@mui/material'
import BasicModal from '@components/Modal'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import './style.css'

const itemsPerPage = 4

export default function ClientsListPage() {
	const [currentPage, setCurrentPage] = useState(1)
	const [response, setResponse] = useState<IClient[]>([])
	const [modalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await getClients()
			setResponse(data)
		}

		fetchData()
	}, [])

	const handlePageChange = (event: any, page: number) => {
		setCurrentPage(page)
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentClients = response.slice(indexOfFirstItem, indexOfLastItem)

	return (
		<div className="card-container">
			<Card>
				<div>
					<div className="header-card">
						<h3>Lista de Clientes</h3>
						<Button
							onClick={handleOpenModal}
							className="button-55"
							variant="outlined"
							size="small"
						>
							Criar
							<AddIcon sx={{ fontSize: '14px' }} />
						</Button>
					</div>
					<List>
						{currentClients.map((client: IClient) => (
							<ListItem
								key={client.id}
								secondaryAction={
									<Link href={`/Clients/${client.id}`}>
										<IconButton edge="end" aria-label="delete">
											<InfoIcon />
										</IconButton>
									</Link>
								}
							>
								<ListItemAvatar>
									<Avatar>
										<AccountCircleIcon />
									</Avatar>
								</ListItemAvatar>

								<ListItemText
									primary={`Nome: ${client.nome}`}
									secondary={`Estado: ${client.uf}`}
								/>
							</ListItem>
						))}
					</List>
					<BasicModal open={modalOpen} onClose={handleCloseModal} />
				</div>
				<div className="pagination-bar">
					<Pagination
						count={Math.ceil(response.length / itemsPerPage)}
						page={currentPage}
						onChange={handlePageChange}
						className="pagination-bar"
					/>
				</div>
			</Card>
		</div>
	)
}
