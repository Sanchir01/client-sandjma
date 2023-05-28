import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import { HttpStatus } from '@/constans'

import { ISignInFx, ISignUpFx } from '@/types/Auth.interface'
import axios, { AxiosError } from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`

export const singUpFx = createEffect(
	async ({ url, username, password, email }: ISignUpFx) => {
		const { data } = await axios.post(url, { username, password, email })

		if (data.warningMessage) {
			toast.warning(data.warningMessage)
			return
		}

		toast.success('Регистрация прощла успешно!')

		return data
	}
)

export const singInFx = createEffect(
	async ({ url, username, password }: ISignInFx) => {
		const { data } = await axios.post(url, { username, password })

		toast.success('Вход выполнен!')

		return data
	}
)

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
