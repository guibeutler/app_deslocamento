import React, { useState, useEffect } from 'react'
import { URL_BASE } from '../../constants/URL_BASE'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Pagination from '@mui/material/Pagination'
import InfoIcon from '@mui/icons-material/Info'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import './style.css'
import IClient from '@/interfaces/client/client.interface'

const getData = async () => {
	try {
		const response = await axios.get(`${URL_BASE}/Cliente`)

		return response.data
	} catch (error) {
		return error
	}
}

const itemsPerPage = 4

export default function ClientList() {
	const [currentPage, setCurrentPage] = useState(1)
	const [response, setResponse] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await getData()
			setResponse(data)
		}

		fetchData()
	}, [])

	const handlePageChange = (event: any, page: any) => {
		setCurrentPage(page)
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentClients = response.slice(indexOfFirstItem, indexOfLastItem)

	return (
		<div className="main-container">
			<div>
				<List>
					{currentClients.map((client: IClient) => (
						<ListItem
							key={client.id}
							secondaryAction={
								<IconButton edge="end" aria-label="delete">
									<InfoIcon />
								</IconButton>
							}
						>
							<ListItemAvatar>
								<Avatar>
									<AccountCircleIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={`Nome: ${client.nome}`}
								secondary={`Estado: ${client.uf}`}
							/>
						</ListItem>
					))}
				</List>
			</div>
			<div className="pagination-bar">
				<Pagination
					count={Math.ceil(response.length / itemsPerPage)}
					page={currentPage}
					onChange={handlePageChange}
					className="pagination-bar"
				/>
			</div>
		</div>
	)
}
