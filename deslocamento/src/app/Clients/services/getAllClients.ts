import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'

export async function getAllClients(): Promise<IClient[]> {
	try {
		const { data } = await axios.get(`${URL_BASE}/Cliente`)
		return data
	} catch (error) {
		console.error('Failed to fetch clients:', error)
		throw new Error('Failed to fetch clients')
	}
}
