import styles from '@/styles/Auth/index.module.scss'
import { IAuthInput } from '@/types/Auth.interface'

const EmailInput = ({ register, errors }: IAuthInput) => {
	return (
		<label className={styles.form__label}>
			<input
				{...register('email', {
					required: 'Введите имя',
					pattern: {
						value: /\S+@\S+\S+/,
						message: 'Недопустимое значение!'
					}
				})}
				className={styles.form__input}
				type='email'
				placeholder='Email'
			/>
			{errors.email && (
				<span className={styles.error_alert}>{errors.email?.message}</span>
			)}
		</label>
	)
}

export default EmailInput
