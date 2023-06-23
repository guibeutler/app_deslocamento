import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IConductor from '@interfaces/conductor/conductor.interface'

export async function getConductorById(
	conductorId: number
): Promise<IConductor> {
	try {
		const response = await axios.get(`${URL_BASE}/Condutor/${conductorId}`)
		return response.data
	} catch (error) {
		console.error('Failed to fetch conductor:', error)
		throw new Error('Failed to fetch conductorId')
	}
}
