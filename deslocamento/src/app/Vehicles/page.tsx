'use client'
import React, { useState, useEffect } from 'react'
import { getAllVehicle } from './services/getAllVehicle'
import VehicleTable from '@components/VehicleTable'
import ModalCreateVehicle from '@components/VehicleModal'
import { CircularProgress } from '@mui/material'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

import './style.css'

export default function VehicleListPage() {
	const [vehicle, setVehicle] = useState<IVehicle[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const fetchVehicle = async () => {
		try {
			const data = await getAllVehicle()
			setVehicle(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Failed to fetch vehicles:', error)
		}
	}

	useEffect(() => {
		fetchVehicle()
	}, [])

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		fetchVehicle()
	}

	return (
		<div className="main-container">
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<VehicleTable
						data={vehicle}
						onEdit={() => {}}
						onCreate={handleOpenModal}
					/>
					<ModalCreateVehicle open={modalOpen} onClose={handleCloseModal} />
				</>
			)}
		</div>
	)
}
