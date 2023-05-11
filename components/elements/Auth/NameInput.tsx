import styles from '@/styles/Auth/index.module.scss'
import { IAuthInput } from '@/types/Auth.interface'

const NameInput = ({ register, errors }: IAuthInput) => {
	return (
		<label className={styles.form__label}>
			<input
				{...register('username', {
					required: 'Введите имя',
					minLength: 2,
					maxLength: 100
				})}
				className={styles.form__input}
				type='text'
				placeholder='Name'
			/>
			{errors.username && (
				<span className={styles.error_alert}>{errors.username?.message}</span>
			)}
			{errors.username && errors.username.type === 'maxLength' && (
				<span className={styles.error_alert}>не более 100 символов</span>
			)}
			{errors.username && errors.username.type === 'minLength' && (
				<span className={styles.error_alert}>не менее 2 символов</span>
			)}
		</label>
	)
}

export default NameInput
