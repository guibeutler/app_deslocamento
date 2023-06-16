import axios from 'axios'
import { URL_BASE } from '@constants/URL_BASE'

export async function getClients() {
	try {
		const response = await axios.get(`${URL_BASE}/Cliente`)

		return response.data
	} catch (error) {
		return error
	}
}
