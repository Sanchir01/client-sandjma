import { IInput } from '@/types/Auth.interface'
import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL:`${process.env.NEXT_PUBLIC_SERVER_URL}`
})

async function CreateUser (data:IInput){
    return axios.post('/users/signup', data)
}