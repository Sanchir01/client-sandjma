import {
	IAddToCartFx,
	IShoppingCart,
	IUpdateCartItemFx
} from '@/types/Shopping-car.interface'
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
export const updateCartItemFX = createEffect(
	async ({ url, payload }: IUpdateCartItemFx) => {
		const { data } = await axios.patch(url, { payload })
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
export const setTotalPrice = shoppingCart.createEvent<number>()
export const setDisableCart = shoppingCart.createEvent<boolean>()
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
	partId: number
	total_price: number
}>()
export const updateCartItemCount = shoppingCart.createEvent<{
	partId: number
	count: number
}>()

const remove = (cartItems: IShoppingCart[], partId: number) =>
	cartItems.filter(item => item.partId !== partId)

function updateCartItem<T>(
	cartItems: IShoppingCart[],
	partId: number,
	payload: T
) {
	return cartItems.map(item => {
		if (item.partId === partId) {
			return {
				...item,
				...payload
			}
		}

		return item
	})
}

export const $shoppingCart = shoppingCart
	.createStore<IShoppingCart[]>([])
	.on(setShoppingCart, (_, shoppingCart) => shoppingCart)
	.on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
	.on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
	.on(updateCartItemTotalPrice, (state, { partId, total_price }) => [
		...updateCartItem(state, partId, { total_price })
	])
	.on(updateCartItemCount, (state, { partId, count }) => [
		...updateCartItem(state, partId, { count })
	])

export const $totalPrice = shoppingCart
	.createStore<number>(0)
	.on(setTotalPrice, (_, value) => value)

export const $disableCart = shoppingCart
	.createStore<boolean>(false)
	.on(setDisableCart, (_, value) => value)
