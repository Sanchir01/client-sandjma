import {IShoppingCart} from '@/types/Shopping-car.interface'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`
export const ShoppingCart = {
	async getAll():Promise<IShoppingCart[]> {
		return (await (axios.get(`/shopping-cart/2`))).data
	}
}
