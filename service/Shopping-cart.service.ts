/* eslint-disable react-hooks/rules-of-hooks */
import { $user } from '@/effector/user'
import { IUser } from '@/types/Auth.interface'
import { IShoppingCart } from '@/types/Shopping-car.interface'
import axios from 'axios'




axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`

export const ShoppingCart = {
	async getAll(user:IUser): Promise<IShoppingCart[]> {
		return (await axios.get(`/shopping-cart/${user.userId}`)).data
	}
}
