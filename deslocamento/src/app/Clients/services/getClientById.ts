import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'

export async function getClientById(clientId: number) {
	console.log(URL_BASE)
	try {
		const response = await axios.get(`${URL_BASE}/Cliente/${clientId}`)
		console.log(response)

		return response.data
	} catch (error) {
		return error
	}
}
