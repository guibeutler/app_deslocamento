'use client'
import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'

import './style.css'
import IVehicle from '@interfaces/vehicle/vehicle.interface'
import { getAllVehicle } from './services/getAllVehicle'
import VehicleTable from '@components/VehicleTable'
import ModalCreateVehicle from '@components/VehicleModal'

export default function VehicleListPage() {
	const [response, setResponse] = useState<IVehicle[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const getVehicles = async () => {
		try {
			const data = await getAllVehicle()
			setResponse(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch vehicles:', error)
		}
	}

	useEffect(() => {
		getVehicles()
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		getVehicles()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<VehicleTable
						data={response}
						onEdit={() => {}}
						onCreate={handleOpenModal}
					/>
					<ModalCreateVehicle open={modalOpen} onClose={handleCloseModal} />
				</>
			)}
		</div>
	)
}
