import styles from '@/styles/CartPopup/index.module.scss'
import { IWrappedComponentProps } from '@/types/Common.interface'
import { withClickOutside } from '@/utils/withClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef } from 'react'

import ShoppingCartSVG from '@/components/elements/ShoppingCartSVG/ShoppingCartSVG'
import { Dashboard } from '@/service/Dashboard.service'
import { ShoppingCart } from '@/service/Shopping-cart.service'
import { AllAuth } from '@/service/Users.service'
import { IUser } from '@/types/Auth.interface'
import { IShoppingCart } from '@/types/Shopping-car.interface'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import CartPopupItem from './CartPopupItem'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const toggleCartDropDown = () => setOpen(!open)

		const { data: id } = useQuery<IUser>({
			queryFn: () => AllAuth.loginCheck(),
			queryKey: ['logicCheckID'],
			onSuccess: id => ShoppingCart.getAll(id)
		})
		const { data, isSuccess } = useQuery<IShoppingCart[]>({
			queryKey: ['shoppingCartAll', id],
			enabled: !!id,
			queryFn: () => ShoppingCart.getAll(id!),
			keepPreviousData: true,
			refetchInterval: 1000
		})
		const { data: cartCount, isSuccess: ok } = useQuery({
			queryFn: () => Dashboard.getCartCount,
			queryKey: ['countCart']
		})

		return (
			<div className={styles.cart} ref={ref}>
				<button className={styles.cart__btn} onClick={toggleCartDropDown}>
					{isSuccess && (
						<span className={styles.cart__btn__count}>{data.length}</span>
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
								{isSuccess && data.length ? (
									data.map(item => <CartPopupItem key={item.id} item={item} />)
								) : (
									<span className={styles.cart__popup__empty__text}>пусто</span>
								)}
							</ul>
							<div className={styles.cart__popup__footer}>
								<div className={styles.cart__popup__footer__total}>
									<span className={styles.cart__popup__footer__text}>
										общая сумма заказа
									</span>
									<span className={styles.cart__popup__footer__price}>0</span>
								</div>
								<Link href={`/order`}>
									<button
										className={styles.cart__popup__footer__btn}
										disabled={!data?.length}
									>
										<span>оплатить заказ</span>
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
