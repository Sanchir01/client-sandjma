import { IShoppingCart } from '@/types/Shopping-car.interface'
import axios from 'axios'

export const ShoppingCart = {
	async getAll(): Promise<IShoppingCart[] | IShoppingCart> {
		return axios.get(`/shopping-cart/all`)
	}
}
