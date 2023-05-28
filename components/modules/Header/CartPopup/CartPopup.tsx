import styles from '@/styles/CartPopup/index.module.scss'
import { IWrappedComponentProps } from '@/types/Common.interface'
import { withClickOutside } from '@/utils/withClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef, useEffect } from 'react'

import ShoppingCartSVG from '@/components/elements/ShoppingCartSVG/ShoppingCartSVG'
import {
	$shoppingCart,
	$totalPrice,
	getCartItemsFx,
	setShoppingCart,
	setTotalPrice
} from '@/effector/shopping-cart'
import { AllAuth } from '@/service/Users.service'
import { formatPrice } from '@/utils/common'
import { useQuery } from '@tanstack/react-query'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import CartPopupItem from './CartPopupItem'
import { $user } from '@/effector/user'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const toggleCartDropDown = () => setOpen(!open)
		const shoppingCart = useStore($shoppingCart)
		const totalPrice = useStore($totalPrice)
		const user = useStore($user)

		const { data: check } = useQuery({
			queryFn: () => AllAuth.loginCheck(),
			queryKey: ['check'],
			
		})

		useEffect(() => {
			loadCartItems()
		}, [])

		const loadCartItems = async () => {
			try {
				const cartItems = await getCartItemsFx(
					`/shopping-cart/${check?.userId}`
				)

				setShoppingCart(cartItems)
			} catch (error) {
				toast.error((error as Error).message)
			}
		}
		useEffect(() => {
			setTotalPrice(
				shoppingCart.reduce(
					(defaultCount, item) => defaultCount + item.total_price,
					0
				)
			)
		}, [shoppingCart])

		return (
			<div className={styles.cart} ref={ref}>
				<button className={styles.cart__btn} onClick={toggleCartDropDown}>
					{!!shoppingCart.length && (
						<span className={styles.cart__btn__count}>
							{shoppingCart.length}
						</span>
					)}
					<span className={styles.cart__svg}>
						<ShoppingCartSVG />
					</span>
					<span className={styles.cart__text}></span>
				</button>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className={styles.cart__popup}
							style={{ transformOrigin: 'right top' }}
						>
							<h3 className={styles.cart__popup__title}>Корзина</h3>
							<ul className={styles.cart__popup__list}>
								{shoppingCart.length ? (
									shoppingCart.map(item => (
										<CartPopupItem key={item.id} item={item} />
									))
								) : (
									<li className={styles.cart__popup__empty}>
										<span className={`${styles.cart__popup__empty__text}`}>
											Корзина пуста
										</span>
									</li>
								)}
							</ul>
							<div className={styles.cart__popup__footer}>
								<div className={styles.cart__popup__footer__total}>
									<span className={styles.cart__popup__footer__text}>
										общая сумма заказа
									</span>

									<span className={styles.cart__popup__footer__price}>
										{formatPrice(totalPrice)} P
									</span>
								</div>
								<Link href={`/order`}>
									<button
										className={styles.cart__popup__footer__btn}
										disabled={!shoppingCart.length}
									>
										Оформить заказ
									</button>
								</Link>
							</div>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		)
	}
)
CartPopup.displayName = 'CartPopup'
export default withClickOutside(CartPopup)
