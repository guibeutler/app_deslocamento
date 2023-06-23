import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IConductorUpdate from '@interfaces/conductor/conduct.update.interface'
import IConductor from '@interfaces/conductor/conductor.interface'
import Swal from 'sweetalert2'

export async function updateConductor(
	conductorId: number,
	updateData: IConductorUpdate
): Promise<IConductor> {
	try {
		const response = await axios.put(
			`${URL_BASE}/Condutor/${conductorId}`,
			updateData
		)
		Swal.fire({
			icon: 'success',
			title: 'Condutor atualizado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return response.data
	} catch (error) {
		console.error('Failed to update conductor:', error)
		throw new Error('Failed to update conductorId')
	}
}
