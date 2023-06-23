import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'

export async function getClients(): Promise<IClient[]> {
	try {
		const response = await axios.get(`${URL_BASE}/Cliente`)
		return response.data
	} catch (error) {
		console.error('Failed to fetch clients:', error)
		throw new Error('Failed to fetch clients')
	}
}
