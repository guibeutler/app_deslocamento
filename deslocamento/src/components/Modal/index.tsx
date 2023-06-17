import React from 'react'
import { Box, Button, Typography, Modal, TextField } from '@mui/material'
import { createClient } from '@app/Clients/services/createClient'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

interface BasicModalProps {
	open: boolean
	onClose: () => void
}

const BasicModal: React.FC<BasicModalProps> = ({ open, onClose }) => {
	const [formData, setFormData] = React.useState({
		nome: '',
		logradouro: '',
		numero: '',
		bairro: '',
		cidade: '',
		uf: '',
		numeroDocumento: '',
		tipoDocumento: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({ ...prevData, [name]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		createClient(formData)
		console.log(formData)
		onClose() // Feche o modal após enviar os dados
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h2"
					align="center"
				>
					Cadastrar Cliente
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					<form
						onSubmit={handleSubmit}
						style={{
							padding: '8px',
							display: 'flex',
							flexDirection: 'column',
							gap: '10px',
						}}
					>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Nome"
							variant="outlined"
							name="nome"
							value={formData.nome}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Rua"
							variant="outlined"
							name="logradouro"
							value={formData.logradouro}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Número"
							variant="outlined"
							name="numero"
							value={formData.numero}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Bairro"
							variant="outlined"
							name="bairro"
							value={formData.bairro}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Cidade"
							variant="outlined"
							name="cidade"
							value={formData.cidade}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Estado"
							variant="outlined"
							name="uf"
							value={formData.uf}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Número do documento"
							variant="outlined"
							name="numeroDocumento"
							value={formData.numeroDocumento}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							size="small"
							type="text"
							id="outlined-basic"
							label="Tipo de documento"
							variant="outlined"
							name="tipoDocumento"
							value={formData.tipoDocumento}
							onChange={handleChange}
						/>
						<Button className="button-55" type="submit">
							Enviar
						</Button>
					</form>
				</Typography>
			</Box>
		</Modal>
	)
}

export default BasicModal
