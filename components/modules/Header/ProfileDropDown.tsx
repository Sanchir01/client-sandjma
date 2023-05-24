import LogoutSVG from '@/components/elements/LogoutSVG.tsx/LogoutSVG'
import ProfileSVG from '@/components/elements/ProfileSVG/ProfileSVG'
import { logoutFx } from '@/effector/auth'
import { AllAuth } from '@/service/Users.service'
import { IUser } from '@/types/Auth.interface'
import { IWrappedComponentProps } from '@/types/Common.interface'
import { withClickOutside } from '@/utils/withClickOutside'
import { useQuery, } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import styles from '../../../styles/ProfileDropDown/indes.module.scss'

const ProfiledropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const toggleProfileDropDown = () => setOpen(!open)

		
		

		const { data, isSuccess, } = useQuery<IUser>({
			queryFn: () => AllAuth.loginCheck(),
			queryKey: ['logicCheck'],
			onSuccess:() => AllAuth.loginCheck(),
			keepPreviousData:true,
			refetchOnWindowFocus:true
		})

		const router = useRouter()

		const handleLogout = async () => {
			await logoutFx(`/users/logout`)
			
			return
		}
		const loginAuth = () => {
			router.push(`/auth`)
		}

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
							{isSuccess && (
								<li className={styles.profile__dropdown__user}>
									<span className={styles.profile__dropdown__username}>
										{data.username}
									</span>
									<span className={styles.profile__dropdown__email}>
										{data.email}
									</span>
								</li>
							)}
							<li className={styles.profile__dropdown__item}>
								<button
									className={styles.profile__dropdown__item__btn}
									onClick={handleLogout}
								>
									{isSuccess && data.username ? (
										<span className={styles.profile__dropdown__item__text} onClick={handleLogout}>
											Выйти
										</span>
									) : (
										<span
											className={styles.profile__dropdown__item__text}
											onClick={loginAuth}
										>
											Войти
										</span>
									)}
									
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
