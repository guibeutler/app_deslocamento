import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'
import IClientCreate from '@interfaces/client/client.create.interface'
import Swal from 'sweetalert2'

export async function createClient(
	clientData: IClientCreate
): Promise<IClient> {
	try {
		const response = await axios.post(`${URL_BASE}/Cliente`, clientData)
		Swal.fire({
			icon: 'success',
			title: 'Cliente criado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return response.data
	} catch (error) {
		console.error('Failed to create client:', error)
		throw new Error('Failed to create client')
	}
}
