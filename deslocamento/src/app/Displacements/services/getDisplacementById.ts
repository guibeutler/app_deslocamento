import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IDisplacement from '@interfaces/displacement/displacement.interface'

export async function getDisplacementById(
	displacementId: number
): Promise<IDisplacement> {
	try {
		const { data } = await axios.get(
			`${URL_BASE}/Deslocamento/${displacementId}`
		)
		return data
	} catch (error) {
		console.error('Failed to fetch displacement:', error)
		throw new Error('Failed to fetch displacementId')
	}
}
