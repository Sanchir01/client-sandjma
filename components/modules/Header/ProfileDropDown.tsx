import LogoutSVG from '@/components/elements/LogoutSVG.tsx/LogoutSVG'
import ProfileSVG from '@/components/elements/ProfileSVG/ProfileSVG'
import { IWrappedComponentProps } from '@/types/Common.interface'
import { withClickOutside } from '@/utils/withClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef } from 'react'
import styles from '../../../styles/ProfileDropDown/indes.module.scss'

const ProfiledropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const toggleProfileDropDown = () => setOpen(!open)
		return (
			<div className={styles.profile} ref={ref}>
				<button className={styles.profile__btn} onClick={toggleProfileDropDown}>
					<span className={styles.profile__span}>
						<ProfileSVG />
					</span>
				</button>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className={styles.profile__dropdown}
							style={{ transformOrigin: 'right top' }}
						>
							<li className={styles.profile__dropdown__user}>
								<span className={styles.profile__dropdown__username}>test</span>
								<span className={styles.profile__dropdown__email}>
									test@test.ru
								</span>
							</li>
							<li className={styles.profile__dropdown__item}>
								<button className={styles.profile__dropdown__item__btn}>
									<span className={styles.profile__dropdown__item__text}>
										Выйти
									</span>
									<span className={styles.profile__dropdown__item__svg}>
										<LogoutSVG />
									</span>
								</button>
							</li>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		)
	}
)
ProfiledropDown.displayName = 'ProfiledropDown'
export default withClickOutside(ProfiledropDown)
