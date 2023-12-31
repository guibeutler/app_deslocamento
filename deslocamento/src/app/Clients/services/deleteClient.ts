import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IClient from '@interfaces/client/client.interface'

export async function deleteClientById(clientId: number): Promise<IClient> {
	try {
		const result = await Swal.fire({
			title: 'Você tem certeza?',
			text: 'Essa alteração não pode ser desfeita!',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Sim, excluir cliente!',
		})

		if (result.isConfirmed) {
			const { data } = await axios.delete(`${URL_BASE}/Cliente/${clientId}`, {
				data: {
					id: clientId,
				},
			})
			Swal.fire('Deletado!', 'Cliente excluido com sucesso..', 'success')
			return data
		} else {
			throw new Error('Exclusão cancelada.')
		}
	} catch (error) {
		console.error('Failed to delete client:', error)
		throw new Error('Failed to delete clientId')
	}
}
