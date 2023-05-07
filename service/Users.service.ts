import { IInput } from '@/types/Auth.interface'
import axios from 'axios'

export const instance = axios.create({
	withCredentials: true
})
axios.defaults.baseURL = `http://localhost:5000`
export const AllAuth = {
	async CreateUser(data: IInput) {
		return axios.post(`/users/signup`, data, {
			headers: { 'Content-Type': 'application/json' }
		})
	}
}
