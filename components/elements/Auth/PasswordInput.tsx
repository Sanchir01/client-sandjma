import { IAuthInput } from '@/types/Auth.interface'
import styles from '@/styles/Auth/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthInput) => {
	return (
		<label className={styles.form__label}>
			<input
				{...register('password', {
					required: 'Введите пароль',
					minLength: 4,
					maxLength: 100
				})}
				className={styles.form__input}
				type='password'
				placeholder='Password'
			/>
			{errors.password && (
				<span className={styles.error_alert}>{errors.password?.message}</span>
			)}
			{errors.password && errors.password.type === 'maxLength' && (
				<span className={styles.error_alert}>не более 100 символов</span>
			)}
			{errors.password && errors.password.type === 'minLength' && (
				<span className={styles.error_alert}>не менее 4 символов</span>
			)}
		</label>
	)
}

export default PasswordInput
