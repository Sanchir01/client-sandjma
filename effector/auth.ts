import { HttpStatus } from '@/constans'
import axios, { AxiosError } from 'axios'
import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`
export const checkUserAuthFx = createEffect(async (url: string) => {
	try {
		const { data } = await axios.get(url)

		return data
	} catch (error) {
		const axiosError = error as AxiosError

		if (axiosError.response) {
			if (axiosError.response.status === HttpStatus.FORBIDDEN) {
				return false
			}
		}

		toast.error((error as Error).message)
	}
})
export const logoutFx = createEffect(async (url: string) => {
	try {
		await axios.get(url)
	} catch (error) {
		toast.error((error as Error).message)
	}
})
