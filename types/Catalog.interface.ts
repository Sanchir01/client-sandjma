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

interface ICatalogBaseType {
	priceRange: number[]
	setPriceRange: (arg0: number[]) => void
	setIsPriceRangeChanged: (arg0: boolean) => void
	resetFilterBTNDisabled: boolean
	resetFilter: VoidFunction
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

export interface IPriceRangeProps extends ICatalogBaseType {}

export interface ICatalogFilterProps extends IPriceRangeProps {
	isPriceRangeChanged: boolean
	currentPage: number
	setIsFilterInQuery: (arg0: boolean) => void
	closePopup: VoidFunction
	filtersMobileOpen:boolean
}

export interface ICatalogFilterDektopProps extends ICatalogBaseType {
	spinner: boolean
	isPriceRangeChanged: boolean
	applyFilters: VoidFunction
}

export interface ICatalogFilterMobile {
	priceRange: number[]
	setPriceRange: (arg0: number[]) => void
	setIsPriceRangeChanged: (arg0: boolean) => void
	resetFilterBTNDisabled: boolean
	resetFilter: VoidFunction
	spinner: boolean
	applyFilters: VoidFunction
	closePopup: VoidFunction
	filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
	resetBTNTest: string
	title: string
	resetFilter: VoidFunction
	resetFilterBTNDisabled: boolean
	closePopup: VoidFunction

}

export interface IFiltersPopupProp extends IFilterManufacturerAccordionProps {
	resetFilterBTNDisabled:boolean
	resetAllManufacturers: VoidFunction
	handleClosePopup:VoidFunction
	openPopup:boolean
	applyFilters:VoidFunction
	
}
