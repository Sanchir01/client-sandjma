import { IClothPartsRows } from '@/types/ClotshParts.interface'
import { ICartAlertProps } from '@/types/dashboard'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`
export const Dashboard = {
	async getNew(): Promise<IClothPartsRows> {
		return (await axios.get(`/boiler-parts/new`)).data
	},
	async getBestsellers(): Promise<IClothPartsRows> {
		return (await axios.get(`/boiler-parts/bestsellers`)).data
	},
	async getCartCount():Promise<ICartAlertProps>{
		return(await axios.patch(`/shopping-cart/count/:{id}`)).data
	}
}
