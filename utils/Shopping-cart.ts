import {
	addToCartFx,
	removeFromCartFx,
	removeShoppingCartItem,
	updateCartItemFX,
	updateShoppingCart,
	updateCartItemTotalPrice
} from '@/effector/shopping-cart'
import { toast } from 'react-toastify'

export const toggleCartItem = async (
	username: string,
	partId: number,
	isInCart: boolean
) => {
	try {
		if (isInCart) {
			await removeFromCartFx(`/shopping-cart/one/${partId}`)
			removeShoppingCartItem(partId)
			return
		}

		const data = await addToCartFx({
			url: '/shopping-cart/add',
			username,
			partId
		})

		updateShoppingCart(data)
	} catch (error) {
		toast.error((error as Error).message)
	}
}

export const removeItemFromCart = async (partId: number) => {
	try {
		await removeFromCartFx(`/shopping-cart/one/${partId}`)
		removeShoppingCartItem(partId)
	} catch (error) {
		toast.error((error as Error).message)
	}
}

export const updateTotalPrice = async (total_price: number, partId: number) => {
	const data = await updateCartItemFX({
		url: `/shopping-cart/total-price/${partId}`,
		payload: { total_price }
	})

	updateCartItemTotalPrice({ partId, total_price: data.total_price })
}
