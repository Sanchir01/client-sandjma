import { idGenerator } from './common'

const createManufacturerCheckboxObj = (title: string) => ({
	title,
	checked: false,
	id: idGenerator()
})

export const clothManufacturers = ['худи', 'толстовки', 'свитшоты'].map(createManufacturerCheckboxObj)

export const clothSize = ['XL', 'S', 'M'].map(createManufacturerCheckboxObj)
