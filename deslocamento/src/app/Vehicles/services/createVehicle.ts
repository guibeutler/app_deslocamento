import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'
import Swal from 'sweetalert2'
import IVehicleCreate from '@interfaces/vehicle/vehicle.create.interface'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

export async function createVehicle(
	vehicleData: IVehicleCreate
): Promise<IVehicle> {
	try {
		const { data } = await axios.post(`${URL_BASE}/Veiculo`, vehicleData)

		Swal.fire({
			icon: 'success',
			title: 'Veículo criado com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})

		return data
	} catch (error) {
		console.error('Failed to create vehicle:', error)
		throw new Error('Failed to create vehicle')
	}
}
