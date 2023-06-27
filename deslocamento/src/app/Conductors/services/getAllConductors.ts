import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IConductor from '@interfaces/conductor/conductor.interface'

export async function getAllConductors(): Promise<IConductor[]> {
	try {
		const { data } = await axios.get(`${URL_BASE}/Condutor`)
		return data
	} catch (error) {
		console.error('Failed to fetch conductors:', error)
		throw new Error('Failed to fetch conductors')
	}
}
