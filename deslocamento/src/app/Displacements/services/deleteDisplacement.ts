import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IDisplacement from '@interfaces/displacement/displacement.interface'

export async function deleteDisplacementById(
	displacementId: number
): Promise<IDisplacement> {
	try {
		const result = await Swal.fire({
			title: 'Você tem certeza?',
			text: 'Essa alteração não pode ser desfeita!',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Sim, excluir deslocamento!',
		})

		if (result.isConfirmed) {
			const { data } = await axios.delete(
				`${URL_BASE}/Deslocamento/${displacementId}`,
				{
					data: {
						id: displacementId,
					},
				}
			)
			Swal.fire('Deletado!', 'deslocamento excluido com sucesso..', 'success')
			return data
		} else {
			throw new Error('Exclusão cancelada.')
		}
	} catch (error) {
		console.error('Failed to delete displacement:', error)
		throw new Error('Failed to delete displacementId')
	}
}
