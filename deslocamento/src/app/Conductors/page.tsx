'use client'
import React, { useState, useEffect } from 'react'
import { getAllConductors } from './services/getAllConductors'
import Loader from '@components/Loader'
import ModalCreateConductor from '@components/ConductorModal'
import TableConductors from '@components/ConductorTable'
import IConductor from '@interfaces/conductor/conductor.interface'

import './style.css'

export default function ConductorsListPage() {
	const [conductors, setConductors] = useState<IConductor[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const fetchConductors = async () => {
		try {
			const data = await getAllConductors()
			setConductors(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch conductors:', error)
		}
	}

	useEffect(() => {
		fetchConductors()
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		fetchConductors()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<TableConductors
						data={conductors}
						onEdit={() => {}}
						onCreate={handleOpenModal}
					/>
					<ModalCreateConductor open={modalOpen} onClose={handleCloseModal} />
				</>
			)}
		</div>
	)
}
