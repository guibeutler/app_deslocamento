import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import Swal from 'sweetalert2'
import IVehicleUpdate from '@interfaces/vehicle/vehicle.update.interface'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

export async function updateVehicle(
	vehicleId: number,
	updateData: IVehicleUpdate
): Promise<IVehicle> {
	try {
		const { data } = await axios.put(
			`${URL_BASE}/Veiculo/${vehicleId}`,
			updateData
		)
		showSuccessMessage('Veiculo atualizado com sucesso!')
		return data
	} catch (error) {
		console.error('Failed to update vehicle:', error)
		throw new Error(`Failed to update vehicleId: ${vehicleId}`)
	}
}

function showSuccessMessage(message: string): void {
	Swal.fire({
		icon: 'success',
		title: message,
		showConfirmButton: false,
		timer: 1500,
	})
}
