import { Event } from 'effector-next'
export interface IManufacturersBlock {
	title: string
	event: Event<ICheckboxItem>
	manufacturerList: ICheckboxItem[]
}

export interface IManufacturersBlockItemProps {
	item: ICheckboxItem
	event: Event<ICheckboxItem>
}

export interface IQueryParams {
	offset: string
	first: string
	cloth: string
	size: string
	priceFrom: string
	priceTo: string
}

export interface ICheckboxItem {
	title: string
	checked: boolean
	id?: string
	event: Event<ICheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
	manufacturerList: ICheckboxItem[]
	title: string | false
	setManufacturer: Event<ICheckboxItem[]>
	updateManufacturer: Event<ICheckboxItem>
}

export interface IPriceRangeProps {
	priceRange: number[]
	setPriceRange: (arg0: number[]) => void
	setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFilterProps extends IPriceRangeProps {
	resetFilterBTNDisabled: boolean
	resetFilter: VoidFunction
	isPriceRangeChanged: boolean
	currentPage: number
	setIsFilterInQuery:(arg0: boolean) => void
}

export interface ICatalogFilterDektopProps  {
	spinner: boolean
	priceRange: number[]
	setPriceRange: (arg0: number[]) => void
	setIsPriceRangeChanged: (arg0: boolean) => void
	resetFilterBTNDisabled: boolean
	resetFilter: VoidFunction
	isPriceRangeChanged: boolean
	applyFilters:VoidFunction
}
