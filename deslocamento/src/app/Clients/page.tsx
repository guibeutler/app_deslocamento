'use client'
import React, { useState, useEffect } from 'react'
import { getAllClients } from './services/getAllClients'
import ModalCreateClient from '@components/ClientModal'
import TableClients from '@components/ClientTable'
import { CircularProgress } from '@mui/material'
import IClient from '@interfaces/client/client.interface'

import './style.css'

export default function ClientsListPage() {
	const [clients, setClients] = useState<IClient[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const fetchClients = async () => {
		try {
			const data = await getAllClients()
			setClients(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch clients:', error)
		}
	}

	useEffect(() => {
		fetchClients()
	}, [])

	const handleOpenModal = () => setModalOpen(true)

	const handleCloseModal = () => {
		setModalOpen(false)
		fetchClients()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<TableClients
						data={clients}
						onEdit={() => {}}
						onCreate={handleOpenModal}
					/>
					<ModalCreateClient open={modalOpen} onClose={handleCloseModal} />
				</>
			)}
		</div>
	)
}
