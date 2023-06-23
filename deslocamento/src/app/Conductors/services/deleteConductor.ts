import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IConductor from '@interfaces/conductor/conductor.interface'

export async function deleteConductorById(
	conductorId: number
): Promise<IConductor> {
	try {
		const result = await Swal.fire({
			title: 'Você tem certeza?',
			text: 'Essa alteração não pode ser desfeita!',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Sim, excluir condutor!',
		})

		if (result.isConfirmed) {
			const response = await axios.delete(
				`${URL_BASE}/Condutor/${conductorId}`,
				{
					data: {
						id: conductorId,
					},
				}
			)
			Swal.fire('Deletado!', 'condutor excluido com sucesso..', 'success')
			return response.data
		} else {
			throw new Error('Exclusão cancelada.')
		}
	} catch (error) {
		console.error('Failed to delete conductor:', error)
		throw new Error('Failed to delete conductorId')
	}
}
