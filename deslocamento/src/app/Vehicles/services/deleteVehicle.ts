import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '@constants/URL_BASE'
import IVehicle from '@interfaces/vehicle/vehicle.interface'

export async function deleteVehicleById(vehicleId: number): Promise<IVehicle> {
	try {
		const { isConfirmed } = await Swal.fire({
			title: 'Você tem certeza?',
			text: 'Essa alteração não pode ser desfeita!',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Sim, excluir veículo!',
		})

		if (isConfirmed) {
			const response = await axios.delete(`${URL_BASE}/Veiculo/${vehicleId}`, {
				data: {
					id: vehicleId,
				},
			})

			Swal.fire('Deletado!', 'Veículo excluído com sucesso.', 'success')
			return response.data
		} else {
			throw new Error('Exclusão cancelada.')
		}
	} catch (error) {
		console.error('Failed to delete vehicle:', error)
		throw new Error('Failed to delete vehicle.')
	}
}
