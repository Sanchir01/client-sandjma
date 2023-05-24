import { IAddToCartFx, IShoppingCart } from '@/types/Shopping-car.interface'
import axios from 'axios'
import { createEffect } from 'effector-next'

axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`

export const getCartItemsFx = createEffect(async (url: string) => {
	const { data } = await axios.get(url)
	return data
})

export const addToCartFx = createEffect(
	async ({ url, username, partId }: IAddToCartFx) => {
		const { data } = await axios.post(url, { username, partId })
		return data
	}
)

export const removeFromCartFx = createEffect(async (url: string) => {
	await axios.delete(url)
})

import { createDomain } from 'effector-next'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCart[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCart>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()

const remove = (cartItems: IShoppingCart[], partId: number) =>
	cartItems.filter(item => item.partId !== partId)

export const $shoppingCart = shoppingCart
	.createStore<IShoppingCart[]>([])
	.on(setShoppingCart, (_, shoppingCart) => shoppingCart)
	.on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
	.on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
