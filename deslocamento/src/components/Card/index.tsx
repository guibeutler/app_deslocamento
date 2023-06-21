'use client'
import React, { useState } from 'react'
import { Button, Card } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ClientList from '@app/Clients/page'
import BasicModal from '@components/ClientModal'

import './style.css'

const CardWithInputs = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	return (
		<div className="card-container">
			<Card>
				<div className="header-card">
					{/* <h3>Lista de Clientes</h3>
					<Button
						onClick={handleOpenModal}
						className="button-55"
						variant="outlined"
						size="small"
					>
						Criar
						<AddIcon sx={{ fontSize: '14px' }} />
					</Button> */}
				</div>
				{/* <ClientList /> */}
			</Card>
			{/* <BasicModal open={modalOpen} onClose={handleCloseModal} /> */}
		</div>
	)
}

export default CardWithInputs
