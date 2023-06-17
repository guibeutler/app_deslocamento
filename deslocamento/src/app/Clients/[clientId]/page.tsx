import React from 'react'
import { getClientById } from '../services/getClientById'

export default async function ClientDetailsPage({
	params,
}: {
	params: { clientId: number }
}) {
	const client = await getClientById(params.clientId)

	console.log(client)
	return (
		<>
			<h3>{client.nome}</h3>
		</>
	)
}
