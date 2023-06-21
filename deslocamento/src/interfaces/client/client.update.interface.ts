export default interface IClientUpdate {
	id: number
	nome: string
	logradouro: string
	numero: string
	bairro: string
	cidade: string
	uf: string
	numeroDocumento?: string
	tipoDocumento?: string
}
