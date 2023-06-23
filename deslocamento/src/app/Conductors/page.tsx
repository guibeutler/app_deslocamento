'use client'
import React, { useState, useEffect } from 'react'
import { getAllConductors } from './services/getAllConductors'
import TableConductors from '@components/TableConductor'
import ModalCreateConductor from '@components/ConductorModal'
import { CircularProgress } from '@mui/material'
import IConductor from '@interfaces/conductor/conductor.interface'

import './style.css'

export default function ConductorsListPage() {
	const [response, setResponse] = useState<IConductor[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const getConductors = async () => {
		try {
			const data = await getAllConductors()
			setResponse(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch conductors:', error)
		}
	}

	useEffect(() => {
		getConductors()
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		getConductors()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<TableConductors
						data={response}
						onEdit={() => {}}
						onCreate={handleOpenModal}
					/>
					<ModalCreateConductor open={modalOpen} onClose={handleCloseModal} />
				</>
			)}
		</div>
	)
}
