import React, { useState } from 'react'
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	Button,
	Box,
} from '@mui/material'
import {
	Menu as MenuIcon,
	Home as HomeIcon,
	Group as GroupIcon,
	DriveEta as DriveEtaIcon,
	DirectionsCar as DirectionsCarIcon,
} from '@mui/icons-material'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import RvHookupIcon from '@mui/icons-material/RvHookup'
import Link from 'next/link'

const Sidebar = () => {
	const [open, setOpen] = useState(false)

	const toggleDrawer = () => {
		setOpen(!open)
	}

	const sidebarItems = [
		{ value: '/', text: 'Home', icon: <HomeIcon /> },
		{ value: 'Clients', text: 'Clientes', icon: <GroupIcon /> },
		{
			value: 'Conductors',
			text: 'Condutores',
			icon: <SportsMotorsportsIcon />,
		},
		{ value: 'Vehicles', text: 'Veículos', icon: <DriveEtaIcon /> },
		{ value: 'Displacements', text: 'Deslocamentos', icon: <RvHookupIcon /> },
	]

	return (
		<div>
			<IconButton
				style={{ marginLeft: '5px', marginTop: '5px' }}
				edge="start"
				color="inherit"
				aria-label="menu"
				onClick={toggleDrawer}
			>
				<MenuIcon />
			</IconButton>
			<Drawer open={open} onClose={toggleDrawer}>
				<List sx={{ display: 'flex', flexDirection: 'column' }}>
					{sidebarItems.map((item, index) => (
						<Link href={`/${item.value}`} key={index}>
							<Button
								fullWidth
								color="inherit"
								style={{ textDecoration: 'none' }}
								onClick={toggleDrawer}
							>
								<ListItem key={index}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText
										primary={item.text
											.normalize('NFD')
											.replace(/[\u0300-\u036f]/g, '')}
									/>
								</ListItem>
							</Button>
						</Link>
					))}
				</List>
			</Drawer>
		</div>
	)
}

export default Sidebar
