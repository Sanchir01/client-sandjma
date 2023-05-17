import { Event } from 'effector-next'
export interface IManufacturersBlock {
	title: string
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

export interface ICatalogFilterDesktopProps extends IPriceRangeProps {
resetFilterBTNDisabled:boolean
spinner:boolean
}

export interface ICatalogFilterDesktopProps extends IPriceRangeProps {}
