import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

export async function getVehicleById(vehicleId: number): Promise<IVehicle> {
	try {
		const { data } = await axios.get(`${URL_BASE}/Veiculo/${vehicleId}`)
		return data
	} catch (error) {
		console.error(`Failed to fetch vehicle with ID ${vehicleId}:`, error)
		throw new Error(
			`Failed to fetch vehicle with ID ${vehicleId}: ${
				(error as Error).message
			}`
		)
	}
}
