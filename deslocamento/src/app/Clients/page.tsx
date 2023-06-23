'use client'
import React, { useState, useEffect } from 'react'
import { getClients } from './services/getAllClients'
import BasicModal from '@components/ClientModal'
import TableClients from '@components/ClientTable'
import { CircularProgress } from '@mui/material'
import IClient from '@/interfaces/client/client.interface'

import './style.css'

export default function ClientsListPage() {
	const [response, setResponse] = useState<IClient[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const getAllClients = async () => {
		try {
			const data = await getClients()
			setResponse(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch clients:', error)
		}
	}

	useEffect(() => {
		getAllClients()
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		getAllClients()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<TableClients
						data={response}
						onEdit={() => {}}
						onCreate={handleOpenModal}
					/>
					<BasicModal open={modalOpen} onClose={handleCloseModal} />
				</>
			)}
		</div>
	)
}
