import { idGenerator } from './common'

const createManufacturerCheckboxObj = (title: string) => ({
	title,
	checked: false,
	id: idGenerator()
})

export const clothManufacturers = ['Худи', 'Толстовки', 'Свитшоты'].map(createManufacturerCheckboxObj)

export const clothSize = ['XL', 'S', 'M'].map(createManufacturerCheckboxObj)
