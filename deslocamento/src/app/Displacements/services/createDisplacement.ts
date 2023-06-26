import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IDisplacement from '@interfaces/displacement/displacement.interface'
import IDisplacementCreate from '@interfaces/displacement/displacement.create.interface'

export async function createDisplacement(
	displacementData: IDisplacementCreate
): Promise<IDisplacement> {
	try {
		const { data } = await axios.post(
			`${URL_BASE}/Deslocamento/IniciarDeslocamento`,
			displacementData
		)
		Swal.fire({
			icon: 'success',
			title: 'Deslocamento criado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		return data
	} catch (error) {
		console.error('Failed to create displacement:', error)
		throw new Error('Failed to create displacement')
	}
}
