import { useState, useEffect } from 'react'
import axios from 'axios'

export const useRequestData = (url: any, initialState: any) => {
	const [data, setData] = useState(initialState)

	useEffect(() => {
		const token = window.localStorage.getItem('token')
		axios
			.get(url, {
				headers: {
					auth: token,
				},
			})
			.then((res: any) => {
				setData(res.data)
			})
			.catch((err: any) => alert(err.response.data.message))
	}, [url])

	return data
}
