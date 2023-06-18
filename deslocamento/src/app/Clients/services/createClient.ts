import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import { Slide, ToastContainer, toast } from 'react-toastify'
import IClient from '@interfaces/client/client.interface'
import IClientCreate from '@interfaces/client/client.create.interface'

export async function createClient(
	clientData: IClientCreate
): Promise<IClient> {
	try {
		const response = await axios.post(`${URL_BASE}/Cliente`, clientData)
		toast.success('Cliente Criado')
		return response.data
	} catch (error) {
		console.error('Failed to fetch client:', error)
		throw new Error('Failed to fetch clientId')
	}
}
