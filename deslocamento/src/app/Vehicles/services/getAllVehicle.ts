import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

export async function getAllVehicle(): Promise<IVehicle[]> {
	try {
		const { data } = await axios.get<IVehicle[]>(`${URL_BASE}/Veiculo`)
		return data
	} catch (error) {
		throw new Error('Failed to fetch vehicle')
	}
}
