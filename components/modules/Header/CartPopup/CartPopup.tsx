import { IWrappedComponentProps } from '@/types/Common.interface'
import { withClickOutside } from '@/utils/withClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef } from 'react'
import styles from '../../../../styles/CartPopup/index.module.scss'

import ShoppingCartSVG from '@/components/elements/ShoppingCartSVG/ShoppingCartSVG'
import { ShoppingCart } from '@/service/Shopping-cart.service'
import { IShoppingCart } from '@/types/Shopping-car.interface'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const toggleCartDropDown = () => setOpen(!open)
		const { data, isSuccess } = useQuery<IShoppingCart[]>({
			queryFn: () => ShoppingCart.getAll(),
			queryKey: ['shoppingCartAll']
		})
		console.log(data)
		return (
			<div className={styles.cart} ref={ref}>
				<button className={styles.cart__btn} onClick={toggleCartDropDown}>
					{isSuccess && data?.length && (
						<span className={styles.cart__btn_count}>{data.length}</span>
					)}
					<span className={styles.cart__svg}>
						<ShoppingCartSVG />
					</span>
					<span className={styles.cart__text}>Корзина</span>
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
								{isSuccess ? (
									data.map(item => (
										<li
											className={styles.cart__popup__empty}
											key={item.id}
										> {item.id}</li>
									))
								) : (
									<span className={styles.cart__popup__text}>
										корзина пуста
									</span>
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
