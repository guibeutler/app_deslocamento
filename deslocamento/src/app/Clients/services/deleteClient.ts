import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'

export async function deleteClientById(clientId: number): Promise<IClient> {
	try {
		const response = await axios.delete(`${URL_BASE}/Cliente/${clientId}`)
		return response.data
	} catch (error) {
		console.error('Failed to delete client:', error)
		throw new Error('Failed to delete clientId')
	}
}
