'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Grid, Typography, useTheme, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import Clients from '@assets/img/undraw_add_friends_re_3xte.svg'
import Conductors from '@assets/img/undraw_team_spirit_re_yl1v.svg'
import Navigator from '@assets/img/undraw_navigator_a479.svg'
import Vehicles from '@assets/img/undraw_order_ride_re_372k.svg'

import './style.css'

export default function HomePage() {
	const router = useRouter()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<>
			<div
				className="main-container"
				style={{ height: isMobile ? '90%' : '', width: isMobile ? '100%' : '' }}
			>
				<div
					className="header-container"
					style={{ textAlign: 'center', padding: '20px' }}
				>
					<Typography>
						Gerencie os condutores e veículos do seu negócio de forma
						centralizada.
					</Typography>
					<Typography>
						O MOVEAPP te ajuda a melhorar a organização e a produtividade do seu
						negócio.
					</Typography>
					<Typography>
						Aqui você pode cadastrar, editar e excluir informações de maneira
						rápida e intuitava.
					</Typography>
				</div>

				<div className={`cards ${isMobile ? 'cards-grid' : ''}`}>
					<Grid
						item
						lg={12}
						container
						spacing={4}
						direction={isMobile ? 'column' : undefined}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<Grid item lg={3} xs={12}>
							<div className="card" onClick={() => router.push('/Clients')}>
								<Typography variant="h5" fontWeight={700}>
									Clientes
								</Typography>
								<Image width={180} src={Clients} alt="imagem clientes" />
								<Typography>Gerenciamento fácil e eficiente</Typography>
							</div>
						</Grid>
						<Grid item lg={3} xs={12}>
							<div className="card" onClick={() => router.push('/Conductors')}>
								<Typography variant="h5" fontWeight={700}>
									Condutores
								</Typography>
								<Image width={180} src={Conductors} alt="imagem clientes" />
								<Typography>
									Controle seus condutores com simplicidade
								</Typography>
							</div>
						</Grid>
						<Grid item lg={3} xs={12}>
							<div className="card" onClick={() => router.push('/Vehicles')}>
								<Typography variant="h5" fontWeight={700}>
									Veículos
								</Typography>
								<Image width={180} src={Vehicles} alt="imagem clientes" />
								<Typography>Atualize informações rapidamente</Typography>
							</div>
						</Grid>
						<Grid item lg={3} xs={12}>
							<div
								className="card"
								onClick={() => router.push('/Displacements')}
							>
								<Typography variant="h5" fontWeight={700}>
									Deslocamentos
								</Typography>
								<Image width={180} src={Navigator} alt="imagem deslocamento" />
								<Typography>
									Otimize seus deslocamentos com eficiência
								</Typography>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	)
}
