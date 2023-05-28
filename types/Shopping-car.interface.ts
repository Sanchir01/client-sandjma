export interface IShoppingCart {
	data: any
	id: number | string
	name: string
	price: number
	images: string
	in_stock: number
	cloth_manufacturer: string
	cloth_size: string
	count: number
	total_price: number
	userId: number
	partId: number
}
export interface IRows {
	count: number
	rows: IShoppingCart[]
}

export interface IAddToCartFx {
	url: string
	username: string
	partId: number
}

export interface IUpdateCartItemFx {
	url: string
	payload: {
		total_price?: number
		count?: number
	}
}

export interface ICartItemCounterProps {
	totalCount: number
	partId: number
	initialCount: number
	increasePrice: VoidFunction
	decreasePrice: VoidFunction
}
