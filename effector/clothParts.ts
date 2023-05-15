import { IClothPartsRows } from '@/types/ClotshParts.interface'
import axios from 'axios'
import { createDomain, createEffect } from 'effector-next'

//Запрос на сервер при помощи еффектора
export const getBoilerPartsFx = createEffect(async (url: string) => {
	const { data } = await axios.get(url)

	return data
})

//стор еффектора
const clothParts = createDomain()

export const setClothParts = clothParts.createEvent<IClothPartsRows>()

export const $clothParts = clothParts
	.createStore<IClothPartsRows>({} as IClothPartsRows)
	.on(setClothParts, (_, parts) => parts)
