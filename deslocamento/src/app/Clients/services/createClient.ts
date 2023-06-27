import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'
import IClientCreate from '@interfaces/client/client.create.interface'

export async function createClient(
	clientData: IClientCreate
): Promise<IClient> {
	try {
		const { data } = await axios.post(`${URL_BASE}/Cliente`, clientData)
		Swal.fire({
			icon: 'success',
			title: 'Cliente criado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return data
	} catch (error) {
		console.error('Failed to create client:', error)
		throw new Error('Failed to create client')
	}
}
