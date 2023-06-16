'use client'
import React from 'react'
import { Card } from '@mui/material'

import './style.css'
import ClientList from '@app/Clients/page'

const CardWithInputs = () => {
	return (
		<div className="card-container">
			<Card>
				<h3>Clientes</h3>
				<ClientList />
			</Card>
		</div>
	)
}

export default CardWithInputs
