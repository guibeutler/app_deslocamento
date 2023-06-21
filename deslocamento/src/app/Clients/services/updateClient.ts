import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IClientUpdate from '@interfaces/client/client.update.interface'
import IClient from '@interfaces/client/client.interface'
import Swal from 'sweetalert2'

export async function updateClient(
	clientId: number,
	updateData: IClientUpdate
): Promise<IClient> {
	try {
		const response = await axios.put(
			`${URL_BASE}/Cliente/${clientId}`,
			updateData
		)
		Swal.fire({
			icon: 'success',
			title: 'Cliente atualizado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return response.data
	} catch (error) {
		console.error('Failed to update client:', error)
		throw new Error('Failed to update clientId')
	}
}
