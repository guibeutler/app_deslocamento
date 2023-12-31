import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IConductor from '@interfaces/conductor/conductor.interface'
import IConductorCreate from '@interfaces/conductor/conductor.create.interface'

export async function createConductor(
	conductorData: IConductorCreate
): Promise<IConductor> {
	try {
		const { data } = await axios.post(`${URL_BASE}/Condutor`, conductorData)
		Swal.fire({
			icon: 'success',
			title: 'Condutor criado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return data
	} catch (error) {
		console.error('Failed to create conductor:', error)
		throw new Error('Failed to create conductor')
	}
}
