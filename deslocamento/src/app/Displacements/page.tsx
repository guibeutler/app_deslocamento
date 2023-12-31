'use client'
import React, { useState, useEffect } from 'react'
import { getAllDisplacement } from './services/getAllDisplacement'
import Loader from '@components/Loader'
import TableDisplacement from '@components/DisplacementTable'
import ModalCreateDisplacement from '@components/DisplacementModal'
import IDisplacement from '@interfaces/displacement/displacement.interface'

import './style.css'

export default function DisplacementsListPage() {
	const [displacement, setDisplacement] = useState<IDisplacement[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const fetchDisplacement = async () => {
		try {
			const data = await getAllDisplacement()
			setDisplacement(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch displacements:', error)
		}
	}

	useEffect(() => {
		fetchDisplacement()
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		fetchDisplacement()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<TableDisplacement
						data={displacement}
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
