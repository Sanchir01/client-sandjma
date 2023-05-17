import { ICheckboxItem } from '@/types/Catalog.interface'
import { IClothPartsRows } from '@/types/ClotshParts.interface'
import { clothManufacturers, clothSize } from '@/utils/Catalog'
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

export const setClothManufacturers = clothParts.createEvent<ICheckboxItem[]>()
export const updateClothManufacturers = clothParts.createEvent<ICheckboxItem>()

export const setSizeManufacturers = clothParts.createEvent<ICheckboxItem[]>()
export const updateSizeManufacturers = clothParts.createEvent<ICheckboxItem>()

const updateManufacturer = (
	manufacturers: ICheckboxItem[],
	id: string,
	payload: Partial<ICheckboxItem>
) =>
	manufacturers.map(item => {
		if (item.id === id) {
			return {
				...item,
				...payload
			}
		}
		return item
	})

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

export const $clothManufacturers = clothParts
	.createStore<ICheckboxItem[]>(clothManufacturers as ICheckboxItem[])
	.on(setClothManufacturers, (_, parts) => parts)
	.on(updateClothManufacturers, (state, payload) => [
		...updateManufacturer(state, payload.id as string, {
			checked: payload.checked
		})
	])

export const $clothSizeManufacturers = clothParts
	.createStore<ICheckboxItem[]>(clothSize as ICheckboxItem[])
	.on(setSizeManufacturers, (_, parts) => parts)
	.on(updateSizeManufacturers, (state, payload) => [
		...updateManufacturer(state, payload.id as string, {
			checked: payload.checked
		})
	])