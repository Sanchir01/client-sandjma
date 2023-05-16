import { IClothPartsRows } from '@/types/ClotshParts.interface'
import axios from 'axios'
import { createDomain, createEffect } from 'effector-next'

axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`

//Запрос на сервер при помощи еффектора
export const getBoilerPartsFx = createEffect(async (url: string) => {
	const { data } = await axios.get(url)

	return data
})

//стор еффектора
const clothParts = createDomain()

export const setClothParts = clothParts.createEvent<IClothPartsRows>()

export const setClothPartsCheapFirst = clothParts.createEvent()
export const setClothPartsExpensiveFirst = clothParts.createEvent()
export const setClothPartsByPopularity = clothParts.createEvent()
export const $clothParts = clothParts
	.createStore<IClothPartsRows>({} as IClothPartsRows)
	.on(setClothParts, (_, parts) => parts)
	.on(setClothPartsCheapFirst, state => ({
		...state,
		rows: state.rows.sort((a, b) => a.price - b.price)
	}))
	.on(setClothPartsExpensiveFirst, state => ({
		...state,
		rows: state.rows.sort((a, b) => b.price - a.price)
	}))
	.on(setClothPartsByPopularity, state => ({
		...state,
		rows: state.rows.sort((a, b) => b.popular - a.popular)
	}))
