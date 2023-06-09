import { IUser } from '@/types/Auth.interface'
import { IShoppingCart } from '@/types/Shopping-car.interface'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`

export const ShoppingCart = {
	async getAll(id: IUser): Promise<IShoppingCart[]> {
		return (await axios.get(`/shopping-cart/${id.userId}`)).data
	},
	async totalPrice(login: IUser) {
		return (await axios.patch(`shopping-cart/total-price/${login.userId}`)).data
	}
}
