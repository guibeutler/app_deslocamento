import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'
import IClientUpdate from '@interfaces/client/client.update.interface'

export async function updateClient(
	clientId: number,
	updateData: IClientUpdate
): Promise<IClient> {
	try {
		const { data } = await axios.put(
			`${URL_BASE}/Cliente/${clientId}`,
			updateData
		)
		Swal.fire({
			icon: 'success',
			title: 'Cliente atualizado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return data
	} catch (error) {
		console.error('Failed to update client:', error)
		throw new Error('Failed to update clientId')
	}
}
