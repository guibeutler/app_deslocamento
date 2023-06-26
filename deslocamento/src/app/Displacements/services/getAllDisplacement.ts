import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IDisplacement from '@interfaces/displacement/displacement.interface'

export async function getAllDisplacement(): Promise<IDisplacement[]> {
	try {
		const { data } = await axios.get(`${URL_BASE}/Deslocamento`)
		return data
	} catch (error) {
		console.error('Failed to fetch displacements:', error)
		throw new Error('Failed to fetch displacements')
	}
}
