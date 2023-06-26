'use client'
import React, { useState, useEffect } from 'react'
import ModalCreateDisplacement from '@components/DisplacementModal'
import { CircularProgress } from '@mui/material'
import IDisplacement from '@interfaces/displacement/displacement.interface'

import './style.css'
import { getAllDisplacement } from './services/getAllDisplacement'
import TableDisplacement from '@components/DisplacementTable'

export default function DisplacementsListPage() {
	const [response, setResponse] = useState<IDisplacement[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const getAllDisplacements = async () => {
		try {
			const data = await getAllDisplacement()
			setResponse(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch displacements:', error)
		}
	}

	useEffect(() => {
		getAllDisplacements()
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		getAllDisplacements()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<TableDisplacement
						data={response}
						onEdit={() => {}}
						onCreate={handleOpenModal}
					/>
					<ModalCreateDisplacement
						open={modalOpen}
						onClose={handleCloseModal}
					/>
				</>
			)}
		</div>
	)
}
