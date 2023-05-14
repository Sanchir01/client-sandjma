export interface IShoppingCart {
	data: any
	id: number
	name: string
	price: string
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
