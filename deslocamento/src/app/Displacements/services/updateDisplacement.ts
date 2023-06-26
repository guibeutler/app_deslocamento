import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IDisplacement from '@interfaces/displacement/displacement.interface'
import IDisplacementUpdate from '@interfaces/displacement/displacement.update.interface'

export async function updateDisplacement(
	displacementId: number,
	updateData: IDisplacementUpdate
): Promise<IDisplacement> {
	try {
		const { data } = await axios.put(
			`${URL_BASE}/Deslocamento/${displacementId}/EncerrarDeslocamento`,
			updateData
		)
		Swal.fire({
			icon: 'success',
			title: 'Deslocamento atualizado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return data
	} catch (error) {
		console.error('Failed to update displacement:', error)
		throw new Error('Failed to update displacementId')
	}
}
