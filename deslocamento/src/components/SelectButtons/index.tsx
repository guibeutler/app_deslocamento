'use client'
import React from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

import './style.css'

interface SelectButtonsProps {}

export function SelectButtons(props: SelectButtonsProps) {
	const router = useRouter()
	return (
		<div className="main">
			<Button
				onClick={() => router.push('/Clients')}
				className="button-55"
				variant="outlined"
				size="medium"
			>
				Clientes
			</Button>
			<Button className="button-55" variant="outlined" size="medium">
				Condutores
			</Button>
			<Button className="button-55" variant="outlined" size="medium">
				Veículos
			</Button>
			<Button className="button-55" variant="outlined" size="medium">
				Deslocamentos
			</Button>
		</div>
	)
}
