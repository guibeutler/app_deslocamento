import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'

export async function getClientById(clientId: number): Promise<IClient> {
	try {
		const response = await axios.get(`${URL_BASE}/Cliente/${clientId}`)
		return response.data
	} catch (error) {
		console.error('Failed to fetch client:', error)
		throw new Error('Failed to fetch clientId')
	}
}
