import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'

const createManufacturerCheckboxObj = (title: string) => ({
	title,
	checked: false,
	id: idGenerator()
})

export const clothManufacturers = ['Худи', 'Толстовки', 'Свитшоты'].map(
	createManufacturerCheckboxObj
)

export const clothSize = ['XL', 'S', 'M'].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
	price && !isNaN(price) && price >= 0 && price <= 10000

export const CheckQueryParams = (router: NextRouter) => {
	const priceFromQueryValue = getQueryParamOnFirstRender(
		'priceFrom',
		router
	) as string
	const priceToQueryValue = getQueryParamOnFirstRender(
		'priceTo',
		router
	) as string
	const clothAQueryValue = JSON.parse(
		decodeURIComponent(getQueryParamOnFirstRender('cloth', router) as string)
	)
	const sizeQueryValue = JSON.parse(
		decodeURIComponent(getQueryParamOnFirstRender('size', router) as string)
	)
	const isValidClothQuery =
		Array.isArray(clothAQueryValue) && !!clothAQueryValue?.length
	const isValidSizeQuery =
		Array.isArray(sizeQueryValue) && !!sizeQueryValue?.length
	const isValidPriceQuery =
		checkPriceFromQuery(+priceFromQueryValue) &&
		checkPriceFromQuery(+priceToQueryValue)
	return {
		isValidClothQuery,
		isValidSizeQuery,
		isValidPriceQuery,
		priceFromQueryValue,
		priceToQueryValue,
		clothAQueryValue,
		sizeQueryValue
	}
}
