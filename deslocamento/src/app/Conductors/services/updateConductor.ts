import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IConductor from '@interfaces/conductor/conductor.interface'
import IConductorUpdate from '@interfaces/conductor/conduct.update.interface'

export async function updateConductor(
	conductorId: number,
	updateData: IConductorUpdate
): Promise<IConductor> {
	try {
		const { data } = await axios.put(
			`${URL_BASE}/Condutor/${conductorId}`,
			updateData
		)
		Swal.fire({
			icon: 'success',
			title: 'Condutor atualizado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return data
	} catch (error) {
		console.error('Failed to update conductor:', error)
		throw new Error('Failed to update conductorId')
	}
}
