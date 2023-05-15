import { IInput,IUser,SignIn } from '@/types/Auth.interface'
import axios from 'axios'


axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`
export const AllAuth = {
	async CreateUser(data: IInput) {
		return axios.post(`/users/signup`, data, {
			headers: { 'Content-Type': 'application/json' }
		})
	},
	async SignIn(data: SignIn) {
		return axios.post(`/users/login`,data,{
			headers:{'Content-Type':'application/json'}
		})
	},
	async loginCheck():Promise<IUser>{
		return (await axios.get(`/users/login-check`)).data
	}
}
