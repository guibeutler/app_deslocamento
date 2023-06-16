import { getClientById } from '../services/getClientById'

export default async function UserDetailsHead({
	params,
}: {
	params: { clientId: number }
}) {
	const client = await getClientById(params.clientId)
	const title = `${client.nome} - Clientes - App Deslocamento`

	return (
		<>
			<title>{title}</title>
		</>
	)
}
